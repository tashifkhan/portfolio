"use client";

import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader } from "@/components/ui/loader";
import {
	GithubIcon,
	ExternalLink,
	LoaderCircle,
	CheckCheck,
	Waypoints,
	FileText,
	Code,
	Info,
} from "lucide-react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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

interface ProjectModalProps {
	project: Project | null;
	isOpen: boolean;
	onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
	project,
	isOpen,
	onClose,
}) => {
	const [readme, setReadme] = useState<string>("");
	const [isLoadingReadme, setIsLoadingReadme] = useState(false);
	const [readmeError, setReadmeError] = useState<string>("");

	useEffect(() => {
		if (project?.githubLink && isOpen) {
			fetchReadme(project.githubLink);
		}
	}, [project, isOpen]);

	const fetchReadme = async (githubUrl: string) => {
		try {
			setIsLoadingReadme(true);
			setReadmeError("");

			// Extract owner and repo from GitHub URL
			const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
			if (!match) {
				throw new Error("Invalid GitHub URL");
			}

			const [, owner, repo] = match;
			const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;

			const response = await fetch(readmeUrl);
			if (!response.ok) {
				throw new Error("README not found");
			}

			const data = await response.json();
			// Properly decode base64 content with UTF-8 encoding
			const binaryString = atob(data.content);
			const bytes = new Uint8Array(binaryString.length);
			for (let i = 0; i < binaryString.length; i++) {
				bytes[i] = binaryString.charCodeAt(i);
			}
			const readmeContent = new TextDecoder("utf-8").decode(bytes);
			setReadme(readmeContent);
		} catch (error) {
			console.error("Failed to fetch README:", error);
			setReadmeError("Unable to load README file");
		} finally {
			setIsLoadingReadme(false);
		}
	};

	const renderStatusIcon = (status: string) => {
		const iconClass = "w-5 h-5";
		if (status === "In Progress") {
			return <LoaderCircle className={`${iconClass} text-orange-500`} />;
		}
		if (status === "Completed") {
			return <CheckCheck className={`${iconClass} text-green-500`} />;
		}
		if (status === "Planned") {
			return <Waypoints className={`${iconClass} text-blue-500`} />;
		}
	};

	const getStatusColor = (status: string) => {
		if (status === "In Progress")
			return "bg-orange-500/20 text-orange-300 border-orange-500/30";
		if (status === "Completed")
			return "bg-green-500/20 text-green-300 border-green-500/30";
		if (status === "Planned")
			return "bg-blue-500/20 text-blue-300 border-blue-500/30";
		return "bg-gray-500/20 text-gray-300 border-gray-500/30";
	};

	const renderMarkdown = (content: string) => {
		// Enhanced markdown to HTML conversion with proper syntax highlighting
		const parts: React.ReactNode[] = [];
		let currentIndex = 0;

		// Split content into code blocks and regular text
		const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
		let match;

		while ((match = codeBlockRegex.exec(content)) !== null) {
			// Add text before code block
			if (match.index > currentIndex) {
				const textBefore = content.slice(currentIndex, match.index);
				if (textBefore.trim()) {
					parts.push(
						<div
							key={`text-${currentIndex}`}
							dangerouslySetInnerHTML={{
								__html: renderRegularMarkdown(textBefore),
							}}
						/>
					);
				}
			}

			// Add syntax highlighted code block
			const language = match[1] || "text";
			const code = match[2].trim();

			parts.push(
				<SyntaxHighlighter
					key={`code-${match.index}`}
					language={language.toLowerCase()}
					style={oneDark}
					customStyle={{
						margin: "1rem 0",
						borderRadius: "0.5rem",
						border: "1px solid rgb(55 65 81)",
						background: "rgb(17 24 39)",
					}}
					codeTagProps={{
						style: {
							fontFamily:
								'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
							fontSize: "0.875rem",
						},
					}}
					PreTag="div"
					showLineNumbers={true}
					wrapLines={true}
					lineNumberStyle={{
						minWidth: "3em",
						paddingRight: "1em",
						color: "rgb(156 163 175)",
						borderRight: "1px solid rgb(55 65 81)",
						marginRight: "1em",
					}}
				>
					{code}
				</SyntaxHighlighter>
			);

			currentIndex = match.index + match[0].length;
		}

		// Add remaining text after last code block
		if (currentIndex < content.length) {
			const remainingText = content.slice(currentIndex);
			if (remainingText.trim()) {
				parts.push(
					<div
						key={`text-${currentIndex}`}
						dangerouslySetInnerHTML={{
							__html: renderRegularMarkdown(remainingText),
						}}
					/>
				);
			}
		}

		// If no code blocks found, just render as regular markdown
		if (parts.length === 0) {
			return (
				<div
					className="prose prose-invert max-w-none"
					dangerouslySetInnerHTML={{ __html: renderRegularMarkdown(content) }}
				/>
			);
		}

		return <div className="prose prose-invert max-w-none">{parts}</div>;
	};

	const renderRegularMarkdown = (content: string) => {
		// Clean up any encoding issues and normalize whitespace
		let html = content
			// Replace common encoding issues
			.replace(/â/g, "")
			.replace(/â€/g, '"')
			.replace(/â€œ/g, '"')
			.replace(/â€™/g, "'")
			.replace(/â€¢/g, "•")
			.replace(/â€"/g, "—")
			.replace(/â€"/g, "–")
			// Normalize whitespace
			.replace(/\r\n/g, "\n")
			.replace(/\r/g, "\n")
			// Remove any remaining control characters except newlines and tabs
			.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

		// Get GitHub base URL for converting relative links
		const getGithubBaseUrl = () => {
			if (!project?.githubLink) return "";
			const match = project.githubLink.match(/github\.com\/([^\/]+)\/([^\/]+)/);
			if (!match) return "";
			const [, owner, repo] = match;
			// Remove .git suffix if present
			const cleanRepo = repo.replace(/\.git$/, "");
			return `https://raw.githubusercontent.com/${owner}/${cleanRepo}/main`;
		};

		const githubBaseUrl = getGithubBaseUrl();
		console.log("GitHub base URL:", githubBaseUrl);

		// Helper function to convert relative URLs to absolute GitHub URLs
		const convertRelativeUrl = (url: string) => {
			if (!githubBaseUrl) return url;
			if (url.startsWith("http://") || url.startsWith("https://")) return url;

			let convertedUrl = url;

			// Handle different relative path formats
			if (url.startsWith("./")) {
				convertedUrl = `${githubBaseUrl}/${url.substring(2)}`;
			} else if (url.startsWith("../")) {
				// Handle parent directory references
				convertedUrl = `${githubBaseUrl}/${url.replace(/^\.\.\//, "")}`;
			} else if (url.startsWith("/")) {
				// Handle absolute paths from root - remove leading slash
				convertedUrl = `${githubBaseUrl}${url}`;
			} else if (!url.includes("://") && !url.startsWith("#")) {
				// Assume it's a relative path, but not an anchor link
				convertedUrl = `${githubBaseUrl}/${url}`;
			}

			return convertedUrl;
		};

		// Handle inline code (before other replacements)
		html = html.replace(
			/`([^`\n]+)`/g,
			'<code class="bg-gray-800 text-orange-300 px-2 py-1 rounded text-sm font-mono border border-gray-700">$1</code>'
		);

		// Handle headers
		html = html.replace(
			/^# (.*$)/gm,
			'<h1 class="text-2xl font-bold mb-4 text-white border-b border-gray-700 pb-2">$1</h1>'
		);
		html = html.replace(
			/^## (.*$)/gm,
			'<h2 class="text-xl font-semibold mb-3 text-white/90 mt-6">$1</h2>'
		);
		html = html.replace(
			/^### (.*$)/gm,
			'<h3 class="text-lg font-medium mb-2 text-white/80 mt-4">$1</h3>'
		);
		html = html.replace(
			/^#### (.*$)/gm,
			'<h4 class="text-base font-medium mb-2 text-white/70 mt-3">$1</h4>'
		);

		// Handle text formatting
		html = html.replace(
			/\*\*(.*?)\*\*/g,
			'<strong class="font-semibold text-white">$1</strong>'
		);
		html = html.replace(
			/\*(.*?)\*/g,
			'<em class="italic text-white/90">$1</em>'
		);

		// Handle images (before links to avoid conflicts)
		// First handle markdown images ![alt](src)
		html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
			const fullSrc = convertRelativeUrl(src);

			return `<img src="${fullSrc}" alt="${alt}" class="max-w-full h-auto rounded-lg border border-gray-700 my-4 mx-auto block" />`;
		});

		// Then handle HTML img tags <img src="...">
		html = html.replace(
			/<img([^>]*)\ssrc=["']([^"']+)["']([^>]*)>/g,
			(match, beforeSrc, src, afterSrc) => {
				const fullSrc = convertRelativeUrl(src);

				return `<img${beforeSrc} src="${fullSrc}"${afterSrc} class="max-w-full h-auto rounded-lg border border-gray-700 my-4 mx-auto block" />`;
			}
		);

		// Handle links
		html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
			const fullUrl = convertRelativeUrl(url);
			return `<a href="${fullUrl}" target="_blank" class="text-orange-400 hover:text-orange-300 underline transition-colors">${text}</a>`;
		});

		// Handle numbered lists
		html = html.replace(
			/^(\d+)\.\s+(.*$)/gm,
			'<li class="text-white/80 mb-2 ml-6 list-decimal">$2</li>'
		);

		// Handle todo items first (before regular bullet lists)
		// Unchecked todo items - [ ]
		html = html.replace(
			/^-\s+\[\s*\]\s+(.*$)/gm,
			'<li class="flex items-center text-white/80 mb-2 ml-2 list-none"><span class="mr-3 text-gray-400 text-lg">☐</span>$1</li>'
		);

		// Checked todo items - [x] or - [X]
		html = html.replace(
			/^-\s+\[x\]\s+(.*$)/gim,
			'<li class="flex items-center text-white/80 mb-2 ml-2 list-none"><span class="mr-3 text-orange-400 text-lg">☑</span>$1</li>'
		);

		// Handle nested todo items with indentation
		html = html.replace(
			/^(\s{2,})-\s+\[\s*\]\s+(.*$)/gm,
			'<li class="flex items-center text-white/80 mb-2 ml-6 list-none"><span class="mr-3 text-gray-400 text-lg">☐</span>$2</li>'
		);

		html = html.replace(
			/^(\s{2,})-\s+\[x\]\s+(.*$)/gim,
			'<li class="flex items-center text-white/80 mb-2 ml-6 list-none"><span class="mr-3 text-orange-400 text-lg">☑</span>$2</li>'
		);

		// Handle bullet lists (support -, *, •, and + bullets) - but not todo items
		html = html.replace(
			/^[\-\*\•\+]\s+(?!\[[\sx]\])(.*$)/gm,
			'<li class="text-white/80 mb-1 ml-6 list-disc">$1</li>'
		);

		// Also handle nested bullet points with indentation
		html = html.replace(
			/^(\s{2,})[\-\*\•\+]\s+(?!\[[\sx]\])(.*$)/gm,
			'<li class="text-white/80 mb-1 ml-8 list-disc">$2</li>'
		);

		// Wrap consecutive list items in ul/ol tags
		// Handle todo lists (checked and unchecked)
		html = html.replace(
			/(<li class="flex items-center[^"]*list-none[^"]*">.*?<\/li>(\s*<li class="flex items-center[^"]*list-none[^"]*">.*?<\/li>)*)/g,
			'<ul class="my-3 space-y-1 pl-2">$1</ul>'
		);

		// Handle unordered lists (including nested ones)
		html = html.replace(
			/(<li class="[^"]*list-disc[^"]*">.*?<\/li>(\s*<li class="[^"]*list-disc[^"]*">.*?<\/li>)*)/g,
			'<ul class="my-3 space-y-1 list-disc pl-6">$1</ul>'
		);

		// Handle ordered lists
		html = html.replace(
			/(<li class="[^"]*list-decimal[^"]*">.*?<\/li>(\s*<li class="[^"]*list-decimal[^"]*">.*?<\/li>)*)/g,
			'<ol class="my-3 space-y-1 list-decimal pl-6">$1</ol>'
		);

		// Handle tables
		const tableRegex = /^(\|.*\|.*\n)((?:\|.*\|.*\n)*)/gm;
		html = html.replace(tableRegex, (match, headerRow, bodyRows) => {
			// Process header row
			const headers = headerRow
				.split("|")
				.map((cell: string) => cell.trim())
				.filter((cell: string) => cell)
				.map(
					(header: string) =>
						`<th class="px-4 py-3 text-left text-sm font-medium text-white/90 border-b border-gray-600">${header}</th>`
				)
				.join("");

			// Process body rows
			const rows = bodyRows
				.split("\n")
				.filter(
					(row: string) => row.trim() && !row.match(/^\s*\|[\s\-\|:]*\|\s*$/)
				) // Skip separator rows
				.map((row: string) => {
					const cells = row
						.split("|")
						.map((cell: string) => cell.trim())
						.filter((cell: string) => cell)
						.map(
							(cell: string) =>
								`<td class="px-4 py-3 text-sm text-white/80 border-b border-gray-700/50">${cell}</td>`
						)
						.join("");
					return `<tr class="hover:bg-gray-800/30 transition-colors">${cells}</tr>`;
				})
				.join("");

			return `<div class="overflow-x-auto my-6">
				<table class="min-w-full bg-gray-800/20 border border-gray-700 rounded-lg overflow-hidden">
					<thead class="bg-gray-800/40">
						<tr>${headers}</tr>
					</thead>
					<tbody>${rows}</tbody>
				</table>
			</div>`;
		});

		// Handle paragraphs
		const paragraphs = html.split(/\n\s*\n/);
		html = paragraphs
			.map((paragraph) => {
				paragraph = paragraph.trim();
				if (!paragraph) return "";

				// Don't wrap already formatted elements
				if (paragraph.match(/^<(h[1-6]|pre|ul|ol|li|div|table)/)) {
					return paragraph;
				}

				// Replace single newlines with <br> within paragraphs
				paragraph = paragraph.replace(/\n/g, "<br>");

				return `<p class="text-white/70 mb-4 leading-relaxed">${paragraph}</p>`;
			})
			.join("\n");

		return html;
	};

	if (!project) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 rounded-2xl p-8 shadow-xl border border-white/20 text-white">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
						{project.title.split("(")[0]}
						{project.title.includes("(") && (
							<span className="ml-2 px-3 py-1 text-sm text-orange-200 bg-orange-500/20 rounded-full border border-orange-500/30">
								{project.title.split("(")[1].replace(")", "")}
							</span>
						)}
					</DialogTitle>
				</DialogHeader>

				<Tabs defaultValue="overview" className="flex-1 overflow-hidden">
					<TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700">
						<TabsTrigger
							value="overview"
							className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-200"
						>
							<Info className="w-4 h-4 mr-2" />
							Overview
						</TabsTrigger>
						<TabsTrigger
							value="tech"
							className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-200"
						>
							<Code className="w-4 h-4 mr-2" />
							Tech Stack
						</TabsTrigger>
						<TabsTrigger
							value="readme"
							className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-200"
							disabled={!project.githubLink}
						>
							<FileText className="w-4 h-4 mr-2" />
							README
						</TabsTrigger>
					</TabsList>

					<div className="mt-6 overflow-y-auto max-h-[60vh]">
						<TabsContent value="overview" className="space-y-6">
							{/* Status and Links */}
							<div className="flex flex-wrap items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
								<div
									className={`flex items-center gap-2 px-3 py-2 rounded-full border ${getStatusColor(
										project.status
									)}`}
								>
									{renderStatusIcon(project.status)}
									<span className="font-medium">{project.status}</span>
								</div>

								<div className="flex items-center gap-3">
									{project.githubLink && (
										<Button
											variant="outline"
											size="sm"
											asChild
											className="border-gray-600 hover:border-orange-500/50 hover:bg-orange-500/10"
										>
											<Link href={project.githubLink} target="_blank">
												<GithubIcon className="w-4 h-4 mr-2" />
												GitHub
											</Link>
										</Button>
									)}
									{project.liveLink && (
										<Button
											variant="outline"
											size="sm"
											asChild
											className="border-gray-600 hover:border-orange-500/50 hover:bg-orange-500/10"
										>
											<Link href={project.liveLink} target="_blank">
												<ExternalLink className="w-4 h-4 mr-2" />
												Live Demo
											</Link>
										</Button>
									)}
									{project.playStoreLink && (
										<Button
											variant="outline"
											size="sm"
											asChild
											className="border-gray-600 hover:border-orange-500/50 hover:bg-orange-500/10"
										>
											<Link href={project.playStoreLink} target="_blank">
												<IoLogoGooglePlaystore className="w-4 h-4 mr-2" />
												Play Store
											</Link>
										</Button>
									)}
								</div>
							</div>

							{/* Description */}
							<div className="space-y-4">
								<h3 className="text-lg font-semibold text-white/90">
									About this project
								</h3>
								<p className="text-white/70 leading-relaxed text-base bg-gray-800/20 p-4 rounded-lg border border-gray-700/50">
									{project.description}
								</p>
							</div>
						</TabsContent>

						<TabsContent value="tech" className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold text-white/90 mb-4">
									Technologies Used
								</h3>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
									{project.technologies.map((tech, index) => (
										<Badge
											key={index}
											variant="outline"
											className="p-3 text-center justify-center bg-gradient-to-r from-orange-500/10 to-orange-500/5 
                        border-orange-500/30 text-orange-200 hover:bg-orange-500/20 hover:border-orange-500/50
                        transition-all duration-300 transform hover:scale-105"
										>
											{tech}
										</Badge>
									))}
								</div>
							</div>
						</TabsContent>

						<TabsContent value="readme" className="space-y-4">
							{isLoadingReadme ? (
								<div className="flex items-center justify-center py-12">
									<Loader size="lg" />
									<span className="ml-2 text-white/70">Loading README...</span>
								</div>
							) : readmeError ? (
								<div className="text-center py-12">
									<FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
									<p className="text-gray-400">{readmeError}</p>
								</div>
							) : readme ? (
								<div className="bg-gray-800/20 p-6 rounded-lg border border-gray-700/50">
									{renderMarkdown(readme)}
								</div>
							) : (
								<div className="text-center py-12">
									<FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
									<p className="text-gray-400">No README available</p>
								</div>
							)}
						</TabsContent>
					</div>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

export default ProjectModal;
