"use client";

import React, { useEffect, useRef } from "react";
import { FeaturedProject } from "./Projection";
import { motion } from "framer-motion";
// import { featuredProjects } from "@/lib/fallback-featured-project-data";
import Link from "next/link";
// import Image from "next/image";
import { getFeaturedProjects } from "@/hooks/get-project-data";
import ProjectModal from "@/components/ProjectModal";
import { Building2, ExternalLinkIcon } from "lucide-react";

interface ProjectFrontmatter {
	external: string;
	title: string;
	tech: string[];
	github: string;
	cover: any;
	cta: string;
}

interface Project {
	position: number;
	title: string;
	description: string;
	technologies: string[];
	githubLink?: string;
	playStoreLink?: string;
	liveLink?: string;
	status: string;
	imageLink?: string;
}

const Featured: React.FC = () => {
	const [featuredProjects, setFeaturedProjects] = React.useState<Project[]>([]);
	const [selectedProject, setSelectedProject] = React.useState<Project | null>(
		null
	);
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const handleProjectClick = (project: Project) => {
		// Set status as Completed before opening modal
		setSelectedProject({ ...project, status: "Completed" });
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedProject(null);
	};

	useEffect(() => {
		const fetchProjects = async () => {
			const projects = await getFeaturedProjects();
			// Set status as Completed for all featured projects
			const projectsWithStatus = projects.map((project: Project) => ({
				...project,
				status: "Completed",
			}));
			setFeaturedProjects(projectsWithStatus);
		};
		fetchProjects();
	}, []);

	return (
		<section id="projects" className="w-full pt-[8rem]">
			<div className="mx-auto max-w-7xl">
				<motion.div
					className="mb-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="flex justify-center">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-200 text-sm font-medium mb-6">
							<Building2 className="w-4 h-4" />
							Projects
						</div>
					</div>
					<h2 className="text-4xl font-mono text-center">
						Some Things I have Built
					</h2>
					<div className="flex justify-center">
						<Link
							href="/collection"
							className="text-orange-300 text-center mb-2 p-1 md:mb-10"
						>
							<ExternalLinkIcon className="w-4 h-4 inline-block mr-1" />
							{"  "}
							view the complete collection
						</Link>
					</div>
				</motion.div>
				<div className="space-y-12">
					{featuredProjects.map((project, index) => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: index * 0.2 }}
							viewport={{ once: true }}
							className="md:pb-28 cursor-pointer"
							onClick={() => handleProjectClick(project)}
						>
							<FeaturedProject
								title={project.title}
								description={project.description}
								image={{
									src: project.imageLink || "",
									alt: `${project.title} preview`,
									width: 1920,
									height: 1080,
								}}
								technologies={project.technologies}
								githubUrl={project.githubLink || "#"}
								liveUrl={project.liveLink}
								imagePosition={index % 2 === 0 ? "left" : "right"}
							/>
						</motion.div>
					))}
				</div>
			</div>

			<ProjectModal
				project={selectedProject}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</section>
	);
};

export default Featured;
