const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// Used to validate the user input
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1: Create a user using: POST "/api/auth/createuser". No login required
router.post(
	"/createuser",
	[
		body("name", "Name can't be empty").not().isEmpty(),
		body("email", "Enter a valid email").isEmail(),
		body("password", "Password must be at least 3 characters").isLength({
			min: 3,
		}),
	],
	async (req, res) => {
		let success = false;
		// If there are any errors in validation, then return Bad Request and the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success, errors: errors.array() });
		}

		try {
			const { name, email, password } = req.body;

			// If a user with this email already exists, return Bad Request
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({
					success,
					error: "Sorry, a user with this email already exists",
				});
			}

			// Hashing the password using bcrypt
			const salt = await bcrypt.genSalt(10);
			const secPass = await bcrypt.hash(password, salt);

			user = await User.create({ name, email, password: secPass });

			// Create a JWT token and return it
			const data = { user: { id: user.id } };
			const authToken = jwt.sign(data, JWT_SECRET);
			success = true;
			res.json({ success, authToken });

			//
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}
);

// ROUTE 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post(
	"/login",
	[
		body("email", "Enter a valid email").isEmail(),
		body("password", "Password cannot be blank").not().isEmpty(),
	],
	async (req, res) => {
		let success = false;
		// If there are any errors in validation, then return Bad Request and the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success, errors: errors.array() });
		}

		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({
					success,
					error: "Please try to login with correct credentials",
				});
			}

			// Compare the password with the hashed password
			const passwordCompare = await bcrypt.compare(password, user.password);
			if (!passwordCompare) {
				return res.status(400).json({
					success,
					error: "Please try to login with correct credentials",
				});
			}

			// Create a JWT token and return it
			const data = { user: { id: user.id } };
			const authToken = jwt.sign(data, JWT_SECRET);
			success = true;
			res.json({ success, authToken });

			//
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}
);

// ROUTE 3: Get logged in user details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchUser, async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId).select("-password");
		res.send(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
