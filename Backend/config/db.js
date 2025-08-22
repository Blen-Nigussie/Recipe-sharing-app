require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) { // Only connect if not connected
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
