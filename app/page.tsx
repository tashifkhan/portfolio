import Image from "next/image";
import Header from "@/components/Header";
import React from "react";
import Hero from "@/components/Hero";

export default function Home() {
	return (
		<div className="bg-neutral-900 text-white h-screen snap-y snap-mandatory">
			<Header />
			<Hero />
		</div>
	);
}
