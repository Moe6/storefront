import clsx from "clsx";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

export async function Pagination({
	pageInfo,
}: {
	pageInfo: {
		basePathname: string;
		hasNextPage: boolean;
		readonly urlSearchParams?: URLSearchParams;
	};
}) {
	return (
		<nav className="flex items-center justify-center gap-x-4 border-t border-brand-50 px-4 pt-12">
			<LinkWithChannel
				href={pageInfo.hasNextPage ? `${pageInfo.basePathname}?${pageInfo.urlSearchParams?.toString()}` : "#"}
				className={clsx("rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide", {
					"bg-brand-600 text-white shadow-lg transition hover:bg-brand-700": pageInfo.hasNextPage,
					"cursor-not-allowed border border-brand-100 bg-white/60 text-ink/40": !pageInfo.hasNextPage,
					"pointer-events-none": !pageInfo.hasNextPage,
				})}
				aria-disabled={!pageInfo.hasNextPage}
			>
				Next page
			</LinkWithChannel>
		</nav>
	);
}
