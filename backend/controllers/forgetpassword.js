const rootDir = require("../util/path");
const path = require("path");
require('dotenv').config(); 
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const uuid = require("uuid");
const User = require("../models/user");
const ForgetPassword = require('../models/forgetpassword')

exports.forgetPassword = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "forgetpassword.html"));
};

exports.postForgetPassword = async (req, res, next) => {
  const email = req.body.email;
  try {
    const user =await User.findOne({ where: { email } });
    if (user) {
      const forgetpasswordcreate =await ForgetPassword.create({id:uuid.v4(),active:true,userId:user.id});
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass:process.env.NODEMAILER_PASSWORD,
        },
      });
      const msg = {
        from:"destiney.boehm47@ethereal.email",
        to: email,
        subject: "Sending with nodemailer is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html:`http://localhost:3000/password/resetpassword/${forgetpasswordcreate.id}`
      };
      await transporter.sendMail(msg);
      res
        .status(201)
        .json({ message: "Link to reset password sent to your mail " });
    }
  } catch (err) {
    console.log(err);
  }
};


exports.getResetPassword =async(req,res,next)=>{
  try{
    const forgetPasswordId=req.params.id;
    const forgetpassword=await ForgetPassword.findByPk(forgetPasswordId);
    if(forgetpassword){
        await forgetpassword.update({active:false});
        res.status(200).send(`<html>
        <script>
            function formsubmitted(e){
                e.preventDefault();
                console.log('called')
            }
        </script>
        <form action="/password/updatepassword/${forgetPasswordId}" method="get">
            <label for="newpassword">Enter New password</label>
            <input name="newpassword" type="password" required></input>
            <button>reset password</button>
        </form>
    </html>`
    )}
}
  catch(err){
    console.log(err);
  }
}

exports.getUpdatePassword =async(req,res,next)=>{
  try{
    const id = req.params.id;
    const newpassword =req.query.newpassword;
    const details =await ForgetPassword.findByPk(id);
    const user =await User.findByPk(details.userId)
    if(user){
      const saltround=10;
      bcrypt.hash(newpassword,saltround,async(err,hash)=>{
        if(err){
          console.log(err);
         
      }
    await  user.update({password:hash});
    res.status(201).json({message:'password updated successfully'})
      })
    }
  }
  catch(err){
    console.log(err);
  }
}