const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

const sequelize = require('./util/database');
const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expense');

app.use('/user',userRouter);
app.use('/expense',expenseRouter);
sequelize.sync()
.then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})

