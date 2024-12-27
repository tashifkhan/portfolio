"use client";

import { Folder, Github, ExternalLink } from "lucide-react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "./ui/badge";

interface ProjectCardProps {
	title: string;
	description: string;
	technologies: string[];
	githubUrl?: string;
	liveUrl?: string;
}

export function ProjectCard({
	title,
	description,
	technologies,
	githubUrl,
	liveUrl,
}: ProjectCardProps) {
	return (
		<Card className="flex flex-col h-full bg-[#3d2e1f]/80 backdrop-blur-sm border-none transition-all hover:border-white/80">
			<CardHeader className="flex flex-row items-center gap-2">
				<Folder className="h-8 w-8 text-primary" />
				<CardTitle className=" text-lg">{title}</CardTitle>
			</CardHeader>
			<CardContent className="flex-grow">
				<p className="text-muted-foreground">{description}</p>
			</CardContent>
			<CardFooter className="">
				<div className="pr-1">
					{technologies.map((tech) => (
						<span className="pr-1">
							<Badge
								key={tech}
								variant="secondary"
								className="bg-white/10 font-mono backdrop-blur-sm "
							>
								{tech}
							</Badge>
						</span>
					))}
				</div>
				<div className="flex gap-2 ml-auto">
					{githubUrl && (
						<Link
							href={githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 hover:text-primary transition-colors"
						>
							<Github className="h-5 w-5" />
						</Link>
					)}
					{liveUrl && (
						<Link
							href={liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 hover:text-primary transition-colors"
						>
							<ExternalLink className="h-5 w-5" />
						</Link>
					)}
				</div>
			</CardFooter>
		</Card>
	);
}
