const Razorpay = require('razorpay');
const Order = require('../models/order');
const userControllers = require('../controllers/user');
const jwt = require('jsonwebtoken');

exports.purchasepremium =async(req,res,next)=>{
    try{
        let rzp = new Razorpay({
            key_id:"rzp_test_8Td7Q8pUQVbqot",
            key_secret:"mgpkQ2D1NMOBfZSNT0j5kNfA"
        })
        const amount=2500;
        const order =await rzp.orders.create({amount,currency:"INR"});

        await req.user.createOrder({orderid:order.id,status:"PENDING"})
        res.status(201).json({order,key_id:rzp.key_id})

    }
    catch(err){
        console.log(err);
    }
}

function generateAccessToken(id,ispremuimuser){
    return jwt.sign({userId:id,ispremuimuser:ispremuimuser},'secretKey');
 }

exports.updateOrder = async(req,res,next)=>{
    try{
        const order_id = req.body.order_id;
        const payment_id=req.body.payment_id;
        const userId = req.user.id;
        const order =await Order.findOne({where:{orderid:order_id}})
        const promise1 =order.update({paymentid:payment_id,status:"SUCCESS"});
        const promise2=req.user.update({ispremuimuser:true});
        await Promise.all([promise1,promise2]);
        res.status(201).json({message:"transition successfull",token:generateAccessToken(userId,true)});
    }
    catch(err){
        console.log(err);
    }
}


exports.updateFailure = async(req,res,next)=>{
    const order_id = req.body.order_id;
    const order =await Order.findOne({where:{orderid:order_id}})
    await order.update({status:"FAILURE"});
}