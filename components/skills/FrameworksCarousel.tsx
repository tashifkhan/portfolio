"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface Framework {
	name: string;
	description: string;
}

const defaultFrameworks: Framework[] = [
	{ name: "Next.js", description: "React Framework" },
	{ name: "React.js", description: "UI Library" },
	{ name: "React Native", description: "Mobile Development" },
	{ name: "Express.js", description: "Backend Framework" },
	{ name: "Node.js", description: "Runtime Environment" },
	{ name: "Tailwind CSS", description: "Utility-first CSS" },
	{ name: "Flask", description: "Python Framework" },
];

const getFrameworks = async () => {
	const response = await fetch("/api/skills");
	if (!response.ok) {
		throw new Error("Failed to fetch frameworks");
	}
	const data = await response.json();
	console.log(data);
	return data[0]?.frameworks || defaultFrameworks;
};

const FrameworksCarousel = () => {
	const [frameworks, setFrameworks] = useState<Framework[]>(defaultFrameworks);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const fetchFrameworks = async () => {
			try {
				const data = await getFrameworks();
				setFrameworks(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to load frameworks"
				);
			} finally {
				setIsLoading(false);
			}
		};
		fetchFrameworks();
	}, []);

	const checkScroll = () => {
		if (!containerRef.current) return;
		const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
		setCanScrollLeft(scrollLeft > 0);
		setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 1);
	};

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			checkScroll();
			const observer = new ResizeObserver(() => {
				checkScroll();
			});
			observer.observe(container);
			container.addEventListener("scroll", checkScroll);

			return () => {
				observer.disconnect();
				container.removeEventListener("scroll", checkScroll);
			};
		}
	}, []);

	const scroll = (direction: "left" | "right") => {
		if (!containerRef.current) return;
		const container = containerRef.current;
		const cardWidth = 320; // Width of card (256px) + gap (16px)
		const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

		container.scrollTo({
			left: container.scrollLeft + scrollAmount,
			behavior: "smooth",
		});

		// Update scroll buttons state after animation
		setTimeout(checkScroll, 300);
	};

	if (isLoading) {
		return (
			<div className="space-y-4">
				<div className="flex gap-2">
					<Skeleton className="h-8 w-8 rounded-full" />
					<Skeleton className="h-8 w-8 rounded-full" />
				</div>
				<div className="flex gap-4">
					{Array.from({ length: 3 }).map((_, i) => (
						<Skeleton key={i} className="h-24 w-64" />
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return <div className="text-red-500">Error: {error}</div>;
	}

	return (
		<div className="space-y-4">
			<div className="flex gap-2">
				<button
					onClick={() => scroll("left")}
					disabled={!canScrollLeft}
					className="p-2 rounded-full bg-orange-300/10 hover:bg-orange-300/20 backdrop-blur-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<ArrowRight className="h-4 w-4 rotate-180 text-orange-300" />
				</button>
				<button
					onClick={() => scroll("right")}
					disabled={!canScrollRight}
					className="p-2 rounded-full bg-orange-300/10 hover:bg-orange-300/20 backdrop-blur-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<ArrowRight className="h-4 w-4 text-orange-300" />
				</button>
			</div>
			<div className="relative">
				<div
					ref={containerRef}
					className="flex gap-4 overflow-x-auto scroll-smooth"
					style={{
						scrollbarWidth: "none",
						msOverflowStyle: "none",
						WebkitOverflowScrolling: "touch",
					}}
				>
					{frameworks.map((framework, index) => (
						<motion.div
							key={framework.name}
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
							className="flex-none w-64"
						>
							<Card className="p-4 border border-orange-300/10 bg-orange-300/5 backdrop-blur-md hover:bg-orange-300/10 transition-all group">
								<div className="flex items-center justify-between">
									<div>
										<h4 className="font-semibold text-orange-300/90">
											{framework.name}
										</h4>
										<p className="text-sm text-muted-foreground">
											{framework.description}
										</p>
									</div>
									<div className="h-8 w-8 rounded-full flex items-center justify-center bg-orange-300/10 group-hover:bg-orange-300/20 transition-all">
										<ArrowRight className="h-4 w-4 text-orange-300" />
									</div>
								</div>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
			<style jsx>{`
				div::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</div>
	);
};

export default FrameworksCarousel;
