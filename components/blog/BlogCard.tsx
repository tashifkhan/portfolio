"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Clock, ArrowRight } from "lucide-react";
import { log } from "console";

export interface BlogPost {
	id: string;
	title?: string;
	excerpt?: string;
	date?: string;
	readTime?: string;
	tags?: string[];
	link?: string;
	platform?: string;
}

export default function BlogCard({ post }: { post: BlogPost }) {
	const targetLink = post.link ?? `https://blog.tashif.codes/blog/${post.id}`;
	return (
		<Card className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20">
			<CardHeader className="pb-4">
				<div className="flex items-center justify-between mb-3">
					<Badge
						variant="secondary"
						className="bg-orange-500/20 text-orange-200 border border-orange-500/30"
					>
						{post.platform}
					</Badge>
					<div className="flex items-center gap-2 text-xs text-white/50">
						<Calendar className="w-3 h-3" />
						{post.date
							? new Date(post.date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
							  })
							: ""}
					</div>
				</div>
				<CardTitle className="text-lg font-bold text-white group-hover:text-orange-200 transition-colors line-clamp-2">
					{post.title}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<p className="text-sm text-white/70 leading-relaxed line-clamp-3">
					{post.excerpt}
				</p>

				<div className="flex flex-wrap gap-2">
					{post.tags?.map((tag, index) => (
						<Badge
							key={index}
							variant="outline"
							className="text-xs bg-white/5 text-white/60 border-white/20"
						>
							{tag}
						</Badge>
					))}
				</div>

				<div className="flex items-center justify-between pt-2">
					<div className="flex items-center gap-2 text-xs text-white/50">
						<Clock className="w-3 h-3" />
						{post.readTime}
					</div>
					<a
						href={targetLink}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 transition-colors group/link"
					>
						Read More
						<ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
					</a>
				</div>
			</CardContent>
		</Card>
	);
}
