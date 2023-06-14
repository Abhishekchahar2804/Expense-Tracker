const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

const sequelize = require('./util/database');
const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expense');
const User = require('./models/user');
const Expense = require('./models/expense');

app.use('/user',userRouter);
app.use('/expense',expenseRouter);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync()
.then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})

