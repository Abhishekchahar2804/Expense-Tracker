const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Signup =  sequelize.define('signup',{
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
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        unique:true
    },
})

module.exports = Signup;