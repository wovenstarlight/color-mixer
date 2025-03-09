/** A mixable color data object. Can be updated via a {@link ColorSetter `ColorSetter`} function. */
export interface Color {
	/** A hex color, including opacity. */
	color: string;
	/** The opacity, stored in hex format. */
	opacity: number;
	/** The mix strength, stored as a percentage. */
	strength: number;
}

/** A color setter function.
 * Takes a single argument which is either a callback function to overwrite a past value,
 * or a complete new {@link Color `Color`} value.
 */
export type ColorSetter = (fn: ((value: Color) => Color) | Color) => void;