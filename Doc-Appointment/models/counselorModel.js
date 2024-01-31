const mongoose = require('mongoose');

const counselorSchema = new mongoose.Schema({
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', unique: true },
  specialization: String,
  availability: [String],
  experience: Number,
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  introductoryVideos: [String],
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TODO' }],
  image: String,
  consulationFees: {
    required: true,
    type: Number
  },
  bio: { type: String, required: true },
  createdAt: Date,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blogs' }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'category'
  }],
  languages: {
    type: String,
    enum: ["English", "Hindi"],
    required: true
  },
  achievements: [
    {
      type: String
    }
  ]
});

const Counselor = mongoose.model('Counselor', counselorSchema);

module.exports = Counselor;



