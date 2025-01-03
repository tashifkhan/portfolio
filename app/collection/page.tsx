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
import { IoLogoGooglePlaystore } from "react-icons/io5";
import {
	GithubIcon,
	ExternalLink,
	LoaderCircle,
	CheckCheck,
	Waypoints,
} from "lucide-react";

import Link from "next/link";
import { projectCollection } from "@/lib/project-collection-data";

export default function CollectionPage() {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredProjects = projectCollection.filter(
		(project) =>
			project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.technologies.some((tech) =>
				tech.toLowerCase().includes(searchTerm.toLowerCase())
			)
	);

	const renderStatusIcon = (status: string) => {
		if (status === "In Progress") {
			return <LoaderCircle className="w-6 h-6 text-orange-500" />;
		}
		if (status === "Completed") {
			return <CheckCheck className="w-6 h-6 text-green-500" />;
		}
		if (status === "Planned") {
			return <Waypoints className="w-6 h-6 text-blue-500" />;
		}
	};

	return (
		<div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-300/5 via-gray-900/10 to-black/10 p-4 md:p-8">
			<div className="mx-auto max-w-7xl space-y-12 pb-32 sm:pb-0">
				{/* Header Section */}
				<header className="relative flex flex-col items-center gap-8">
					<div className="absolute inset-0 -z-10 animate-pulse">
						<div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-orange-500/5 to-transparent blur-3xl" />
						<div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent opacity-75" />
					</div>
					<h1 className="flex justify-center pt-20 md:pt-24 font-mono text-4xl font-bold">
						<span className="bg-gradient-to-r from-orange-100 via-white to-orange-200 bg-clip-text text-transparent text-center">
							Project Collection
						</span>
					</h1>
					<div className="relative w-full max-w-lg group">
						<div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-orange-500/20 via-white/10 to-orange-500/20 blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:from-orange-500/30 group-hover:via-white/20 group-hover:to-orange-500/30" />
						<div className="relative flex items-center">
							<Input
								type="search"
								placeholder="Search projects..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full rounded-xl border-white/10 bg-white/5 pl-12 
									text-white placeholder:text-white/40 backdrop-blur-xl
									focus:border-orange-500/30 focus:bg-white/10 focus:ring-orange-500/20
									transition-all duration-300"
								aria-label="Search projects"
							/>
							<svg
								className="absolute left-4 h-5 w-5 text-white/50"
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
					</div>
				</header>

				{/* Table Section */}
				<div className="relative rounded-xl overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-500/5 backdrop-blur-xl" />
					<div className="relative overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow className="border-b-white/10 bg-white/5">
									<TableHead className="text-white/90 font-semibold">
										Project
									</TableHead>
									<TableHead className="hidden sm:table-cell text-white/90 font-semibold">
										Description
									</TableHead>
									<TableHead className="hidden sm:table-cell text-white/90 font-semibold">
										Tech
									</TableHead>
									<TableHead className="hidden lg:table-cell text-white/90 font-semibold">
										Links
									</TableHead>
									<TableHead className="hidden md:table-cell text-white/90 font-semibold">
										Status
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredProjects.map((project) => (
									<TableRow
										key={project.id}
										className="border-b border-white/5 hover:bg-white/10 transition-all duration-300"
									>
										<TableCell>
											<div className="space-y-3">
												<div className="font-medium text-white text-md tracking-tight">
													{project.title}
												</div>
												<div className="text-sm text-white/70 sm:hidden line-clamp-2">
													{project.description}
												</div>
												<div className="flex flex-wrap gap-2 sm:hidden">
													{project.technologies.map((tech) => (
														<span
															key={tech}
															className="px-3 py-1 text-xs font-medium rounded-full 
																bg-orange-500/10 text-white/90 backdrop-blur-sm
																border border-orange-500/20 
																transition-all duration-300
																hover:bg-orange-500/20 hover:border-orange-500/30"
														>
															{tech}
														</span>
													))}
												</div>
												<div className="flex justify-between sm:hidden">
													<div className="flex items-center gap-4 sm:hidden">
														{project.githubLink && (
															<Link
																href={project.githubLink}
																target="_blank"
																className="text-white/70 hover:text-orange-400 transform transition-all duration-300 hover:scale-110"
															>
																<GithubIcon className="w-5 h-5" />
															</Link>
														)}
														{project.playStoreLink && (
															<Link
																href={project.playStoreLink}
																target="_blank"
																className="text-white/70 hover:text-orange-400 transform transition-all duration-300 hover:scale-110"
															>
																<IoLogoGooglePlaystore className="w-5 h-5" />
															</Link>
														)}
														{project.liveLink && (
															<Link
																href={project.liveLink}
																target="_blank"
																className="text-white/70 hover:text-orange-400 transform transition-all duration-300 hover:scale-110"
															>
																<ExternalLink className="w-5 h-5" />
															</Link>
														)}
													</div>
													<div className="flex items-center gap-4 sm:hidden">
														{renderStatusIcon(project.status)}
													</div>
												</div>
											</div>
										</TableCell>
										<TableCell className="hidden sm:table-cell text-white/80">
											<div className="line-clamp-2">{project.description}</div>
										</TableCell>
										<TableCell className="hidden sm:table-cell">
											<div className="flex flex-wrap gap-2">
												{project.technologies.map((tech) => (
													<span
														key={tech}
														className="px-3 py-1 text-xs font-medium rounded-full 
															bg-orange-500/10 text-white/90 backdrop-blur-sm
															border border-orange-500/20 
															transition-all duration-300
															hover:bg-orange-500/20 hover:border-orange-500/30"
													>
														{tech}
													</span>
												))}
											</div>
										</TableCell>
										<TableCell className="hidden md:table-cell">
											<div className="flex items-center gap-4">
												{project.githubLink && (
													<Link
														href={project.githubLink}
														target="_blank"
														className="text-white/70 hover:text-orange-400 transition-colors duration-300"
													>
														<GithubIcon className="w-6 h-6" />
													</Link>
												)}
												{project.playStoreLink && (
													<Link
														href={project.playStoreLink}
														target="_blank"
														className="text-white/70 hover:text-orange-400 transition-colors duration-300"
													>
														<IoLogoGooglePlaystore className="w-6 h-6" />
													</Link>
												)}
												{project.liveLink && (
													<Link
														href={project.liveLink}
														target="_blank"
														className="text-white/70 hover:text-orange-400 transition-colors duration-300"
													>
														<ExternalLink className="w-6 h-6" />
													</Link>
												)}
											</div>
										</TableCell>
										<TableCell className="hidden md:table-cell">
											<div className="transform transition-transform duration-300 hover:scale-110">
												{renderStatusIcon(project.status)}
											</div>
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
