"use client";

import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import ProjectModal from "@/components/ProjectModal";

// Move interface outside component
interface Project {
	position: number;
	title: string;
	description: string;
	technologies: string[];
	githubLink?: string;
	playStoreLink?: string;
	liveLink?: string;
	status: string;
}

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import {
	GithubIcon,
	ExternalLink,
	LoaderCircle,
	CheckCheck,
	Waypoints,
} from "lucide-react";

import Link from "next/link";
import { getProjects } from "@/hooks/get-project-data";
import { useSearchParams, useRouter } from "next/navigation";

function SearchInput() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState(
		searchParams.get("search") || ""
	);

	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
		const params = new URLSearchParams(searchParams.toString());

		if (value.trim()) {
			params.set("search", value);
		} else {
			params.delete("search");
			setSearchTerm("");
		}

		router.push(`/collection?${params.toString()}`, { scroll: false });
	};

	return (
		<Input
			type="search"
			placeholder="Search projects"
			value={searchTerm}
			onChange={(e) => handleSearchChange(e.target.value)}
			onKeyUp={(e) => {
				if (e.key === "Escape") {
					handleSearchChange("");
				}
			}}
			className="w-full h-14 pl-12 pr-6 text-base rounded-2xl border-2 border-white/10 
				bg-white/5 text-white placeholder:text-white/40 backdrop-blur-xl
				focus:border-orange-500/50 focus:bg-white/10 focus:ring-4 focus:ring-orange-500/20
				transition-all duration-300 hover:border-white/20 hover:bg-white/10
				shadow-lg hover:shadow-xl"
			aria-label="Search projects"
		/>
	);
}

function SearchableTable() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState(
		searchParams.get("search") || ""
	);
	const [isLoading, setIsLoading] = useState(true);
	const [projectCollection, setProjectCollection] = useState<Project[]>([]);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleProjectClick = (project: Project) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedProject(null);
	};

	useEffect(() => {
		const currentSearch = searchParams.get("search");
		if (currentSearch !== null) {
			setSearchTerm(currentSearch);
		}
	}, [searchParams]);

	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
		const params = new URLSearchParams(searchParams.toString());
		if (value) {
			params.set("search", value);
		} else {
			params.delete("search");
		}
		router.push(`/collection?${params.toString()}`, { scroll: false });
	};

	useEffect(() => {
		// getProjects is an async function, so we need to handle it properly
		const fetchProjects = async () => {
			try {
				setIsLoading(true);
				setError(null);
				console.log("Fetching projects...");
				const projects = await getProjects();
				console.log("Projects fetched:", projects.length);
				setProjectCollection(projects);
			} catch (error) {
				console.error("Failed to fetch projects:", error);
				setError("Failed to load projects. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchProjects();
	}, []);

	const filteredProjects =
		searchTerm !== ""
			? projectCollection.filter(
					(project) =>
						project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
						project.description
							.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						project.technologies.some((tech) =>
							tech.toLowerCase().includes(searchTerm.toLowerCase())
						)
			  )
			: projectCollection;

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

	const StatusLegend = () => {
		const [isVisible, setIsVisible] = useState(true);

		return (
			<div className="fixed md:top-8 bottom-24 right-4 z-50">
				{isVisible ? (
					<div className="p-4 rounded-lg bg-black/50 backdrop-blur-lg border border-white/10">
						<div className="flex items-center justify-between mb-2">
							<div className="text-sm font-medium text-white/90">
								Status Legend
							</div>
							<button
								onClick={() => setIsVisible(false)}
								className="text-white/50 hover:text-white/90 transition-colors pl-3"
								aria-label="Hide legend"
							>
								✕
							</button>
						</div>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<LoaderCircle className="w-5 h-5 text-orange-500" />
								<span className="text-xs text-white/70">In Progress</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCheck className="w-5 h-5 text-green-500" />
								<span className="text-xs text-white/70">Completed</span>
							</div>
							<div className="flex items-center gap-2">
								<Waypoints className="w-5 h-5 text-blue-500" />
								<span className="text-xs text-white/70">Planned</span>
							</div>
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
		);
	};

	return (
		<div className="relative rounded-xl overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-500/5 backdrop-blur-xl" />
			<div className="relative overflow-x-auto">
				{isLoading ? (
					<div className="flex justify-center items-center min-h-[400px]">
						<Loader size="lg" />
					</div>
				) : error ? (
					<div className="flex flex-col justify-center items-center min-h-[400px] text-center">
						<div className="text-red-400 text-lg font-semibold mb-2">
							Error Loading Projects
						</div>
						<div className="text-white/70 mb-4">{error}</div>
						<button
							onClick={() => window.location.reload()}
							className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
						>
							Retry
						</button>
					</div>
				) : (
					<>
						<div className="grid gap-4 md:hidden">
							{/* Mobile Card View */}
							{filteredProjects.map((project, index) => (
								<div
									key={`mobile-project-${project.position || index}`}
									onClick={() => handleProjectClick(project)}
									className="p-6 bg-gradient-to-br fbackdrop-blur-lg bg-white/10 dark:bg-gray-900/30   rounded-2xl shadow-xl border border-white/20 cursor-pointer transform transition-all duration-300 
										hover:scale-105 hover:bg-gradient-to-br hover:from-orange-500/10 
										hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/20"
								>
									<div className="space-y-4">
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<h3 className="font-bold text-lg text-white mb-2">
													{project.title.split("(")[0]}
													{project.title.includes("(") && (
														<span className="ml-2 px-2 py-1 text-xs text-orange-200 bg-orange-500/20 rounded-full">
															{project.title.split("(")[1].replace(")", "")}
														</span>
													)}
												</h3>
												<p className="text-sm text-white/70 leading-relaxed line-clamp-3">
													{project.description}
												</p>
											</div>
											<div className="ml-4">
												{renderStatusIcon(project.status)}
											</div>
										</div>

										<div className="flex flex-wrap gap-2">
											{project.technologies
												.slice(0, 3)
												.map((tech, techIndex) => (
													<span
														key={`mobile-${
															project.position || index
														}-${techIndex}-${tech}`}
														className="px-3 py-1 text-xs font-medium rounded-full 
														bg-orange-500/10 text-orange-200 backdrop-blur-sm
														border border-orange-500/20 transition-all duration-300"
													>
														{tech}
													</span>
												))}
											{project.technologies.length > 3 && (
												<span
													className="px-3 py-1 text-xs font-medium rounded-full 
													bg-gray-500/10 text-gray-300 backdrop-blur-sm border border-gray-500/20"
												>
													+{project.technologies.length - 3} more
												</span>
											)}
										</div>

										<div className="flex items-center gap-3 pt-2 border-t border-white/10">
											{project.githubLink && (
												<div className="text-white/70">
													<GithubIcon className="w-4 h-4" />
												</div>
											)}
											{project.playStoreLink && (
												<div className="text-white/70">
													<IoLogoGooglePlaystore className="w-4 h-4" />
												</div>
											)}
											{project.liveLink && (
												<div className="text-white/70">
													<ExternalLink className="w-4 h-4" />
												</div>
											)}
											<div className="ml-auto text-xs text-white/50">
												Click to view details
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Desktop Table View */}
						<div className="hidden md:block">
							<Table>
								<TableHeader>
									<TableRow className="border-b-white/10 bg-white/5 hover:bg-white/5">
										<TableHead className="text-white/90 font-semibold text-base">
											Project
										</TableHead>
										<TableHead className="text-white/90 font-semibold text-base">
											Description
										</TableHead>
										<TableHead className="text-white/90 font-semibold text-base">
											Technologies
										</TableHead>
										<TableHead className="text-white/90 font-semibold text-base">
											Links
										</TableHead>
										<TableHead className="text-white/90 font-semibold text-base">
											Status
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredProjects.map((project, index) => (
										<TableRow
											key={`desktop-project-${project.position || index}`}
											onClick={() => handleProjectClick(project)}
											className="border-b border-white/5 cursor-pointer transition-all duration-300 
												hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-transparent 
												hover:border-orange-500/20 group"
										>
											<TableCell className="py-6">
												<div className="font-medium text-white text-base group-hover:text-orange-200 transition-colors">
													<div className="flex items-center gap-3">
														<span>{project.title.split("(")[0]}</span>
														{project.title.includes("(") && (
															<span className="px-2 py-1 text-xs text-orange-200 bg-orange-500/20 rounded-full border border-orange-500/30">
																{project.title.split("(")[1].replace(")", "")}
															</span>
														)}
													</div>
												</div>
											</TableCell>
											<TableCell className="py-6 max-w-md">
												<div className="text-sm text-white/80 leading-relaxed line-clamp-2">
													{project.description}
												</div>
											</TableCell>
											<TableCell className="py-6">
												<div className="flex flex-wrap gap-2 max-w-xs">
													{project.technologies
														.slice(0, 3)
														.map((tech, techIndex) => (
															<span
																key={`desktop-${
																	project.position || index
																}-${techIndex}-${tech}`}
																className="px-3 py-1 text-xs font-medium rounded-full 
																bg-orange-500/10 text-orange-200 backdrop-blur-sm
																border border-orange-500/20 transition-all duration-300
																group-hover:bg-orange-500/20 group-hover:border-orange-500/40"
															>
																{tech}
															</span>
														))}
													{project.technologies.length > 3 && (
														<span
															className="px-3 py-1 text-xs font-medium rounded-full 
															bg-gray-500/10 text-gray-300 backdrop-blur-sm border border-gray-500/20"
														>
															+{project.technologies.length - 3}
														</span>
													)}
												</div>
											</TableCell>
											<TableCell className="py-6">
												<div className="flex items-center gap-3">
													{project.githubLink && (
														<Link
															href={project.githubLink}
															target="_blank"
															className="z-10"
														>
															<div className="text-white/70 group-hover:text-orange-400 transition-colors">
																<GithubIcon className="w-5 h-5" />
															</div>
														</Link>
													)}
													{project.playStoreLink && (
														<Link
															href={project.playStoreLink}
															target="_blank"
															className="z-10"
														>
															<div className="text-white/70 group-hover:text-orange-400 transition-colors">
																<IoLogoGooglePlaystore className="w-5 h-5" />
															</div>
														</Link>
													)}
													{project.liveLink && (
														<Link
															href={project.liveLink}
															target="_blank"
															className="z-10"
														>
															<div className="text-white/70 group-hover:text-orange-400 transition-colors">
																<ExternalLink className="w-5 h-5" />
															</div>
														</Link>
													)}
												</div>
											</TableCell>
											<TableCell className="py-6">
												<div className="transition-transform group-hover:scale-110">
													{renderStatusIcon(project.status)}
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</>
				)}
			</div>

			<ProjectModal
				project={selectedProject}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</div>
	);
}

const StatusLegend = () => {
	const [isVisible, setIsVisible] = useState(true);

	return (
		<div className="fixed md:top-8 bottom-24 right-4 z-50">
			{isVisible ? (
				<div className="p-4 rounded-lg bg-black/50 backdrop-blur-lg border border-white/10">
					<div className="flex items-center justify-between mb-2">
						<div className="text-sm font-medium text-white/90">
							Status Legend
						</div>
						<button
							onClick={() => setIsVisible(false)}
							className="text-white/50 hover:text-white/90 transition-colors pl-3"
							aria-label="Hide legend"
						>
							✕
						</button>
					</div>
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<LoaderCircle className="w-5 h-5 text-orange-500" />
							<span className="text-xs text-white/70">In Progress</span>
						</div>
						<div className="flex items-center gap-2">
							<CheckCheck className="w-5 h-5 text-green-500" />
							<span className="text-xs text-white/70">Completed</span>
						</div>
						<div className="flex items-center gap-2">
							<Waypoints className="w-5 h-5 text-blue-500" />
							<span className="text-xs text-white/70">Planned</span>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

// Main page component
export default function CollectionPage() {
	return (
		<div className="min-h-screen relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

			<StatusLegend />
			<div className="relative mx-auto max-w-7xl space-y-12 pb-32 sm:pb-8 px-4 md:px-8">
				{/* Header Section */}
				<header className="relative flex flex-col items-center gap-8 pt-20 md:pt-24">
					{/* Animated Background Glow */}
					<div className="absolute inset-0 -z-10">
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-700/20 via-orange-800/10 to-transparent rounded-full blur-3xl animate-pulse" />
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-800/30 to-orange-900/20 rounded-full blur-2xl animate-pulse delay-1000" />
					</div>

					<div className="text-center space-y-4 mt-7">
						<h1 className="font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight">
							<span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 bg-clip-text text-transparent">
								Project
							</span>
							<br />
							<span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
								Collection
							</span>
						</h1>
						<p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
							Explore my coding journey through various projects. Click on any
							project to dive deeper into its details, tech stack, and
							documentation.
						</p>
					</div>

					<div className="relative w-full max-w-2xl group">
						<div className="absolute inset-0 bg-gradient-to-r from-orange-700/20 via-orange-800/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
						<div className="relative">
							<Suspense
								fallback={
									<div className="relative flex items-center justify-center p-4">
										<Loader size="lg" />
									</div>
								}
							>
								<SearchInput />
							</Suspense>
							<svg
								className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50 group-hover:text-orange-400 transition-colors"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
					</div>
				</header>

				{/* Projects Section */}
				<div className="relative">
					<div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent rounded-2xl" />
					<Suspense
						fallback={
							<div className="flex justify-center items-center min-h-[400px]">
								<Loader size="lg" />
							</div>
						}
					>
						<SearchableTable />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
