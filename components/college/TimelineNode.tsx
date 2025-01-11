"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface TimelineNodeProps {
	title: string;
	institution: string;
	score: string;
	duration: string;
	index: number;
}
export function TimelineNode({
	title,
	institution,
	score,
	duration,
	index,
}: TimelineNodeProps) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setIsMobile(window.innerWidth < 768);
	}, []);

	return (
		<motion.div
			initial={{
				opacity: 0,
				x: !isMobile ? (index % 2 === 0 ? -50 : 50) : 0,
			}}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.2 }}
			className="flex gap-4 items-center relative min-h-[150px] md:min-h-[200px]"
		>
			{/* Desktop Left Side */}
			<div className="hidden md:block w-1/2 text-right pr-8">
				{index % 2 === 0 && (
					<motion.div
						whileHover={{ scale: 1.02, rotate: 1 }}
						transition={{ type: "spring", stiffness: 300 }}
						className="w-full"
					>
						<Card className="p-4 md:p-6 w-full border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:from-white/20 hover:to-white/10 transition-all duration-300 rounded-xl group">
							<div>
								<h3 className="font-bold text-lg md:text-xl bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent group-hover:from-white group-hover:to-white">
									{title}
								</h3>
								<p className="text-slate-300/90 mt-1 text-sm md:text-base">
									{institution}
								</p>
								<p className="font-semibold text-white/90 mt-2 text-sm md:text-base">
									{score}
								</p>
								<p className="text-xs md:text-sm text-slate-300/80 mt-1">
									{duration}
								</p>
							</div>
						</Card>
					</motion.div>
				)}
			</div>

			{/* Timeline Node */}
			<div className="relative flex items-center justify-center h-full min-h-[inherit]">
				<motion.div
					className="h-3 w-3 md:h-4 md:w-4  rounded-full bg-gradient-to-r from-white to-white/70 shadow-lg shadow-white/25"
					whileHover={{ scale: 1.4 }}
					whileTap={{ scale: 0.9 }}
					transition={{ type: "spring", stiffness: 400, damping: 10 }}
				/>
				<motion.div
					className="absolute h-full w-0.5 bg-gradient-to-b from-white/30 to-white/10 -z-10 backdrop-blur-sm"
					transition={{ duration: 0.5 }}
				/>
			</div>

			{/* Mobile and Desktop Right Side */}
			<div className="flex-1 md:w-1/2 pl-4 md:pl-8">
				{(index % 2 !== 0 || isMobile) && (
					<motion.div
						whileHover={{ scale: 1.02, rotate: -1 }}
						transition={{ type: "spring", stiffness: 300 }}
						className="w-full"
					>
						<Card className="p-4 md:p-6 w-full border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:from-white/20 hover:to-white/10 transition-all duration-300 rounded-xl group">
							<div>
								<h3 className="font-bold text-lg md:text-xl bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent group-hover:from-white group-hover:to-white">
									{title}
								</h3>
								<p className="text-slate-300/90 mt-1 text-sm md:text-base">
									{institution}
								</p>
								<p className="font-semibold text-white/90 mt-2 text-sm md:text-base">
									{score}
								</p>
								<p className="text-xs md:text-sm text-slate-300/80 mt-1">
									{duration}
								</p>
							</div>
						</Card>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
}
