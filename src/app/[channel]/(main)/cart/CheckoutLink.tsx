"use client";

type Props = {
	disabled?: boolean;
	checkoutId?: string;
	className?: string;
};

export const CheckoutLink = ({ disabled, checkoutId, className = "" }: Props) => {
	return (
		<a
			data-testid="CheckoutLink"
			aria-disabled={disabled}
			onClick={(e) => disabled && e.preventDefault()}
			href={`/checkout?checkout=${checkoutId}`}
			className={`inline-block max-w-full rounded-full border border-transparent bg-brand-600 px-6 py-3 text-center font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-700 aria-disabled:cursor-not-allowed aria-disabled:bg-brand-200 aria-disabled:text-ink/50 sm:px-16 ${className}`}
		>
			Checkout
		</a>
	);
};
