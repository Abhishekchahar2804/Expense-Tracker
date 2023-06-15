const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User =  sequelize.define('user',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false,
    },
    ispremuimuser:Sequelize.DataTypes.BOOLEAN,
    totalamount:Sequelize.DataTypes.INTEGER
})

module.exports = User;