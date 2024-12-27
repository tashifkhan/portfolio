"use client";

import React, { useRef } from "react";
import { FeaturedProject } from "./Projection";
import { motion } from "framer-motion";

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
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<FeaturedProject
							title="Halcyon Theme"
							description={
								<p>
									Next.js app offering{" "}
									<span className="text-orange-300">
										crop recommendations, yield predictions, and insurance
										advisories
									</span>{" "}
									with AI-powered chatbot using Gemini's Gen AI API for
									real-time support.
								</p>
							}
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
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						viewport={{ once: true }}
					>
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
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<FeaturedProject
							title="Halcyon Theme"
							description={
								<p>
									Next.js app offering{" "}
									<span className="text-orange-300">
										crop recommendations, yield predictions, and insurance
										advisories
									</span>{" "}
									with AI-powered chatbot using Gemini's Gen AI API for
									real-time support.
								</p>
							}
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
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Featured;
