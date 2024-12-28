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
	githubLink?: string;
	playStoreLink?: string;
	liveLink?: string;
}

export function ProjectCard({
	title,
	description,
	technologies,
	githubLink,
	playStoreLink,
	liveLink,
}: ProjectCardProps) {
	return (
		<Card className="flex flex-col h-full bg-[#3d2e1f]/60 backdrop-blur-sm border-none transition-all hover:border-white/80">
			<CardHeader className="">
				<div className="flex justify-between items-center">
					<Folder className="h-8 w-8 text-[#fdba74] pb-0 mb-0" />
					<div className="flex gap-0 ">
						{githubLink && (
							<Link
								href={githubLink}
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 hover:text-primary transition-colors"
							>
								<Github className="w-[24.25px] h-[28.64px] relative flex-col justify-start items-start flex text-[#fdba74]" />
							</Link>
						)}
						{playStoreLink && (
							<Link
								href={playStoreLink}
								className="p-2 hover:text-primary transition-colors"
								target="_blank"
							>
								<IoLogoGooglePlaystore className="w-[24.25px] h-[28.64px] relative flex-col justify-start items-start flex text-[#fdba74]" />
							</Link>
						)}
						{liveLink && (
							<Link
								href={liveLink}
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 hover:text-primary transition-colors"
							>
								<ExternalLink className="w-[24.25px] h-[28.64px] relative flex-col justify-start items-start flex text-[#fdba74]" />
							</Link>
						)}
					</div>
				</div>
				<CardTitle className="text-2xl truncate">{title}</CardTitle>
			</CardHeader>
			<CardContent className="flex-grow">
				<p className=" line-clamp-3">{description}</p>
			</CardContent>
			<CardFooter className="">
				<div className="pr-1 flex flex-wrap gap-1">
					{technologies.map((tech) => (
						<Badge
							key={tech}
							variant="secondary"
							className="bg-white/10 font-mono backdrop-blur-sm truncate"
						>
							{tech}
						</Badge>
					))}
				</div>
			</CardFooter>
		</Card>
	);
}
