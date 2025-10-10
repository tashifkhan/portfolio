"use client";

import React from "react";
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
	return (
		<motion.div
			className="fixed bottom-0 left-0 right-0 lg:hidden z-30"
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: "spring", stiffness: 200, damping: 20 }}
		>
			<div className="mx-4 mb-4 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
				<nav className="px-2 py-3">
					<ul className="flex items-center justify-between">
						{links.slice(0, 5).map((link) => {
							const isActive = activeSection === link.hash;

							return (
								<motion.li key={link.hash} className="flex-1">
									<Link
										href={link.hash || "#"}
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
										<motion.div className="relative" whileTap={{ scale: 0.95 }}>
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
