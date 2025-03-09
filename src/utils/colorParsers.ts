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

/** Converts a number to a percentage out of 255.
 * @param num The number. Must be in the range 0–255.
 * @returns The number as a percentage of 255, to one decimal place.
 */
export function num255toPercentage(num: number): string {
	return ((num / 255) * 100).toFixed(1);
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

/** Extracts the base color from a color string.
 * @param color The hexadecimal-format color.
 * @param includeHash `true` to include the leading hash symbol; `false` to return only the RGB hex characters.
 * @returns The base color without any opacity.
 */
export function getBaseColor(color: string, includeHash: boolean = true): string {
	return color.slice(includeHash ? 0 : 1, 7);
}

/** Extracts the opacity from a color string.
 * @param color The hexadecimal-format color.
 * @param asPercentage `true` to return a percentage value; `false` to return a hex string.
 * @returns The opacity without the base color.
 */
export function getOpacity(color: string, asPercentage: boolean = false): string | number {
	const hex = color.slice(7);
	return asPercentage
		? num255toPercentage(Number(`0x${hex}`))
		: hex;
}