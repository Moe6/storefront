import Link from "next/link";
import { invariant } from "ts-invariant";
import { RootWrapper } from "./pageWrapper";
import { BRAND_NAME } from "@/lib/branding";

export const metadata = {
	title: `Checkout · ${BRAND_NAME}`,
};

export default async function CheckoutPage(props: {
	searchParams: Promise<{ checkout?: string; order?: string }>;
}) {
	const searchParams = await props.searchParams;
	invariant(process.env.NEXT_PUBLIC_SALEOR_API_URL, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");

	if (!searchParams.checkout && !searchParams.order) {
		return null;
	}

	return (
		<div className="min-h-dvh bg-blush-50">
			<section className="mx-auto flex min-h-dvh max-w-5xl flex-col p-8">
				<div className="flex items-center font-bold">
					<Link aria-label="homepage" href="/" className="font-display text-2xl text-brand-700">
						{BRAND_NAME}
					</Link>
				</div>
				<h1 className="mt-8 text-3xl font-bold text-ink">Checkout</h1>

				<section className="mb-12 mt-6 flex-1 rounded-3xl bg-white/90 p-4 shadow-sm ring-1 ring-brand-50 sm:p-8">
					<RootWrapper saleorApiUrl={process.env.NEXT_PUBLIC_SALEOR_API_URL} />
				</section>
			</section>
		</div>
	);
}
