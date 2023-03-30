import React from "react";

const Alert = ({ alert }) => {
	const capitalize = (word) => {
		if (word === "danger") {
			word = "error";
		}
		const lower = word.toLowerCase();
		return lower.charAt(0).toUpperCase() + lower.slice(1);
	};

	return (
		<>
			{alert && (
				<div
					className={`alert alert-${alert.type} alert-dismissible fade show my-2 mx-2`}
					role="alert"
				>
					<strong>{capitalize(alert.type)}</strong>: {capitalize(alert.message)}
				</div>
			)}
		</>
	);
};

export default Alert;
