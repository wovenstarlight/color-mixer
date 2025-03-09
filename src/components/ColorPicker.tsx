import { ChangeEvent, useState } from "react";
import { Color } from "../definitions";
import { getBaseColor } from "../utils/colorParsers";
import "../styles/ColorPicker.css";

export default function ColorPicker({
	title,
	data,
	setData,
}: {
	title: string,
	data: Color,
	setData: Function,
}) {
	/** Editable state for the text color */
	const [textColor, setTextColor] = useState(getBaseColor(data.color, false))

	/** Updates base color. */
	function setColor(e: ChangeEvent<HTMLInputElement>) {
		setTextColor(getBaseColor(e.target.value, !e.target.value.startsWith("#")));
		setData((value: Color) => ({
			...value,
			color: e.target.value,
		}));
	}

	/** Checks the text input for a valid color and updates data accordingly. */
	function setColorText(e: ChangeEvent<HTMLInputElement>) {
		if (/^[\da-f]{6}$/.test(e.target.value)) setColor(e);
		else setTextColor(e.target.value);
	}

	/** Updates opacity. */
	function setOpacity(e: ChangeEvent<HTMLInputElement>) {
		setData((value: Color) => ({
			...value,
			opacity: parseFloat(e.target.value),
		}));
	}

	return (
		<fieldset className="colorpicker">
			<legend>{title}</legend>

			<label>
				<span className="button">Use color picker</span>
				<input
					type="color"
					className="vhide"
					value={data.color}
					onInput={setColor}
				/>
			</label>

			<label>
				<span className="vhide">Or enter hex code:</span>
				<span className="hex">
					<span className="icon">#</span>
					<input
						type="text"
						pattern="[\da-f]{6}"
						placeholder="ffffff"
						minLength={6}
						maxLength={6}
						required
						value={textColor}
						onChange={setColorText}
					/>
				</span>
			</label>

			<label>
				<span className="rangelabel">Opacity: {data.opacity}%</span>
				<input
					type="range"
					list="markers"
					min={0}
					max={100}
					step={0.1}
					value={data.opacity}
					onChange={setOpacity}
				/>
			</label>

			{/* TODO: Color preview */}

			{/* TODO: Mix strength slider */}
		</fieldset>
	);
}