import { createContext, useState } from "react";
import "./styles/App.css";
import ColorPicker from "./components/ColorPicker";
import { Color } from "./definitions";

export const ColorContext = createContext<Color[]>([]);

function App() {
	const [color1, setColor1] = useState({
		color: "#ffffff",
		opacity: 100,
		strength: 50,
	});
	const [color2, setColor2] = useState({
		color: "#000000",
		opacity: 100,
		strength: 50,
	});

	return (
		<ColorContext.Provider value={[color1, color2]}>
			<h1>color-mix(er)</h1>
			<form id="colorpicking">
				<ColorPicker
					title="Choose first color"
					data={color1}
					setData={setColor1}
				/>
				<ColorPicker
					title="Choose second color"
					data={color2}
					setData={setColor2}
				/>

				{/* Markers for opacity/strength sliders */}
				<datalist id="markers">
					<option value="0"></option>
					<option value="10"></option>
					<option value="20"></option>
					<option value="30"></option>
					<option value="40"></option>
					<option value="50"></option>
					<option value="60"></option>
					<option value="70"></option>
					<option value="80"></option>
					<option value="90"></option>
					<option value="100"></option>
				</datalist>
			</form>
			<section id="mixes">
				<h2>Color mixes</h2>
				<p>Click a tile to copy the corresponding hex code!</p>
				{/* TODO */}
			</section>
		</ColorContext.Provider>
	)
}

export default App
