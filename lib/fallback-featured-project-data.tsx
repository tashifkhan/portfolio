import React from "react";

interface featuredProject {
	id: number;
	title: string;
	imageLink: string;
	description: React.ReactNode;
	technologies: string[];
	githubLink?: string;
	liveLink?: string;
	playstoreLink?: string;
}

const featuredProjects: featuredProject[] = [
	{
		id: 1,
		title: "CropMate",
		imageLink: "/FeaturedProject/1.png",
		description: (
			<p>
				Next.js app offering{" "}
				<span className="text-orange-300">
					crop recommendations, yield predictions, and insurance advisories
				</span>{" "}
				with an AI-powered chatbot using Gemini's Gen AI API for real-time
				support. Utilizes Random Forest and KNN models for accurate predictions,
				with a sleek farmer-friendly interface enhanced by Framer Motion
				animations. The Flask backend integrates ML models and performs
				weather-based risk analysis.
			</p>
		),
		technologies: ["Next.js", "TypeScript", "Flask", "scikit-learn", "Gen AI"],
		githubLink: "https://github.com/tashifkhan/crop-mate",
		liveLink: "https://cropmate.tashif.codes/",
	},
	{
		id: 2,
		title: "BiasDetector",
		imageLink: "/FeaturedProject/2.png",
		description: (
			<p>
				Next.js app in TypeScript for detecting bias in news articles through{" "}
				<span className="text-orange-300">automated analysis and insights</span>
				. Implements a web scraping pipeline to collect news articles, stores
				data in MongoDB, and uses the XgBoost ML model to identify patterns of
				bias. Features a sleek, intuitive frontend for easy access to results.
			</p>
		),
		technologies: ["Next.js", "TypeScript", "MongoDB", "Flask", "Python"],
		githubLink:
			"https://github.com/tashifkhan/Left-Right-News-Classifier-Extension",
		liveLink: "https://bias-detector.tashif.codes/",
	},
	{
		id: 3,
		title: "Designique",
		imageLink: "/FeaturedProject/3.png",
		description: (
			<p>
				A React app that connects{" "}
				<span className="text-orange-300">
					designers, manufacturers, and consumers
				</span>
				. Features a full-fledged e-commerce portal, anonymous chatting between
				manufacturers and designers using Socket.IO (with safeguards against
				sharing personal data), and a support chatbot powered by Gemini's Gen AI
				API for resolving customer queries.
			</p>
		),
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
	},
];

export { featuredProjects };
