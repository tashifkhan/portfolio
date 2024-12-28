"use client";

import { LanguagesGrid } from "./LanguagesGrid";
import FrameworksCarousel from "./FrameworksCarousel";
import { ToolsGrid } from "./ToolsGrid";
import { SoftSkillsGrid } from "./SoftSkillsGrid";

export function SkillsSection() {
	return (
		<section className="relative py-20 px-4 overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 dark:from-background dark:to-background/30" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

			<div className="relative">
				{/* Fancy heading with animation */}
				<h2 className="text-4xl m-5 text-center font-mono">
					Skills & Interests
				</h2>

				{/* Content with fade-in animation */}
				<div className="max-w-7xl mx-auto space-y-16 animate-fade-in">
					<div className="transform hover:scale-[1.01] transition-transform duration-300">
						<LanguagesGrid />
					</div>

					<div className="transform hover:scale-[1.01] transition-transform duration-300">
						<FrameworksCarousel />
					</div>

					<div className="transform hover:scale-[1.01] transition-transform duration-300">
						<ToolsGrid />
					</div>

					<div className="transform hover:scale-[1.01] transition-transform duration-300">
						<SoftSkillsGrid />
					</div>
				</div>
			</div>
		</section>
	);
}
