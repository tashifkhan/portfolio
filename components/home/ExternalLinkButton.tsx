"use client";

import { BsArrowUpRight } from "react-icons/bs";

type ExternalLinkButtonProps = {
	href: string;
	label?: string;
};

export function ExternalLinkButton({
	href,
	label = "View Profile",
}: ExternalLinkButtonProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-gray-800/50 hover:bg-gray-800/70 text-white px-4 py-2 rounded-lg transition-colors"
		>
			{label}
			<BsArrowUpRight className="text-sm" />
		</a>
	);
}
