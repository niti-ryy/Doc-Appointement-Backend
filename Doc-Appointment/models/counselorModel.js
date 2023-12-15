const mongoose = require('mongoose');

const counselorSchema = new mongoose.Schema({
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile',unique: true},
  specialization: String,
  availability: [String],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  introductoryVideos: [String],
  experiences: String,
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TODO' }],
  image:String,
  consulationFees:{
    required:true,
    type:Number
  },
  bio:{type:String,required:true},
  createdAt:Date,
  blogs:[{type: mongoose.Schema.Types.ObjectId, ref: 'blogs'}]    
});

const Counselor = mongoose.model('Counselor', counselorSchema);

module.exports = Counselor;



