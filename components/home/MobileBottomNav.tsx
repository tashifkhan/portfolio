"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { links } from "../../lib/navbar-data";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";

type Props = {
	activeSection: string;
	setIsMobileMenuOpen: (b: boolean) => void;
};

export default function MobileBottomNav({
	activeSection,
	setIsMobileMenuOpen,
}: Props) {
	const [openSubmenuHash, setOpenSubmenuHash] = useState<string | null>(null);

	const toggleSubmenu = (hash?: string) => {
		if (!hash) return;
		setOpenSubmenuHash((prev) => (prev === hash ? null : hash));
	};

	return (
		<motion.div
			className="fixed bottom-0 left-0 right-0 lg:hidden z-30"
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: "spring", stiffness: 200, damping: 20 }}
		>
			<div className="mx-4 mb-4 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50 relative">
				{/* Overlay to close submenu when clicking outside the nav */}
				{openSubmenuHash && (
					<button
						type="button"
						aria-label="Close submenu"
						onClick={() => setOpenSubmenuHash(null)}
						className="fixed inset-0 z-20 bg-transparent"
					/>
				)}
				<nav className="px-2 py-3 relative z-30">
					<ul className="flex items-center justify-between">
						{links.slice(0, 5).map((link, idx) => {
							const hasSubmenu =
								(link as any).subLinks && (link as any).subLinks.length > 0;
							const isActive =
								activeSection === link.hash ||
								((link as any).subLinks?.some(
									(s: any) => s.hash === activeSection
								) ??
									false);

							// Align submenu differently for edges to avoid overflow
							const submenuAlignClass =
								idx >= 3
									? "right-0"
									: idx <= 1
									? "left-0"
									: "left-1/2 -translate-x-1/2";

							return (
								<motion.li key={link.hash} className="flex-1 relative">
									{hasSubmenu ? (
										<button
											type="button"
											onClick={() => toggleSubmenu(link.hash)}
											aria-haspopup="menu"
											aria-expanded={openSubmenuHash === link.hash}
											className={`
												flex flex-col items-center gap-1 py-2 px-2 rounded-xl w-full
												transition-all duration-300 relative
												${
													isActive
														? "text-orange-400 bg-orange-500/10"
														: "text-gray-400 hover:text-white hover:bg-white/5"
												}
											`}
										>
											<motion.div
												className="relative"
												whileTap={{ scale: 0.95 }}
											>
												<span className="text-xl">{link.icon}</span>
												{isActive && (
													<motion.div
														className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"
														layoutId="mobileBottomNavDot"
														transition={{ type: "spring", bounce: 0.2 }}
													/>
												)}
											</motion.div>
											<span className="text-xs font-medium truncate max-w-[4rem]">
												{link.name}
											</span>

											{isActive && (
												<motion.div
													className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"
													layoutId="mobileBottomNavLine"
													transition={{ type: "spring", bounce: 0.2 }}
												/>
											)}
										</button>
									) : (
										<Link
											href={link.hash || "#"}
											onClick={() => setOpenSubmenuHash(null)}
											className={`
												flex flex-col items-center gap-1 py-2 px-2 rounded-xl
												transition-all duration-300 relative
												${
													isActive
														? "text-orange-400 bg-orange-500/10"
														: "text-gray-400 hover:text-white hover:bg-white/5"
												}
											`}
										>
											<motion.div
												className="relative"
												whileTap={{ scale: 0.95 }}
											>
												<span className="text-xl">{link.icon}</span>
												{isActive && (
													<motion.div
														className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"
														layoutId="mobileBottomNavDot"
														transition={{ type: "spring", bounce: 0.2 }}
													/>
												)}
											</motion.div>
											<span className="text-xs font-medium truncate max-w-[3rem]">
												{link.name}
											</span>
											{isActive && (
												<motion.div
													className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"
													layoutId="mobileBottomNavLine"
													transition={{ type: "spring", bounce: 0.2 }}
												/>
											)}
										</Link>
									)}

									{hasSubmenu && openSubmenuHash === link.hash && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 10 }}
											transition={{
												type: "spring",
												stiffness: 250,
												damping: 22,
											}}
											role="menu"
											aria-label={`${link.name} submenu`}
											className={`absolute bottom-full mb-2 ${submenuAlignClass} min-w-[11rem] max-w-[90vw]
												bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl shadow-black/40 p-2`}
										>
											<ul className="grid grid-cols-1 gap-2">
												{(link as any).subLinks?.map((s: any) => (
													<li key={s.hash} role="none">
														<Link
															role="menuitem"
															href={s.hash || "#"}
															onClick={() => setOpenSubmenuHash(null)}
															className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition"
														>
															{s.icon && (
																<span className="text-base">{s.icon}</span>
															)}
															<span className="truncate">{s.name}</span>
														</Link>
													</li>
												))}
											</ul>
										</motion.div>
									)}
								</motion.li>
							);
						})}

						{links.length > 5 && (
							<motion.li className="flex-1">
								<button
									onClick={() => setIsMobileMenuOpen(true)}
									className="flex flex-col items-center gap-1 py-2 px-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
								>
									<HiMenuAlt3 className="text-xl" />
									<span className="text-xs font-medium">More</span>
								</button>
							</motion.li>
						)}
					</ul>
				</nav>
			</div>
		</motion.div>
	);
}
