import React from "react";
import Hero from "@/components/home/Hero";
import Featured from "@/components/projects/Featured";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { EducationTimeline } from "@/components/college/EducationTimeline";
import { ResponsibilitiesGrid } from "@/components/college/ResponsibilitiesGrid";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
	return (
		<div className="no-scrollbar bg-cover bg-center bg-custom-bg text-white h-screen snap-y snap-mandatory pt-28 sm:pt-36 overflow-scroll z-0">
			<section id="hero" className="snap-center">
				<Hero />
			</section>
			<section
				id="projects"
				className="snap-start w-screen h-screen overflow-y-auto
				   scrollbar-hide pb-28 sm:pb-0"
			>
				<Featured />
				<ProjectsGrid />
			</section>
			<section id="skills" className="snap-start pb-28 sm:pb-0">
				<SkillsSection />
			</section>
			<section id="education" className="snap-start pb-28 sm:pb-0">
				<EducationTimeline />
			</section>
			<section id="por" className="snap-start pb-28 sm:pb-0">
				<ResponsibilitiesGrid />
			</section>
			<section id="contact" className="snap-center pb-24 sm:pb-0">
				<ContactSection />
				<Footer />
			</section>
		</div>
	);
}
