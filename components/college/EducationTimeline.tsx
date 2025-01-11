"use client";

import { TimelineNode } from "./TimelineNode";

const educationData = [
	{
		title: "B.Tech (ECE)",
		institution: "Jaypee Institute of Information Technology, Noida-62",
		score: "CGPA: 7.2",
		duration: "Sept 2022 - June 2026",
	},
	{
		title: "CBSE XII",
		institution: "Delhi Public School, R.K. Puram",
		score: "94.6%",
		duration: "2022",
	},
	{
		title: "CBSE X",
		institution: "Delhi Public School, R.K. Puram",
		score: "93.7%",
		duration: "2020",
	},
];

export function EducationTimeline() {
	return (
		<section className="py-24 relative">
			{/* Background gradient blur effect */}
			<div className="absolute inset-0 bg-gradient-to-b from-orange-300/5 to-transparent pointer-events-none" />

			<h2 className="text-4xl  text-center mb-16 font-mono">
				Education Timeline
			</h2>

			<div className="max-w-5xl mx-auto px-6">
				{/* Vertical line for timeline */}
				<div className="absolute left-[51%] h-full w-0.5 bg-gradient-to-b from-orange-300/50 via-orange-300/30 to-transparent transform -translate-x-1/2" />

				<div className="space-y-16 relative">
					{educationData.map((education, index) => (
						<div key={index} className="group">
							<TimelineNode {...education} index={index} />
							{/* Animated dot for timeline */}
							<div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-orange-300 shadow-lg shadow-orange-300/50 group-hover:scale-150 transition-transform duration-300" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
