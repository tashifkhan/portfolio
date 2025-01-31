"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { SiLeetcode } from "react-icons/si";
import { FaGithubSquare } from "react-icons/fa";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { useState } from "react";
import GithubStatsTooltip from "./GithubStatsTooltip";
import LeetcodeStatsTooltip from "./LeetcodeStatsTooltip";
import LinkedInStatsTooltip from "./LinkedInStatsTooltip";
import { MobileStats } from "./MobileStats";

import BgCircles from "@/components/home/BgCircles";

type Props = {};

function Hero({}: Props) {
	const [showGithubStats, setShowGithubStats] = useState(false);
	const [showLeetcodeStats, setShowLeetcodeStats] = useState(false);
	const [showLinkedInStats, setShowLinkedInStats] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [mobileStatsType, setMobileStatsType] = useState<
		"github" | "leetcode" | "linkedin" | null
	>(null);
	const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

	const handleSocialClick = (
		type: "github" | "leetcode" | "linkedin",
		e: React.MouseEvent
	) => {
		if (isMobile) {
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
			"Pre Final Year Student",
		],
		loop: true,
		deleteSpeed: 50,
		typeSpeed: 100,
		delaySpeed: 2000,
	});
	return (
		<div className="h-screen flex flex-col space-y-6 items-center justify-center text-center overflow-hidden">
			<BgCircles />
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					type: "tween",
					duration: 0.2,
				}}
			>
				<Image
					src="/bg01.jpeg"
					alt="Ricardo portrait"
					width="192"
					height="192"
					quality="95"
					priority={true}
					className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
				/>
			</motion.div>{" "}
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					type: "tween",
					duration: 0.2,
				}}
				className="text-3xl font-bold"
			>
				Tashif Ahmad Khan
			</motion.div>{" "}
			<motion.div
				className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.1,
				}}
			>
				<Link
					href="#contact"
					className="group bg-orange-400 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none bg-opacity-80 focus:scale-110 hover:scale-110 hover:bg-orange-600 active:scale-105 transition z-50"
				>
					Contact me here{" "}
					<BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
				</Link>

				<Link
					className="group px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack bg-white/10 z-50"
					href="/Resume.pdf"
					target="_blank"
					// download
				>
					Resume{" "}
					<HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
				</Link>
			</motion.div>
			<motion.div
				className="flex flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.1,
				}}
			>
				<Link
					className="p-4 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack bg-white/10 text-white/60 z-50"
					href="https://www.linkedin.com/in/tashif-ahmad-khan-982304244/"
					target="_blank"
					onClick={(e) => handleSocialClick("linkedin", e)}
					onMouseEnter={(e) => {
						if (!isMobile) {
							setShowLinkedInStats(true);
							setMousePos({ x: e.clientX, y: e.clientY });
						}
					}}
					onMouseLeave={() => setShowLinkedInStats(false)}
					onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
				>
					<BsLinkedin />
				</Link>
				<Link
					className="p-4 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack bg-white/10 text-white/60 z-50"
					href="https://github.com/tashifkhan"
					target="_blank"
					onClick={(e) => handleSocialClick("github", e)}
					onMouseEnter={(e) => {
						if (!isMobile) {
							setShowGithubStats(true);
							setMousePos({ x: e.clientX, y: e.clientY });
						}
					}}
					onMouseLeave={() => setShowGithubStats(false)}
					onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
				>
					<FaGithubSquare />
				</Link>
				<Link
					className="p-4 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack bg-white/10 text-white/60 z-50"
					href="https://leetcode.com/khan-tashif"
					target="_blank"
					onClick={(e) => handleSocialClick("leetcode", e)}
					onMouseEnter={(e) => {
						if (!isMobile) {
							setShowLeetcodeStats(true);
							setMousePos({ x: e.clientX, y: e.clientY });
						}
					}}
					onMouseLeave={() => setShowLeetcodeStats(false)}
					onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
				>
					<SiLeetcode />
				</Link>
			</motion.div>
			{/* Only show tooltips on non-mobile devices */}
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
			<MobileStats
				isOpen={mobileStatsType !== null}
				onClose={() => setMobileStatsType(null)}
				type={mobileStatsType || "github"}
			/>
			<div>
				<span className="text-orange-300">{text}</span>
				<Cursor cursorColor="#F7ABBA" />{" "}
			</div>
		</div>
	);
}

export default Hero;
