"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

interface FeaturedProjectProps {
	title: string;
	description: string;
	image: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
	technologies: string[];
	githubUrl: string;
	liveUrl?: string;
	playstoreUrl?: string;
	imagePosition?: "left" | "right";
}

function createMarkup(html: string) {
	return { __html: html };
}

export function FeaturedProject({
	title,
	description,
	image,
	technologies,
	githubUrl,
	playstoreUrl = "",
	liveUrl = "",
	imagePosition = "left",
}: FeaturedProjectProps) {
	return (
		<div className="group relative m-6">
			<div
				className={`grid grid-cols-12 items-center gap-4 ${
					imagePosition === "right" ? "direction-rtl" : ""
				}`}
			>
				{/* Image container - hidden on mobile */}
				<div
					className={`relative col-span-12 md:col-span-7 hidden md:block ${
						imagePosition === "right" ? "md:col-start-6" : ""
					}`}
				>
					<div className="relative aspect-[16/9] overflow-hidden rounded-3xl mx-6 mb-3">
						<Image
							src={image.src}
							alt={image.alt}
							width={image.width}
							height={image.height}
							priority
							className="object-cover transition-transform duration-300 opacity-25 md:opacity-100 group-hover:scale-105"
							onError={(e) => {
								console.error(`Failed to load image: ${image.src}`);
								e.currentTarget.src = "/images/placeholder.jpg";
							}}
						/>
						<div className="absolute inset-0 sm:bg-orange-200/20 transition-opacity duration-300 group-hover:opacity-0" />
					</div>
				</div>

				<Card
					className={`col-span-12 md:col-span-6 relative ${
						imagePosition === "right"
							? "md:col-start-1 md:absolute lg:right-2/4 md:right-1/4"
							: "md:col-start-6 md:absolute lg:left-2/4 md:left-1/4"
					} border-none overflow-hidden`}
				>
					{/* Mobile background image */}
					<div className="absolute inset-0 md:hidden">
						<Image
							src={image.src}
							alt={image.alt}
							width={image.width}
							height={image.height}
							priority
							className="object-cover opacity-25"
							onError={(e) => {
								console.error(`Failed to load image: ${image.src}`);
								e.currentTarget.src = "/images/placeholder.jpg";
							}}
						/>
						<div className="absolute inset-0 bg-[#3d2e1f]/70 backdrop-blur-sm" />
					</div>

					<CardContent className="p-6 relative">
						<div
							className={`flex ${
								imagePosition === "right"
									? "md:justify-start"
									: "md:justify-end"
							}`}
						>
							<p className="mb-2 text-sm font-medium text-orange-300">
								Featured Project
							</p>
						</div>
						<div
							className={`flex ${
								imagePosition === "right"
									? "md:justify-start"
									: "md:justify-end"
							}`}
						>
							<h3 className="mb-4 text-2xl font-bold">{title}</h3>
						</div>
						<div className="mb-4 rounded-2xl bg-[#3d2e1f]/60 backdrop-blur-[7.80px] border-none p-9 shadow-lg z-10 hidden sm:block">
							<div dangerouslySetInnerHTML={createMarkup(description)} />
						</div>
						<div className="mb-4 rounded-2xl sm:hidden block">
							<div dangerouslySetInnerHTML={createMarkup(description)} />
						</div>
						<div
							className={`flex ${
								imagePosition === "right"
									? "md:justify-start"
									: "md:justify-end"
							}`}
						>
							<div className="mb-6 flex flex-wrap gap-2">
								{technologies.map((tech) => (
									<Badge
										key={tech}
										variant="secondary"
										className="bg-white/10 font-mono backdrop-blur-sm"
									>
										{tech}
									</Badge>
								))}
							</div>
						</div>
						<div
							className={`flex ${
								imagePosition === "right"
									? "md:justify-start"
									: "md:justify-end"
							}`}
						>
							<div className="flex gap-4">
								<Link
									href={githubUrl}
									className="text-muted-foreground hover:text-foreground transition-colors"
									target="_blank"
								>
									<Github className="h-5 w-5 text-orange-300" />
								</Link>
								{playstoreUrl && (
									<Link
										href={playstoreUrl}
										className="text-muted-foreground hover:text-foreground transition-colors"
										target="_blank"
									>
										<IoLogoGooglePlaystore className="h-5 w-5 text-orange-300" />
									</Link>
								)}
								{liveUrl && (
									<Link
										href={liveUrl}
										className="text-muted-foreground hover:text-foreground transition-colors"
										target="_blank"
									>
										<ExternalLink className="h-5 w-5 text-orange-300" />
									</Link>
								)}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
