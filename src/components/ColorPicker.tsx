import { ChangeEvent, useState } from "react";
import { Color, ColorSetter } from "../definitions";
import { buildColor } from "../utils/colorParsers";
import "../styles/ColorPicker.css";
import ColorTile from "./ColorTile";

/** Form fieldset for selecting a color to be mixed.
 * @param {object} props Properties for this tile.
 * @param props.title The title of this fieldset.
 * @param props.data The data representing this fieldset's corresponding color; makes up the values of this fieldset's fields.
 * @param props.setData A setter to update the `data` object.
 */
export default function ColorPicker({
	title,
	data,
	setData,
}: {
	title: string,
	data: Color,
	setData: ColorSetter,
}) {
	/** Editable state for the text color */
	const [textColor, setTextColor] = useState(data.color.slice(1))

	/** Updates base color.
	 * @param color The new base color.
	 * @param shortTextColor `true` if the text input should display the 3-character version of `color`. If `true`, color will not have a leading hash symbol.
	 */
	function setColor(color: string, shortTextColor: boolean = false) {
		if (shortTextColor) {
			const [r,,g,,b,] = color.split("");
			setTextColor(`${r}${g}${b}`);
		}
		else setTextColor(color.startsWith("#") ? color.slice(1) : color);
		setData((value: Color) => ({
			...value,
			color: color,
		}));
	}

	/** Checks the text input for a valid color and updates data accordingly. */
	function setColorText(e: ChangeEvent<HTMLInputElement>) {
		// Valid format (3-char)
		if (/^[\da-f]{6}$/.test(e.target.value)) setColor(e.target.value);
		// Valid format (6-char)
		else if (/^[\da-f]{3}$/.test(e.target.value)) {
			let [r, g, b] = e.target.value.split("");
			setColor(`${r}${r}${g}${g}${b}${b}`, true);
		}
		// Invalid format; let the user keep editing
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
					onInput={(e) => setColor((e.target as HTMLInputElement).value)}
				/>
			</label>

			<label>
				<span className="vhide">Or enter hex code:</span>
				<span className="hex">
					<span className="icon">#</span>
					<input
						type="text"
						pattern="([\da-f]{3}|[\da-f]{6})"
						placeholder="ffffff"
						minLength={3}
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

			<ColorTile bgColor={buildColor(data.color, data.opacity)} />

			<hr />

			<label>
				<span className="rangelabel">Mix strength: {data.strength}%</span>
				<input
					type="range"
					list="markers"
					min={0}
					max={100}
					step={0.1}
					value={data.strength}
					onChange={(e) => setData((value: Color) => ({ ...value, strength: parseFloat(e.target.value) }))}
				/>
			</label>
		</fieldset>
	);
}