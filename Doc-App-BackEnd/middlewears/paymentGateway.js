const razorpayInstance = require("../helpers/payment");
const generateUniqueID = require("../utils/orderIdCreation");
const crypto = require("crypto")
const Razorpay = require("razorpay")
require("dotenv").config()
// -------------------------------combined calls--------------------------------------------------------

const paymentGateway = async (req, res, next) => {
    const { appointmentData, orderDetails, paymentConfirmationData, action } = req.body;
    const { amount, currency } = orderDetails;
    console.log(req.body)
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentConfirmationData;

    try {
        if (action === "create") {
            console.log(orderDetails);
            // amount = amount * 100;
            receipt = generateUniqueID();

            const options = {
                amount: amount * 100,
                currency: currency,
                receipt: generateUniqueID(),
                notes: {
                    counselorname: "xyx",
                    patientname: "patient"
                }

            };
            const order = await razorpayInstance.orders.create(options);
            if (!order) {
                return res.status(500).send("Error creating order");
            }
            res.json(order);
        } else if (action === "verify") {
            // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentConfirmationData;
            const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);   //have to replave with env 
            sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
            const digest = sha.digest("hex");
            if (digest !== razorpay_signature) {
                return res.status(400).json({ msg: "Transaction is not legit!" });
            }
            req.body.paymentStatus = {
                msg: "success",
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
            }
            req.body.appointmentData = {
                ...appointmentData,
                ticketPrice: amount,
                userId
            }
            next()
        }
    } catch (e) {
        return res.status(500).json({ message: "Server Error", error: e.message });
    }
};

module.exports = { paymentGateway };


