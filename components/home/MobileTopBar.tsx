"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/app/icon.png";
import { HiMenuAlt3, HiX } from "react-icons/hi";

type Props = {
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: (b: boolean) => void;
};

export default function MobileTopBar({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
}: Props) {
	return (
		<motion.div
			className="fixed top-0 left-0 right-0 lg:hidden z-50 bg-black/90 backdrop-blur-xl border-b border-white/10"
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: "spring", stiffness: 200, damping: 20 }}
		>
			<div className="flex items-center justify-between px-4 py-3">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8  rounded-lg flex items-center justify-center">
						<Image
							src={logo}
							alt="Logo"
							width={20}
							height={20}
							className="rounded-lg"
						/>
					</div>
					<span className="text-white font-semibold">Portfolio</span>
				</div>

				<button
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className="p-2 text-white hover:text-orange-400 transition-colors"
				>
					{isMobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
				</button>
			</div>
		</motion.div>
	);
}
