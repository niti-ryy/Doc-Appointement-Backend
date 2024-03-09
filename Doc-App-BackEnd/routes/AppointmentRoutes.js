const express=require("express")
const appointmentCltr = require("../controllers/appointmentCltr")
const appointmentRoutes=express.Router()
const checkRole = require("../middlewears/checkRole")

appointmentRoutes.route("/createAppointment")
    .post(checkRole(["Counselor","Admin"]),appointmentCltr.create)
appointmentRoutes.route("/updateAppointment/:id")
    .put(checkRole(["Counselor","Admin"]),appointmentCltr.update)
appointmentRoutes.route("/createAppointment/payment")
    .post(checkRole(["Counselor","User"]),)

module.exports=appointmentRoutes