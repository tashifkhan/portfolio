"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/hooks/get-project-data";
import type { Project } from "@/hooks/get-project-data";

export default function ProjectList() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const data = await getProjects();
				setProjects(data);
			} catch (err) {
				setError("Failed to load projects");
			} finally {
				setIsLoading(false);
			}
		};

		fetchProjects();
	}, []);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div>
			{projects.map((project) => (
				<div key={project.position}>
					<h2>{project.title}</h2>
					<p>{project.description}</p>
				</div>
			))}
		</div>
	);
}
