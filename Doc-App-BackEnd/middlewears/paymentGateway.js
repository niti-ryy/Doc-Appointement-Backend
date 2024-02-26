
const razorpayInstance=require("../middlewears/payment")

const paymentgate=async(req,res,next)=>{
    const {ticketPrice}=req.body
    const orderDeatils={
        amount:ticketPrice*100,
        currency:"INR",
        receipt:Number(new Date()),
        notes:{
            counselorname:"xyx",
            patientname:"patient"
        }
    }
    razorpayInstance.orders.create(orderDetails,(err,order)=>{
        if(!err){
            res.status(200).json({
                message:"success",
                data:order
            })
        }else{
            res.send(err)
        }
    })
}

module.exports=paymentgate