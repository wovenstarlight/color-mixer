/** Converts a provided decimal number to a hexadecimal string.
 * @param num The decimal number to be converted.
 * @returns A two-digit hexadecimal string.
 */
export function decimalToHex(num: number): string {
	return num.toString(16).padStart(2, "0");
}

/** Converts a percentage (out of 100) into a hexadecimal number between 0–255.
 * @param num The percentage to be converted.
 * @returns A two-digit hexadecimal number.
 */
export function percentageToHex(num: number): string {
	return decimalToHex(Math.round((num / 100) * 255));
}

/** Constructs a hex-formatted color string.
 * @param color The desired base color in hexadecimal format.
 * @param opacity The desired opacity, either in decimal (`number`) or hexadecimal (`string`) format.
 * @returns A hexadecimal color with opacity.
 */
export function buildColor(color: string, opacity: number | string): string {
	return (color.startsWith("#") ? "" : "#").concat(
		color,
		typeof opacity === "number" ? percentageToHex(opacity) : opacity,
	)
}