const mongoURI = process.env.mongoURI;
const mongoose = require("mongoose");

const connectDB = async () => {
	await mongoose.connect(mongoURI);
	console.log("MongoDB connected successfully");
};

module.exports = connectDB;
