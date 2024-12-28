"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

const MotionLink = motion(Link);

const socials = [
	{
		name: "GitHub",
		icon: Github,
		href: "https://github.com/tashifkhan",
	},
	{
		name: "LinkedIn",
		icon: Linkedin,
		href: "https://www.linkedin.com/in/tashif-ahmad-khan-982304244/",
	},
	{
		name: "InstaGram",
		icon: Instagram,
		href: "https://www.instagram.com/khan_tashif?igsh=MTVnOThleHFzb3M4aQ==",
	},
];

export function FooterSocials() {
	return (
		<div className="flex gap-4">
			{socials.map((social, index) => (
				<MotionLink
					key={social.name}
					href={social.href}
					target="_blank"
					rel="noopener noreferrer"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
					className="p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-primary/20 transition-colors"
				>
					<social.icon className="h-5 w-5" />
				</MotionLink>
			))}
		</div>
	);
}
