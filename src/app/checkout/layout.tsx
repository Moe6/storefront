import { type ReactNode } from "react";
import { AuthProvider } from "@/ui/components/AuthProvider";
import { BRAND_DESCRIPTION, BRAND_NAME } from "@/lib/branding";

export const metadata = {
	title: `${BRAND_NAME} · Checkout`,
	description: BRAND_DESCRIPTION,
};

export default function RootLayout(props: { children: ReactNode }) {
	return (
		<main className="bg-blush-50">
			<AuthProvider>{props.children}</AuthProvider>
		</main>
	);
}
