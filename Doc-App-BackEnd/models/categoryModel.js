const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: Date,
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question', // Reference to the Question schema
  }],
  image:String
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
