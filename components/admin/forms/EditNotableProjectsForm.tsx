"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotableProject } from "@/types/content";

interface Props {
	projects?: NotableProject[];
	onSuccess: () => void;
}

export default function EditNotableProjectsForm({
	projects: initialProjects,
	onSuccess,
}: Props) {
	const [projects, setProjects] = useState<NotableProject[]>([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	useEffect(() => {
		const loadProjects = async () => {
			try {
				setLoading(true);
				if (initialProjects && initialProjects.length > 0) {
					setProjects(initialProjects);
				} else {
					const res = await fetch("/api/notable-projects", {
						cache: "no-store",
					});
					if (!res.ok) throw new Error("Failed to fetch notable projects");
					const data = await res.json();
					setProjects(data);
				}
			} catch (e: any) {
				setError(e?.message ?? "Failed to load notable projects");
			} finally {
				setLoading(false);
			}
		};
		loadProjects();
	}, [initialProjects]);

	const updateField = (
		index: number,
		field: keyof NotableProject,
		value: string
	) => {
		setProjects((prev) => {
			const next = [...prev];
			next[index] = { ...next[index], [field]: value };
			return next;
		});
	};

	const updateTechnologies = (index: number, value: string) => {
		setProjects((prev) => {
			const next = [...prev];
			next[index] = {
				...next[index],
				technologies: value
					.split(",")
					.map((t) => t.trim())
					.filter(Boolean),
			};
			return next;
		});
	};

	const addProject = () => {
		setProjects((prev) => [
			...prev,
			{
				title: "",
				imageLink: "",
				description: "",
				technologies: [],
			},
		]);
		setEditingIndex(projects.length);
	};

	const removeProject = async (index: number) => {
		const project = projects[index];
		if (!project._id) {
			// Not yet saved, just remove from UI
			setProjects((prev) => prev.filter((_, i) => i !== index));
			if (editingIndex === index) setEditingIndex(null);
			return;
		}

		if (!confirm("Are you sure you want to delete this notable project?"))
			return;

		try {
			setSaving(true);
			const res = await fetch("/api/notable-projects", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ _id: project._id }),
			});

			if (!res.ok) throw new Error("Failed to delete project");

			setProjects((prev) => prev.filter((_, i) => i !== index));
			if (editingIndex === index) setEditingIndex(null);
			onSuccess();
		} catch (e: any) {
			setError(e?.message ?? "Failed to delete project");
		} finally {
			setSaving(false);
		}
	};

	const saveProject = async (index: number) => {
		const project = projects[index];

		// Validation
		if (!project.title?.trim()) {
			setError("Title is required");
			return;
		}
		if (!project.imageLink?.trim()) {
			setError("Image link is required");
			return;
		}
		if (!project.technologies || project.technologies.length === 0) {
			setError("At least one technology is required");
			return;
		}

		try {
			setSaving(true);
			setError(null);

			if (project._id) {
				// Update existing
				const res = await fetch("/api/notable-projects", {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(project),
				});

				if (!res.ok) throw new Error("Failed to update project");
			} else {
				// Create new
				const res = await fetch("/api/notable-projects", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(project),
				});

				if (!res.ok) throw new Error("Failed to create project");
				const created = await res.json();

				// Update with returned ID
				setProjects((prev) => {
					const next = [...prev];
					next[index] = created;
					return next;
				});
			}

			setEditingIndex(null);
			onSuccess();
		} catch (e: any) {
			setError(e?.message ?? "Failed to save project");
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center py-8">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
			</div>
		);
	}

	if (error && projects.length === 0) {
		return (
			<div className="text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
				{error}
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{error && (
				<div className="text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm">
					{error}
				</div>
			)}

			<div className="space-y-6">
				{projects.map((project, index) => (
					<div
						key={project._id || `new-${index}`}
						className="backdrop-blur-sm bg-slate-800/30 rounded-lg border border-slate-700/50 p-4 space-y-3"
					>
						<div className="flex items-start justify-between gap-3">
							<h4 className="text-orange-400 font-mono text-sm">
								Notable Project {index + 1}
								{project._id && (
									<span className="text-slate-500 ml-2 text-xs">
										(ID: {project._id.toString().slice(-6)})
									</span>
								)}
							</h4>
							<div className="flex gap-2">
								{editingIndex === index ? (
									<>
										<Button
											size="sm"
											variant="ghost"
											onClick={() => saveProject(index)}
											disabled={saving}
											className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
										>
											{saving ? "Saving..." : "Save"}
										</Button>
										<Button
											size="sm"
											variant="ghost"
											onClick={() => setEditingIndex(null)}
											disabled={saving}
											className="text-slate-400 hover:text-slate-300"
										>
											Cancel
										</Button>
									</>
								) : (
									<>
										<Button
											size="sm"
											variant="ghost"
											onClick={() => setEditingIndex(index)}
											className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
										>
											Edit
										</Button>
										<Button
											size="sm"
											variant="ghost"
											onClick={() => removeProject(index)}
											disabled={saving}
											className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
										>
											Delete
										</Button>
									</>
								)}
							</div>
						</div>

						{editingIndex === index ? (
							<div className="space-y-3">
								<div>
									<label className="text-slate-300 text-sm mb-1 block">
										Title <span className="text-red-400">*</span>
									</label>
									<Input
										value={project.title}
										onChange={(e) =>
											updateField(index, "title", e.target.value)
										}
										placeholder="Project title"
										className="bg-slate-900/50 border-slate-700 text-white"
									/>
								</div>

								<div>
									<label className="text-slate-300 text-sm mb-1 block">
										Image Link <span className="text-red-400">*</span>
									</label>
									<Input
										value={project.imageLink}
										onChange={(e) =>
											updateField(index, "imageLink", e.target.value)
										}
										placeholder="https://example.com/image.png"
										className="bg-slate-900/50 border-slate-700 text-white"
									/>
								</div>

								<div>
									<label className="text-slate-300 text-sm mb-1 block">
										Description
									</label>
									<textarea
										value={
											typeof project.description === "string"
												? project.description
												: ""
										}
										onChange={(e) =>
											updateField(index, "description", e.target.value)
										}
										placeholder="Project description"
										rows={3}
										className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-md px-3 py-2 text-sm"
									/>
								</div>

								<div>
									<label className="text-slate-300 text-sm mb-1 block">
										Technologies <span className="text-red-400">*</span>
									</label>
									<Input
										value={project.technologies?.join(", ") || ""}
										onChange={(e) => updateTechnologies(index, e.target.value)}
										placeholder="React, TypeScript, Node.js (comma-separated)"
										className="bg-slate-900/50 border-slate-700 text-white"
									/>
								</div>

								<div>
									<label className="text-slate-300 text-sm mb-1 block">
										GitHub Link
									</label>
									<Input
										value={project.githubLink || ""}
										onChange={(e) =>
											updateField(index, "githubLink", e.target.value)
										}
										placeholder="https://github.com/..."
										className="bg-slate-900/50 border-slate-700 text-white"
									/>
								</div>

								<div>
									<label className="text-slate-300 text-sm mb-1 block">
										Live Link
									</label>
									<Input
										value={project.liveLink || ""}
										onChange={(e) =>
											updateField(index, "liveLink", e.target.value)
										}
										placeholder="https://example.com"
										className="bg-slate-900/50 border-slate-700 text-white"
									/>
								</div>

								<div>
									<label className="text-slate-300 text-sm mb-1 block">
										Play Store Link
									</label>
									<Input
										value={project.playstoreLink || ""}
										onChange={(e) =>
											updateField(index, "playstoreLink", e.target.value)
										}
										placeholder="https://play.google.com/..."
										className="bg-slate-900/50 border-slate-700 text-white"
									/>
								</div>
							</div>
						) : (
							<div className="space-y-2 text-sm">
								<p className="text-white font-medium">{project.title}</p>
								{project.imageLink && (
									<p className="text-slate-400 truncate">
										🖼️ {project.imageLink}
									</p>
								)}
								{project.technologies && project.technologies.length > 0 && (
									<div className="flex flex-wrap gap-1">
										{project.technologies.map((tech, i) => (
											<span
												key={i}
												className="text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded"
											>
												{tech}
											</span>
										))}
									</div>
								)}
								<div className="flex gap-3 text-xs text-slate-500">
									{project.githubLink && <span>✓ GitHub</span>}
									{project.liveLink && <span>✓ Live</span>}
									{project.playstoreLink && <span>✓ PlayStore</span>}
								</div>
							</div>
						)}
					</div>
				))}
			</div>

			<Button
				onClick={addProject}
				disabled={saving || editingIndex !== null}
				className="w-full bg-orange-500 hover:bg-orange-600 text-white"
			>
				+ Add Notable Project
			</Button>

			{projects.length === 0 && (
				<div className="text-center text-slate-400 py-8">
					No notable projects yet. Click the button above to add one.
				</div>
			)}
		</div>
	);
}
