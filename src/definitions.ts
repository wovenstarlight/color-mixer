export interface Color {
	/** A hex color, including opacity. */
	color: string;
	/** The opacity, stored in hex format. */
	opacity: number;
	/** The mix strength, stored as a percentage. */
	strength: number;
}