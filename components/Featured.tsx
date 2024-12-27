"use client";

import React, { useRef } from "react";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { FaGithubSquare, FaExternalLinkAlt } from "react-icons/fa";

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

const sampleProjects: ProjectNode[] = [
	{
		frontmatter: {
			external: "https://example.com/project1",
			title: "Project One",
			tech: ["React", "TypeScript", "Node.js"],
			github: "https://github.com/user/project1",
			cover: "/image.png",
			cta: "Learn More",
		},
		html: "<p>Project one description</p>",
	},
	{
		frontmatter: {
			external: "https://example.com/project2",
			title: "Project Two",
			tech: ["Vue", "JavaScript", "AWS"],
			github: "https://github.com/user/project2",
			cover: "/image.png",
			cta: "View Project",
		},
		html: "<p>Project two description</p>",
	},
];

const Featured: React.FC = () => {
	const revealTitle = useRef<HTMLHeadingElement>(null);
	const revealProjects = useRef<(HTMLLIElement | null)[]>([]);
	return <section id="projects" className="w-full"></section>;
};

export default Featured;
