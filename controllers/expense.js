const Expense = require("../models/expense");
const User = require("../models/user");
const path = require("path");
const rootDir = require("../util/path");
const sequelize = require("../util/database");

exports.getHomePage = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "expense.html"));
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
    const oldamount=req.user.totalamount;
    const newamount=Number(oldamount)  + Number(amount) ;
   await User.update({totalamount:newamount} , {where:{id:req.user.id} , transaction:t });
   await t.commit();
    res.status(201).json({ newexpense: result });
  } catch (err) {
    await t.rollback();
    console.log(err);
  }
};

const expensePerPage = 5;

exports.sendExpenses = async (req, res, next) => {
  try {
    let page = +req.query.page || 1;
    let totalexpense = await Expense.count();
    console.log(totalexpense);
    let expenses = await Expense.findAll(
      { where: { userId: req.user.id },
      offset: (page - 1) * expensePerPage,
      limit: expensePerPage,
      
    });
    res.status(201).json({
      expenses: expenses,
      currentPage: page,
      hasNextPage:page*expensePerPage<totalexpense,
      nextPage:page+1,
      hasPreviousPage:page>1,
      previousPage:page-1,
      lastPage:Math.ceil(totalexpense/expensePerPage)
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
