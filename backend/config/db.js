const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Atlas connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

module.exports = DB;
