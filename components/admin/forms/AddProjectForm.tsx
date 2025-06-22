"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types/content";

interface AddProjectFormProps {
	onSuccess: () => void;
}

export default function AddProjectForm({ onSuccess }: AddProjectFormProps) {
	const [formData, setFormData] = useState<
		Omit<Project, "_id" | "createdAt" | "updatedAt">
	>({
		position: 1,
		title: "",
		description: "",
		technologies: [],
		status: "Planned",
		githubLink: "",
		liveLink: "",
		playstoreLink: "",
	});
	const [techInput, setTechInput] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch("/api/projects", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				onSuccess();
				setFormData({
					position: 1,
					title: "",
					description: "",
					technologies: [],
					status: "Planned",
					githubLink: "",
					liveLink: "",
					playstoreLink: "",
				});
				setTechInput("");
			}
		} catch (error) {
			console.error("Error adding project:", error);
		} finally {
			setLoading(false);
		}
	};

	const addTechnology = () => {
		if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
			setFormData((prev) => ({
				...prev,
				technologies: [...prev.technologies, techInput.trim()],
			}));
			setTechInput("");
		}
	};

	const removeTechnology = (tech: string) => {
		setFormData((prev) => ({
			...prev,
			technologies: prev.technologies.filter((t) => t !== tech),
		}));
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Project Title *
					</label>
					<Input
						placeholder="Enter project title"
						value={formData.title}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, title: e.target.value }))
						}
						className="bg-white/5 text-gray-300 border-orange-500/20"
						required
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
							setFormData((prev) => ({
								...prev,
								position: parseInt(e.target.value),
							}))
						}
						className="bg-white/5 text-gray-300 border-orange-500/20"
						required
					/>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-300 mb-2">
					Project Description *
				</label>
				<Textarea
					placeholder="Enter detailed project description"
					value={formData.description}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, description: e.target.value }))
					}
					className="bg-white/5 text-gray-300 border-orange-500/20"
					rows={4}
					required
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
				<div className="flex flex-wrap gap-2">
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
					Project Status *
				</label>
				<select
					value={formData.status}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							status: e.target.value as Project["status"],
						}))
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

			<div className="space-y-4">
				<label className="block text-sm font-medium text-gray-300 mb-2">
					Project Links (Optional)
				</label>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label className="block text-xs text-gray-400 mb-1">
							GitHub Repository
						</label>
						<Input
							placeholder="https://github.com/username/repo"
							value={formData.githubLink}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, githubLink: e.target.value }))
							}
							className="bg-white/5 text-gray-300 border-orange-500/20"
						/>
					</div>
					<div>
						<label className="block text-xs text-gray-400 mb-1">
							Live Demo
						</label>
						<Input
							placeholder="https://yourproject.com"
							value={formData.liveLink}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, liveLink: e.target.value }))
							}
							className="bg-white/5 text-gray-300 border-orange-500/20"
						/>
					</div>
					<div>
						<label className="block text-xs text-gray-400 mb-1">
							Play Store
						</label>
						<Input
							placeholder="https://play.google.com/store/apps/..."
							value={formData.playstoreLink}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									playstoreLink: e.target.value,
								}))
							}
							className="bg-white/5 text-gray-300 border-orange-500/20"
						/>
					</div>
				</div>
			</div>

			<Button
				type="submit"
				disabled={loading}
				className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
			>
				{loading ? "Adding Project..." : "Add Project"}
			</Button>
		</form>
	);
}
