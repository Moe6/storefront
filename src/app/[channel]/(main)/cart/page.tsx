import Image from "next/image";
import { CheckoutLink } from "./CheckoutLink";
import { DeleteLineButton } from "./DeleteLineButton";
import * as Checkout from "@/lib/checkout";
import { formatMoney, getHrefForVariant } from "@/lib/utils";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { BRAND_NAME } from "@/lib/branding";

export const metadata = {
	title: `Shopping Cart · ${BRAND_NAME}`,
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	const checkoutId = await Checkout.getIdFromCookies(params.channel);

	const checkout = await Checkout.find(checkoutId);

	if (!checkout || checkout.lines.length < 1) {
		return (
			<section className="mx-auto max-w-7xl p-8">
				<h1 className="mt-8 text-3xl font-bold text-ink">Your bag is currently empty</h1>
				<p className="my-8 max-w-xl text-sm text-ink/70">Discover new-season styles curated by the LebobeautyCo stylists and add your favorites to keep shopping.</p>
				<LinkWithChannel
					href="/products"
					className="inline-flex max-w-full items-center rounded-full bg-brand-600 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-700 sm:px-16"
				>
					Explore products
				</LinkWithChannel>
			</section>
		);
	}

	return (
		<section className="mx-auto max-w-7xl p-8">
			<h1 className="mt-8 text-3xl font-bold text-ink">Your Shopping Cart</h1>
			<form className="mt-12">
				<ul
					data-testid="CartProductList"
					role="list"
					className="divide-y divide-brand-50 border-b border-t border-brand-100"
				>
					{checkout.lines.map((item) => (
						<li key={item.id} className="flex py-4">
							<div className="aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-brand-50 bg-white/80 sm:h-32 sm:w-32">
								{item.variant?.product?.thumbnail?.url && (
									<Image
										src={item.variant.product.thumbnail.url}
										alt={item.variant.product.thumbnail.alt ?? ""}
										width={200}
										height={200}
										className="h-full w-full object-contain object-center"
									/>
								)}
							</div>
							<div className="relative flex flex-1 flex-col justify-between p-4 py-2">
								<div className="flex justify-between justify-items-start gap-4">
									<div>
										<LinkWithChannel
											href={getHrefForVariant({
												productSlug: item.variant.product.slug,
												variantId: item.variant.id,
											})}
										>
											<h2 className="font-semibold text-ink">{item.variant?.product?.name}</h2>
										</LinkWithChannel>
										<p className="mt-1 text-sm uppercase tracking-widest text-ink/60">{item.variant?.product?.category?.name}</p>
										{item.variant.name !== item.variant.id && Boolean(item.variant.name) && (
											<p className="mt-1 text-sm text-ink/60">Variant: {item.variant.name}</p>
										)}
									</div>
									<p className="text-right font-semibold text-brand-700">
										{formatMoney(item.totalPrice.gross.amount, item.totalPrice.gross.currency)}
									</p>
								</div>
								<div className="flex justify-between">
									<div className="text-sm font-semibold uppercase tracking-wide text-ink/80">Qty: {item.quantity}</div>
									<DeleteLineButton checkoutId={checkoutId} lineId={item.id} />
								</div>
							</div>
						</li>
					))}
				</ul>

				<div className="mt-12">
					<div className="rounded-2xl border border-brand-50 bg-white/80 px-4 py-4 shadow-sm">
						<div className="flex items-center justify-between gap-2 py-2">
							<div>
								<p className="font-semibold text-ink">Your Total</p>
								<p className="mt-1 text-sm text-ink/60">Shipping calculated on the next step.</p>
							</div>
							<div className="font-semibold text-brand-700">
								{formatMoney(checkout.totalPrice.gross.amount, checkout.totalPrice.gross.currency)}
							</div>
						</div>
					</div>
					<div className="mt-10 text-center">
						<CheckoutLink
							checkoutId={checkoutId}
							disabled={!checkout.lines.length}
							className="w-full sm:w-1/3"
						/>
					</div>
				</div>
			</form>
		</section>
	);
}
