import React from "react";
import { Button } from "@/components/ui/button";
import { GithubIcon, ExternalLink, Star } from "lucide-react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import Link from "next/link";
import { RepositoryStats } from "@/utils/github";

interface ProjectLinksProps {
	project: {
		githubLink?: string;
		liveLink?: string;
		playStoreLink?: string;
	};
	repoStats: RepositoryStats | null;
}

const ProjectLinks: React.FC<ProjectLinksProps> = ({ project, repoStats }) => {
	return (
		<div className="flex flex-wrap items-center gap-2 sm:gap-3">
			{project.githubLink && (
				<Button
					variant="outline"
					size="sm"
					asChild
					className="border-gray-600 hover:border-orange-500/50 hover:bg-orange-500/10 text-xs sm:text-sm"
				>
					<Link href={project.githubLink} target="_blank">
						<GithubIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
						GitHub
					</Link>
				</Button>
			)}
			{project.liveLink && (
				<Button
					variant="outline"
					size="sm"
					asChild
					className="border-gray-600 hover:border-orange-500/50 hover:bg-orange-500/10 text-xs sm:text-sm"
				>
					<Link href={project.liveLink} target="_blank">
						<ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
						Live Demo
					</Link>
				</Button>
			)}
			{project.playStoreLink && (
				<Button
					variant="outline"
					size="sm"
					asChild
					className="border-gray-600 hover:border-orange-500/50 hover:bg-orange-500/10 text-xs sm:text-sm"
				>
					<Link href={project.playStoreLink} target="_blank">
						<IoLogoGooglePlaystore className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
						Play Store
					</Link>
				</Button>
			)}
			{/* GitHub Stats - Rightmost */}
			{project.githubLink && repoStats && repoStats.stars > 0 && (
				<div className="flex items-center gap-2 ml-auto">
					<div className="flex items-center gap-1 px-2 py-1 bg-orange-500/10 rounded-md border border-orange-500/30">
						<Star className="w-3 h-3 text-orange-400" />
						<span className="text-orange-200 text-xs font-medium">
							{repoStats.stars.toLocaleString()}
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProjectLinks;
