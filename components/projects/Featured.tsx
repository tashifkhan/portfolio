"use client";

import React, { useEffect, useRef } from "react";
import { FeaturedProject } from "./Projection";
import { motion } from "framer-motion";
// import { featuredProjects } from "@/lib/fallback-featured-project-data";
import Link from "next/link";
// import Image from "next/image";
import { getFeaturedProjects } from "@/hooks/get-project-data";
import ProjectModal from "@/components/ProjectModal";

interface ProjectFrontmatter {
	external: string;
	title: string;
	tech: string[];
	github: string;
	cover: any;
	cta: string;
}

const Featured: React.FC = () => {
	const [featuredProjects, setFeaturedProjects] = React.useState<any[]>([]);
	const [selectedProject, setSelectedProject] = React.useState<any>(null);
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const handleProjectClick = (project: any) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedProject(null);
	};

	useEffect(() => {
		const fetchProjects = async () => {
			const projects = await getFeaturedProjects();
			setFeaturedProjects(projects);
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
					<h2 className="text-4xl font-mono text-center">
						Some Things I have Built
					</h2>
					<div className="flex justify-center">
						<Link
							href="/collection"
							className="text-orange-300 text-center mb-2 p-1 md:mb-10"
						>
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
									src: project.imageLink,
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
