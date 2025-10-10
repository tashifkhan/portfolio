import { NextResponse } from 'next/server';
import fetchPosts from '@/lib/blog-data';
import type { Post } from '@/lib/blog-data';

export async function GET() {
    try {
        const posts = await fetchPosts();
        const payload = posts.map((post: Post) => ({
            id: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            date: post.date,
            tags: post.tags ?? [],
            // prefer explicit reading time, otherwise format from minutes
            readTime: post.readingTimeMinutes ? `${post.readingTimeMinutes} min read` : undefined,
            // link: external canonical URL
            link: `https://blog.tashif.codes/blog/${post.slug}`,
            platform: post.author,
        }));
        return NextResponse.json(payload);
    } catch (err) {
        return NextResponse.json(
            { error: (err as Error).message || 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}