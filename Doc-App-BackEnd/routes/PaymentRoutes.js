const express = require("express");
const paymentRoutes = express.Router();
const razorpayInstance=require("../helpers/payment")

paymentRoutes.route("/createPayment")
    .post(async (req, res) => {
        const { ticketPrice } = req.body;
        const orderDetails = { // Corrected variable name here
            amount: ticketPrice,
            currency: "INR",
            receipt: new Date().toISOString(),
            notes: {
                counselorname: "xyx",
                patientname: "patient"
            }
        };
        razorpayInstance.orders.create(orderDetails, (err, order) => { // Corrected variable name here
            if (!err) {
                res.status(200).json({
                    message: "success",
                    data: order
                });
            } else {
                res.send(err);
            }
        });
    });

module.exports = paymentRoutes;
