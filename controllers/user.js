const User = require('../models/user');
const path = require('path');
const  bcrypt =  require('bcrypt');
const rootDir = require("../util/path");

exports.getHomePage = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "signup.html"));
};

exports.getloginPage = (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','login.html'));
}

exports.postAddUser = async(req,res,next)=>{
    const name = req.body.name;
    const email=req.body.email;
    const password = req.body.password;

    try{
        const saltrounds=5;
        bcrypt.hash(password,saltrounds,async(err,hash)=>{
            const result = await User.create({name:name,email:email,password:hash});
            res.status(201).json({newSignUp:result});
        })
        
    }
    catch(err){
        console.log(err);
    }
}


exports.postCheckUser = async(req,res,next)=>{
    const email=req.body.email;
    const password = req.body.password;
    // console.log(password);

    try{
        const user = await User.findAll({where:{email:email}});
        if(user.length>0){
            bcrypt.compare(password,user[0].password,async(err,result)=>{
                if(err){
                    res.status(400).json({message:"Something is wrong"});
                }

                if(result==true){
                    res.status(200).json({message:"successfully login"});
                }
                else{
                    return res.status(400).json({message:"password is wrong"});
                }
            })
        }
        else{
            return res.status(400).json({message:"user does not exist"})
        }
    }
    catch(err){
        console.log(err);
    }
}