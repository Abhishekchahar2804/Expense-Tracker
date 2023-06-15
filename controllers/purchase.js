const Razorpay = require('razorpay');
const Order = require('../models/order');


exports.purchasepremium =async(req,res,next)=>{
    try{
        let rzp = new Razorpay({
            key_id:"rzp_test_cwBIAkj4tP8ZgU",
            key_secret:"8CfkudmSkRvEO96dbt7nNxJ3"
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

exports.updateOrder = async(req,res,next)=>{
    try{
        const order_id = req.body.order_id;
        const payment_id=req.body.payment_id;
        const order =await Order.findOne({where:{orderid:order_id}})
        order.paymentid=payment_id;
        order.status="SUCCESS";
        await order.save();
        req.user.update({ispremuimuser:true});
        res.status(201).json({message:"transition successfull"});
    }
    catch(err){
        console.log(err);
    }
}