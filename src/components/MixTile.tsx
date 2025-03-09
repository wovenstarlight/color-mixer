import ColorTile from "./ColorTile";

/** Wrapper for ColorTile with background color mixing and descriptive labels.
 * @param {object} props Properties for this tile.
 * @param props.space The color space in which to mix the colors.
 * @param props.interpolation For certain color spaces, the hue interpolation mode.
 */
export default function MixTile({
	space,
	interpolation,
}: {
	space: string,
	interpolation?: string,
}) {
	return (
		<ColorTile
			bgColor={`color-mix(in ${space}${interpolation ? ` ${interpolation}` : ""}, var(--color1, #fff) var(--strength1, 50%), var(--color2, #000) var(--strength2, 50%))`}
			topLabel={`${space}${interpolation ? ` (${interpolation})` : ""}`}
			showColor={true}
		/>
	);
}