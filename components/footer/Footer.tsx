"use client";

import { motion } from "framer-motion";
import { FooterSocials } from "./FooterSocials";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const quickLinks = [
	{ name: "About Me", href: "/" },
	{ name: "Projects", href: "/#projects" },
	{ name: "Skills", href: "/#skills" },
	{ name: "Contact", href: "/#contact" },
];

export function Footer() {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer className="relative mt-16 border-t border-slate-200/10 bg-gradient-to-b from-slate-950/35 to-slate-950/50 backdrop-blur-xl">
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Contact Info */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.5 }}
						className="space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all shadow-lg shadow-slate-200/5 hover:shadow-slate-200/10"
					>
						<h3 className="font-semibold font-mono text-lg bg-gradient-to-r from-slate-200 via-slate-200/80 to-slate-200/50 bg-clip-text text-transparent">
							Contact
						</h3>
						<div className="space-y-2">
							<motion.a
								whileHover={{ x: 8 }}
								href="mailto:developer@tashif.codes"
								className="flex items-center gap-2 text-muted-foreground hover:text-slate-200 transition-all group"
							>
								<Mail className="h-4 w-4 group-hover:rotate-12 transition-transform" />
								developer@tashif.codes
							</motion.a>
							<motion.p
								whileHover={{ x: 8 }}
								className="flex items-center gap-2 text-muted-foreground group"
							>
								<Phone className="h-4 w-4 group-hover:rotate-12 transition-transform" />
								+91-1256xxx <span className="text-slate-400">~ mail only</span>
							</motion.p>
							<motion.p
								whileHover={{ x: 8 }}
								className="flex items-center gap-2 text-muted-foreground group"
							>
								<MapPin className="h-4 w-4 group-hover:rotate-12 transition-transform" />
								Delhi, India
							</motion.p>
						</div>
					</motion.div>

					{/* Social Links */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all shadow-lg shadow-slate-200/5 hover:shadow-slate-200/10"
					>
						<h3 className="font-semibold text-lg font-mono bg-gradient-to-r from-slate-200 via-slate-200/80 to-slate-200/50 bg-clip-text text-transparent">
							Connect
						</h3>
						<FooterSocials />
					</motion.div>

					{/* Quick Links */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all shadow-lg shadow-slate-200/5 hover:shadow-slate-200/10"
					>
						<h3 className="font-semibold text-lg font-mono  bg-gradient-to-r from-slate-200 via-slate-200/80 to-slate-200/50 bg-clip-text text-transparent">
							Quick Links
						</h3>
						<ul className="space-y-2">
							{quickLinks.map((link) => (
								<motion.li key={link.name} whileHover={{ x: 8 }}>
									<Link
										href={link.href}
										className="text-muted-foreground hover:text-slate-200 transition-all inline-block"
									>
										{link.name}
									</Link>
								</motion.li>
							))}
						</ul>
					</motion.div>
				</div>

				{/* Copyright and Back to Top */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4 sm:justify-between"
				>
					<motion.p
						whileHover={{ x: 4 }}
						className="text-sm text-muted-foreground hover:text-slate-200 transition-all"
					>
						© {new Date().getFullYear()} Tashif Ahmad Khan. All rights reserved.
					</motion.p>

					<motion.div
						whileHover={{ scale: 1.05 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<Button
							variant="ghost"
							size="icon"
							onClick={scrollToTop}
							className="rounded-full hover:bg-slate-200/20 backdrop-blur-sm bg-white/5 
										border border-white/10 hover:border-slate-200/50 transition-all
										hover:shadow-lg hover:shadow-slate-200/10"
						>
							<ArrowUp className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
						</Button>
					</motion.div>
				</motion.div>
			</div>
		</footer>
	);
}
