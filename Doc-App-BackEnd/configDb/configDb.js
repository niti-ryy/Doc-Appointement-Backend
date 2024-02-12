const mongoose = require("mongoose");

let mongoURL =
<<<<<<< HEAD
  process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017/doc-appointment-app";

const configDb = async () => {
  try {
    const db = await mongoose.connect(mongoURL);
=======
  process.env.MONGO_DB_URL || "mongodb://localhost:27017";

const configDb = async () => {
  try {
    const db = await mongoose.connect("mongodb://localhost:27017");
>>>>>>> 458ca4718533df5764f8144eaea87a30c3e26345
    console.log("db connected successfully");
  } catch (e) {
    console.log("failed to connected to db", e.message);
  }
};

module.exports = configDb;
