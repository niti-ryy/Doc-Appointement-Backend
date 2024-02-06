const mongoose = require("mongoose");

let mongoURL =
  process.env.MONGO_DB_URL || "mongodb://localhost:27017";

const configDb = async () => {
  try {
    const db = await mongoose.connect("mongodb://localhost:27017");
    console.log("db connected successfully");
  } catch (e) {
    console.log("failed to connected to db", e.message);
  }
};

module.exports = configDb;
