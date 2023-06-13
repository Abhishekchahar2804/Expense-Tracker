const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

const sequelize = require('./util/database');
const signUpRouter = require('./routes/signup');

app.use(signUpRouter);
sequelize.sync()
.then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})

