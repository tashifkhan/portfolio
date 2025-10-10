"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import BlogCard from "./BlogCard";

import type { BlogPost } from "./BlogCard";

const initialPosts: BlogPost[] = [];

// Using shared BlogCard component

export const BlogSection: React.FC = () => {
	const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/blogs");
				if (!res.ok) throw new Error("Failed to fetch posts");
				const data = await res.json();
				if (mounted) setPosts(data);
			} catch (err: any) {
				console.error("Blog fetch error:", err);
				if (mounted) setError(err?.message || "Error");
			} finally {
				if (mounted) setLoading(false);
			}
		};
		fetchPosts();
		return () => {
			mounted = false;
		};
	}, []);

	return (
		<section className="relative py-20 overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-700/10 via-orange-800/5 to-transparent rounded-full blur-3xl" />

			<div className="relative max-w-7xl mx-auto px-4 md:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-200 text-sm font-medium mb-6">
						<ExternalLink className="w-4 h-4" />
						Blog & Articles
					</div>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						<span className="bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
							Latest
						</span>{" "}
						<span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
							Writings
						</span>
					</h2>
					<p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
						Sharing insights, tutorials, and thoughts on technology,
						development, and the ever-evolving world of software engineering.
					</p>
				</div>

				{/* Blog Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
					{loading ? (
						<div className="col-span-full flex justify-center py-8">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
						</div>
					) : error ? (
						<div className="col-span-full text-center text-red-400">
							{error}
						</div>
					) : (
						posts
							.slice(0, 4)
							.map((post) => <BlogCard key={post.id} post={post} />)
					)}
				</div>

				{/* View All Button */}
				<div className="text-center mt-12">
					<a
						href="/blog"
						className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
					>
						View All Articles
						<ExternalLink className="w-5 h-5" />
					</a>
				</div>
			</div>
		</section>
	);
};
