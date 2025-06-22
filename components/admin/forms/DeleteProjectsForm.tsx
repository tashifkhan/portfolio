"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/content";

interface DeleteProjectsFormProps {
	projects: Project[];
	onSuccess: () => void;
}

export default function DeleteProjectsForm({
	projects,
	onSuccess,
}: DeleteProjectsFormProps) {
	const [loading, setLoading] = useState<string | null>(null);

	const handleDelete = async (id: string) => {
		setLoading(id);
		try {
			const response = await fetch("/api/projects", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ _id: id }),
			});

			if (response.ok) {
				onSuccess();
			}
		} catch (error) {
			console.error("Error deleting project:", error);
		} finally {
			setLoading(null);
		}
	};

	return (
		<div className="space-y-4">
			<p className="text-gray-300">Select a project to delete:</p>
			{projects.map((project) => (
				<div
					key={project._id}
					className="bg-white/5 p-4 rounded border border-red-500/20"
				>
					<h4 className="text-red-300 font-medium">{project.title}</h4>
					<p className="text-gray-400 text-sm">{project.description}</p>
					<Button
						onClick={() => project._id && handleDelete(project._id)}
						disabled={loading === project._id}
						className="mt-2 bg-red-500 hover:bg-red-600 text-sm"
					>
						{loading === project._id ? "Deleting..." : "Delete Project"}
					</Button>
				</div>
			))}
		</div>
	);
}
