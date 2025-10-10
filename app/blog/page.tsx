"use client";

import React, { useEffect, useState } from "react";
import BlogCard, { BlogPost } from "@/components/blog/BlogCard";
import { ExternalLink } from "lucide-react";

export default function BlogPage() {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;
		const fetchAll = async () => {
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
		fetchAll();
		return () => {
			mounted = false;
		};
	}, []);

	return (
		<main className="relative py-20 overflow-hidden min-h-screen">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-700/10 via-orange-800/5 to-transparent rounded-full blur-3xl" />

			<div className="relative max-w-7xl mx-auto px-4 md:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-200 text-sm font-medium mb-6">
						<ExternalLink className="w-4 h-4" />
						All Articles
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						<span className="bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
							Blog
						</span>
					</h1>
					<p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
						Dive into all posts: tutorials, deep-dives, and thoughts on building
						and shipping software.
					</p>
				</div>

				{/* Blog Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{loading ? (
						<div className="col-span-full flex justify-center py-8">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
						</div>
					) : error ? (
						<div className="col-span-full text-center text-red-400">
							{error}
						</div>
					) : posts.length === 0 ? (
						<div className="col-span-full text-center text-white/60">
							No posts yet.
						</div>
					) : (
						posts.map((post) => <BlogCard key={post.id} post={post} />)
					)}
				</div>
			</div>
		</main>
	);
}
