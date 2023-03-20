require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const connectDB = require("./db");

connectDB();
const app = express();
app.use(express.json());

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(PORT, () => {
	console.log(`iNotebook backend server on : http://localhost:${PORT}`);
});
