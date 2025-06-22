"use client";

import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Code, FileText } from "lucide-react";
import { useProjectData } from "@/hooks/useProjectData";
import { useSwipeTabs } from "@/hooks/useSwipeTabs";
import ProjectOverview from "./project/ProjectOverview";
import ProjectTechStack from "./project/ProjectTechStack";
import ProjectReadme from "./project/ProjectReadme";
import { ProjectModalProps } from "@/types/project";

const ProjectModal: React.FC<ProjectModalProps> = ({
	project,
	isOpen,
	onClose,
}) => {
	const { readme, isLoadingReadme, readmeError, repoStats } = useProjectData(
		project,
		isOpen
	);
	const { currentTab, setCurrentTab, swipeHandlers } = useSwipeTabs(
		"overview",
		!!project?.githubLink
	);

	if (!project) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 rounded-2xl p-4 sm:p-8 shadow-xl border border-white/20 text-white">
				<DialogHeader>
					<DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
						{project.title.split("(")[0]}
						{project.title.includes("(") && (
							<span className="ml-2 px-2 sm:px-3 py-1 text-xs sm:text-sm text-orange-200 bg-orange-500/20 rounded-full border border-orange-500/30">
								{project.title.split("(")[1].replace(")", "")}
							</span>
						)}
					</DialogTitle>
				</DialogHeader>

				<Tabs
					value={currentTab}
					onValueChange={setCurrentTab}
					className="flex-1 overflow-hidden"
				>
					<TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700">
						<TabsTrigger
							value="overview"
							className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-200 text-xs sm:text-sm"
						>
							<Info className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
							Overview
						</TabsTrigger>
						<TabsTrigger
							value="tech"
							className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-200 text-xs sm:text-sm"
						>
							<Code className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
							Tech Stack
						</TabsTrigger>
						<TabsTrigger
							value="readme"
							className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-200 text-xs sm:text-sm"
							disabled={!project.githubLink}
						>
							<FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
							README
						</TabsTrigger>
					</TabsList>

					<div
						{...swipeHandlers}
						className="mt-4 sm:mt-6 overflow-y-auto max-h-[60vh] px-1"
					>
						<TabsContent value="overview" className="space-y-4 sm:space-y-6">
							<ProjectOverview project={project} repoStats={repoStats} />
						</TabsContent>

						<TabsContent value="tech" className="space-y-4 sm:space-y-6">
							<ProjectTechStack technologies={project.technologies} />
						</TabsContent>

						<TabsContent value="readme" className="space-y-4">
							<ProjectReadme
								readme={readme}
								isLoadingReadme={isLoadingReadme}
								readmeError={readmeError}
								githubLink={project.githubLink}
							/>
						</TabsContent>
					</div>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

export default ProjectModal;
