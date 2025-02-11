"use client";

import React from "react";
import { motion } from "framer-motion";
import { links } from "../../lib/navbar-data";
import Link from "next/link";

const Header: React.FC = () => {
	return (
		<header className="z-[999] relative">
			<motion.div
				className="fixed bottom-0 left-1/2 h-[5.5rem] w-[110%] rounded-none border shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full bg-gray-950 border-black/40 bg-opacity-40"
				initial={{ y: -100, x: "-50%", opacity: 0 }}
				animate={{ y: 0, x: "-50%", opacity: 1 }}
			></motion.div>

			<nav className="flex fixed bottom-5 left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0 sm:bottom-[initial]">
				<ul className="flex w-[22rem] flex-wrap items-center justify-center text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5">
					{links.map((link) => (
						<motion.li
							className="h-3/4 flex items-center justify-center relative"
							key={link.hash}
							initial={{ y: -100, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
						>
							<Link
								className="flex w-full items-center justify-center px-1 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300"
								href={link.hash || "#"}
							>
								<div className="flex flex-col items-center justify-center">
									<span className="sm:hidden">{link.icon}</span>
									<span className="text-[0.7rem] sm:text-[0.9rem] mt-1 sm:mt-0">
										{link.name}
									</span>
								</div>
							</Link>
						</motion.li>
					))}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
