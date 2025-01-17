"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPython, FaJsSquare } from "react-icons/fa";
import { SiCplusplus, SiTypescript } from "react-icons/si";
import { Skeleton } from "@/components/ui/skeleton";

interface Language {
	name: string;
	icon: React.ElementType;
}

const defaultLanguages: Language[] = [
	{ name: "Python", icon: FaPython },
	{ name: "C++", icon: SiCplusplus },
	{ name: "JavaScript", icon: FaJsSquare },
	{ name: "TypeScript", icon: SiTypescript },
];
const iconMap: Record<string, React.ElementType> = {
	FaPython: FaPython,
	SiCplusplus: SiCplusplus,
	FaJsSquare: FaJsSquare,
	SiTypescript: SiTypescript,
};

const getLanguages = async () => {
	const response = await fetch("/api/skills");
	if (!response.ok) {
		throw new Error("Failed to fetch languages");
	}
	const data = await response.json();

	return (
		data[0]?.languages.map((lang: { name: string; icon: string }) => ({
			name: lang.name,
			icon: iconMap[lang.icon],
		})) || defaultLanguages
	);
};

function LanguageCard({
	language,
	index,
	onClick,
}: {
	language: Language;
	index: number;
	onClick: () => void;
}) {
	return (
		<motion.div
			key={language.name}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: index * 0.1 }}
			whileHover={{ scale: 1.05 }}
			className="relative group cursor-pointer"
			onClick={onClick}
		>
			<div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-orange-300/10 rounded-lg blur-md group-hover:blur-lg transition-all" />
			<div className="relative p-4 rounded-lg bg-card/80 backdrop-blur-sm border-none flex items-center gap-2">
				<language.icon className="h-8 w-8 text-orange-300/90 rounded p-1" />
				<span className="font-medium">{language.name}</span>
			</div>
		</motion.div>
	);
}

export function LanguagesGrid() {
	const router = useRouter();
	const [languages, setLanguages] = useState<Language[]>(defaultLanguages);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const handleLanguageClick = (language: Language) => {
		router.push(`/collection?search=${encodeURIComponent(language.name)}`);
	};

	useEffect(() => {
		const fetchLanguages = async () => {
			try {
				const data = await getLanguages();
				setLanguages(data || defaultLanguages); // Ensure fallback to defaultLanguages
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to load languages"
				);
			} finally {
				setIsLoading(false);
			}
		};
		fetchLanguages();
	}, []);

	if (isLoading) {
		return (
			<div className="space-y-4">
				<Skeleton className="h-8 w-32" />
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton key={i} className="h-16 w-full" />
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
			<h3 className="text-xl font-semibold">Languages</h3>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
				{languages.map((language, index) => (
					<LanguageCard
						key={language.name}
						language={language}
						index={index}
						onClick={() => handleLanguageClick(language)}
					/>
				))}
			</div>
		</div>
	);
}
