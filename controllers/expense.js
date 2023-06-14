const Expense = require("../models/expense");
const path = require("path");
const rootDir = require("../util/path");
const e = require("express");

exports.getHomePage = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "expense.html"));
};

exports.postAddExpense = async (req, res, next) => {
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
//   console.log(amount);
  try{
    const result = await Expense.create({amount:amount,description:description,category:category});
    // console.log(result);
    res.status(201).json({newexpense:result});
  }
  catch(err){
    console.log(err);
  }
};

exports.sendExpenses = async(req,res,next)=>{
    try{
        let expense = await Expense.findAll();
        res.status(201).json({allData:expense});
    }
    catch(err){
        console.log(err);
    }
}

exports.deleteExpense = async (req,res,next)=>{
  try{
    const eId = req.params.id;
    await Expense.destroy({where:{id:eId}});
    res.sendStatus(201);
  }
  catch(err){
    console.log(err);
  }
}

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