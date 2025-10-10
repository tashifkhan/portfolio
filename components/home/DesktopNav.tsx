"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "../../lib/navbar-data";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi2";

type Props = {
	activeSection: string;
	hoveredDropdown: string | null;
	clickedDropdown: string | null;
	setHoveredDropdown: React.Dispatch<React.SetStateAction<string | null>>;
	setClickedDropdown: React.Dispatch<React.SetStateAction<string | null>>;
	isScrolled: boolean;
	isAuthenticated: boolean;
	setShowLoginModal: (b: boolean) => void;
	handleLogout: () => void;
};

export default function DesktopNav({
	activeSection,
	hoveredDropdown,
	clickedDropdown,
	setHoveredDropdown,
	setClickedDropdown,
	isScrolled,
	isAuthenticated,
	setShowLoginModal,
	handleLogout,
}: Props) {
	return (
		<motion.div
			className={`fixed top-0 left-0 right-0 hidden lg:block ${
				isScrolled ? "py-3" : "py-6"
			} transition-all duration-300`}
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: "spring", stiffness: 200, damping: 20 }}
		>
			<div className="max-w-7xl mx-auto px-6">
				<div
					className={`
                  mx-auto bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10
                  shadow-2xl shadow-black/30 transition-all duration-300
                  ${isScrolled ? "py-3 px-8" : "py-4 px-10"}
               `}
				>
					<nav className="flex justify-between items-center">
						<div className="flex items-center space-x-8">
							{links.map((link) => {
								const isActive = activeSection === link.hash;
								const hasSubLinks = link.subLinks && link.subLinks.length > 0;
								const isDropdownOpen =
									hoveredDropdown === link.name ||
									clickedDropdown === link.name;

								return (
									<motion.div
										key={link.hash}
										className="relative"
										onMouseEnter={() =>
											hasSubLinks && setHoveredDropdown(link.name)
										}
										onMouseLeave={() => setHoveredDropdown(null)}
									>
										<Link
											href={link.hash || "#"}
											onClick={(e) => {
												if (hasSubLinks) {
													e.preventDefault();
													setClickedDropdown(
														clickedDropdown === link.name ? null : link.name
													);
												}
											}}
											className={`
                                       relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm
                                       transition-all duration-300 hover:bg-white/5 hover:scale-105
                                       ${
																					isActive
																						? "text-orange-400 bg-orange-500/10"
																						: "text-gray-300 hover:text-white"
																				}
                                    `}
										>
											<span className="text-lg">{link.icon}</span>
											{link.name}
											{hasSubLinks && (
												<motion.span
													animate={{ rotate: isDropdownOpen ? 180 : 0 }}
													transition={{ duration: 0.2 }}
												>
													<HiChevronDown className="text-sm" />
												</motion.span>
											)}

											{isActive && (
												<motion.div
													className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-xl border border-orange-500/30"
													layoutId="desktopNavIndicator"
													transition={{
														type: "spring",
														bounce: 0.2,
														duration: 0.6,
													}}
												/>
											)}
										</Link>

										<AnimatePresence>
											{hasSubLinks && isDropdownOpen && (
												<motion.div
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: -10 }}
													transition={{ duration: 0.2 }}
													className="absolute top-full left-0 mt-2 w-56 bg-black/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50"
													onMouseLeave={() => {
														setHoveredDropdown(null);
														setClickedDropdown(null);
													}}
												>
													{link.subLinks?.map((subLink) => (
														<Link
															key={subLink.hash}
															href={subLink.hash}
															onClick={() => {
																setHoveredDropdown(null);
																setClickedDropdown(null);
															}}
															className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 border-b border-white/5 last:border-b-0"
														>
															<span className="text-lg">{subLink.icon}</span>
															<span className="text-sm">{subLink.name}</span>
														</Link>
													))}
												</motion.div>
											)}
										</AnimatePresence>
									</motion.div>
								);
							})}
						</div>

						<div className="flex items-center gap-3">
							{isAuthenticated ? (
								<div className="flex items-center gap-3">
									<Link
										href="/update"
										className="px-5 py-2.5 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-orange-500/25 hover:scale-105"
									>
										Update
									</Link>
									<button
										onClick={handleLogout}
										className="px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
									>
										Logout
									</button>
								</div>
							) : (
								<button
									onClick={() => setShowLoginModal(true)}
									className="px-5 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20"
								>
									Admin
								</button>
							)}
						</div>
					</nav>
				</div>
			</div>
		</motion.div>
	);
}
