"use client";

import { useState, useEffect } from "react";
import { TimelineNode } from "./TimelineNode";
import { Skeleton } from "@/components/ui/skeleton";

interface Education {
	title: string;
	institution: string;
	score: string;
	duration: string;
}

const getEducation = async () => {
	const response = await fetch("/api/edu");
	if (!response.ok) {
		throw new Error("Failed to fetch education data");
	}
	const data = await response.json();
	return data[0]?.educationData || [];
};

export function EducationTimeline() {
	const [educationData, setEducationData] = useState<Education[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEducation = async () => {
			try {
				const data = await getEducation();
				setEducationData(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to load education data"
				);
			} finally {
				setIsLoading(false);
			}
		};
		fetchEducation();
	}, []);

	if (error) {
		return (
			<section className="py-24 relative">
				<div className="text-center text-red-500">Error: {error}</div>
			</section>
		);
	}

	return (
		<section className="py-24 relative">
			<div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

			<h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
				Education Timeline
			</h2>

			<div className="max-w-5xl mx-auto px-6">
				<div className="space-y-8 relative">
					{isLoading
						? Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className="flex gap-4">
									<Skeleton className="h-4 w-4 rounded-full" />
									<div className="space-y-2 flex-1">
										<Skeleton className="h-5 w-1/4" />
										<Skeleton className="h-4 w-3/4" />
										<Skeleton className="h-4 w-1/2" />
									</div>
								</div>
						  ))
						: educationData.map((education, index) => (
								<TimelineNode
									key={education.title}
									{...education}
									index={index}
								/>
						  ))}
				</div>
			</div>
		</section>
	);
}
