"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "../../lib/navbar-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoginForm } from "../admin/LoginForm";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { HiChevronDown } from "react-icons/hi2";
import Image from "next/image";
import logo from "@/app/icon.png";

function Header() {
	const pathname = usePathname();
	const [activeSection, setActiveSection] = useState("");
	const [isScrolled, setIsScrolled] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
	const [clickedDropdown, setClickedDropdown] = useState<string | null>(null);

	useEffect(() => {
		// Check authentication status
		checkAuthStatus();

		const handleScrollForStyling = () => {
			setIsScrolled(window.scrollY > 50);
		};

		const handleScrollForActiveSection = () => {
			if (pathname !== "/") return;

			const sections = links
				.map((link) => link.hash?.replace("#", ""))
				.filter(Boolean) as string[];

			for (const section of sections) {
				const element = document.getElementById(section);
				if (!element) continue;

				const rect = element.getBoundingClientRect();
				if (rect.top <= 150 && rect.bottom >= 100) {
					setActiveSection("#" + section);
					return;
				}
			}
		};

		handleScrollForStyling();
		handleScrollForActiveSection();

		window.addEventListener("scroll", handleScrollForStyling);
		window.addEventListener("scroll", handleScrollForActiveSection);

		return () => {
			window.removeEventListener("scroll", handleScrollForStyling);
			window.removeEventListener("scroll", handleScrollForActiveSection);
		};
	}, [pathname]);

	const checkAuthStatus = async () => {
		try {
			const response = await fetch("/api/auth/check");
			const data = await response.json();
			setIsAuthenticated(data.authenticated);
		} catch (error) {
			setIsAuthenticated(false);
		}
	};

	const handleLoginSuccess = () => {
		setShowLoginModal(false);
		setIsAuthenticated(true);
	};

	const handleLogout = async () => {
		try {
			await fetch("/api/auth/logout", { method: "POST" });
			setIsAuthenticated(false);
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<header className="z-[999] relative">
			{/* Modern Desktop navbar */}
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

											{/* Dropdown Menu */}
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
														{link.subLinks?.map((subLink, index) => (
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

							{/* Enhanced Auth Button */}
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

			{/* Mobile Header Bar */}
			<motion.div
				className="fixed top-0 left-0 right-0 lg:hidden z-50 bg-black/90 backdrop-blur-xl border-b border-white/10"
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: "spring", stiffness: 200, damping: 20 }}
			>
				<div className="flex items-center justify-between px-4 py-3">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8  rounded-lg flex items-center justify-center">
							{/* <span className="text-white font-bold text-sm"></span> */}
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

			{/* Mobile Slide-out Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsMobileMenuOpen(false)}
						/>

						{/* Menu */}
						<motion.div
							className="fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 lg:hidden"
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
						>
							<div className="flex flex-col h-full">
								{/* Menu Header */}
								<div className="flex items-center justify-between p-6 border-b border-white/10">
									<h2 className="text-xl font-semibold text-white">Menu</h2>
									<button
										onClick={() => setIsMobileMenuOpen(false)}
										className="p-2 text-gray-400 hover:text-white transition-colors"
									>
										<HiX size={20} />
									</button>
								</div>

								{/* Menu Items */}
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

														{/* Mobile Submenu */}
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

								{/* Auth Section */}
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

			{/* Modern Mobile Bottom Navigation */}
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
									</motion.li>
								);
							})}

							{/* More button for remaining items */}
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

			{/* Enhanced Login Modal */}
			<AnimatePresence>
				{showLoginModal && (
					<motion.div
						className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className="max-w-md w-full"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
						>
							<div className="mb-4 flex justify-end">
								<button
									onClick={() => setShowLoginModal(false)}
									className="text-white hover:text-orange-300 p-2 hover:bg-white/10 rounded-full transition-all duration-300"
								>
									<HiX size={24} />
								</button>
							</div>
							<LoginForm onSuccess={handleLoginSuccess} />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}

export default Header;
