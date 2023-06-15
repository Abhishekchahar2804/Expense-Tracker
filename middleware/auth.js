const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticated = async(req,res,next)=>{
    try{
        let token = req.header('Authorization')
       // console.log(token);
        const userObj = jwt.verify(token,'secretKey');
        //console.log(userObj);
        const user = await User.findByPk(userObj.userId);
        req.user=user;
        next();
    }
    catch(err){
        console.log(err);
    }
}