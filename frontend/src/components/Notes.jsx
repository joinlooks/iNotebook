import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem.jsx";

const Notes = ({ showAlert }) => {
	const { notes, getNotes, editNote } = useContext(noteContext);
	let navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			getNotes();
		} else {
			showAlert("Please login to continue", "danger");
			navigate("/login");
		}
		// eslint-disable-next-line
	}, []);

	const ref = useRef(null);
	const refClose = useRef(null);

	const [note, setNote] = useState({
		id: "",
		etitle: "",
		edescription: "",
		etag: "",
	});

	const updateNote = (currentNote) => {
		ref.current.click();
		setNote({
			id: currentNote._id,
			etitle: currentNote.title,
			edescription: currentNote.description,
			etag: currentNote.tag,
		});
	};

	const handleClick = (e) => {
		e.preventDefault();
		editNote(note.id, note.etitle, note.edescription, note.etag);
		getNotes();
		refClose.current.click();
		showAlert("Note updated successfully", "success");
	};

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<div className="my-3">
			<AddNote showAlert={showAlert} />

			{/* Modal to edit note */}
			<button
				ref={ref}
				type="button"
				className="btn btn-primary d-none"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
			>
				Launch demo modal
			</button>

			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Edit your note
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								ref={refClose}
							></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label htmlFor="title" className="form-label">
										Title
									</label>
									<input
										type="text"
										className="form-control"
										id="etitle"
										name="etitle"
										onChange={onChange}
										value={note.etitle}
									/>
								</div>

								<div className="mb-3">
									<label htmlFor="description" className="form-label">
										Description
									</label>
									<textarea
										className="form-control"
										id="edescription"
										name="edescription"
										onChange={onChange}
										value={note.edescription}
									/>
								</div>

								<div className="mb-3">
									<label htmlFor="tag" className="form-label">
										Tag
									</label>
									<input
										type="text"
										className="form-control"
										id="etag"
										name="etag"
										onChange={onChange}
										value={note.etag}
									/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="submit"
								className="btn btn-primary"
								onClick={handleClick}
							>
								Update note
							</button>
						</div>
					</div>
				</div>
			</div>

			<h2 className="mt-4">Your Notes</h2>
			<div className="row">
				{notes && notes.length !== 0 ? (
					notes.map((note) => {
						return (
							<NoteItem
								note={note}
								updateNote={updateNote}
								showAlert={showAlert}
								key={note._id}
							/>
						);
					})
				) : (
					<div className="container">No Notes to display</div>
				)}
			</div>
		</div>
	);
};

export default Notes;
