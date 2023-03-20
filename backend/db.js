const MONGO_URI = process.env.MONGO_URI;
const mongoose = require("mongoose");

const connectDB = async () => {
	await mongoose.connect(MONGO_URI);
	console.log("MongoDB connected successfully");
};

module.exports = connectDB;
