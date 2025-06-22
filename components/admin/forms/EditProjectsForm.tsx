"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types/content";

interface EditProjectsFormProps {
	projects: Project[];
	onSuccess: () => void;
}

export default function EditProjectsForm({
	projects,
	onSuccess,
}: EditProjectsFormProps) {
	const [editingProject, setEditingProject] = useState<Project | null>(null);
	const [formData, setFormData] = useState<Project | null>(null);
	const [loading, setLoading] = useState(false);
	const [techInput, setTechInput] = useState("");

	const handleEditClick = (project: Project) => {
		setEditingProject(project);
		setFormData({ ...project });
	};

	const handleSave = async () => {
		if (!formData || !formData._id) return;

		setLoading(true);
		try {
			const response = await fetch("/api/projects", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				onSuccess();
				setEditingProject(null);
				setFormData(null);
			}
		} catch (error) {
			console.error("Error updating project:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		setEditingProject(null);
		setFormData(null);
		setTechInput("");
	};

	const addTechnology = () => {
		if (
			techInput.trim() &&
			formData &&
			!formData.technologies.includes(techInput.trim())
		) {
			setFormData({
				...formData,
				technologies: [...formData.technologies, techInput.trim()],
			});
			setTechInput("");
		}
	};

	const removeTechnology = (tech: string) => {
		if (formData) {
			setFormData({
				...formData,
				technologies: formData.technologies.filter((t) => t !== tech),
			});
		}
	};

	if (editingProject && formData) {
		return (
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="text-orange-300 font-medium">
						Editing: {editingProject.title}
					</h3>
					<Button
						variant="ghost"
						onClick={handleCancel}
						className="text-gray-400 hover:text-white"
					>
						Cancel
					</Button>
				</div>

				<div className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Project Title *
							</label>
							<Input
								placeholder="Enter project title"
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
								className="bg-white/5 text-gray-300 border-orange-500/20"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Position/Order *
							</label>
							<Input
								type="number"
								placeholder="Enter position number"
								value={formData.position}
								onChange={(e) =>
									setFormData({
										...formData,
										position: parseInt(e.target.value),
									})
								}
								className="bg-white/5 text-gray-300 border-orange-500/20"
							/>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Description *
						</label>
						<Textarea
							placeholder="Enter project description"
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							className="bg-white/5 text-gray-300 border-orange-500/20"
							rows={3}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Technologies
						</label>
						<div className="flex gap-2 mb-2">
							<Input
								placeholder="Add Technology (e.g., React, Node.js)"
								value={techInput}
								onChange={(e) => setTechInput(e.target.value)}
								onKeyPress={(e) =>
									e.key === "Enter" && (e.preventDefault(), addTechnology())
								}
								className="bg-white/5 text-gray-300 border-orange-500/20"
							/>
							<Button
								type="button"
								onClick={addTechnology}
								className="bg-orange-500 hover:bg-orange-600"
							>
								Add
							</Button>
						</div>
						<div className="flex flex-wrap gap-2 mb-4">
							{formData.technologies.map((tech) => (
								<span
									key={tech}
									className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
								>
									{tech}
									<button
										type="button"
										onClick={() => removeTechnology(tech)}
										className="hover:text-red-400"
									>
										×
									</button>
								</span>
							))}
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							GitHub Link
						</label>
						<Input
							placeholder="https://github.com/username/repo"
							value={formData.githubLink || ""}
							onChange={(e) =>
								setFormData({ ...formData, githubLink: e.target.value })
							}
							className="bg-white/5 text-gray-300 border-orange-500/20"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Live Demo Link
						</label>
						<Input
							placeholder="https://yourproject.com"
							value={formData.liveLink || ""}
							onChange={(e) =>
								setFormData({ ...formData, liveLink: e.target.value })
							}
							className="bg-white/5 text-gray-300 border-orange-500/20"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Play Store Link
						</label>
						<Input
							placeholder="https://play.google.com/store/apps/..."
							value={formData.playstoreLink || ""}
							onChange={(e) =>
								setFormData({ ...formData, playstoreLink: e.target.value })
							}
							className="bg-white/5 text-gray-300 border-orange-500/20"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Project Status *
						</label>
						<select
							value={formData.status}
							onChange={(e) =>
								setFormData({
									...formData,
									status: e.target.value as Project["status"],
								})
							}
							className="w-full bg-white/5 text-gray-300 border border-orange-500/20 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
							required
						>
							<option value="">Select project status</option>
							<option value="Planned">Planned</option>
							<option value="In Progress">In Progress</option>
							<option value="Completed">Completed</option>
						</select>
					</div>

					<div className="flex gap-2">
						<Button
							onClick={handleSave}
							disabled={loading}
							className="bg-orange-500 hover:bg-orange-600"
						>
							{loading ? "Saving..." : "Save Changes"}
						</Button>
						<Button
							variant="ghost"
							onClick={handleCancel}
							className="text-gray-400 hover:text-white"
						>
							Cancel
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<p className="text-gray-300">Select a project to edit:</p>
			{projects.map((project) => (
				<div
					key={project._id}
					className="bg-white/5 p-4 rounded border border-orange-500/20"
				>
					<h4 className="text-orange-300 font-medium">{project.title}</h4>
					<p className="text-gray-400 text-sm">{project.description}</p>
					<div className="flex gap-2 mt-2">
						<Button
							onClick={() => handleEditClick(project)}
							className="bg-orange-500 hover:bg-orange-600 text-sm"
						>
							Edit Project
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
