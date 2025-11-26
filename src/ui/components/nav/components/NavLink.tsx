"use client";

import clsx from "clsx";
import { type ReactElement } from "react";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import useSelectedPathname from "@/hooks/useSelectedPathname";

export function NavLink({ href, children }: { href: string; children: ReactElement | string }) {
	const pathname = useSelectedPathname();
	const isActive = pathname === href;

	return (
		<li className="inline-flex">
			<LinkWithChannel
				href={href}
				className={clsx(
					isActive ? "border-brand-600 text-brand-700" : "border-transparent text-ink/60",
					"inline-flex items-center border-b-2 pt-px text-sm font-semibold uppercase tracking-widest hover:text-brand-600",
				)}
			>
				{children}
			</LinkWithChannel>
		</li>
	);
}
