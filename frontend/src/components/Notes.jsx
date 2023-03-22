import React, { useContext, useEffect } from "react";
import noteContext from "../context/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem.jsx";

const Notes = () => {
	const { notes, getNotes } = useContext(noteContext);

	useEffect(() => {
		getNotes();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="my-3">
			<AddNote />
			<h2 className="mt-4">Your Notes</h2>
			<div className="row">
				{notes &&
					notes.map((note) => {
						return <NoteItem note={note} key={note._id} />;
					})}
			</div>
		</div>
	);
};

export default Notes;
