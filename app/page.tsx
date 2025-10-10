import React, { Suspense } from "react";
import Hero from "@/components/home/Hero";
import Featured from "@/components/projects/Featured";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { EducationTimeline } from "@/components/college/EducationTimeline";
import { ResponsibilitiesGrid } from "@/components/college/ResponsibilitiesGrid";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";
import { BlogSection } from "@/components/blog/BlogSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { Loader } from "@/components/ui/loader";

export default function Home() {
	return (
		<div className="no-scrollbar bg-cover text-white snap-y h-screen pt-28 sm:pt-36 overflow-scroll z-0">
			{/* Hero Section */}
			<section id="hero" className="snap-center">
				<Hero />
			</section>

			{/* Projects Section */}
			<section
				id="projects"
				className="snap-proximity w-screen min-h-screen pb-28 sm:pb-0"
			>
				<Suspense fallback={<Loader />}>
					<Featured />
					<ProjectsGrid />
				</Suspense>
			</section>

			{/* Blog Section */}
			<section id="blog" className="snap-none pb-28 sm:pb-0">
				<BlogSection />
			</section>

			{/* About Me Section */}
			<section id="about" className="snap-none pb-28 sm:pb-0">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl md:text-5xl font-bold text-center mb-16"></h2>
					{/* Experience Subsection */}
					<div id="experience" className="mb-16">
						<ExperienceSection />
					</div>

					{/* Skills Subsection */}
					<div id="skills" className="mb-16">
						<SkillsSection />
					</div>

					{/* Education Subsection */}
					<div id="education" className="mb-16">
						<EducationTimeline />
					</div>

					{/* Recognitions Subsection */}
					<div id="recognitions" className="mb-16">
						<ResponsibilitiesGrid />
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="snap-none pb-24 sm:pb-0">
				<ContactSection />
				<Footer />
			</section>
		</div>
	);
}
