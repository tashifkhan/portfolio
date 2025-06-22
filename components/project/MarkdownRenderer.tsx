import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
	content: string;
	githubBaseUrl?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
	content,
	githubBaseUrl,
}) => {
	const renderMarkdown = (content: string) => {
		// Enhanced markdown to HTML conversion with proper syntax highlighting
		const parts: React.ReactNode[] = [];
		let currentIndex = 0;

		// Split content into code blocks and regular text
		const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
		let match;

		while ((match = codeBlockRegex.exec(content)) !== null) {
			// Add text before code block
			if (match.index > currentIndex) {
				const textBefore = content.slice(currentIndex, match.index);
				if (textBefore.trim()) {
					parts.push(
						<div
							key={`text-${currentIndex}`}
							dangerouslySetInnerHTML={{
								__html: renderRegularMarkdown(textBefore),
							}}
						/>
					);
				}
			}

			// Add syntax highlighted code block
			const language = match[1] || "text";
			const code = match[2].trim();

			parts.push(
				<SyntaxHighlighter
					key={`code-${match.index}`}
					language={language.toLowerCase()}
					style={oneDark}
					customStyle={{
						margin: "1rem 0",
						borderRadius: "0.5rem",
						border: "1px solid rgb(55 65 81)",
						background: "rgb(17 24 39)",
					}}
					codeTagProps={{
						style: {
							fontFamily:
								'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
							fontSize: "0.875rem",
						},
					}}
					PreTag="div"
					showLineNumbers={true}
					wrapLines={true}
					lineNumberStyle={{
						minWidth: "3em",
						paddingRight: "1em",
						color: "rgb(156 163 175)",
						borderRight: "1px solid rgb(55 65 81)",
						marginRight: "1em",
					}}
				>
					{code}
				</SyntaxHighlighter>
			);

			currentIndex = match.index + match[0].length;
		}

		// Add remaining text after last code block
		if (currentIndex < content.length) {
			const remainingText = content.slice(currentIndex);
			if (remainingText.trim()) {
				parts.push(
					<div
						key={`text-${currentIndex}`}
						dangerouslySetInnerHTML={{
							__html: renderRegularMarkdown(remainingText),
						}}
					/>
				);
			}
		}

		// If no code blocks found, just render as regular markdown
		if (parts.length === 0) {
			return (
				<div
					className="prose prose-invert max-w-none"
					dangerouslySetInnerHTML={{ __html: renderRegularMarkdown(content) }}
				/>
			);
		}

		return <div className="prose prose-invert max-w-none">{parts}</div>;
	};

	const renderRegularMarkdown = (content: string) => {
		// Clean up any encoding issues and normalize whitespace
		let html = content
			// Replace common encoding issues
			.replace(/â/g, "")
			.replace(/â€/g, '"')
			.replace(/â€œ/g, '"')
			.replace(/â€™/g, "'")
			.replace(/â€¢/g, "•")
			.replace(/â€"/g, "—")
			.replace(/â€"/g, "–")
			// Normalize whitespace
			.replace(/\r\n/g, "\n")
			.replace(/\r/g, "\n")
			// Remove any remaining control characters except newlines and tabs
			.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

		// Helper function to convert relative URLs to absolute GitHub URLs
		const convertRelativeUrl = (url: string) => {
			if (!githubBaseUrl) return url;
			if (url.startsWith("http://") || url.startsWith("https://")) return url;

			let convertedUrl = url;

			// Handle different relative path formats
			if (url.startsWith("./")) {
				convertedUrl = `${githubBaseUrl}/${url.substring(2)}`;
			} else if (url.startsWith("../")) {
				// Handle parent directory references
				convertedUrl = `${githubBaseUrl}/${url.replace(/^\.\.\//, "")}`;
			} else if (url.startsWith("/")) {
				// Handle absolute paths from root - remove leading slash
				convertedUrl = `${githubBaseUrl}${url}`;
			} else if (!url.includes("://") && !url.startsWith("#")) {
				// Assume it's a relative path, but not an anchor link
				convertedUrl = `${githubBaseUrl}/${url}`;
			}

			return convertedUrl;
		};

		// Handle inline code (before other replacements)
		html = html.replace(
			/`([^`\n]+)`/g,
			'<code class="bg-gray-800 text-orange-300 px-2 py-1 rounded text-sm font-mono border border-gray-700">$1</code>'
		);

		// Handle headers
		html = html.replace(
			/^# (.*$)/gm,
			'<h1 class="text-2xl font-bold mb-4 text-white border-b border-gray-700 pb-2">$1</h1>'
		);
		html = html.replace(
			/^## (.*$)/gm,
			'<h2 class="text-xl font-semibold mb-3 text-white/90 mt-6">$1</h2>'
		);
		html = html.replace(
			/^### (.*$)/gm,
			'<h3 class="text-lg font-medium mb-2 text-white/80 mt-4">$1</h3>'
		);
		html = html.replace(
			/^#### (.*$)/gm,
			'<h4 class="text-base font-medium mb-2 text-white/70 mt-3">$1</h4>'
		);

		// Handle text formatting
		html = html.replace(
			/\*\*(.*?)\*\*/g,
			'<strong class="font-semibold text-white">$1</strong>'
		);
		html = html.replace(
			/\*(.*?)\*/g,
			'<em class="italic text-white/90">$1</em>'
		);

		// Handle images (before links to avoid conflicts)
		// First handle markdown images ![alt](src)
		html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
			const fullSrc = convertRelativeUrl(src);

			return `<img src="${fullSrc}" alt="${alt}" class="max-w-full h-auto rounded-lg border border-gray-700 my-4 mx-auto block" />`;
		});

		// Then handle HTML img tags <img src="...">
		html = html.replace(
			/<img([^>]*)\ssrc=["']([^"']+)["']([^>]*)>/g,
			(match, beforeSrc, src, afterSrc) => {
				const fullSrc = convertRelativeUrl(src);

				return `<img${beforeSrc} src="${fullSrc}"${afterSrc} class="max-w-full h-auto rounded-lg border border-gray-700 my-4 mx-auto block" />`;
			}
		);

		// Handle links
		html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
			const fullUrl = convertRelativeUrl(url);
			return `<a href="${fullUrl}" target="_blank" class="text-orange-400 hover:text-orange-300 underline transition-colors">${text}</a>`;
		});

		// Handle numbered lists
		html = html.replace(
			/^(\d+)\.\s+(.*$)/gm,
			'<li class="text-white/80 mb-2 ml-6 list-decimal">$2</li>'
		);

		// Handle todo items first (before regular bullet lists)
		// Unchecked todo items - [ ]
		html = html.replace(
			/^-\s+\[\s*\]\s+(.*$)/gm,
			'<li class="flex items-center text-white/80 mb-2 ml-2 list-none"><span class="mr-3 text-gray-400 text-lg">☐</span>$1</li>'
		);

		// Checked todo items - [x] or - [X]
		html = html.replace(
			/^-\s+\[x\]\s+(.*$)/gim,
			'<li class="flex items-center text-white/80 mb-2 ml-2 list-none"><span class="mr-3 text-orange-400 text-lg">☑</span>$1</li>'
		);

		// Handle nested todo items with indentation
		html = html.replace(
			/^(\s{2,})-\s+\[\s*\]\s+(.*$)/gm,
			'<li class="flex items-center text-white/80 mb-2 ml-6 list-none"><span class="mr-3 text-gray-400 text-lg">☐</span>$2</li>'
		);

		html = html.replace(
			/^(\s{2,})-\s+\[x\]\s+(.*$)/gim,
			'<li class="flex items-center text-white/80 mb-2 ml-6 list-none"><span class="mr-3 text-orange-400 text-lg">☑</span>$2</li>'
		);

		// Handle bullet lists (support -, *, •, and + bullets) - but not todo items
		html = html.replace(
			/^[\-\*\•\+]\s+(?!\[[\sx]\])(.*$)/gm,
			'<li class="text-white/80 mb-1 ml-6 list-disc">$1</li>'
		);

		// Also handle nested bullet points with indentation
		html = html.replace(
			/^(\s{2,})[\-\*\•\+]\s+(?!\[[\sx]\])(.*$)/gm,
			'<li class="text-white/80 mb-1 ml-8 list-disc">$2</li>'
		);

		// Wrap consecutive list items in ul/ol tags
		// Handle todo lists (checked and unchecked)
		html = html.replace(
			/(<li class="flex items-center[^"]*list-none[^"]*">.*?<\/li>(\s*<li class="flex items-center[^"]*list-none[^"]*">.*?<\/li>)*)/g,
			'<ul class="my-3 space-y-1 pl-2">$1</ul>'
		);

		// Handle unordered lists (including nested ones)
		html = html.replace(
			/(<li class="[^"]*list-disc[^"]*">.*?<\/li>(\s*<li class="[^"]*list-disc[^"]*">.*?<\/li>)*)/g,
			'<ul class="my-3 space-y-1 list-disc pl-6">$1</ul>'
		);

		// Handle ordered lists
		html = html.replace(
			/(<li class="[^"]*list-decimal[^"]*">.*?<\/li>(\s*<li class="[^"]*list-decimal[^"]*">.*?<\/li>)*)/g,
			'<ol class="my-3 space-y-1 list-decimal pl-6">$1</ol>'
		);

		// Handle tables
		const tableRegex = /^(\|.*\|.*\n)((?:\|.*\|.*\n)*)/gm;
		html = html.replace(tableRegex, (match, headerRow, bodyRows) => {
			// Process header row
			const headers = headerRow
				.split("|")
				.map((cell: string) => cell.trim())
				.filter((cell: string) => cell)
				.map(
					(header: string) =>
						`<th class="px-4 py-3 text-left text-sm font-medium text-white/90 border-b border-gray-600">${header}</th>`
				)
				.join("");

			// Process body rows
			const rows = bodyRows
				.split("\n")
				.filter(
					(row: string) => row.trim() && !row.match(/^\s*\|[\s\-\|:]*\|\s*$/)
				) // Skip separator rows
				.map((row: string) => {
					const cells = row
						.split("|")
						.map((cell: string) => cell.trim())
						.filter((cell: string) => cell)
						.map(
							(cell: string) =>
								`<td class="px-4 py-3 text-sm text-white/80 border-b border-gray-700/50">${cell}</td>`
						)
						.join("");
					return `<tr class="hover:bg-gray-800/30 transition-colors">${cells}</tr>`;
				})
				.join("");

			return `<div class="overflow-x-auto my-6">
				<table class="min-w-full bg-gray-800/20 border border-gray-700 rounded-lg overflow-hidden">
					<thead class="bg-gray-800/40">
						<tr>${headers}</tr>
					</thead>
					<tbody>${rows}</tbody>
				</table>
			</div>`;
		});

		// Handle paragraphs
		const paragraphs = html.split(/\n\s*\n/);
		html = paragraphs
			.map((paragraph) => {
				paragraph = paragraph.trim();
				if (!paragraph) return "";

				// Don't wrap already formatted elements
				if (paragraph.match(/^<(h[1-6]|pre|ul|ol|li|div|table)/)) {
					return paragraph;
				}

				// Replace single newlines with <br> within paragraphs
				paragraph = paragraph.replace(/\n/g, "<br>");

				return `<p class="text-white/70 mb-4 leading-relaxed">${paragraph}</p>`;
			})
			.join("\n");

		return html;
	};

	return renderMarkdown(content);
};

export default MarkdownRenderer;
