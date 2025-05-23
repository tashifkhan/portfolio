"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { links } from "../../lib/navbar-data";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
	const pathname = usePathname();
	const [activeSection, setActiveSection] = useState("");
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
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

	return (
		<header className="z-[999] relative">
			{/* Desktop navbar */}
			<motion.div
				className={`fixed top-0 left-0 right-0 hidden sm:block ${
					isScrolled ? "py-2" : "py-4"
				} transition-all duration-300`}
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: "spring", stiffness: 200, damping: 20 }}
			>
				<div className="max-w-6xl mx-auto px-4">
					<div
						className={`
                  mx-auto bg-gradient-to-r from-gray-950/70 to-gray-950/40
                  backdrop-blur-md rounded-full border border-white/5
                  shadow-lg shadow-black/20 transition-all duration-300
                  ${isScrolled ? "py-2 px-6" : "py-3 px-8"}
               `}
					>
						<nav className="flex justify-center">
							<ul className="flex items-center justify-center gap-1">
								{links.map((link) => {
									const isActive = activeSection === link.hash;

									return (
										<motion.li key={link.hash} className="relative">
											<Link
												href={link.hash || "#"}
												className={`
                                       relative px-4 py-2 rounded-full font-medium text-sm
                                       transition-all duration-300 hover:text-orange-300
                                       ${
																					isActive
																						? "text-orange-400"
																						: "text-gray-300"
																				}
                                    `}
											>
												{link.name}

												{isActive && (
													<motion.span
														className="absolute inset-0 bg-white/5 rounded-full -z-10"
														layoutId="desktopNavIndicator"
														transition={{ type: "spring", bounce: 0.2 }}
													/>
												)}
											</Link>
										</motion.li>
									);
								})}
							</ul>
						</nav>
					</div>
				</div>
			</motion.div>

			{/* Mobile navbar */}
			<motion.div
				className="fixed bottom-0 left-0 right-0 sm:hidden"
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: "spring", stiffness: 200, damping: 20 }}
			>
				<div className="bg-gradient-to-t from-black to-gray-900/95 backdrop-blur-md border-t border-white/10 px-2 pb-2 pt-3">
					<nav>
						<ul className="flex items-center justify-between">
							{links.map((link) => {
								const isActive = activeSection === link.hash;

								return (
									<motion.li key={link.hash} className="flex-1">
										<Link
											href={link.hash || "#"}
											className={`
                                    flex flex-col items-center gap-1 py-1 px-2
                                    transition-all duration-200
                                    ${
																			isActive
																				? "text-orange-400"
																				: "text-gray-400"
																		}
                                 `}
										>
											<div
												className={`
                                    text-lg relative
                                    ${
																			isActive
																				? "text-orange-400"
																				: "text-gray-400"
																		}
                                 `}
											>
												{link.icon}

												{isActive && (
													<motion.div
														className="absolute -top-2 -right-2 w-2 h-2 bg-orange-500 rounded-full"
														layoutId="mobileNavDot"
														transition={{ type: "spring", bounce: 0.2 }}
													/>
												)}
											</div>

											<span className="text-xs font-medium">{link.name}</span>

											{isActive && (
												<motion.div
													className="absolute bottom-0 h-0.5 w-12 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"
													layoutId="mobileNavLine"
													transition={{ type: "spring", bounce: 0.2 }}
												/>
											)}
										</Link>
									</motion.li>
								);
							})}
						</ul>
					</nav>
				</div>
			</motion.div>
		</header>
	);
}

export default Header;
