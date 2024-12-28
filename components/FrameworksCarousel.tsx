"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useState, useRef } from "react";

const frameworks = [
	{ name: "Next.js", description: "React Framework" },
	{ name: "React.js", description: "UI Library" },
	{ name: "React Native", description: "Mobile Development" },
	{ name: "Express.js", description: "Backend Framework" },
	{ name: "Node.js", description: "Runtime Environment" },
	{ name: "Tailwind CSS", description: "Utility-first CSS" },
	{ name: "Flask", description: "Python Framework" },
];

export function FrameworksCarousel() {
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);
	const containerRef = useRef<HTMLDivElement>(null);

	const checkScroll = () => {
		if (!containerRef.current) return;
		const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
		setCanScrollLeft(scrollLeft > 0);
		setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
	};

	const scroll = (direction: "left" | "right") => {
		if (!containerRef.current) return;
		const scrollAmount = direction === "left" ? -320 : 320;
		containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		setTimeout(checkScroll, 300);
	};

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
					className="flex gap-4 overflow-x-hidden scroll-smooth"
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
		</div>
	);
}