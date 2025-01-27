"use client";

import React from "react";
import { motion } from "framer-motion";

interface LeetcodeStats {
	totalSolved: number;
	totalQuestions: number;
	easySolved: number;
	totalEasy: number;
	mediumSolved: number;
	totalMedium: number;
	hardSolved: number;
	totalHard: number;
	acceptanceRate: number;
	ranking: number;
}

interface LeetcodeStatsTooltipProps {
	x: number;
	y: number;
}

const LeetcodeStatsTooltip: React.FC<LeetcodeStatsTooltipProps> = ({
	x,
	y,
}) => {
	const [stats, setStats] = React.useState<LeetcodeStats | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await fetch(
					"https://leetcode-stats-api.herokuapp.com/khan-tashif"
				);
				const data = await response.json();
				if (data.status === "success") {
					setStats(data);
				} else {
					setError("Failed to fetch LeetCode stats");
				}
			} catch (err) {
				setError("Error fetching LeetCode stats");
			} finally {
				setLoading(false);
			}
		};

		fetchStats();
	}, []);

	if (loading) {
		return (
			<motion.div
				className="absolute bg-black/70 text-white p-6 rounded-xl shadow-2xl text-sm backdrop-blur-sm border-none"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.2, ease: "easeOut" }}
				style={{
					left: x + 10,
					top: y + 10,
					transform: "translate(-50%, -50%)",
					zIndex: 1000,
					minWidth: "280px",
				}}
			>
				<div className="flex items-center justify-center py-4">
					<div className="animate-spin rounded-full h-6 w-6 border-t-2 border-orange-300" />
				</div>
			</motion.div>
		);
	}

	if (error || !stats) {
		return (
			<motion.div
				className="absolute bg-black/70 text-white p-6 rounded-xl shadow-2xl text-sm backdrop-blur-sm border-none"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.2, ease: "easeOut" }}
				style={{
					left: x + 10,
					top: y + 10,
					transform: "translate(-50%, -50%)",
					zIndex: 1000,
					minWidth: "280px",
				}}
			>
				<p className="text-red-400">{error || "Failed to load stats"}</p>
			</motion.div>
		);
	}

	const difficultyProgress = [
		{
			name: "Easy",
			solved: stats.easySolved,
			total: stats.totalEasy,
			percentage: (stats.easySolved / stats.totalEasy) * 100,
		},
		{
			name: "Medium",
			solved: stats.mediumSolved,
			total: stats.totalMedium,
			percentage: (stats.mediumSolved / stats.totalMedium) * 100,
		},
		{
			name: "Hard",
			solved: stats.hardSolved,
			total: stats.totalHard,
			percentage: (stats.hardSolved / stats.totalHard) * 100,
		},
	];

	return (
		<motion.div
			className="absolute bg-black/70 text-white p-6 rounded-xl shadow-2xl text-sm backdrop-blur-sm border-none"
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			style={{
				left: x + 10,
				top: y + 10,
				transform: "translate(-50%, -50%)",
				zIndex: 1000,
				minWidth: "280px",
			}}
		>
			<div className="space-y-4">
				<div className="bg-gray-800/30 p-3 rounded-lg">
					<h3 className="text-gray-400 text-xs uppercase tracking-wider mb-1">
						Global Ranking
					</h3>
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-2xl font-bold bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent"
					>
						#{stats.ranking.toLocaleString()}
					</motion.span>
				</div>

				<div className="space-y-2">
					<h3 className="text-gray-400 text-xs uppercase tracking-wider">
						Problem Difficulty
					</h3>
					{difficultyProgress.map((diff) => (
						<div
							key={diff.name}
							className="relative w-full h-8 bg-gray-800/50 rounded-lg overflow-hidden"
						>
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: `${diff.percentage}%` }}
								transition={{ duration: 1, ease: "easeOut" }}
								className="absolute h-full bg-gradient-to-r from-orange-300 to-orange-400"
							/>
							<div className="absolute inset-0 flex items-center justify-between px-3">
								<span className="font-medium">{diff.name}</span>
								<span className="font-bold">
									{diff.solved}/{diff.total}
								</span>
							</div>
						</div>
					))}
				</div>

				<div className="grid grid-cols-2 gap-4 pt-2">
					<div className="bg-gray-800/30 p-3 rounded-lg">
						<h3 className="text-gray-400 text-xs uppercase tracking-wider mb-1">
							Total Solved
						</h3>
						<motion.span
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-xl font-bold text-orange-300"
						>
							{stats.totalSolved}/{stats.totalQuestions}
						</motion.span>
					</div>
					<div className="bg-gray-800/30 p-3 rounded-lg">
						<h3 className="text-gray-400 text-xs uppercase tracking-wider mb-1">
							Success Rate
						</h3>
						<motion.span
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-xl font-bold text-orange-300"
						>
							{stats.acceptanceRate}%
						</motion.span>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default LeetcodeStatsTooltip;
