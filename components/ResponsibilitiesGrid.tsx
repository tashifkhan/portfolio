"use client";

import { ResponsibilityCard } from "./ResponsibilityCard";

type ResponsibilityType = "treasurer" | "secretary" | "executive" | "mentor";

const responsibilitiesData: Array<{
	title: string;
	organization: string;
	duration: string;
	type: ResponsibilityType;
}> = [
	{
		title: "Treasurer [Director Finance]",
		organization: "Optica Student Chapter JIIT",
		duration: "2024 - 2025",
		type: "treasurer",
	},
	{
		title: "Senior Adivsor",
		organization: "Optica Student Chapter JIIT",
		duration: "2025 - 2026",
		type: "executive",
	},
	{
		title: "Organizing Secretary & Co-Founder",
		organization: "Jaypee Parliament Debate",
		duration: "Jan 2024 - Aug 2024",
		type: "secretary",
	},
	{
		title: "Core Executive",
		organization: "JOUST'23 - Parola Literary Hub JIIT",
		duration: "Aug 2023 - Jan 2024",
		type: "executive",
	},
	{
		title: "Mentor",
		organization: "The Jaypee Debating Society",
		duration: "July 2023 - 2025",
		type: "mentor",
	},
	{
		title: "Senior Mentor",
		organization: "The Jaypee Debating Society",
		duration: "2025 - 2026",
		type: "mentor",
	},
];

export function ResponsibilitiesGrid() {
	return (
		<section className="py-16 px-4">
			<h2 className="text-3xl  text-center mb-16 font-mono">
				Positions of Responsibility
			</h2>
			<div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-6">
				{responsibilitiesData.map((responsibility, index) => (
					<ResponsibilityCard key={index} {...responsibility} index={index} />
				))}
			</div>
		</section>
	);
}
