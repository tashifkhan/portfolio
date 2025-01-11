import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/home/Header";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "<khan/ tashif> | Portfolio",
	description: "This is breif showcase of my skills and projects",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.className}  bg-cover bg-center bg-custom-bg h-screen `}
			>
				<Analytics />
				<Header />
				{children}
			</body>
		</html>
	);
}
