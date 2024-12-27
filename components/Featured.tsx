"use client";

import React, { useRef } from "react";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { FaGithubSquare, FaExternalLinkAlt } from "react-icons/fa";
import { FeaturedProject } from "./Projection";

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
	return (
		<section id="projects" className="w-ful pt-[10rem]">
			<div className="mx-auto max-w-7xl">
				<div className="mb-16">
					<h2 className="text-4xl font-mono">Noteable Projects</h2>
				</div>
				<div className="space-y-24">
					<FeaturedProject
						title="Halcyon Theme"
						description="A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual Studio Marketplace, Package Control, Atom Package Manager, and npm."
						image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070"
						technologies={[
							"VS Code",
							"Sublime Text",
							"Atom",
							"iTerm2",
							"Hyper",
						]}
						githubUrl="https://github.com"
						liveUrl="https://marketplace.visualstudio.com"
					/>

					<FeaturedProject
						title="Spotify Profile"
						description="A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more."
						image="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=2074"
						technologies={[
							"React",
							"Styled Components",
							"Express",
							"Spotify API",
							"Heroku",
						]}
						githubUrl="https://github.com"
						liveUrl="https://spotify.com"
						imagePosition="right"
					/>
				</div>
			</div>
		</section>
	);
};

export default Featured;
