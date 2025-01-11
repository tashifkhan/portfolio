"use client";

import { motion } from "framer-motion";
import { Code2, FileCode, Braces } from "lucide-react";

import { FaPython, FaJsSquare } from "react-icons/fa";
import { SiC, SiCplusplus, SiGo, SiTypescript } from "react-icons/si";

const languages = [
	{ name: "Python", icon: FaPython },
	{ name: "C++", icon: SiCplusplus },
	{ name: "JavaScript", icon: FaJsSquare },
	{ name: "TypeScript", icon: SiTypescript },
	// { name: "C", icon: SiC },
	// { name: "Go", icon: SiGo },
];

export function LanguagesGrid() {
	return (
		<div className="space-y-4">
			<h3 className="text-xl font-semibold ">Languages</h3>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
				{languages.map((language, index) => (
					<motion.div
						key={language.name}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: index * 0.1 }}
						whileHover={{ scale: 1.05 }}
						className="relative group"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-orange-300/10 rounded-lg blur-md group-hover:blur-lg transition-all" />
						<div className="relative p-4 rounded-lg bg-card/80 backdrop-blur-sm border-none flex items-center gap-2">
							<language.icon
								className={`h-8 w-8 text-orange-300/90 rounded p-1`}
							/>
							<span className="font-medium">{language.name}</span>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}
