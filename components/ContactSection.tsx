"use client";

import { motion } from "framer-motion";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
	return (
		<section className="py-16 px-4">
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="max-w-7xl mx-auto"
			>
				<h2 className="text-3xl font-mono text-center mb-12 ent pt-28">
					Get in Touch
				</h2>
				<ContactForm />
			</motion.div>
		</section>
	);
}
