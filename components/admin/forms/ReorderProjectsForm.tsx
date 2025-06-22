"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/content";

interface ReorderProjectsFormProps {
	projects: Project[];
	onSuccess: () => void;
}

export default function ReorderProjectsForm({
	projects,
	onSuccess,
}: ReorderProjectsFormProps) {
	const [reorderedProjects, setReorderedProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(false);
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

	useEffect(() => {
		setReorderedProjects([...projects].sort((a, b) => a.position - b.position));
	}, [projects]);

	const moveProject = (index: number, direction: "up" | "down") => {
		const newProjects = [...reorderedProjects];
		const targetIndex = direction === "up" ? index - 1 : index + 1;

		if (targetIndex >= 0 && targetIndex < newProjects.length) {
			[newProjects[index], newProjects[targetIndex]] = [
				newProjects[targetIndex],
				newProjects[index],
			];
			setReorderedProjects(newProjects);
		}
	};

	const handleDragStart = (e: React.DragEvent, index: number) => {
		setDraggedIndex(index);
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/html", e.currentTarget.outerHTML);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const handleDrop = (e: React.DragEvent, dropIndex: number) => {
		e.preventDefault();
		if (draggedIndex === null) return;

		const newProjects = [...reorderedProjects];
		const [draggedProject] = newProjects.splice(draggedIndex, 1);
		newProjects.splice(dropIndex, 0, draggedProject);

		setReorderedProjects(newProjects);
		setDraggedIndex(null);
	};

	const handleDragEnd = () => {
		setDraggedIndex(null);
	};

	const handleSave = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/projects/reorder", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					projectIds: reorderedProjects.map((project) => project._id),
				}),
			});

			if (response.ok) {
				onSuccess();
			} else {
				const errorData = await response.json();
				console.error("Error reordering projects:", errorData);
			}
		} catch (error) {
			console.error("Error reordering projects:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-4">
			<p className="text-gray-300">Drag or use buttons to reorder projects:</p>
			{reorderedProjects.map((project, index) => (
				<div
					key={project._id}
					draggable
					onDragStart={(e) => handleDragStart(e, index)}
					onDragOver={handleDragOver}
					onDrop={(e) => handleDrop(e, index)}
					onDragEnd={handleDragEnd}
					className={`bg-white/5 p-4 rounded border border-orange-500/20 flex items-center justify-between cursor-move transition-all ${
						draggedIndex === index
							? "opacity-50 scale-95"
							: "hover:bg-white/10 hover:border-orange-400/30"
					}`}
				>
					<div className="flex items-center space-x-3">
						<div className="flex flex-col space-y-1">
							<div className="w-1 h-1 bg-gray-400 rounded-full"></div>
							<div className="w-1 h-1 bg-gray-400 rounded-full"></div>
							<div className="w-1 h-1 bg-gray-400 rounded-full"></div>
							<div className="w-1 h-1 bg-gray-400 rounded-full"></div>
						</div>
						<div>
							<h4 className="text-orange-300 font-medium">{project.title}</h4>
							<p className="text-gray-400 text-sm">Position: {index + 1}</p>
						</div>
					</div>
					<div className="flex gap-2">
						<Button
							onClick={() => moveProject(index, "up")}
							disabled={index === 0}
							variant="ghost"
							size="sm"
							className="text-gray-400 hover:text-white"
						>
							↑
						</Button>
						<Button
							onClick={() => moveProject(index, "down")}
							disabled={index === reorderedProjects.length - 1}
							variant="ghost"
							size="sm"
							className="text-gray-400 hover:text-white"
						>
							↓
						</Button>
					</div>
				</div>
			))}
			<Button
				onClick={handleSave}
				disabled={loading}
				className="w-full bg-orange-500 hover:bg-orange-600"
			>
				{loading ? "Saving Order..." : "Save New Order"}
			</Button>
		</div>
	);
}
