import React from "react";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { EducationTimeline } from "@/components/EducationTimeline";
import { ResponsibilitiesGrid } from "@/components/ResponsibilitiesGrid";

export default function Home() {
	return (
		<div className="no-scrollbar bg-cover bg-center bg-custom-bg text-white h-screen snap-y snap-mandatory pt-28 sm:pt-36 overflow-scroll z-0">
			<section id="hero" className="snap-center">
				<Hero />
			</section>
			<section
				id="projects"
				className="snap-start w-screen h-screen overflow-y-auto
				   scrollbar-hide"
			>
				<Featured />
				<ProjectsGrid />
			</section>
			<section id="education" className="snap-start">
				<EducationTimeline />
			</section>
			<section id="por" className="snap-start">
				<ResponsibilitiesGrid />
			</section>
		</div>
	);
}
