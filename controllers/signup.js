const Signup = require('../models/signup');
const path = require('path');

const rootDir = require("../util/path");

exports.getHomePage = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "signup.html"));
};

exports.postAddUser = async(req,res,next)=>{
    const name = req.body.name;
    const email=req.body.email;
    const password = req.body.password;

    try{
        const result = await Signup.create({name:name,email:email,password:password});
        res.status(201).json({newSignUp:result});
    }
    catch(err){
        console.log(err);
    }
}
