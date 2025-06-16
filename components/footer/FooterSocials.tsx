"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Socials } from "@/types/content";

const MotionLink = motion(Link);

export function FooterSocials() {
	const [socials, setSocials] = useState<Socials | null>(null);

	useEffect(() => {
		const fetchSocials = async () => {
			try {
				const response = await fetch("/api/socials");
				if (response.ok) {
					const data = await response.json();
					setSocials(data);
				}
			} catch (error) {
				console.error("Failed to fetch socials:", error);
			}
		};

		fetchSocials();
	}, []);

	if (!socials) {
		return null; // or a loading skeleton
	}

	const socialLinks = [
		{
			name: "GitHub",
			icon: Github,
			href: `https://github.com/${socials.GithubID}`,
		},
		{
			name: "LinkedIn",
			icon: Linkedin,
			href: `https://www.linkedin.com/in/${socials.LinkedInID}/`,
		},
		{
			name: "Instagram",
			icon: Instagram,
			href: `https://www.instagram.com/${socials.InstaID}/`,
		},
		{
			name: "Twitter",
			icon: Twitter,
			href: `https://twitter.com/${socials.TwitterID}`,
		},
		{
			name: "Resume",
			icon: FileText,
			href: socials.ResumeLink,
		},
	];

	return (
		<div className="flex gap-4">
			{socialLinks.map((social, index) => (
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
