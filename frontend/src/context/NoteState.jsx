import { useState } from "react";
import noteContext from "./noteContext";

const HOST = "http://localhost:5000";

const NoteState = (props) => {
	const notesInitial = [];

	const getNotes = async () => {
		// Todo: API call
		const url = `${HOST}/api/notes/fetchallnotes`;
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Auth-Token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxNmM4OWMzYWU2MTcxYTY5MzEwODE1In0sImlhdCI6MTY3OTMzMjE2OH0.Q-DZ0N7d32ozrTIHvhT2wrSvs6AdB6O5uF-SozBsPSQ",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
		const json = await response.json();
		setNotes(json);
	};

	const [notes, setNotes] = useState(notesInitial);

	// Add a note
	const addNote = async (title, description, tag) => {
		// Todo: API call
		const url = `${HOST}/api/notes/addnote`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Auth-Token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxNmM4OWMzYWU2MTcxYTY5MzEwODE1In0sImlhdCI6MTY3OTMzMjE2OH0.Q-DZ0N7d32ozrTIHvhT2wrSvs6AdB6O5uF-SozBsPSQ",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
		});

		const json = await response.json();

		let note = {
			_id: "6419d89bas3a32",
			user: "6416c89c3ae6171a69310815",
			title,
			description,
			tag,
			date: "2023-03-21T16:17:23.218Z",
			__v: 0,
		};
		setNotes(notes.concat(note));
	};

	// Edit a note
	const editNote = async (id, title, description, tag) => {
		// Todo: API call

		const url = `${HOST}/api/notes/updatenote/${id}`;

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Auth-Token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxNmM4OWMzYWU2MTcxYTY5MzEwODE1In0sImlhdCI6MTY3OTMzMjE2OH0.Q-DZ0N7d32ozrTIHvhT2wrSvs6AdB6O5uF-SozBsPSQ",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
		});

		const json = await response.json();

		// Logic to edit note in frontend
		for (let i = 0; i < notes.length; i++) {
			let element = notes[i];
			if (element._id === id) {
				element.title = title;
				element.description = description;
				element.tag = tag;
				break;
			}
		}
	};

	// Delete a note
	const deleteNote = (id) => {
		// Todo: API call

		console.log("Deleting note with id: ", id);
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
