import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Header from "@/components/home/Header";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/lib/auth";
import { TooltipStatsProvider } from "@/context/TooltipStatsContext";
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
			<body className={inter.className}>
				<div className="fixed inset-0 -z-10">
					<Image
						src="/bg02.jpg"
						alt="Background"
						fill
						priority
						quality={100}
						className="object-cover"
						sizes="100vw"
					/>
				</div>
				<Analytics />
				<TooltipStatsProvider
					githubUsername="tashifkhan"
					leetcodeUsername="khan-tashif"
				>
					<Header />
					<AuthProvider>{children}</AuthProvider>
				</TooltipStatsProvider>
			</body>
		</html>
	);
}
