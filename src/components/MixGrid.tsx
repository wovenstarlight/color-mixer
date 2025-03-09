import { CSSProperties, useContext } from "react";
import MixTile from "./MixTile";
import { buildColor } from "../utils/colorParsers";
import "../styles/MixGrid.css";
import ColorContext from "../contexts/ColorContext";

/** A grid of various mixed color tiles. */
export default function MixGrid() {
	const [color1, color2] = useContext(ColorContext);

	return (
		<div
			id="mixgrid"
			style={{
				"--color1": buildColor(color1.color, color1.opacity),
				"--strength1": `${color1.strength}%`,
				"--color2": buildColor(color2.color, color2.opacity),
				"--strength2": `${color2.strength}%`,
			} as CSSProperties}
		>
			<div className="mixflat">
				<MixTile space="srgb" />
				<MixTile space="srgb-linear" />
				<MixTile space="lab" />
				<MixTile space="oklab" />
				<MixTile space="xyz" />
				<MixTile space="xyz-d50" />
				<MixTile space="xyz-d65" />
			</div>
			<div className="mixstack">
				<MixTile space="hsl" interpolation="shorter hue" />
				<MixTile space="hsl" interpolation="longer hue" />
				<MixTile space="hsl" interpolation="increasing hue" />
				<MixTile space="hsl" interpolation="decreasing hue" />
			</div>
			<div className="mixstack">
				<MixTile space="hwb" interpolation="shorter hue" />
				<MixTile space="hwb" interpolation="longer hue" />
				<MixTile space="hwb" interpolation="increasing hue" />
				<MixTile space="hwb" interpolation="decreasing hue" />
			</div>
			<div className="mixstack">
				<MixTile space="lch" interpolation="shorter hue" />
				<MixTile space="lch" interpolation="longer hue" />
				<MixTile space="lch" interpolation="increasing hue" />
				<MixTile space="lch" interpolation="decreasing hue" />
			</div>
			<div className="mixstack">
				<MixTile space="oklch" interpolation="shorter hue" />
				<MixTile space="oklch" interpolation="longer hue" />
				<MixTile space="oklch" interpolation="increasing hue" />
				<MixTile space="oklch" interpolation="decreasing hue" />
			</div>
		</div>
	);
}