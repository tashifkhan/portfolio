"use client";

import React, { useRef } from "react";
import { FeaturedProject } from "./Projection";
import { motion } from "framer-motion";
import { featuredProjects } from "@/lib/featured-project-data";

interface ProjectFrontmatter {
	external: string;
	title: string;
	tech: string[];
	github: string;
	cover: any; // Adjust type as needed
	cta: string;
}

interface ProjectNode {
	frontmatter: ProjectFrontmatter;
	html: string;
}

const Featured: React.FC = () => {
	const revealTitle = useRef<HTMLHeadingElement>(null);
	const revealProjects = useRef<(HTMLLIElement | null)[]>([]);
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
				</motion.div>
				<div className="space-y-12">
					{featuredProjects.map((project, index) => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: index * 0.2 }}
							viewport={{ once: true }}
						>
							<FeaturedProject
								title={project.title}
								description={project.description}
								image={project.imageLink}
								technologies={project.technologies}
								githubUrl={project.githubLink || "#"}
								liveUrl={project.liveLink}
								imagePosition={index % 2 === 0 ? "left" : "right"}
							/>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Featured;
