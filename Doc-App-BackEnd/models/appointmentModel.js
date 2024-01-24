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

