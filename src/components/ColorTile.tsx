import { CSSProperties, useRef } from "react";
import "../styles/ColorTile.css";
import { decimalToHex } from "../utils/colorParsers";

/** Canvas for getting the hex color. */
const canvas = document.createElement("canvas");
canvas.width = canvas.height = 1;
const ctx = canvas.getContext("2d", { willReadFrequently: true });

export default function ColorTile({
	bgColor,
	topLabel,
	bottomLabel,
}: {
	bgColor: string,
	topLabel?: string,
	bottomLabel?: string,
}) {
	/** Reference to the actual color preview. */
	const flatColor = useRef(null);

	/** Copies this tile's color to the clipboard as a hex value.
	 * Since combined colors will be in various color space functions, draw & colorpick from a canvas to get the hex value.
	 */
	function copyColor() {
		ctx!.clearRect(0, 0, 1, 1);
		ctx!.fillStyle = window.getComputedStyle(flatColor.current!).getPropertyValue("background-color");
		ctx!.fillRect(0, 0, 1, 1);
		const data = ctx!.getImageData(0, 0, 1, 1).data;
		const hex = "#".concat([
			decimalToHex(data[0]),
			decimalToHex(data[1]),
			decimalToHex(data[2]),
			decimalToHex(data[3]),
		].join(""));
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
			{bottomLabel && <span className="bottom label">{bottomLabel}</span>}
		</button>
	);
}