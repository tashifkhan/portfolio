import React, { Suspense } from "react";
import Hero from "@/components/home/Hero";
import Featured from "@/components/projects/Featured";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { EducationTimeline } from "@/components/college/EducationTimeline";
import { ResponsibilitiesGrid } from "@/components/college/ResponsibilitiesGrid";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";
import { Loader } from "@/components/ui/loader";

export default function Home() {
	return (
		<div className="no-scrollbar bg-cover text-white snap-y  h-screen pt-28 sm:pt-36 overflow-scroll z-0">
			<section id="hero" className="snap-center">
				<Hero />
			</section>
			<section
				id="projects"
				className="snap-none w-screen min-h-screen pb-28 sm:pb-0"
			>
				<Suspense fallback={<Loader />}>
					<Featured />
					<ProjectsGrid />
				</Suspense>
			</section>
			<section id="skills" className="snap-none pb-28 sm:pb-0">
				<SkillsSection />
			</section>
			<section id="education" className="snap-none pb-28 sm:pb-0">
				<EducationTimeline />
			</section>
			<section id="por" className="snap-none pb-28 sm:pb-0">
				<ResponsibilitiesGrid />
			</section>
			<section id="contact" className="snap-none md:snap-center pb-24 sm:pb-0">
				<ContactSection />
				<Footer />
			</section>
		</div>
	);
}
