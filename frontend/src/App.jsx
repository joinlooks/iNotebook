import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { Route, Routes } from "react-router-dom";
import NoteState from "./context/NoteState";
import Alert from "./components/Alert";

function App() {
	return (
		<>
			<NoteState>
				<Navbar />
				<Alert message={"This is a message"} />
				<div className="container">
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/about" element={<About />} />
					</Routes>
				</div>
			</NoteState>
		</>
	);
}

export default App;
