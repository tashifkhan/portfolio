"use client";

import { Project } from "@/hooks/get-project-data";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectCard } from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const PROJECTS_PER_PAGE = 6;

export function ProjectsGrid() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

	useEffect(() => {
		async function fetchProjects() {
			try {
				const response = await fetch("/api/projects");
				const data = await response.json();
				setProjects(data.slice(3));
			} catch (error) {
				console.error("Failed to fetch projects:", error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchProjects();
	}, []);

	const showMoreProjects = () => {
		setVisibleCount((prev) => prev + PROJECTS_PER_PAGE);
	};

	const gridVariants = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	};

	const projectVariants = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut",
			},
		},
	};

	const visibleProjects = projects.slice(0, visibleCount);
	const router = useRouter();

	if (isLoading) return <div className="flex justify-center">Loading...</div>;

	return (
		<section className="py-12 px-4 md:px-6 lg:px-8">
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<h2 className="text-3xl font-bold text-center font-mono pb-11">
					Other Noteworthy Projects
				</h2>
			</motion.div>

			<motion.div
				variants={gridVariants}
				initial="hidden"
				animate="visible"
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
			>
				{visibleProjects.map((project, index) => (
					<motion.div
						key={project.position ?? index}
						variants={projectVariants}
					>
						<ProjectCard {...project} />
					</motion.div>
				))}
			</motion.div>

			{visibleCount < projects.length && (
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 }}
					className="mt-8 text-center"
				>
					<Button
						onClick={showMoreProjects}
						variant="ghost"
						className="backdrop-blur-sm bg-white/10 border-none hover:bg-white/20 
                     hover:text-primary-foreground transition-all duration-300 
                     shadow-lg rounded-full mr-3"
					>
						Show More Projects
					</Button>
					<Button
						onClick={() => router.push("/collection")}
						variant="ghost"
						className="backdrop-blur-sm bg-white/10 border-none hover:bg-white/20 
                     hover:text-primary-foreground transition-all duration-300 
                     shadow-lg rounded-full"
					>
						Show All Projects
					</Button>
				</motion.div>
			)}
		</section>
	);
}
