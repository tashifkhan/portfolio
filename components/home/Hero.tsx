"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { SiLeetcode } from "react-icons/si";
import { FaGithubSquare } from "react-icons/fa";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import GithubStatsTooltip from "./GithubStatsTooltip";
import LeetcodeStatsTooltip from "./LeetcodeStatsTooltip";
import LinkedInStatsTooltip from "./LinkedInStatsTooltip";
import { MobileStats } from "./MobileStats";
import BgCircles from "@/components/home/BgCircles";
import { Socials } from "@/types/content";

type SocialType = "github" | "leetcode" | "linkedin" | null;

function Hero() {
	const [showGithubStats, setShowGithubStats] = useState(false);
	const [showLeetcodeStats, setShowLeetcodeStats] = useState(false);
	const [showLinkedInStats, setShowLinkedInStats] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [mobileStatsType, setMobileStatsType] = useState<SocialType>(null);
	const [isMobile, setIsMobile] = useState(false);
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

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const handleSocialClick = (type: SocialType, e: React.MouseEvent) => {
		if (isMobile && type) {
			e.preventDefault();
			setMobileStatsType(type);
		}
	};

	const [text] = useTypewriter({
		words: [
			"Web Developer",
			"UI/UX Designer",
			"App Developer",
			"Freelancer",
			"Final Year Student",
		],
		loop: true,
		deleteSpeed: 50,
		typeSpeed: 100,
		delaySpeed: 2000,
	});

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const item = {
		hidden: { y: 20, opacity: 0 },
		show: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring" as const,
				stiffness: 100,
			},
		},
	};

	return (
		<div className="h-screen flex flex-col items-center justify-center text-center overflow-hidden relative">
			<BgCircles />

			<motion.div
				className="z-10 flex flex-col items-center space-y-8 px-4"
				variants={container}
				initial="hidden"
				animate="show"
			>
				{/* Profile Image */}
				<motion.div variants={item} className="relative">
					<div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 opacity-75 blur-sm animate-pulse"></div>
					<Image
						src="/bg01.jpeg"
						alt="Tashif Ahmad Khan"
						width="192"
						height="192"
						quality="95"
						priority={true}
						className="h-32 w-32 rounded-full object-cover border-[0.35rem] border-white/90 shadow-xl relative"
					/>
				</motion.div>

				{/* Name */}
				<motion.h1
					variants={item}
					className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-300"
				>
					Tashif Ahmad Khan
				</motion.h1>

				{/* Typewriter text */}
				<motion.div
					variants={item}
					className="text-xl md:text-2xl font-medium text-white/80"
				>
					<span className="text-orange-300">{text}</span>
					<Cursor cursorColor="#F7ABBA" />
				</motion.div>

				{/* Action buttons */}
				<motion.div
					variants={item}
					className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
				>
					<Link
						href="#contact"
						className="group bg-gradient-to-r from-orange-400 to-orange-500 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:from-orange-500 hover:to-orange-600 active:scale-105 transition w-full sm:w-auto justify-center sm:justify-start shadow-lg shadow-orange-500/20"
					>
						Contact me here{" "}
						<BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
					</Link>

					<Link
						className="group px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 w-full sm:w-auto justify-center sm:justify-start"
						href={socials?.ResumeLink || "/Resume.pdf"}
						target="_blank"
					>
						Resume{" "}
						<HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
					</Link>
				</motion.div>

				{/* Social links */}
				<motion.div
					variants={item}
					className="flex items-center justify-center gap-5 px-4 text-xl"
				>
					<SocialLink
						icon={<BsLinkedin className="text-2xl" />}
						href={
							socials
								? `https://www.linkedin.com/in/${socials.LinkedInID}/`
								: "https://www.linkedin.com/in/tashif-ahmad-khan-982304244/"
						}
						type="linkedin"
						onShowStats={setShowLinkedInStats}
						onMousePosChange={setMousePos}
						onSocialClick={handleSocialClick}
						isMobile={isMobile}
					/>

					<SocialLink
						icon={<FaGithubSquare className="text-2xl" />}
						href={
							socials
								? `https://github.com/${socials.GithubID}`
								: "https://github.com/tashifkhan"
						}
						type="github"
						onShowStats={setShowGithubStats}
						onMousePosChange={setMousePos}
						onSocialClick={handleSocialClick}
						isMobile={isMobile}
					/>

					<SocialLink
						icon={<SiLeetcode className="text-2xl" />}
						href={
							socials
								? `https://leetcode.com/${socials.LeetCodeID}`
								: "https://leetcode.com/khan-tashif"
						}
						type="leetcode"
						onShowStats={setShowLeetcodeStats}
						onMousePosChange={setMousePos}
						onSocialClick={handleSocialClick}
						isMobile={isMobile}
					/>
				</motion.div>
			</motion.div>

			{/* Stats tooltips for desktop */}
			{!isMobile && (
				<>
					{showGithubStats && (
						<GithubStatsTooltip x={mousePos.x} y={mousePos.y} />
					)}
					{showLeetcodeStats && (
						<LeetcodeStatsTooltip x={mousePos.x} y={mousePos.y} />
					)}
					{showLinkedInStats && (
						<LinkedInStatsTooltip x={mousePos.x} y={mousePos.y} />
					)}
				</>
			)}

			{/* Mobile stats modal */}
			<MobileStats
				isOpen={mobileStatsType !== null}
				onClose={() => setMobileStatsType(null)}
				type={mobileStatsType || "github"}
			/>
		</div>
	);
}

interface SocialLinkProps {
	icon: React.ReactNode;
	href: string;
	type: "github" | "leetcode" | "linkedin";
	onShowStats: (show: boolean) => void;
	onMousePosChange: (pos: { x: number; y: number }) => void;
	onSocialClick: (type: SocialType, e: React.MouseEvent) => void;
	isMobile: boolean;
}

function SocialLink({
	icon,
	href,
	type,
	onShowStats,
	onMousePosChange,
	onSocialClick,
	isMobile,
}: SocialLinkProps) {
	return (
		<Link
			className="p-4 flex items-center justify-center rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white/80 hover:text-white shadow-lg"
			href={href}
			target="_blank"
			onClick={(e) => onSocialClick(type, e)}
			onMouseEnter={(e) => {
				if (!isMobile) {
					onShowStats(true);
					onMousePosChange({ x: e.clientX, y: e.clientY });
				}
			}}
			onMouseLeave={() => onShowStats(false)}
			onMouseMove={(e) => onMousePosChange({ x: e.clientX, y: e.clientY })}
		>
			{icon}
		</Link>
	);
}

export default Hero;
