import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HOST = "http://localhost:5000";

const Login = ({ showAlert }) => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });

	let navigate = useNavigate();

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = `${HOST}/api/auth/login`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
			}),
		});
		const json = await response.json();

		if (json.success) {
			// Save the auth token and redirect
			localStorage.setItem("token", json.authToken);
			navigate("/");
			showAlert("Logged in successfully", "success");
		} else {
			showAlert("Email and Password doesn't match", "danger");
		}
	};

	return (
		<>
			<h1 className="my-3">Login</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email address
					</label>
					<input
						type="email"
						autoComplete="on"
						className="form-control"
						id="email"
						aria-describedby="emailHelp"
						name="email"
						value={credentials.email}
						onChange={onChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						autoComplete="on"
						className="form-control"
						id="password"
						name="password"
						value={credentials.password}
						onChange={onChange}
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</form>
		</>
	);
};

export default Login;
