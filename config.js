const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to the database');
  }catch(error){
    console.error('Could not connect to database');
    process.exit(1);
  }
}

module.exports = connectDB;