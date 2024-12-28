"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Trophy, Users, BookOpen, MessageSquare } from "lucide-react";

const icons = {
	treasurer: Trophy,
	secretary: Users,
	executive: BookOpen,
	mentor: MessageSquare,
};

interface ResponsibilityCardProps {
	title: string;
	organization: string;
	duration: string;
	type: keyof typeof icons;
	index: number;
}

export function ResponsibilityCard({
	title,
	organization,
	duration,
	type,
	index,
}: ResponsibilityCardProps) {
	const Icon = icons[type];

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			whileHover={{ scale: 1.05, rotateX: 5 }}
		>
			<Card className="relative p-6 h-full bg-card/40 backdrop-blur-md border border-white/10 shadow-xl hover:shadow-white/20 hover:border-white/30 transition-all duration-300 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
				<div className="relative flex items-start gap-4 z-10">
					<div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-inner">
						<Icon className="h-6 w-6 text-white drop-shadow-md" />
					</div>
					<div className="space-y-1">
						<h3 className="font-bold text-lg tracking-tight textslate-200/90">
							{title}
						</h3>
						<p className="text-slate-200/90 font-medium">{organization}</p>
						<p className="text-sm text-slate-200/75 mt-2">{duration}</p>
					</div>
				</div>
			</Card>
		</motion.div>
	);
}
