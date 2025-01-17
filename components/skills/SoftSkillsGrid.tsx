"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
	Users,
	Presentation,
	Megaphone,
	LineChart,
	Palette,
	Pencil,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SoftSkill {
	name: string;
	icon: string;
	category: string;
}

const iconMap: Record<string, React.ElementType> = {
	Users,
	Presentation,
	Megaphone,
	LineChart,
	Palette,
	Pencil,
};

const defaultSoftSkills = [
	{ name: "Leadership", icon: "Users", category: "Soft Skills" },
	{ name: "Public Relations", icon: "Megaphone", category: "Soft Skills" },
	{
		name: "Debating & Public Speaking",
		icon: "Presentation",
		category: "Soft Skills",
	},
	{
		name: "Event & Financial Management",
		icon: "LineChart",
		category: "Soft Skills",
	},
	{ name: "UI/UX Design", icon: "Palette", category: "Other Avocations" },
	{ name: "Content Writing", icon: "Pencil", category: "Other Avocations" },
];

const getSoftSkills = async () => {
	const response = await fetch("/api/skills");
	if (!response.ok) {
		throw new Error("Failed to fetch soft skills");
	}
	const data = await response.json();
	return data[0]?.softSkills || defaultSoftSkills;
};

export function SoftSkillsGrid() {
	const [softSkills, setSoftSkills] = useState<SoftSkill[]>(defaultSoftSkills);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchSoftSkills = async () => {
			try {
				const data = await getSoftSkills();
				setSoftSkills(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to load soft skills"
				);
			} finally {
				setIsLoading(false);
			}
		};
		fetchSoftSkills();
	}, []);

	if (isLoading) {
		return (
			<div className="space-y-4">
				<Skeleton className="h-8 w-64" />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton key={i} className="h-32 w-full" />
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return <div className="text-red-500">Error: {error}</div>;
	}

	return (
		<div className="space-y-4">
			<h3 className="text-xl font-semibold">Soft Skills & Other Avocations</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{softSkills.map((skill, index) => {
					const Icon = iconMap[skill.icon];
					return (
						<motion.div
							key={skill.name}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{ scale: 1.02 }}
						>
							<Card className="relative overflow-hidden backdrop-blur-xl bg-white/5 border-none">
								<div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-pink-500/10 opacity-50" />
								<div className="relative p-6">
									<div className="flex items-center gap-4">
										<div className="p-3 rounded-lg bg-gradient-to-br from-orange-400/20 to-pink-500/20">
											<Icon className="h-6 w-6 text-orange-300" />
										</div>
										<div>
											<h4 className="font-semibold text-lg text-white/90">
												{skill.name}
											</h4>
											<p className="text-sm text-white/60">{skill.category}</p>
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
