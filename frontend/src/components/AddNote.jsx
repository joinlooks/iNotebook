import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";

const AddNote = ({ showAlert }) => {
	const { addNote } = useContext(noteContext);

	const [note, setNote] = useState({ title: "", description: "", tag: "" });

	const handleClick = (e) => {
		e.preventDefault();
		if (note.tag === "") note.tag = "default";
		addNote(note.title, note.description, note.tag);
		setNote({ title: "", description: "", tag: "" });
		showAlert("Note added successfully", "success");
	};

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<>
			<h2 className="my-3">Add a Note</h2>
			<form>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input
						type="text"
						className="form-control"
						id="title"
						name="title"
						onChange={onChange}
						required
						value={note.title}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<textarea
						className="form-control"
						id="description"
						name="description"
						onChange={onChange}
						required
						value={note.description}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="tag" className="form-label">
						Tag
					</label>
					<input
						type="text"
						className="form-control"
						id="tag"
						name="tag"
						onChange={onChange}
						value={note.tag}
					/>
				</div>

				<button
					disabled={note.title.length === 0 || note.description.length === 0}
					type="submit"
					className="btn btn-primary"
					onClick={handleClick}
				>
					Add note
				</button>
			</form>
		</>
	);
};

export default AddNote;
