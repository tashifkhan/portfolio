"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Github, Database, Box, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Tool {
	name: string;
	icon: string;
	description: string;
}

const iconMap: Record<string, React.ElementType> = {
	Github,
	Database,
	Box,
	Settings,
};

const defaultTools = [
	{ name: "Git/GitHub", icon: "Github", description: "Version Control" },
	{ name: "MySQL", icon: "Database", description: "Database" },
	{ name: "MongoDB", icon: "Database", description: "NoSQL Database" },
	{ name: "Redux Toolkit", icon: "Box", description: "State Management" },
];

const getTools = async () => {
	const response = await fetch("/api/skills");
	if (!response.ok) {
		throw new Error("Failed to fetch tools");
	}
	const data = await response.json();
	return data[0]?.tools || defaultTools;
};

export function ToolsGrid() {
	const [tools, setTools] = useState<Tool[]>(defaultTools);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTools = async () => {
			try {
				const data = await getTools();
				setTools(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load tools");
			} finally {
				setIsLoading(false);
			}
		};
		fetchTools();
	}, []);

	if (isLoading) {
		return (
			<div className="space-y-6">
				<Skeleton className="h-8 w-48" />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{Array.from({ length: 4 }).map((_, i) => (
						<Skeleton key={i} className="h-24 w-full" />
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return <div className="text-red-500">Error: {error}</div>;
	}

	return (
		<div className="space-y-6">
			<h3 className="text-xl font-bold">Tools & Technologies</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{tools.map((tool, index) => {
					// Use fallback icon if the specified icon doesn't exist
					const Icon = iconMap[tool.icon] || iconMap.Settings;
					return (
						<motion.div
							key={tool.name}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.5,
								delay: index * 0.1,
								ease: "easeOut",
							}}
							whileHover={{
								scale: 1.02,
								transition: { duration: 0.2 },
							}}
						>
							<Card className="relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/20 transition-all duration-300">
								<div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-pink-500/10 opacity-50" />
								<div className="relative p-3">
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-lg bg-gradient-to-br from-orange-400/20 to-pink-500/20 backdrop-blur-md">
											<Icon className="h-5 w-5 text-orange-300" />
										</div>
										<div>
											<h4 className="font-semibold text-base text-white/90">
												{tool.name}
											</h4>
											<p className="text-xs text-white/60">
												{tool.description}
											</p>
										</div>
									</div>
								</div>
							</Card>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
