import NextImage, { type ImageProps } from "next/image";

export const ProductImageWrapper = (props: ImageProps) => {
	return (
		<div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-b from-blush-50 via-white to-blush-100 p-4">
			<NextImage {...props} className="h-full w-full object-contain object-center" />
		</div>
	);
};
