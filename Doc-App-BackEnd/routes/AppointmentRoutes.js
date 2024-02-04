const express=require("express")
const appointmentCltr = require("../controllers/appointmentCltr")
const appointmentRoutes=express.Router()

appointmentRoutes.route("/createAppointment")
    .post(appointmentCltr.create)
appointmentRoutes.route("/updateAppointment/:id")
    .put(appointmentCltr.update)


module.exports=appointmentRoutes