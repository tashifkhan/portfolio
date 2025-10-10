export interface Post {
    title: string;
    slug: string;
    excerpt: string;
    summary?: string;
    date: string; // ISO date string, e.g. "2025-10-10T00:00:00.000Z"
    author: string;
    socials?: string[];
    tags?: string[];
    wordCount?: number;
    readingTimeMinutes?: number;
}

export async function fetchPosts(): Promise<Post[]> {
    const url = 'https://blog.tashif.codes/api/posts.json';
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Accept array directly, or { posts: [...] }, or object of values
    if (Array.isArray(data)) return data as Post[];
    if (data && Array.isArray((data as any).posts)) return (data as any).posts as Post[];
    if (data && typeof data === 'object') return Object.values(data) as Post[];

    return [];
}

export default fetchPosts;