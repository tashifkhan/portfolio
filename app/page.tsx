import Header from "@/components/Header";
import React from "react";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";

export default function Home() {
	return (
		<div className="no-scrollbar bg-cover bg-center bg-custom-bg text-white h-screen snap-y snap-mandatory pt-28 sm:pt-36 overflow-scroll z-0">
			<Header />
			<section id="hero" className="snap-center">
				<Hero />
			</section>
			<section
				id="projects"
				className="snap-start w-screen h-screen overflow-y-auto
				   scrollbar-hide"
			>
				<Featured />
			</section>
		</div>
	);
}
