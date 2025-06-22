import React from "react";
import ProjectStatus from "./ProjectStatus";
import ProjectLinks from "./ProjectLinks";
import { RepositoryStats } from "@/utils/github";

interface ProjectOverviewProps {
	project: {
		status: string;
		description: string;
		githubLink?: string;
		liveLink?: string;
		playStoreLink?: string;
	};
	repoStats: RepositoryStats | null;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({
	project,
	repoStats,
}) => {
	return (
		<div className="space-y-4 sm:space-y-6">
			{/* Status and Links */}
			<div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 p-3 sm:p-4 bg-gray-800/30 rounded-lg border border-gray-700">
				<ProjectStatus status={project.status} />
				<ProjectLinks project={project} repoStats={repoStats} />
			</div>

			{/* Description */}
			<div className="space-y-3 sm:space-y-4">
				<h3 className="text-base sm:text-lg font-semibold text-white/90">
					About this project
				</h3>
				<p className="text-white/70 leading-relaxed text-sm sm:text-base bg-gray-800/20 p-3 sm:p-4 rounded-lg border border-gray-700/50">
					{project.description}
				</p>
			</div>
		</div>
	);
};

export default ProjectOverview;
