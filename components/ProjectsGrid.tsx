"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const PROJECTS_PER_PAGE = 6;

interface Project {
	id: number;
	title: string;
	description: string;
	technologies: string[];
	githubUrl?: string;
	liveUrl?: string;
}

const projects: Project[] = [
	{
		id: 1,
		title: "Crop Mate",
		description:
			"Next.js app offering crop recommendations, yield predictions, and insurance advisories with AI-powered chatbot using Gemini's Gen AI API for real-time support.",
		technologies: ["TS", "Flask", "ML(sk-learn)", "NextJS"],
		githubUrl: "https://github.com/example/crop-mate",
		liveUrl: "https://crop-mate.example.com",
	},
	{
		id: 2,
		title: "Crop Mate",
		description:
			"Next.js app offering crop recommendations, yield predictions, and insurance advisories with AI-powered chatbot using Gemini's Gen AI API for real-time support.",
		technologies: ["TS", "Flask", "ML(sk-learn)", "NextJS"],
		githubUrl: "https://github.com/example/crop-mate",
		liveUrl: "https://crop-mate.example.com",
	},
	{
		id: 3,
		title: "Crop Mate",
		description:
			"Next.js app offering crop recommendations, yield predictions, and insurance advisories with AI-powered chatbot using Gemini's Gen AI API for real-time support.",
		technologies: ["TS", "Flask", "ML(sk-learn)", "NextJS"],
		githubUrl: "https://github.com/example/crop-mate",
		liveUrl: "https://crop-mate.example.com",
	},
	{
		id: 4,
		title: "Crop Mate",
		description:
			"Next.js app offering crop recommendations, yield predictions, and insurance advisories with AI-powered chatbot using Gemini's Gen AI API for real-time support.",
		technologies: ["TS", "Flask", "ML(sk-learn)", "NextJS"],
		githubUrl: "https://github.com/example/crop-mate",
		liveUrl: "https://crop-mate.example.com",
	},
	{
		id: 5,
		title: "Crop Mate",
		description:
			"Next.js app offering crop recommendations, yield predictions, and insurance advisories with AI-powered chatbot using Gemini's Gen AI API for real-time support.",
		technologies: ["TS", "Flask", "ML(sk-learn)", "NextJS"],
		githubUrl: "https://github.com/example/crop-mate",
		liveUrl: "https://crop-mate.example.com",
	},
	{
		id: 6,
		title: "Crop Mate",
		description:
			"Next.js app offering crop recommendations, yield predictions, and insurance advisories with AI-powered chatbot using Gemini's Gen AI API for real-time support.",
		technologies: ["TS", "Flask", "ML(sk-learn)", "NextJS"],
		githubUrl: "https://github.com/example/crop-mate",
		liveUrl: "https://crop-mate.example.com",
	},
	{
		id: 7,
		title: "Crop Mate",
		description:
			"Next.js app offering crop recommendations, yield predictions, and insurance advisories with AI-powered chatbot using Gemini's Gen AI API for real-time support.",
		technologies: ["TS", "Flask", "ML(sk-learn)", "NextJS"],
		githubUrl: "https://github.com/example/crop-mate",
		liveUrl: "https://crop-mate.example.com",
	},
	{
		id: 8,
		title: "Crop Mate",
		description:
			"Next.js app offering crop recommendations, yield predictions, and insurance advisories with AI-powered chatbot using Gemini's Gen AI API for real-time support.",
		technologies: ["TS", "Flask", "ML(sk-learn)", "NextJS"],
		githubUrl: "https://github.com/example/crop-mate",
		liveUrl: "https://crop-mate.example.com",
	},
	{
		id: 9,
		title: "Crop Mate",
		description:
			"Next.js app offering crop recommendations, yield predictions, and insurance advisories with AI-powered chatbot using Gemini's Gen AI API for real-time support.",
		technologies: ["TS", "Flask", "ML(sk-learn)", "NextJS"],
		githubUrl: "https://github.com/example/crop-mate",
		liveUrl: "https://crop-mate.example.com",
	},
	// Add more projects as needed
];

export function ProjectsGrid() {
	const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

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

	return (
		<section className="py-12 px-4 md:px-6 lg:px-8">
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<h2 className="text-3xl font-bold text-center font-mono">
					Other Noteworthy Projects
				</h2>
				<div className="flex justify-center">
					<Link href="/collection" className="text-orange-300 text-center mb-8">
						view the collection
					</Link>
				</div>
			</motion.div>

			<motion.div
				variants={gridVariants}
				initial="hidden"
				animate="visible"
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
			>
				{visibleProjects.map((project) => (
					<motion.div key={project.id} variants={projectVariants}>
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
                     shadow-lg rounded-full"
					>
						Show More Projects
					</Button>
				</motion.div>
			)}
		</section>
	);
}
