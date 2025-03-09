import { useState } from "react";
import "./styles/App.css";

function App() {
	const [color1, setColor1] = useState({
		color: "#ffffff",
		opacity: 100,
		strength: 50,
	})
	const [color2, setColor2] = useState({
		color: "#000000",
		opacity: 100,
		strength: 50,
	})

	return (
		<>
			<h1>color-mix(er)</h1>
			{/* TODO */}
		</>
	)
}

export default App
