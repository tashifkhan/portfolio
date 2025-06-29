import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Admin Portal",
	description: "Tashif's internal content/project management portal",
};

export default function UpdateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section className="container mx-auto px-4 pt-24 lg:pt-32 pb-8">{children}</section>;
}
