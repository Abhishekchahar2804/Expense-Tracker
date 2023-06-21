const Expense = require("../models/expense");
const User = require("../models/user");
const FilesDownload = require("../models/filesdownloaded");
const path = require("path");
const rootDir = require("../util/path");
const sequelize = require("../util/database");
const { json } = require("sequelize");
const AWS = require("aws-sdk");
require('dotenv').config();
const S3Services = require("../services/S3services");

exports.getHomePage = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "expense.html"));
};

exports.download = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    // console.log(expenses);
    const strinfiyExpenses = JSON.stringify(expenses);
    const userId = req.user.id;
    const filename = `expenses${userId}/${new Date()}.txt`;
    const fileUrl = await S3Services.uploadToS3(strinfiyExpenses, filename);
    // await FilesDownload.create({
    //   filelink: fileUrl,
    //   userId,
    // });
    res.status(200).json({ fileUrl });
  } catch (err) {
    res.status(500).json({ fileUrl: "" });
  }
};

exports.postAddExpense = async (req, res, next) => {
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  //   console.log(amount);

  const t = await sequelize.transaction();
  try {
    const result = await Expense.create(
      {
        amount: amount,
        description: description,
        category: category,
        userId: req.user.id,
      },
      { transaction: t }
    );
    const oldamount = req.user.totalamount;
    const newamount = Number(oldamount) + Number(amount);
    await User.update(
      { totalamount: newamount },
      { where: { id: req.user.id }, transaction: t }
    );
    await t.commit();
    res.status(201).json({ newexpense: result });
  } catch (err) {
    await t.rollback();
    console.log(err);
  }
};

exports.sendExpenses = async (req, res, next) => {
  try {
    let page = +req.query.page || 1;
    const pageSize = +req.query.pagesize || 5;
    let totalexpense = await Expense.count();
    console.log(totalexpense);
    let expenses = await Expense.findAll({
      where: { userId: req.user.id },
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    res.status(201).json({
      expenses: expenses,
      currentPage: page,
      hasNextPage: page * pageSize < totalexpense,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalexpense / pageSize),
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const eId = req.params.id;
    const expense = await Expense.findByPk(eId);
    const user = await User.findByPk(expense.userId);
    user.totalamount = Number(user.totalamount) - Number(expense.amount);
    await user.save({ transaction: t });
    await Expense.destroy({ where: { id: eId }, transaction: t });
    await t.commit();
    res.sendStatus(201);
  } catch (err) {
    await t.rollback();
    console.log(err);
  }
};

// exports.updateExpense = async(req,res,next)=>{
//   const eId = req.params.id;
//   const updatedAmount=req.body.amount;
//   const updatedDescription = req.body.description;
//   const updatedCategory = req.body.category;

//   try{
//     const expense = await Expense.findByPk(eId);
//     expense.amount=updatedAmount;
//     expense.description=updatedDescription;
//     expense.category = updatedCategory;
//     expense.save();
//   }
//   catch(err){
//     console.log(err);
//   }
// }


exports.downloadLinks=async (req,res)=>{
  const t = await sequelize.transaction();
try{
  const url=await FilesDownload.findAll({where:{userId:req.user.id}})
  res.status(200).json({sucess:'true',url})
}
catch(err){
  console.log(err);
  res.status(500).json({success:'false',error:err});
}
}