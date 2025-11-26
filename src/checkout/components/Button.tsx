import { type FC, type ReactNode, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: ReactNode;
	variant?: "primary" | "secondary" | "tertiary";
	ariaLabel?: string;
	ariaDisabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
	label,
	className,
	variant = "primary",
	disabled = false,
	children: _children,
	type = "button",
	ariaLabel,
	ariaDisabled,
	...rest
}) => {
	const classes = clsx(
		"inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full border active:outline-none",
		{
			"bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white px-6 font-semibold uppercase tracking-wide aria-disabled:cursor-not-allowed aria-disabled:opacity-70":
				variant === "primary",
			"border-brand-200 text-brand-700 hover:border-brand-300 hover:bg-brand-50 active:bg-brand-50 disabled:border-brand-100 aria-disabled:border-brand-100 bg-transparent disabled:bg-transparent aria-disabled:bg-transparent px-6 font-semibold":
				variant === "secondary",
			"h-auto border-none bg-transparent p-0": variant === "tertiary",
		},
		className,
	);

	return (
		<button
			aria-label={ariaLabel}
			aria-disabled={ariaDisabled}
			disabled={disabled}
			className={classes}
			type={type === "submit" ? "submit" : "button"}
			{...rest}
		>
			{typeof label === "string" ? <span className="font-semibold">{label}</span> : label}
		</button>
	);
};
