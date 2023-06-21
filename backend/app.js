const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")))



const sequelize = require('./util/database');
const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expense');
const purchaseRouter = require('./routes/purchase');
const premiumRouter = require('./routes/premium');
const forgetPasswordRouter = require('./routes/forgetpassword');
const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const ForgetPassword = require('./models/forgetpassword');
const FilesDownloaded=require('./models/filesdownloaded');

app.use('/user',userRouter);
app.use('/expense',expenseRouter);
app.use('/purchase',purchaseRouter);
app.use('/premium',premiumRouter);
app.use('/password',forgetPasswordRouter);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgetPassword);
ForgetPassword.belongsTo(User);

User.hasMany(FilesDownloaded);
FilesDownloaded.belongsTo(User);

sequelize.sync()
.then(result=>{
    app.listen(process.env.PORT||3000);
})
.catch(err=>{
    console.log(err);
})

