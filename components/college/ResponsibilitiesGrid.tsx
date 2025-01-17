"use client";

import { useState, useEffect } from "react";
import { ResponsibilityCard } from "./ResponsibilityCard";

type ResponsibilityType = "treasurer" | "secretary" | "executive" | "mentor";

interface Responsibility {
	title: string;
	organization: string;
	duration: string;
	type: ResponsibilityType;
}

const getResponsibilities = async () => {
	const response = await fetch("/api/edu");
	if (!response.ok) {
		throw new Error("Failed to fetch responsibilities data");
	}
	const data = await response.json();
	return data[0]?.responsibilitiesData || [];
};

export function ResponsibilitiesGrid() {
	const [responsibilitiesData, setResponsibilitiesData] = useState<
		Responsibility[]
	>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchResponsibilities = async () => {
			try {
				const data = await getResponsibilities();
				setResponsibilitiesData(data);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Failed to load responsibilities data"
				);
			} finally {
				setIsLoading(false);
			}
		};
		fetchResponsibilities();
	}, []);

	if (error) {
		return (
			<section className="py-8 md:py-16 px-4">
				<div className="text-center text-red-500">Error: {error}</div>
			</section>
		);
	}

	return (
		<section className="py-8 md:py-16 px-4">
			<h2 className="text-2xl pt-0 sm:pt-28 md:text-3xl text-center mb-8 md:mb-16 font-mono">
				Positions of Responsibility
			</h2>
			<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
				{isLoading
					? Array.from({ length: 5 }).map((_, i) => (
							<div
								key={i}
								className="h-48 bg-gray-800 rounded-lg animate-pulse"
							/>
					  ))
					: responsibilitiesData.map((responsibility, index) => (
							<ResponsibilityCard
								key={index}
								{...responsibility}
								index={index}
							/>
					  ))}
			</div>
		</section>
	);
}
