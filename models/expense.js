const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = sequelize.define('expense',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    amount:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
    }
});

module.exports=Expense;