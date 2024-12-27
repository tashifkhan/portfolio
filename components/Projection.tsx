"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedProjectProps {
	title: string;
	description: string;
	image: string;
	technologies: string[];
	githubUrl: string;
	liveUrl: string;
	imagePosition?: "left" | "right";
}

export function FeaturedProject({
	title,
	description,
	image,
	technologies,
	githubUrl,
	liveUrl,
	imagePosition = "left",
}: FeaturedProjectProps) {
	return (
		<div className="group relative mb-24">
			<div
				className={`grid grid-cols-12 items-center gap-4 ${
					imagePosition === "right" ? "direction-rtl" : ""
				}`}
			>
				<div
					className={`relative col-span-12 lg:col-span-7 ${
						imagePosition === "right" ? "lg:col-start-6" : ""
					}`}
				>
					<div className="relative aspect-[16/9] overflow-hidden rounded-lg">
						<Image
							src={image}
							alt={title}
							fill
							className="object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					</div>
				</div>

				<Card
					className={`col-span-12 lg:col-span-6 ${
						imagePosition === "right"
							? "lg:col-start-1 lg:absolute lg:right-2/4"
							: "lg:col-start-6 lg:absolute lg:left-2/4"
					} z-10 backdrop-blur-md bg-background/80 border border-white/20 shadow-xl`}
				>
					<CardContent className="p-6">
						<p className="mb-2 text-sm font-medium text-emerald-500">
							Featured Project
						</p>
						<h3 className="mb-4 text-2xl font-bold">{title}</h3>
						<p className="mb-4 text-muted-foreground">{description}</p>

						<div className="mb-6 flex flex-wrap gap-2">
							{technologies.map((tech) => (
								<Badge
									key={tech}
									variant="secondary"
									className="bg-white/10 backdrop-blur-sm"
								>
									{tech}
								</Badge>
							))}
						</div>

						<div className="flex gap-4">
							<Link
								href={githubUrl}
								className="text-muted-foreground hover:text-foreground transition-colors"
								target="_blank"
							>
								<Github className="h-5 w-5" />
							</Link>
							<Link
								href={liveUrl}
								className="text-muted-foreground hover:text-foreground transition-colors"
								target="_blank"
							>
								<ExternalLink className="h-5 w-5" />
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
