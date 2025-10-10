"use client";

import React, { useEffect, useState } from "react";
import ExperienceCard, { ExperienceItem } from "./ExperienceCard";
import { Building2, ArrowRight } from "lucide-react";

// will be populated from API
const experiencesInitial: ExperienceItem[] = [];

export const ExperienceSection: React.FC = () => {
	const [experiences, setExperiences] =
		useState<ExperienceItem[]>(experiencesInitial);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/experience");
				if (!res.ok) throw new Error("Failed fetching experience");
				const data = await res.json();
				if (mounted) setExperiences(data);
			} catch (err: any) {
				console.error("Error loading experiences:", err);
				if (mounted) setError(err?.message || "Error");
			} finally {
				if (mounted) setLoading(false);
			}
		};
		fetchData();
		return () => {
			mounted = false;
		};
	}, []);

	return (
		<section className="relative py-20 overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-700/10 via-orange-800/5 to-transparent rounded-full blur-3xl" />

			<div className="relative max-w-6xl mx-auto px-4 md:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-200 text-sm font-medium mb-6">
						<Building2 className="w-4 h-4" />
						Professional Journey
					</div>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						<span className="bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
							Work
						</span>{" "}
						<span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
							Experience
						</span>
					</h2>
					<p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
						My professional journey through various roles, companies, and
						technologies. Each experience has shaped my skills and perspective
						in software development.
					</p>
				</div>

				{/* Experience Timeline */}
				<div className="relative space-y-8">
					{loading ? (
						<div className="flex justify-center py-12">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
						</div>
					) : error ? (
						<div className="text-center text-red-400">{error}</div>
					) : (
						experiences.map((experience, index) => (
							<ExperienceCard
								key={experience._id || `${experience.title}-${index}`}
								experience={experience}
								index={index}
								total={experiences.length}
							/>
						))
					)}
				</div>

				{/* View Resume Button */}
				<div className="text-center mt-16">
					<a
						href="/Resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
					>
						View Full Resume
						<ArrowRight className="w-5 h-5" />
					</a>
				</div>
			</div>
		</section>
	);
};
