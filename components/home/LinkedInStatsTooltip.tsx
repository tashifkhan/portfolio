"use client";

import { motion } from "framer-motion";

const skills = [
	{
		title: "Final Year",
		detail: "Student",
		icon: "🎓",
	},
	{
		title: "Web Development",
		detail: "Full Stack",
		icon: "🌐",
	},
	{
		title: "Python",
		detail: "Programming",
		icon: "🐍",
	},
];

export default function LinkedInStatsTooltip({
	x,
	y,
}: {
	x: number;
	y: number;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			className="absolute bg-black/70 text-white p-6 rounded-xl shadow-2xl text-sm backdrop-blur-sm border-none"
			style={{
				left: x + 10,
				top: y + 10,
				transform: "translate(-50%, -50%)",
				zIndex: 1000,
				minWidth: "280px",
			}}
		>
			<div className="space-y-4">
				<h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3">
					Professional Summary
				</h3>
				<div className="space-y-3">
					{skills.map((skill, index) => (
						<motion.div
							key={skill.title}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}
							className="bg-gray-800/30 p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-800/40 transition-colors"
						>
							<span className="text-lg">{skill.icon}</span>
							<div className="text-left">
								<h4 className="font-medium text-orange-300">{skill.title}</h4>
								<p className="text-gray-400 text-sm">{skill.detail}</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
}
