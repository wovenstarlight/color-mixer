import { useContext, useEffect, useRef, useState } from "react";
import "../styles/ColorTile.css";
import { decimalToHex } from "../utils/colorParsers";
import ColorContext from "../contexts/ColorContext";

/** A preview of a given color, clickable to copy the corresponding hexadecimal color representation.
 * @param {object} props Properties for this tile.
 * @param props.bgColor The color to be previewed; should be a valid CSS `<color>` value.
 * @param props.topLabel A label to display at the top of the button.
 * @param props.showColor Whether to show the hexadecimal color string at the bottom of the button.
 */
export default function ColorTile({
	bgColor,
	topLabel,
	showColor = false,
}: {
	bgColor: string,
	topLabel?: string,
	showColor?: boolean,
}) {
	/** Canvas for getting the hex color. */
	const canvas = document.createElement("canvas");
	canvas.width = canvas.height = 1;
	const ctx = canvas.getContext("2d", { willReadFrequently: true });

	/** Reference to the actual color preview. */
	const flatColor = useRef(null);
	/** Hex representation of the mixed color. */
	const [hex, setHex] = useState("#");

	// Force an update in the calculated hex if the overall colors change
	const [color1, color2] = useContext(ColorContext);
	const colorString = Object.values(color1).join("").concat(Object.values(color2).join(""));
	useEffect(() =>{
		ctx!.clearRect(0, 0, 1, 1);
		ctx!.fillStyle = window.getComputedStyle(flatColor.current!).getPropertyValue("background-color");
		ctx!.fillRect(0, 0, 1, 1);
		const data = ctx!.getImageData(0, 0, 1, 1).data;
		setHex("#".concat([
			decimalToHex(data[0]),
			decimalToHex(data[1]),
			decimalToHex(data[2]),
			decimalToHex(data[3]),
		].join("")));
	}, [colorString, ctx]);

	/** Copies this tile's color to the clipboard as a hex value. */
	function copyColor() {
		navigator.clipboard.writeText(hex);
	}

	return (
		<button
			type="button"
			className="colortile"
			onClick={copyColor}
		>
			{/* Top text */}
			{topLabel && <span className="top label">{topLabel}</span>}

			{/* The actual square of color */}
			<div
				ref={flatColor}
				className="flat"
				style={{ backgroundColor: bgColor }}
			/>

			{/* Bottom text */}
			{showColor && <span className="bottom label">{hex}</span>}
		</button>
	);
}