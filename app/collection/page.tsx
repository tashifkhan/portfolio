"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Project {
	id: number;
	title: string;
	description: string;
	technologies: string[];
	status: string;
	lastUpdated: string;
}

const projects: Project[] = [
	{
		id: 1,
		title: "Crop Mate",
		description: "AI-powered crop management system",
		technologies: ["TS", "Flask", "ML", "NextJS"],
		status: "Completed",
		lastUpdated: "2024-03-20",
	},
	{
		id: 2,
		title: "Crop Mate",
		description: "AI-powered crop management system",
		technologies: ["TS", "Flask", "ML", "NextJS"],
		status: "Completed",
		lastUpdated: "2024-03-20",
	},
	{
		id: 3,
		title: "Crop Mate",
		description: "AI-powered crop management system",
		technologies: ["TS", "Flask", "ML", "NextJS"],
		status: "Completed",
		lastUpdated: "2024-03-20",
	},
	{
		id: 4,
		title: "Crop Mate",
		description: "AI-powered crop management system",
		technologies: ["TS", "Flask", "ML", "NextJS"],
		status: "Completed",
		lastUpdated: "2024-03-20",
	},
	{
		id: 5,
		title: "Crop Mate",
		description: "AI-powered crop management system",
		technologies: ["TS", "Flask", "ML", "NextJS"],
		status: "Completed",
		lastUpdated: "2024-03-20",
	},
	{
		id: 6,
		title: "Crop Mate",
		description: "AI-powered crop management system",
		technologies: ["TS", "Flask", "ML", "NextJS"],
		status: "Completed",
		lastUpdated: "2024-03-20",
	},
	{
		id: 7,
		title: "Crop Mate",
		description: "AI-powered crop management system",
		technologies: ["TS", "Flask", "ML", "NextJS"],
		status: "Completed",
		lastUpdated: "2024-03-20",
	},
	{
		id: 8,
		title: "Crop Mate",
		description: "AI-powered crop management system",
		technologies: ["TS", "Flask", "ML", "NextJS"],
		status: "Completed",
		lastUpdated: "2024-03-20",
	},
	{
		id: 9,
		title: "Crop Mate",
		description: "AI-powered crop management system",
		technologies: ["TS", "Flask", "ML", "NextJS"],
		status: "Completed",
		lastUpdated: "2024-03-20",
	},
	{
		id: 10,
		title: "Crop Mate",
		description: "AI-powered crop management system",
		technologies: ["TS", "Flask", "ML", "NextJS"],
		status: "Completed",
		lastUpdated: "2024-03-20",
	},

	// Add more projects
];

export default function CollectionPage() {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredProjects = projects.filter(
		(project) =>
			project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.description.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900/10 via-slate-900/10 to-black/10 p-4 md:p-8">
			<div className="mx-auto max-w-7xl space-y-8">
				{/* Header Section */}
				<header className="relative flex flex-col items-center gap-6">
					<div className="absolute inset-0 -z-10 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent blur-3xl" />
					<h1 className="pt-16 md:pt-20 font-mono text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
						Project Collection
					</h1>
					<div className="relative w-full max-w-md group">
						<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-300/10 to-orange-500/10 blur-xl transition-all group-hover:blur-2xl" />
						<div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
							<svg
								className="h-5 w-5 text-white/70"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
						<Input
							type="search"
							placeholder="Search projects..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="relative w-full rounded-xl border-white/10 bg-white/5 pl-10 
                text-white placeholder:text-white/40 backdrop-blur-xl
                focus:border-white/20 focus:bg-white/10 focus:ring-white/10
                transition-all duration-300"
							aria-label="Search projects"
						/>
					</div>
				</header>

				{/* Table Section */}
				<div className="relative rounded-xl overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-br from-orange-300/5 via-transparent to-orange-500/5 backdrop-blur-xl" />
					<div className="relative overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow className="border-b-white/10">
									<TableHead className="text-white/80 font-medium">
										Project
									</TableHead>
									<TableHead className="hidden sm:table-cell text-white/80 font-medium">
										Description
									</TableHead>
									<TableHead className="hidden sm:table-cell text-white/80 font-medium">
										Tech
									</TableHead>
									<TableHead className="hidden md:table-cell text-white/80 font-medium">
										Status
									</TableHead>
									<TableHead className="hidden lg:table-cell text-white/80 font-medium">
										Updated
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredProjects.map((project) => (
									<TableRow
										key={project.id}
										className="border-b border-white/5 hover:bg-white/5 transition-colors"
									>
										<TableCell>
											<div className="space-y-2">
												<div className="font-medium text-white/90 text-lg">
													{project.title}
												</div>
												<div className="text-sm text-white/60 sm:hidden line-clamp-2">
													{project.description}
												</div>
												<div className="flex flex-wrap gap-1.5 sm:hidden">
													{project.technologies.map((tech) => (
														<span
															key={tech}
															className="px-3 py-1 text-xs font-medium rounded-full 
                                bg-white/5 text-white/80 backdrop-blur-sm
                                border border-white/10 
                                transition-all duration-300
                                hover:bg-white/10 hover:border-white/20"
														>
															{tech}
														</span>
													))}
												</div>
											</div>
										</TableCell>
										<TableCell className="hidden sm:table-cell text-white/70">
											<div className="line-clamp-2">{project.description}</div>
										</TableCell>
										<TableCell className="hidden sm:table-cell">
											<div className="flex flex-wrap gap-1.5">
												{project.technologies.map((tech) => (
													<span
														key={tech}
														className="px-3 py-1 text-xs font-medium rounded-full 
                              bg-white/5 text-white/80 backdrop-blur-sm
                              border border-white/10 
                              transition-all duration-300
                              hover:bg-white/10 hover:border-white/20"
													>
														{tech}
													</span>
												))}
											</div>
										</TableCell>
										<TableCell className="hidden md:table-cell text-white/70">
											{project.status}
										</TableCell>
										<TableCell className="hidden lg:table-cell text-white/70">
											{project.lastUpdated}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</div>
	);
}
