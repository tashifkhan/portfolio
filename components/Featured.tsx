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
	return (
		<section id="projects" className="w-full">
			<ul className="list-none p-0 m-0">
				{sampleProjects.map((node: ProjectNode, i: number) => {
					const { frontmatter, html } = node;
					const { external, title, tech, github, cover, cta } = frontmatter;
					const image = getImage(cover);

					return (
						<li
							key={i}
							ref={(el) => {
								revealProjects.current[i] = el;
							}}
							className="relative grid gap-2.5 grid-cols-12 items-center mb-[100px] md:mb-[70px] sm:mb-[30px]"
						>
							<div className="relative col-span-7 row-span-full md:col-span-full md:p-10 sm:p-6">
								<div>
									<p className="font-mono text-xs text-green-400 my-2.5">
										Featured Project
									</p>
									<h3 className="text-[clamp(24px,5vw,28px)] text-slate-200">
										<a href={external} className="hover:text-green-400">
											{title}
										</a>
									</h3>

									<div
										className="relative z-[2] p-6 rounded bg-slate-800 text-slate-400 text-lg shadow-lg
                          md:p-5 md:bg-transparent md:shadow-none"
										dangerouslySetInnerHTML={{ __html: html }}
									/>
									<div className="relative z-[2] mt-6">
										<a href={external ? external : github ? github : "#"}>
											{cover && (
												<GatsbyImage
													image={image}
													alt={title}
													className="rounded object-cover w-full h-full"
												/>
											)}
										</a>
									</div>

									{tech.length > 0 && (
										<ul className="flex flex-wrap relative z-[2] my-6 list-none">
											{tech.map((tech, i) => (
												<li
													key={i}
													className="mr-5 mb-1.5 font-mono text-xs text-slate-400"
												>
													{tech}
												</li>
											))}
										</ul>
									)}

									<div className="flex items-center relative mt-2.5 -ml-2.5">
										{github && (
											<a
												href={github}
												aria-label="GitHub Link"
												className="p-2.5 hover:text-green-400"
												target="_blank"
												rel="noreferrer"
											>
												<FaGithubSquare />
											</a>
										)}
										{external && (
											<a
												href={external}
												aria-label="External Link"
												className="p-2.5 hover:text-green-400"
												target="_blank"
												rel="noreferrer"
											>
												<FaExternalLinkAlt />
											</a>
										)}
									</div>
								</div>
							</div>

							<div className="col-span-5 col-start-8 row-span-full relative rounded md:hidden">
								<a href={external ? external : github ? github : "#"}>
									{image && (
										<GatsbyImage
											image={image}
											alt={title}
											className="rounded object-cover w-full h-full"
										/>
									)}
								</a>
							</div>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default Featured;
