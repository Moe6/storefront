import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { BRAND_DESCRIPTION, BRAND_NAME, BRAND_TAGLINE } from "@/lib/branding";

export const metadata = {
	title: `${BRAND_NAME} · ${BRAND_TAGLINE}`,
	description: BRAND_DESCRIPTION,
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!data.collection?.products) {
		return null;
	}

	const products = data.collection?.products.edges.map(({ node: product }) => product);

	return (
		<div className="mx-auto flex max-w-7xl flex-col gap-12 p-6 pb-16 sm:p-8">
			<section className="relative overflow-hidden rounded-3xl bg-white/90 px-6 py-10 shadow-[0_25px_120px_rgba(223,79,146,0.2)] ring-1 ring-brand-100 sm:px-10 sm:py-14">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute -left-10 top-6 h-48 w-48 rounded-full bg-brand-100 blur-[110px]" />
					<div className="absolute -right-6 bottom-0 h-40 w-40 rounded-full bg-brand-200 blur-[120px]" />
				</div>
				<div className="relative max-w-3xl space-y-4">
					<p className="font-display text-xs uppercase tracking-[0.6em] text-brand-500">{BRAND_NAME}</p>
					<h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
						Curated color stories for every woman
					</h1>
					<p className="text-base text-ink/80 sm:text-lg">{BRAND_DESCRIPTION}</p>
					<div className="flex flex-wrap gap-4 pt-4">
						<LinkWithChannel
							href="/collections/featured-products"
							className="inline-flex items-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-200/70 transition hover:bg-brand-700"
						>
							Shop the edit
						</LinkWithChannel>
						<LinkWithChannel
							href="/products"
							className="inline-flex items-center rounded-full border border-brand-200 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-brand-700 transition hover:bg-brand-50"
						>
							View all styles
						</LinkWithChannel>
					</div>
				</div>
			</section>
			<section>
				<h2 className="text-xl font-semibold text-ink">Featured pieces</h2>
				<p className="mb-6 mt-2 text-sm text-ink/70">Fresh drops selected by the LebobeautyCo stylists.</p>
				<ProductList products={products} />
			</section>
		</div>
	);
}
