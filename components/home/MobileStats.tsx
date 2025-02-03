"use client";

import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import { StatContent } from "./StatContent";

type StatsModalProps = {
	isOpen: boolean;
	onClose: () => void;
	type: "github" | "leetcode" | "linkedin";
};

export function MobileStats({ isOpen, onClose, type }: StatsModalProps) {
	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscapeKey);
		}

		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<motion.div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={onClose}
		>
			<motion.div
				className="relative max-w-sm w-full"
				initial={{ scale: 0.95, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="relative bg-black/70 text-white p-6 rounded-xl shadow-2xl backdrop-blur-sm">
					<button
						onClick={onClose}
						className="absolute -right-2 -top-2 z-10 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
					>
						<IoClose size={20} />
					</button>
					<StatContent type={type} />
				</div>
			</motion.div>
		</motion.div>
	);
}
