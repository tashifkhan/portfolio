"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { Cursor, useTypewriter } from "react-simple-typewriter";

import BgCircles from "@/components/BgCircles";

type Props = {};

function Hero({}: Props) {
	const [text, count] = useTypewriter({
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
		<div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
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

				<a
					className="group px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack bg-white/10 z-50"
					href="/Resume.pdf"
					target="_blank"
					// download
				>
					Resume{" "}
					<HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
				</a>
			</motion.div>
			<motion.div
				className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.1,
				}}
			>
				<a
					className="p-4 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack bg-white/10 text-white/60 z-50"
					href="https://www.linkedin.com/in/tashif-ahmad-khan-982304244/"
					target="_blank"
				>
					<BsLinkedin />
				</a>

				<a
					className="p-4 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack bg-white/10 text-white/60 z-50"
					href="https://github.com/tashifkhan"
					target="_blank"
				>
					<FaGithubSquare />
				</a>
			</motion.div>
			<div>
				<span className="text-orange-300">{text}</span>
				<Cursor cursorColor="#F7ABBA" />{" "}
			</div>
		</div>
	);
}

export default Hero;
