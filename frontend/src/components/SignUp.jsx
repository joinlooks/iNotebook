import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HOST = "http://localhost:5000";

const SignUp = ({ showAlert }) => {
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	let navigate = useNavigate();

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = `${HOST}/api/auth/createuser`;
		const { name, email, password } = credentials;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, password }),
		});
		const json = await response.json();
		console.log(json);
		if (json.success) {
			// Save the auth token and redirect
			localStorage.setItem("token", json.authToken);
			navigate("/");
			showAlert("Account created successfully", "success");
		} else {
			showAlert("Invalid Credentials", "danger");
		}
	};

	return (
		<>
			<h1 className="my-3">SignUp</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						type="text"
						className="form-control"
						id="name"
						name="name"
						autoComplete="on"
						required
						onChange={onChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email address
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						aria-describedby="emailHelp"
						autoComplete="on"
						required
						onChange={onChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						name="password"
						autoComplete="on"
						required
						onChange={onChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="confirmPassword" className="form-label">
						Confirm Password
					</label>
					<input
						type="password"
						className="form-control"
						id="confirmPassword"
						name="confirmPassword"
						autoComplete="on"
						required
						onChange={onChange}
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</>
	);
};

export default SignUp;
