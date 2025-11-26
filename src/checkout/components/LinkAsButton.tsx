import { type ReactNode, type AnchorHTMLAttributes } from "react";
import clsx from "clsx";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
	children: ReactNode;
	href: string;
	variant?: "primary" | "secondary" | "tertiary";
};

export const LinkAsButton = ({ children, href, variant = "primary" }: Props) => {
	const classes = clsx(
		"inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full border active:outline-none font-semibold uppercase tracking-wide",
		{
			"bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white px-6 aria-disabled:cursor-not-allowed aria-disabled:opacity-70":
				variant === "primary",
			"border-brand-200 text-brand-700 hover:border-brand-300 hover:bg-brand-50 active:bg-brand-50 disabled:border-brand-100 aria-disabled:border-brand-100 bg-transparent disabled:bg-transparent aria-disabled:bg-transparent px-6":
				variant === "secondary",
			"h-auto border-none bg-transparent p-0 normal-case tracking-normal": variant === "tertiary",
		},
	);

	return (
		<a href={href} className={classes}>
			{children}
		</a>
	);
};
