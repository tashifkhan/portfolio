"use client";

import { motion } from "framer-motion";
import { useTooltipStats } from "@/context/TooltipStatsContext";

export default function GithubStatsTooltip({ x, y }: { x: number; y: number }) {
	const { githubStats: stats, isLoading } = useTooltipStats();

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			className="absolute bg-black/70 text-white p-6 rounded-xl shadow-2xl text-sm backdrop-blur-sm border-none"
			style={{
				left: x + 10,
				top: y + 10,
				transform: "translate(-50%, -50%)",
				zIndex: 1000,
				minWidth: "280px",
			}}
		>
			{stats ? (
				<div className="space-y-4">
					<div className="space-y-2">
						<div className="grid grid-cols-3 gap-4 pt-2">
							<div className="bg-gray-800/30 p-3 rounded-lg">
								<h3 className="text-gray-400 text-xs uppercase tracking-wider mb-1">
									Total Commits
								</h3>
								<motion.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="text-xl font-bold text-orange-300"
								>
									{stats.totalCommits.toLocaleString()}
								</motion.span>
							</div>
							<div className="bg-gray-800/30 p-3 rounded-lg">
								<h3 className="text-gray-400 text-xs uppercase tracking-wider mb-1">
									Longest Streak
								</h3>
								<motion.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="text-xl font-bold text-orange-300"
								>
									{stats.longestStreak} <span className="text-xs">days</span>
								</motion.span>
							</div>
							<div className="bg-gray-800/30 p-3 rounded-lg">
								<h3 className="text-gray-400 text-xs uppercase tracking-wider mb-1">
									Current Streak
								</h3>
								<motion.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="text-xl font-bold text-orange-300"
								>
									{stats.currentStreak} <span className="text-xs">days</span>
								</motion.span>
							</div>
						</div>

						<h3 className="text-gray-400 text-xs uppercase tracking-wider">
							Top Languages
						</h3>
						{stats.topLanguages.map((lang) => (
							<div
								key={lang.name}
								className="relative w-full h-8 bg-gray-800/50 rounded-lg overflow-hidden"
							>
								<motion.div
									initial={{ width: 0 }}
									animate={{ width: `${lang.percentage}%` }}
									transition={{ duration: 1, ease: "easeOut" }}
									className="absolute h-full bg-gradient-to-r from-orange-300 to-orange-400"
								/>
								<div className="absolute inset-0 flex items-center justify-between px-3">
									<span className="font-medium">{lang.name}</span>
									<span className="font-bold">{lang.percentage}%</span>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="flex items-center justify-center py-4">
					<div className="animate-spin rounded-full h-6 w-6 border-t-2 border-orange-300" />
				</div>
			)}
		</motion.div>
	);
}
