import { useState } from "react";
import noteContext from "./noteContext";

const HOST = "http://localhost:5000";

const NoteState = (props) => {
	const [notes, setNotes] = useState([]);

	const getNotes = async () => {
		const url = `${HOST}/api/notes/fetchallnotes`;
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Auth-Token": localStorage.getItem("token"),
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
		const json = await response.json();
		setNotes(json);
	};

	// Add a note
	const addNote = async (title, description, tag) => {
		const url = `${HOST}/api/notes/addnote`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Auth-Token": localStorage.getItem("token"),
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
		});

		const note = await response.json();
		setNotes(notes.concat(note));
	};

	// Edit a note
	const editNote = async (id, title, description, tag) => {
		const url = `${HOST}/api/notes/updatenote/${id}`;
		const response = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Auth-Token": localStorage.getItem("token"),
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
		});

		const json = await response.json();

		let previewNotes = JSON.parse(JSON.stringify(notes));
		// Logic to edit note in frontend
		for (let i = 0; i < previewNotes.length; i++) {
			if (previewNotes[i]._id === id) {
				previewNotes[i].title = title;
				previewNotes[i].description = description;
				previewNotes[i].tag = tag;
				break;
			}
		}
		setNotes(previewNotes);
	};

	// Delete a note
	const deleteNote = async (id) => {
		const url = `${HOST}/api/notes/deletenote/${id}`;
		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Auth-Token": localStorage.getItem("token"),
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		const newNotes = notes.filter((note) => note._id !== id);
		setNotes(newNotes);
	};

	return (
		<noteContext.Provider
			value={{ notes, addNote, editNote, deleteNote, getNotes }}
		>
			{props.children}
		</noteContext.Provider>
	);
};

export default NoteState;
