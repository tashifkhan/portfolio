"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 6;

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
	const [visibleProjects, setVisibleProjects] = useState(ITEMS_PER_PAGE);

	const showMoreProjects = () => {
		setVisibleProjects((prev) =>
			Math.min(prev + ITEMS_PER_PAGE, projects.length)
		);
	};

	return (
		<section className="py-12 px-4 md:px-6 lg:px-8">
			<h2 className="text-3xl font-bold mb-8 text-center font-mono">
				Other Noteworthy Projects
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
				{projects.slice(0, visibleProjects).map((project) => (
					<ProjectCard key={project.id} {...project} />
				))}
			</div>
			{visibleProjects < projects.length && (
				<div className="mt-8 text-center">
					<Button
						onClick={showMoreProjects}
						variant="ghost"
						className="backdrop-blur-sm bg-white/10 border-none hover:bg-white/20 hover:text-primary-foreground transition-all shadow-lg rounded-full hover:scale-105"
					>
						Show More Projects
					</Button>
				</div>
			)}
		</section>
	);
}
