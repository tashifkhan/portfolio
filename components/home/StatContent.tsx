"use client";

import { motion } from "framer-motion";
import { useTooltipStats } from "@/context/TooltipStatsContext";
import { ExternalLinkButton } from "./ExternalLinkButton";

type ContentType = "github" | "leetcode" | "linkedin";

const LinkedInContent = () => {
	const skills = [
		{ title: "Pre-Final Year", detail: "Student", icon: "🎓" },
		{ title: "App Development", detail: "React Native", icon: "📱" },
		{ title: "Web Development", detail: "Full Stack", icon: "🌐" },
		{ title: "Python", detail: "Programming", icon: "🐍" },
	];

	return (
		<div className="space-y-4">
			<h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3">
				Professional Summary
			</h3>
			<div className="space-y-3">
				{skills.map((skill, index) => (
					<motion.div
						key={skill.title}
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: index * 0.1 }}
						className="bg-gray-800/30 p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-800/40 transition-colors"
					>
						<span className="text-lg">{skill.icon}</span>
						<div className="text-left">
							<h4 className="font-medium text-orange-300">{skill.title}</h4>
							<p className="text-gray-400 text-sm">{skill.detail}</p>
						</div>
					</motion.div>
				))}
			</div>
			<ExternalLinkButton
				href="https://www.linkedin.com/in/tashif-ahmad-khan-982304244/"
				label="View LinkedIn Profile"
			/>
		</div>
	);
};

const LeetCodeContent = () => {
	const { leetcodeStats: stats, isLoading, error } = useTooltipStats();

	if (isLoading) {
		return (
			<div className="flex justify-center">
				<div className="animate-spin rounded-full h-6 w-6 border-t-2 border-orange-300" />
			</div>
		);
	}

	if (error || !stats) {
		return <p className="text-red-400">{error || "Failed to load stats"}</p>;
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
			<ExternalLinkButton
				href="https://leetcode.com/khan-tashif"
				label="View LeetCode Profile"
			/>
		</div>
	);
};

const GitHubContent = () => {
	const { githubStats: stats, isLoading, error } = useTooltipStats();

	if (isLoading) {
		return (
			<div className="flex justify-center">
				<div className="animate-spin rounded-full h-6 w-6 border-t-2 border-orange-300" />
			</div>
		);
	}

	if (error || !stats) {
		return <p className="text-red-400">{error || "Failed to load stats"}</p>;
	}

	return (
		<div className="space-y-4">
			<div className="space-y-2">
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

			<div className="grid grid-cols-2 gap-4 pt-2">
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
						{stats.longestStreak} days
					</motion.span>
				</div>
			</div>
			<ExternalLinkButton
				href="https://github.com/tashifkhan"
				label="View GitHub Profile"
			/>
		</div>
	);
};

export function StatContent({ type }: { type: ContentType }) {
	const content = {
		github: <GitHubContent />,
		leetcode: <LeetCodeContent />,
		linkedin: <LinkedInContent />,
	};

	return content[type];
}
