const Expense = require('../models/expense');
const User = require('../models/user');

exports.getLeaderBoard =async(req,res,next)=>{
    try{
        // const expenses =await Expense.findAll({
        //     attributes:['userId','amount']
        // });
        const users = await User.findAll({
            attributes:['totalamount','name']
        });
        // const userExpense={};
        // expenses.forEach(expense=>{
        //     if(userExpense[expense.userId]){
        //         userExpense[expense.userId]+=expense.amount;
        //     }
        //     else{
        //         userExpense[expense.userId]=expense.amount;
        //     }
        // })
        let userLeaderBoard = [];
        users.forEach(user=>{
            userLeaderBoard.push({name:user.name,total_cost:user.totalamount || 0});
        })
        userLeaderBoard.sort((a,b)=>b.total_cost-a.total_cost);
        res.status(201).json(userLeaderBoard);
    }
    catch(err){
        console.log(err);
    }
}