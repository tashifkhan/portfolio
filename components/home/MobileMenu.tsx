"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "../../lib/navbar-data";
import Link from "next/link";
import { HiX, HiChevronDown } from "react-icons/hi";

type Props = {
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: (b: boolean) => void;
	activeSection: string;
	clickedDropdown: string | null;
	setClickedDropdown: React.Dispatch<React.SetStateAction<string | null>>;
	isAuthenticated: boolean;
	handleLogout: () => void;
	setShowLoginModal: (b: boolean) => void;
};

export default function MobileMenu({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
	activeSection,
	clickedDropdown,
	setClickedDropdown,
	isAuthenticated,
	handleLogout,
	setShowLoginModal,
}: Props) {
	return (
		<AnimatePresence>
			{isMobileMenuOpen && (
				<>
					<motion.div
						className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setIsMobileMenuOpen(false)}
					/>

					<motion.div
						className="fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 lg:hidden"
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
					>
						<div className="flex flex-col h-full">
							<div className="flex items-center justify-between p-6 border-b border-white/10">
								<h2 className="text-xl font-semibold text-white">Menu</h2>
								<button
									onClick={() => setIsMobileMenuOpen(false)}
									className="p-2 text-gray-400 hover:text-white transition-colors"
								>
									<HiX size={20} />
								</button>
							</div>

							<nav className="flex-1 px-6 py-8 overflow-y-auto">
								<ul className="space-y-2">
									{links.map((link, index) => {
										const isActive = activeSection === link.hash;
										const hasSubLinks =
											link.subLinks && link.subLinks.length > 0;
										const isExpanded = clickedDropdown === link.name;

										return (
											<motion.li
												key={link.hash}
												initial={{ opacity: 0, x: 20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.1 }}
											>
												<div>
													<Link
														href={link.hash || "#"}
														onClick={(e) => {
															if (hasSubLinks) {
																e.preventDefault();
																setClickedDropdown(
																	isExpanded ? null : link.name
																);
															} else {
																setIsMobileMenuOpen(false);
															}
														}}
														className={`
                                             flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                                             ${
																								isActive
																									? "text-orange-400 bg-orange-500/10 border border-orange-500/30"
																									: "text-gray-300 hover:text-white hover:bg-white/5"
																							}
                                          `}
													>
														<span className="text-xl">{link.icon}</span>
														<span className="font-medium flex-1">
															{link.name}
														</span>
														{hasSubLinks && (
															<motion.span
																animate={{ rotate: isExpanded ? 180 : 0 }}
																transition={{ duration: 0.2 }}
																className="text-gray-400"
															>
																<HiChevronDown />
															</motion.span>
														)}
														{isActive && !hasSubLinks && (
															<motion.div
																className="w-2 h-2 bg-orange-500 rounded-full"
																layoutId="mobileMenuIndicator"
																transition={{ type: "spring", bounce: 0.2 }}
															/>
														)}
													</Link>

													<AnimatePresence>
														{hasSubLinks && isExpanded && (
															<motion.div
																initial={{ height: 0, opacity: 0 }}
																animate={{ height: "auto", opacity: 1 }}
																exit={{ height: 0, opacity: 0 }}
																transition={{ duration: 0.2 }}
																className="overflow-hidden"
															>
																<div className="pl-8 pt-2 space-y-2">
																	{link.subLinks?.map((subLink) => (
																		<Link
																			key={subLink.hash}
																			href={subLink.hash}
																			onClick={() => {
																				setIsMobileMenuOpen(false);
																				setClickedDropdown(null);
																			}}
																			className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
																		>
																			<span className="text-lg">
																				{subLink.icon}
																			</span>
																			<span className="text-sm">
																				{subLink.name}
																			</span>
																		</Link>
																	))}
																</div>
															</motion.div>
														)}
													</AnimatePresence>
												</div>
											</motion.li>
										);
									})}
								</ul>
							</nav>

							<div className="p-6 border-t border-white/10">
								{isAuthenticated ? (
									<div className="space-y-3">
										<Link
											href="/update"
											onClick={() => setIsMobileMenuOpen(false)}
											className="block w-full px-4 py-3 text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium transition-all duration-300"
										>
											Update Portfolio
										</Link>
										<button
											onClick={() => {
												handleLogout();
												setIsMobileMenuOpen(false);
											}}
											className="block w-full px-4 py-3 text-center text-gray-300 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300"
										>
											Logout
										</button>
									</div>
								) : (
									<button
										onClick={() => {
											setIsMobileMenuOpen(false);
											setShowLoginModal(true);
										}}
										className="block w-full px-4 py-3 text-center text-gray-300 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300"
									>
										Admin Login
									</button>
								)}
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
