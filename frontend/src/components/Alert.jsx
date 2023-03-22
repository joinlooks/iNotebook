import React from "react";

const Alert = ({ message }) => {
	return (
		<>
			<div className="alert alert-primary my-2 mx-2" role="alert">
				{message}
			</div>
		</>
	);
};

export default Alert;
