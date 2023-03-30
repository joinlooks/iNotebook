import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ showAlert }) => {
	let location = useLocation();
	let navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
		showAlert("Logged out successfully", "success");
	};

	return (
		<nav
			className="navbar navbar-expand-lg bg-body-tertiary bg-dark"
			data-bs-theme="dark"
		>
			<div className="container">
				<Link className="navbar-brand" to="/">
					<img src="../logo.png" alt="logo" height="30px" />
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link
								className={`nav-link ${
									location.pathname === "/" ? "active" : ""
								}`}
								aria-current="page"
								to="/"
							>
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className={`nav-link ${
									location.pathname === "/about" ? "active" : ""
								}`}
								to="/about"
							>
								About
							</Link>
						</li>
					</ul>
					{!localStorage.getItem("token") ? (
						<form className="d-flex" role="search">
							<Link className="btn btn-link" to="/login" role="button">
								Login
							</Link>
							<Link className="btn btn-link" to="/signup" role="button">
								SignUp
							</Link>
						</form>
					) : (
						<Link
							className="btn btn-link"
							to="/login"
							role="button"
							onClick={handleLogout}
						>
							Logout
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
