import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";

const AddNote = () => {
	const { addNote } = useContext(noteContext);

	const [note, setNote] = useState({ title: "", description: "", tag: "" });

	const handleClick = (e) => {
		e.preventDefault();
		addNote(note.title, note.description, note.tag);
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
					/>
				</div>

				<button type="submit" className="btn btn-primary" onClick={handleClick}>
					Add note
				</button>
			</form>
		</>
	);
};

export default AddNote;
