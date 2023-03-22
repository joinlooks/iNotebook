import React, { useContext } from "react";
import noteContext from "../context/noteContext";

const NoteItem = ({ note }) => {
	const { deleteNote } = useContext(noteContext);

	return (
		<div className="col-md-4">
			<div className="card my-2">
				<div className="card-header">
					<div className="d-flex justify-content-between">
						{note.tag}
						<div>
							{/* To edit note */}
							<i
								style={{ cursor: "pointer" }}
								className="bi bi-pencil-square mx-2"
							></i>
							{/* To delete note */}
							<i
								style={{ color: "red", cursor: "pointer" }}
								className="bi bi-trash3"
								onClick={() => deleteNote(note._id)}
							></i>
						</div>
					</div>
				</div>
				<div className="card-body">
					<blockquote className="blockquote mb-0">
						<p>{note.title}</p>
						<footer className="blockquote-footer">{note.description}</footer>
					</blockquote>
				</div>
			</div>
		</div>
	);
};

export default NoteItem;
