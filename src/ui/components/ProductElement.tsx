import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/utils";

export function ProductElement({
	product,
	loading,
	priority,
}: { product: ProductListItemFragment } & { loading: "eager" | "lazy"; priority?: boolean }) {
	return (
		<li data-testid="ProductElement" className="group rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-brand-50 transition hover:-translate-y-1 hover:shadow-md">
			<LinkWithChannel href={`/products/${product.slug}`} key={product.id} className="block space-y-3">
				<div>
					{product?.thumbnail?.url && (
						<ProductImageWrapper
							loading={loading}
							src={product.thumbnail.url}
							alt={product.thumbnail.alt ?? ""}
							width={512}
							height={512}
							sizes={"512px"}
							priority={priority}
						/>
					)}
					<div className="mt-4 flex items-start justify-between">
						<div>
							<h3 className="font-display text-lg text-ink">{product.name}</h3>
							<p className="mt-1 text-sm uppercase tracking-widest text-ink/50" data-testid="ProductElement_Category">
								{product.category?.name}
							</p>
						</div>
						<p className="text-sm font-semibold text-brand-700" data-testid="ProductElement_PriceRange">
							{formatMoneyRange({
								start: product?.pricing?.priceRange?.start?.gross,
								stop: product?.pricing?.priceRange?.stop?.gross,
							})}
						</p>
					</div>
				</div>
			</LinkWithChannel>
		</li>
	);
}
