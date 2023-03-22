const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the notes of the User using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
	try {
		const notes = await Note.find({ user: req.user.id });
		res.json(notes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});

// ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post(
	"/addnote",
	fetchUser,
	[
		body("title", "Title can't be empty").not().isEmpty(),
		body("description", "Description can't be empty").not().isEmpty(),
	],
	async (req, res) => {
		// If there are any errors in validation, then return Bad Request and the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { title, description, tag } = req.body;
			const note = await Note.create({
				title,
				description,
				tag,
				user: req.user.id,
			});
			res.json(note);

			//
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}
);

// ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote". Login required
router.put(
	"/updatenote/:id",
	fetchUser,
	[
		body("title", "Title can't be empty").not().isEmpty(),
		body("description", "Description can't be empty").not().isEmpty(),
	],
	async (req, res) => {
		// If there are any errors in validation, then return Bad Request and the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { title, description, tag } = req.body;
			const newNote = {};
			if (title) newNote.title = title;
			if (description) newNote.description = description;
			if (tag) newNote.tag = tag;

			// Find the note to be updated and update it
			let note = await Note.findById(req.params.id);
			if (!note) {
				return res.status(404).send("Not Found");
			}

			// If the note is not owned by the user, return Not Allowed
			if (note.user.toString() !== req.user.id) {
				return res.status(401).send("Not Allowed");
			}

			note = await Note.findByIdAndUpdate(
				req.params.id,
				{ $set: newNote },
				{ new: true }
			);
			res.json({ note });

			//
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}
);

// ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
	try {
		// Find the note to be deleted and delete it
		let note = await Note.findById(req.params.id);
		if (!note) {
			return res.status(404).send("Not Found");
		}

		// If the note is not owned by the user, return Not Allowed
		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}

		note = await Note.findByIdAndDelete(req.params.id);
		res.json({ Success: "Note has been deleted", note: note });

		//
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
