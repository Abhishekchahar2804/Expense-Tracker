const Expense = require('../models/expense');
const User = require('../models/user');

exports.getLeaderBoard =async(req,res,next)=>{
    try{
        const expenses =await Expense.findAll();
        const users = await User.findAll();
        const userExpense={};
        expenses.forEach(expense=>{
            if(userExpense[expense.id]){
                userExpense[expense.id]+=expense.amount;
            }
            else{
                userExpense[expense.id]=expense.amount;
            }
        })
        let userLeaderBoard = [];
        users.forEach(user=>{
            userLeaderBoard.push({name:user.name,total_cost:userExpense[user.id] || 0});
        })
        userLeaderBoard.sort((a,b)=>b.total_cost-a.total_cost);
        res.status(201).json(userLeaderBoard);
    }
    catch(err){
        console.log(err);
    }
}