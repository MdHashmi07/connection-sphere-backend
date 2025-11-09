require("dotenv").config();
const mongoose = require('mongoose');
const {MONGODB_URL} = require('../utils/constants')

const connectDB = async () => {
     try{
          await mongoose.connect(MONGODB_URL);
     }catch(error) {
          console.error("MongoDB connection error:", error.message);
          throw error;
     }
}

module.exports.connectDB = connectDB;