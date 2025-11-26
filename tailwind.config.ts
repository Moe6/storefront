import TypographyPlugin from "@tailwindcss/typography";
import FormPlugin from "@tailwindcss/forms";
import ContainerQueriesPlugin from "@tailwindcss/container-queries";
import defaultTheme from "tailwindcss/defaultTheme";
import { type Config } from "tailwindcss";

const brandPalette = {
	50: "#fff5fb",
	100: "#ffe4f1",
	200: "#fec8de",
	300: "#f9a5c8",
	400: "#ef7faf",
	500: "#df4f92",
	600: "#c23978",
	700: "#9c275f",
	800: "#731c44",
	900: "#4b1130",
};

const blushPalette = {
	50: "#fff9fb",
	100: "#ffeef4",
	200: "#ffd6e7",
	300: "#ffc4db",
};

const config: Config = {
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				brand: brandPalette,
				blush: blushPalette,
				ink: "#2b1428",
				peony: "#f8dede",
				petal: "#fcefeb",
			},
			fontFamily: {
				sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
				display: ["var(--font-playfair)", ...defaultTheme.fontFamily.serif],
			},
		},
	},
	plugins: [TypographyPlugin, FormPlugin, ContainerQueriesPlugin],
};

export default config;
