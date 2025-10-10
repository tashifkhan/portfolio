"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2, ExternalLink } from "lucide-react";

export type ExperienceItem = {
	_id?: string;
	title: string;
	company: string;
	location: string;
	startDate: string;
	endDate?: string;
	current?: boolean;
	// description entries are HTML strings and will be set as innerHTML
	description: string[];
	technologies: string[];
	companyUrl?: string;
};

const ExperienceCard: React.FC<{
	experience: ExperienceItem;
	index: number;
	total: number;
}> = ({ experience, index, total }) => {
	return (
		<div className="relative">
			{index < total - 1 && (
				<div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-orange-500/50 to-transparent" />
			)}

			<div className="absolute left-4 top-8 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg" />

			<Card className="ml-12 group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20">
				<CardHeader className="pb-4">
					<div className="flex items-start justify-between mb-3">
						<div className="flex-1">
							<CardTitle className="text-xl font-bold text-white group-hover:text-orange-200 transition-colors">
								{experience.title}
							</CardTitle>
							<div className="flex items-center gap-2 mt-2">
								<Building2 className="w-4 h-4 text-orange-400" />
								<span className="text-white/80 font-medium">
									{experience.company}
								</span>
								{experience.companyUrl && (
									<a
										href={experience.companyUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-orange-400 hover:text-orange-300 transition-colors"
									>
										<ExternalLink className="w-4 h-4" />
									</a>
								)}
							</div>
						</div>
						<div className="text-right">
							<Badge
								variant="secondary"
								className={`${
									experience.current
										? "bg-green-500/20 text-green-200 border-green-500/30"
										: "bg-gray-500/20 text-gray-300 border-gray-500/30"
								}`}
							>
								{experience.current ? "Current" : "Past"}
							</Badge>
						</div>
					</div>

					<div className="flex items-center gap-4 text-sm text-white/60">
						<div className="flex items-center gap-1">
							<Calendar className="w-4 h-4" />
							<span>
								{new Date(experience.startDate).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
								})}{" "}
								-{" "}
								{experience.current
									? "Present"
									: experience.endDate
									? new Date(experience.endDate).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
									  })
									: ""}
							</span>
						</div>
						<div className="flex items-center gap-1">
							<MapPin className="w-4 h-4" />
							<span>{experience.location}</span>
						</div>
					</div>
				</CardHeader>

				<CardContent className="space-y-4">
					<div className="space-y-2">
						{experience.description.map((item, idx) => {
							// decode entities and ensure anchors open safely
							const processed = (() => {
								try {
									const parser = new DOMParser();
									// first, decode entities by parsing as text/html
									const decodedDoc = parser.parseFromString(item, "text/html");

									// Remove any script tags to mitigate simple XSS
									decodedDoc
										.querySelectorAll("script")
										.forEach((s) => s.remove());

									// Ensure anchor tags open in new tab safely
									decodedDoc.querySelectorAll("a").forEach((a) => {
										a.setAttribute("target", "_blank");
										a.setAttribute("rel", "noopener noreferrer");
										// visually indicate links: orange color + underline
										try {
											(a as HTMLElement).style.color = "#fb923c"; // tailwind orange-400
											(a as HTMLElement).style.textDecoration = "underline";
										} catch (e) {
											/* ignore */
										}
									});

									return decodedDoc.body.innerHTML;
								} catch (e) {
									return item;
								}
							})();

							return (
								<div key={idx} className="flex items-start gap-2">
									<div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
									<div
										className="text-sm text-white/70 leading-relaxed"
										dangerouslySetInnerHTML={{ __html: processed }}
									/>
								</div>
							);
						})}
					</div>

					<div className="flex flex-wrap gap-2 pt-2">
						{experience.technologies.map((tech, techIndex) => (
							<Badge
								key={techIndex}
								variant="outline"
								className="text-xs bg-white/5 text-white/60 border-white/20 group-hover:bg-orange-500/10 group-hover:text-orange-200 group-hover:border-orange-500/30 transition-all duration-300"
							>
								{tech}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ExperienceCard;
