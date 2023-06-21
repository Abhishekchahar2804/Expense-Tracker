const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Order = sequelize.define('order',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
   paymentid:Sequelize.DataTypes.STRING,
   orderid:Sequelize.DataTypes.STRING,
   status:Sequelize.DataTypes.STRING,
});

module.exports=Order;