"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import { LoginForm } from "../admin/LoginForm";

type Props = {
	showLoginModal: boolean;
	setShowLoginModal: (b: boolean) => void;
	handleLoginSuccess: () => void;
};

export default function LoginModal({
	showLoginModal,
	setShowLoginModal,
	handleLoginSuccess,
}: Props) {
	return (
		<AnimatePresence>
			{showLoginModal && (
				<motion.div
					className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className="max-w-md w-full"
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
					>
						<div className="mb-4 flex justify-end">
							<button
								onClick={() => setShowLoginModal(false)}
								className="text-white hover:text-orange-300 p-2 hover:bg-white/10 rounded-full transition-all duration-300"
							>
								<HiX size={24} />
							</button>
						</div>
						<LoginForm onSuccess={handleLoginSuccess} />
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
