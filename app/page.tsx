import Image from "next/image";
import Header from "@/components/Header";
import React from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
	return (
		<div className="bg-cover bg-center bg-custom-bg text-white h-screen snap-y snap-mandatory pt-28 sm:pt-36 overflow-scroll z-0">
			<Header />
			<section id="hero" className="snap-center">
				<Hero />
			</section>
			<section id="projects" className="snap-center w-screen h-screen">
				<Projects />
			</section>
		</div>
	);
}
