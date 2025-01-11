"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
	Users,
	Presentation,
	Megaphone,
	LineChart,
	Palette,
	Pencil,
} from "lucide-react";

const softSkills = [
	{ name: "Leadership", icon: Users, category: "Soft Skills" },
	{ name: "Public Relations", icon: Megaphone, category: "Soft Skills" },
	{
		name: "Debating & Public Speaking",
		icon: Presentation,
		category: "Soft Skills",
	},
	{
		name: "Event & Financial Management",
		icon: LineChart,
		category: "Soft Skills",
	},
	{ name: "UI/UX Design", icon: Palette, category: "Other Avocations" },
	{ name: "Content Writing", icon: Pencil, category: "Other Avocations" },
];

export function SoftSkillsGrid() {
	return (
		<div className="space-y-4">
			<h3 className="text-xl font-semibold ">Soft Skills & Other Avocations</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{softSkills.map((skill, index) => (
					<motion.div
						key={skill.name}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: index * 0.1,
							ease: "easeOut",
						}}
						whileHover={{
							scale: 1.02,
							transition: { duration: 0.2 },
						}}
					>
						<Card className="relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/20 transition-all duration-300">
							<div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-pink-500/10 opacity-50" />
							<div className="relative p-6">
								<div className="flex items-center gap-4">
									<div className="p-3 rounded-lg bg-gradient-to-br from-orange-400/20 to-pink-500/20 backdrop-blur-md">
										<skill.icon className="h-6 w-6 text-orange-300" />
									</div>
									<div>
										<h4 className="font-semibold text-lg text-white/90">
											{skill.name}
										</h4>
										<p className="text-sm text-white/60">{skill.category}</p>
									</div>
								</div>
							</div>
						</Card>
					</motion.div>
				))}
			</div>
		</div>
	);
}
