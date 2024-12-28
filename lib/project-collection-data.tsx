import React from "react";

interface ProjectCollection {
	id: number;
	title: string;
	description: string;
	technologies: string[];
	githubLink?: string;
	liveLink?: string;
	playStoreLink?: string;
	status: "Completed" | "In Progress" | "Planned";
}

const projectCollection: ProjectCollection[] = [
	{
		id: 1,
		title: "Crop Mate",
		description: "AI-powered crop management system",
		technologies: ["Next.js", "TypeScript", "Flask", "scikit-learn", "Gen AI"],
		githubLink: "https://github.com/tashifkhan/crop-mate",
		liveLink: "https://crop-mate.tashif.codes/",
		status: "Completed",
	},
	{
		id: 2,
		title: "BiasDetector",
		description:
			"Next.js app in TypeScript for detecting bias in news articles through automated analysis and insights. Implements a web scraping pipeline to collect news articles, stores data in MongoDB, and uses the XgBoost ML model to identify patterns of bias. Features a sleek, intuitive frontend for easy access to results.",
		technologies: ["Next.js", "TypeScript", "MongoDB", "Flask", "Python"],
		githubLink:
			"https://github.com/tashifkhan/Left-Right-News-Classifier-Extension",
		liveLink: "https://bias-detector.tashif.codes/",
		status: "Completed",
	},
	{
		id: 3,
		title: "Designique",
		description:
			"A Next.js / React app that connects designers, manufacturers, and consumers. Features a full-fledged e-commerce portal, anonymous chatting between manufacturers and designers using Socket.IO (with safeguards against sharing personal data), and a support chatbot powered by Gemini's Gen AI API for resolving customer queries.",
		technologies: [
			"React",
			"Next.js",
			"Node.js",
			"MongoDB",
			"WebRTC",
			"Gen AI",
		],
		githubLink: "https://github.com/tashifkhan/Designique-rideHack24",
		liveLink: "https://designique.tashif.codes/",
		status: "Completed",
	},
];

export { projectCollection };
