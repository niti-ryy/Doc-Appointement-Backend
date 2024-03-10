const express = require("express");
const paymentRoutes = express.Router();
const razorpayInstance=require("../helpers/payment");
const { paymentgate,confirmPayment,paymentGateway } = require("../middlewears/paymentGateway");
const appointmentCltr = require("../controllers/appointmentCltr");
const mailConfirmation=require("../templates/mailconfirmation");
const authenticate = require("../middlewears/authenticate");
const checkRole = require("../middlewears/checkRole");

// paymentRoutes.route("/createPayment")
//     .post(paymentgate,)
// paymentRoutes.route("/verifyPayment")
//   .post(confirmPayment,(req,res)=>{res.send("success")})
paymentRoutes.route("/create/verify/payment")
    .post(paymentGateway,appointmentCltr.create,mailConfirmation)
module.exports = paymentRoutes;
