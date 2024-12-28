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
import { IoLogoGooglePlaystore } from "react-icons/io5";

interface ProjectCardProps {
	title: string;
	description: string;
	technologies: string[];
	githubUrl?: string;
	playstoreUrl?: string;
	liveUrl?: string;
}

export function ProjectCard({
	title,
	description,
	technologies,
	githubUrl,
	playstoreUrl,
	liveUrl,
}: ProjectCardProps) {
	return (
		<Card className="flex flex-col h-full bg-[#3d2e1f]/60 backdrop-blur-sm border-none transition-all hover:border-white/80">
			<CardHeader className="">
				<div className="flex justify-between items-center">
					<Folder className="h-8 w-8 text-[#fdba74] pb-0 mb-0" />
					<div className="flex gap-0 ">
						{githubUrl && (
							<Link
								href={githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 hover:text-primary transition-colors"
							>
								<Github className="w-[24.25px] h-[28.64px] relative flex-col justify-start items-start flex text-[#fdba74]" />
							</Link>
						)}
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
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 hover:text-primary transition-colors"
							>
								<ExternalLink className="w-[24.25px] h-[28.64px] relative flex-col justify-start items-start flex text-[#fdba74]" />
							</Link>
						)}
					</div>
				</div>
				<CardTitle className="text-2xl">{title}</CardTitle>
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
			</CardFooter>
		</Card>
	);
}
