const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const filesdownloaded= sequelize.define('filesdownloaded',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    },
    filelink:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports=filesdownloaded;