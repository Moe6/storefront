import Link from "next/link";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ChannelSelect } from "./ChannelSelect";
import { ChannelsListDocument, MenuGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { BRAND_COPYRIGHT } from "@/lib/branding";

export async function Footer({ channel }: { channel: string }) {
	const footerLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "footer", channel },
		revalidate: 60 * 60 * 24,
	});
	const channels = process.env.SALEOR_APP_TOKEN
		? await executeGraphQL(ChannelsListDocument, {
				withAuth: false, // disable cookie-based auth for this call
				headers: {
					// and use app token instead
					Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
				},
		  })
		: null;
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-brand-100 bg-white/80">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				<div className="grid grid-cols-1 gap-8 py-16 sm:grid-cols-3">
					{footerLinks.menu?.items?.map((item) => {
						return (
							<div key={item.id}>
								<h3 className="text-sm font-semibold uppercase tracking-widest text-brand-600">{item.name}</h3>
								<ul className="mt-4 space-y-4 [&>li]:text-ink/70">
									{item.children?.map((child) => {
										if (child.category) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={`/categories/${child.category.slug}`}>
														{child.category.name}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.collection) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={`/collections/${child.collection.slug}`}>
														{child.collection.name}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.page) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={`/pages/${child.page.slug}`}>
														{child.page.title}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.url) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={child.url}>{child.name}</LinkWithChannel>
												</li>
											);
										}
										return null;
									})}
								</ul>
							</div>
						);
					})}
				</div>

				{channels?.channels && (
					<div className="mb-4 text-ink/70">
						<label className="space-y-2 text-sm">
							<span className="uppercase tracking-widest text-xs text-brand-700">Currency</span>
							<ChannelSelect channels={channels.channels} />
						</label>
					</div>
				)}

				<div className="flex flex-col justify-between border-t border-brand-50 py-10 text-sm text-ink/70 sm:flex-row">
					<p>Copyright &copy; {currentYear} {BRAND_COPYRIGHT}. All rights reserved.</p>
					<p className="flex items-center gap-1">
						<span className="text-ink/60">Powered by</span>
						<Link target={"_blank"} href={"https://www.ethercircuit.co.za/"} className="font-semibold text-brand-600">
							Ethercircuit Solutions
						</Link>
					</p>
				</div>
			</div>
		</footer>
	);
}
