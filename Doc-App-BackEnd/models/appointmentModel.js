const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile',required: true},
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
  },
  payment_Id:{
    type:String,
  },
  order_Id:{
    type:String
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

