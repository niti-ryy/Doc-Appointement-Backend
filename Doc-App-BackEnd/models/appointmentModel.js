const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
  counselorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Counselor',required: true},
  date: Date,
  time:{
    start: String, 
    end: String,   
  },
  status:{
    type:String,
    enum:["pending","confirmed","completed","canceled","resecheduled"],
    required:true,
    default:"pending"
  },
  ticketPrice:{
    type:Number,
    required:true
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;


// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     doctor: {
//       type: mongoose.Types.ObjectId,
//       ref: "Doctor",
//       required: true,
//     },
//     user: {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     ticketPrice: { type: String, required: true },
//     appointmentDate: {
//       type: Date,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "approved", "cancelled"],
//       default: "pending",
//     },
//     isPaid: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Booking", bookingSchema);