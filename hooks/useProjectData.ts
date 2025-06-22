import { useState, useEffect } from "react";
import { getRepositoryStats, type RepositoryStats } from "@/utils/github";

export const useProjectData = (project: { githubLink?: string } | null, isOpen: boolean) => {
	const [readme, setReadme] = useState<string>("");
	const [isLoadingReadme, setIsLoadingReadme] = useState(false);
	const [readmeError, setReadmeError] = useState<string>("");
	const [repoStats, setRepoStats] = useState<RepositoryStats | null>(null);

	useEffect(() => {
		if (project?.githubLink && isOpen) {
			fetchReadme(project.githubLink);
			fetchRepoStats(project.githubLink);
		}
	}, [project, isOpen]);

	const fetchRepoStats = async (githubUrl: string) => {
		try {
			const stats = await getRepositoryStats(githubUrl);
			setRepoStats(stats);
		} catch (error) {
			console.error("Failed to fetch repository stats:", error);
			setRepoStats(null);
		}
	};

	const fetchReadme = async (githubUrl: string) => {
		try {
			setIsLoadingReadme(true);
			setReadmeError("");

			// Extract owner and repo from GitHub URL
			const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
			if (!match) {
				throw new Error("Invalid GitHub URL");
			}

			const [, owner, repo] = match;
			const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;

			const response = await fetch(readmeUrl);
			if (!response.ok) {
				throw new Error("README not found");
			}

			const data = await response.json();
			// Properly decode base64 content with UTF-8 encoding
			const binaryString = atob(data.content);
			const bytes = new Uint8Array(binaryString.length);
			for (let i = 0; i < binaryString.length; i++) {
				bytes[i] = binaryString.charCodeAt(i);
			}
			const readmeContent = new TextDecoder("utf-8").decode(bytes);
			setReadme(readmeContent);
		} catch (error) {
			console.error("Failed to fetch README:", error);
			setReadmeError("Unable to load README file");
		} finally {
			setIsLoadingReadme(false);
		}
	};

	return {
		readme,
		isLoadingReadme,
		readmeError,
		repoStats,
	};
}; 