import React from "react";
import { Loader } from "@/components/ui/loader";
import { FileText } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";

interface ProjectReadmeProps {
	readme: string;
	isLoadingReadme: boolean;
	readmeError: string;
	githubLink?: string;
}

const ProjectReadme: React.FC<ProjectReadmeProps> = ({
	readme,
	isLoadingReadme,
	readmeError,
	githubLink,
}) => {
	// Get GitHub base URL for converting relative links
	const getGithubBaseUrl = () => {
		if (!githubLink) return "";
		const match = githubLink.match(/github\.com\/([^\/]+)\/([^\/]+)/);
		if (!match) return "";
		const [, owner, repo] = match;
		// Remove .git suffix if present
		const cleanRepo = repo.replace(/\.git$/, "");
		return `https://raw.githubusercontent.com/${owner}/${cleanRepo}/main`;
	};

	const githubBaseUrl = getGithubBaseUrl();

	if (isLoadingReadme) {
		return (
			<div className="flex items-center justify-center py-8 sm:py-12">
				<Loader size="lg" />
				<span className="ml-2 text-white/70 text-sm sm:text-base">
					Loading README...
				</span>
			</div>
		);
	}

	if (readmeError) {
		return (
			<div className="text-center py-8 sm:py-12">
				<FileText className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500 mx-auto mb-3 sm:mb-4" />
				<p className="text-gray-400 text-sm sm:text-base">{readmeError}</p>
			</div>
		);
	}

	if (readme) {
		return (
			<div className="bg-gray-800/20 p-3 sm:p-6 rounded-lg border border-gray-700/50">
				<MarkdownRenderer content={readme} githubBaseUrl={githubBaseUrl} />
			</div>
		);
	}

	return (
		<div className="text-center py-8 sm:py-12">
			<FileText className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500 mx-auto mb-3 sm:mb-4" />
			<p className="text-gray-400 text-sm sm:text-base">No README available</p>
		</div>
	);
};

export default ProjectReadme;
