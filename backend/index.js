require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const connectDB = require("./db");

connectDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.listen(PORT, () => {
	console.log(`iNotebook backend server on : http://localhost:${PORT}`);
});
