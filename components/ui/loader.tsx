"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
	size?: "sm" | "md" | "lg";
}

export function Loader({ size = "md", className, ...props }: LoaderProps) {
	return (
		<div
			className={cn(
				"relative flex items-center justify-center",
				size === "sm" && "h-12 w-12",
				size === "md" && "h-16 w-16",
				size === "lg" && "h-24 w-24",
				className
			)}
			{...props}
		>
			<div className="absolute inset-0 animate-spin">
				<div
					className={cn(
						"h-full w-full rounded-full",
						"bg-gradient-to-tr from-primary to-secondary",
						"blur-sm opacity-50"
					)}
				/>
			</div>
			<div
				className={cn(
					"absolute inset-[2px] rounded-full",
					"bg-background/80 backdrop-blur-sm"
				)}
			/>
			<div className="absolute inset-0 animate-spin">
				<div
					className={cn(
						"h-full w-full rounded-full",
						"bg-gradient-to-tr from-primary to-secondary",
						"[clip-path:polygon(50%_0%,_50%_15%,_50%_15%,_50%_0%)]"
					)}
				/>
			</div>
		</div>
	);
}
