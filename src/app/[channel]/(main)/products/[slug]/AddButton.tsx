"use client";

import { useFormStatus } from "react-dom";

export function AddButton({ disabled }: { disabled?: boolean }) {
	const { pending } = useFormStatus();
	const isButtonDisabled = disabled || pending;

	return (
		<button
			type="submit"
			aria-disabled={isButtonDisabled}
			aria-busy={pending}
			onClick={(e) => isButtonDisabled && e.preventDefault()}
			className="h-12 items-center rounded-full bg-brand-600 px-6 py-3 text-base font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-200/70 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-300 disabled:text-white/70 aria-disabled:cursor-not-allowed"
		>
			{pending ? (
				<div className="inline-flex items-center">
					<svg
						className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<span>Processing...</span>
				</div>
			) : (
				<span>Add to cart</span>
			)}
		</button>
	);
}
