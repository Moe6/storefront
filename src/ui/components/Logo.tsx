"use client";

import { usePathname } from "next/navigation";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { BRAND_NAME } from "@/lib/branding";

const LogoWordmark = () => (
	<span className="flex items-baseline gap-1" aria-label={BRAND_NAME}>
		<span className="font-display text-2xl font-semibold uppercase tracking-tight text-brand-700">Lebo</span>
		<span className="font-display text-2xl text-brand-500">beauty</span>
		<span className="text-[0.6rem] font-semibold uppercase tracking-[0.45em] text-ink">Co</span>
	</span>
);

export const Logo = () => {
	const pathname = usePathname();

	if (pathname === "/") {
		return (
			<h1 className="flex items-center" aria-label="homepage">
				<LogoWordmark />
			</h1>
		);
	}
	return (
		<div className="flex items-center">
			<LinkWithChannel aria-label="homepage" href="/" className="transition hover:opacity-80">
				<LogoWordmark />
			</LinkWithChannel>
		</div>
	);
};
