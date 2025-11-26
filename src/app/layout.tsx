import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Suspense, type ReactNode } from "react";
import { type Metadata } from "next";
import { DraftModeNotification } from "@/ui/components/DraftModeNotification";
import { BRAND_LONG_DESCRIPTION, BRAND_NAME, BRAND_TAGLINE } from "@/lib/branding";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
	title: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
	description: BRAND_LONG_DESCRIPTION,
	metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
		? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
		: undefined,
};

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang="en" className="min-h-dvh bg-blush-50">
			<body className={`${inter.variable} ${playfair.variable} min-h-dvh bg-blush-50 font-sans text-ink antialiased`}>
				{children}
				<Suspense>
					<DraftModeNotification />
				</Suspense>
			</body>
		</html>
	);
}
