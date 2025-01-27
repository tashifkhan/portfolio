"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchLanguageStats } from "@/utils/languageStats";
import { getContributionGraphs } from "@/utils/github";
import {
	calculateTotalCommits,
	calculateLongestStreak,
} from "@/utils/githubStats";
import type { GitHubStats, LeetCodeStats } from "@/types/stats";

interface TooltipStatsContextType {
	githubStats: GitHubStats | null;
	leetcodeStats: LeetCodeStats | null;
	isLoading: boolean;
	error: string | null;
}

const TooltipStatsContext = createContext<TooltipStatsContextType>({
	githubStats: null,
	leetcodeStats: null,
	isLoading: true,
	error: null,
});

export function TooltipStatsProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
	const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAllStats = async () => {
			try {
				const username = "tashifkhan";

				// Fetch GitHub stats
				const [contributionData, languageStats] = await Promise.all([
					getContributionGraphs(username),
					fetchLanguageStats(username),
				]).catch((err) => {
					throw new Error(`GitHub stats fetch failed: ${err.message}`);
				});

				if (!contributionData || !languageStats) {
					throw new Error("Invalid GitHub stats response");
				}

				setGithubStats({
					topLanguages: languageStats,
					totalCommits: calculateTotalCommits(contributionData),
					longestStreak: calculateLongestStreak(contributionData),
				});

				// Fetch LeetCode stats
				const leetcodeResponse = await fetch(
					"https://leetcode-stats-api.herokuapp.com/khan-tashif"
				);

				if (!leetcodeResponse.ok) {
					throw new Error(`LeetCode API error: ${leetcodeResponse.statusText}`);
				}

				const leetcodeData: LeetCodeStats = await leetcodeResponse.json();

				if (!leetcodeData || leetcodeData.status !== "success") {
					throw new Error("Invalid LeetCode stats response");
				}

				setLeetcodeStats(leetcodeData);
			} catch (err) {
				console.error("Stats fetching error:", err);
				setError(err instanceof Error ? err.message : "Failed to fetch stats");
			} finally {
				setIsLoading(false);
			}
		};

		fetchAllStats();
	}, []);

	return (
		<TooltipStatsContext.Provider
			value={{ githubStats, leetcodeStats, isLoading, error }}
		>
			{children}
		</TooltipStatsContext.Provider>
	);
}

export function useTooltipStats() {
	const context = useContext(TooltipStatsContext);
	if (!context) {
		throw new Error(
			"useTooltipStats must be used within a TooltipStatsProvider"
		);
	}
	return context;
}
