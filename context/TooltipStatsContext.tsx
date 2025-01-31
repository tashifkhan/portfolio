"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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

interface TooltipStatsProviderProps {
	children: React.ReactNode;
	githubUsername: string;
	leetcodeUsername: string;
}

export function TooltipStatsProvider({
	children,
	githubUsername,
	leetcodeUsername,
}: TooltipStatsProviderProps) {
	const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
	const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAllStats = async () => {
			try {
				const [githubResponse, leetcodeResponse] = await Promise.all([
					fetch(
						`/api/stats/github/${githubUsername}?exclude=HTML,CSS,Jupyter Notebook,SCSS`
					),
					fetch(`/api/stats/leetcode/${leetcodeUsername}`),
				]);

				if (!githubResponse.ok || !leetcodeResponse.ok) {
					throw new Error("Failed to fetch stats");
				}

				let [githubData, leetcodeData] = await Promise.all([
					githubResponse.json(),
					leetcodeResponse.json(),
				]);

				githubData.topLanguages = githubData.topLanguages.slice(0, 5);

				setGithubStats(githubData);
				setLeetcodeStats(leetcodeData);
			} catch (err) {
				console.error("Stats fetching error:", err);
				setError(err instanceof Error ? err.message : "Failed to fetch stats");
			} finally {
				setIsLoading(false);
			}
		};

		fetchAllStats();
	}, [githubUsername, leetcodeUsername]);

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
