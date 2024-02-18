const mongoose = require("mongoose");

let mongoURL =
  process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017/doc-appointment-app";

const configDb = async () => {
  try {
    const db = await mongoose.connect(mongoURL);
    console.log("db connected successfully");
  } catch (e) {
    console.log("failed to connected to db", e.message);
  }
};

module.exports = configDb;
