"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Project,
	Education,
	Skill,
	NotableProject,
	Responsibility,
	Socials,
} from "@/types/content";
import { usePyodide } from "@/hooks/usePyodide";

type ActionType =
	| "addSkills"
	| "updateEducation"
	| "editResponsibilities"
	| "updateSocials"
	| "editProjects"
	| "addProjects"
	| "deleteProjects"
	| "reorderProjects"
	| "addNotableProjects"
	| "updateNotableProjects"
	| "deleteNotableProjects"
	| "reorderNotableProjects"
	| "autoAddProjects";

export default function UpdateForm() {
	const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
	const [projects, setProjects] = useState<Project[]>([]);
	const [notableProjects, setNotableProjects] = useState<NotableProject[]>([]);
	const [education, setEducation] = useState<Education[]>([]);
	const [responsibilities, setResponsibilities] = useState<Responsibility[]>(
		[]
	);
	const [skills, setSkills] = useState<Skill[]>([]);
	const [socials, setSocials] = useState<Socials | null>(null);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	// Fetch data based on selected action
	useEffect(() => {
		if (selectedAction) {
			fetchData();
		}
	}, [selectedAction]);

	const fetchData = async () => {
		if (!selectedAction) return;

		setLoading(true);
		try {
			if (selectedAction.includes("Project")) {
				if (selectedAction.includes("Notable")) {
					const response = await fetch("/api/notable-projects");
					if (response.ok) {
						const data = await response.json();
						setNotableProjects(data);
					}
				} else {
					const response = await fetch("/api/projects");
					if (response.ok) {
						const data = await response.json();
						setProjects(data);
					}
				}
			}

			if (selectedAction.includes("Education")) {
				const response = await fetch("/api/edu");
				if (response.ok) {
					const data = await response.json();
					setEducation(data);
				}
			}

			if (selectedAction.includes("Responsibilities")) {
				const response = await fetch("/api/responsibilities");
				if (response.ok) {
					const data = await response.json();
					setResponsibilities(data);
				}
			}

			if (selectedAction.includes("Skills")) {
				const response = await fetch("/api/skills");
				if (response.ok) {
					const data = await response.json();
					setSkills(data);
				}
			}

			if (selectedAction.includes("Socials")) {
				const response = await fetch("/api/socials");
				if (response.ok) {
					const data = await response.json();
					setSocials(data);
				}
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	const showMessage = (type: "success" | "error", text: string) => {
		setMessage({ type, text });
		setTimeout(() => setMessage(null), 5000);
	};

	if (!selectedAction) {
		return (
			<div className="relative backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 rounded-2xl p-8 shadow-xl border border-white/20">
				<h2 className="text-2xl font-mono mb-6 text-center bg-gradient-to-r from-orange-300 to-gray-300 via-amber-500 bg-clip-text text-transparent">
					Portfolio Management
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{[
						{
							label: "Add Skills",
							action: "addSkills" as ActionType,
						},
						{
							label: "Update Education",
							action: "updateEducation" as ActionType,
						},
						{
							label: "Edit Responsibilities",
							action: "editResponsibilities" as ActionType,
						},
						{
							label: "Update Socials",
							action: "updateSocials" as ActionType,
						},
						{
							label: "Edit Projects",
							action: "editProjects" as ActionType,
						},
						{
							label: "Add Projects",
							action: "addProjects" as ActionType,
						},
						{
							label: "Delete Projects",
							action: "deleteProjects" as ActionType,
						},
						{
							label: "Reorder Projects",
							action: "reorderProjects" as ActionType,
						},
						{
							label: "Add Notable Projects",
							action: "addNotableProjects" as ActionType,
						},
						{
							label: "Update Notable Projects",
							action: "updateNotableProjects" as ActionType,
						},
						{
							label: "Delete Notable Projects",
							action: "deleteNotableProjects" as ActionType,
						},
						{
							label: "Reorder Notable Projects",
							action: "reorderNotableProjects" as ActionType,
						},
						{
							label: "Auto Add Projects",
							action: "autoAddProjects" as ActionType,
						},
					].map(({ label, action }) => (
						<Button
							key={action}
							variant="ghost"
							onClick={() => setSelectedAction(action)}
							className="relative group h-16 overflow-hidden transition-all hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl"
						>
							<div className="flex items-center justify-center w-full">
								<span className="font-medium text-sm text-gray-200 group-hover:text-white transition-colors text-center">
									{label}
								</span>
							</div>
							<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
						</Button>
					))}
				</div>

				<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-600/20 dark:from-orange-800/5 dark:to-amber-900/20 rounded-2xl -z-10" />
			</div>
		);
	}

	return (
		<div className="relative backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 rounded-2xl p-6 shadow-xl border border-white/20">
			<div className="flex items-center justify-between mb-6">
				<Button
					variant="ghost"
					onClick={() => setSelectedAction(null)}
					className="text-slate-400 hover:text-white backdrop-blur-sm"
				>
					← Back to menu
				</Button>
				<h3 className="text-xl font-mono bg-gradient-to-r from-orange-300 to-amber-500 bg-clip-text text-transparent">
					{selectedAction
						.replace(/([A-Z])/g, " $1")
						.replace(/^./, (str) => str.toUpperCase())}
				</h3>
			</div>

			{message && (
				<div
					className={`mb-4 p-3 rounded-lg ${
						message.type === "success"
							? "bg-green-500/20 text-green-300 border border-green-500/30"
							: "bg-red-500/20 text-red-300 border border-red-500/30"
					}`}
				>
					{message.text}
				</div>
			)}

			{loading ? (
				<div className="flex justify-center items-center py-12">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
				</div>
			) : (
				<>
					{selectedAction === "addProjects" && (
						<AddProjectForm
							onSuccess={() => {
								showMessage("success", "Project added successfully!");
								fetchData();
							}}
						/>
					)}
					{selectedAction === "editProjects" && (
						<EditProjectsForm
							projects={projects}
							onSuccess={() => {
								showMessage("success", "Project updated successfully!");
								fetchData();
							}}
						/>
					)}
					{selectedAction === "deleteProjects" && (
						<DeleteProjectsForm
							projects={projects}
							onSuccess={() => {
								showMessage("success", "Project deleted successfully!");
								fetchData();
							}}
						/>
					)}
					{selectedAction === "reorderProjects" && (
						<ReorderProjectsForm
							projects={projects}
							onSuccess={() => {
								showMessage("success", "Projects reordered successfully!");
								fetchData();
							}}
						/>
					)}
					{selectedAction === "addNotableProjects" && (
						<AddNotableProjectForm
							onSuccess={() => {
								showMessage("success", "Notable project added successfully!");
								fetchData();
							}}
						/>
					)}
					{selectedAction === "updateNotableProjects" && (
						<EditNotableProjectsForm
							projects={notableProjects}
							onSuccess={() => {
								showMessage("success", "Notable project updated successfully!");
								fetchData();
							}}
						/>
					)}
					{selectedAction === "deleteNotableProjects" && (
						<DeleteNotableProjectsForm
							projects={notableProjects}
							onSuccess={() => {
								showMessage("success", "Notable project deleted successfully!");
								fetchData();
							}}
						/>
					)}
					{selectedAction === "reorderNotableProjects" && (
						<ReorderNotableProjectsForm
							projects={notableProjects}
							onSuccess={() => {
								showMessage(
									"success",
									"Notable projects reordered successfully!"
								);
								fetchData();
							}}
						/>
					)}
					{selectedAction === "updateEducation" && (
						<EditEducationForm
							education={education}
							onSuccess={() => {
								showMessage("success", "Education updated successfully!");
								fetchData();
							}}
						/>
					)}
					{selectedAction === "editResponsibilities" && (
						<EditResponsibilitiesForm
							responsibilities={responsibilities}
							onSuccess={() => {
								showMessage("success", "Responsibility updated successfully!");
								fetchData();
							}}
						/>
					)}
					{selectedAction === "updateSocials" && (
						<UpdateSocialsForm
							onSuccess={() => {
								showMessage("success", "Socials updated successfully!");
								fetchData();
							}}
						/>
					)}
					{selectedAction === "addSkills" && (
						<AddSkillForm
							onSuccess={() => {
								showMessage("success", "Skill added successfully!");
								fetchData();
							}}
						/>
					)}
					{selectedAction === "autoAddProjects" && (
						<AutoAddProjectsForm
							onSuccess={() => {
								showMessage("success", "Projects auto-added successfully!");
								fetchData();
							}}
						/>
					)}
				</>
			)}

			<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-600/20 dark:from-orange-800/5 dark:to-amber-900/20 rounded-2xl -z-10" />
		</div>
	);
}

// Add Project Form Component
function AddProjectForm({ onSuccess }: { onSuccess: () => void }) {
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

// Placeholder components for other forms - you can expand these similarly
function EditProjectsForm({
	projects,
	onSuccess,
}: {
	projects: Project[];
	onSuccess: () => void;
}) {
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

function DeleteProjectsForm({
	projects,
	onSuccess,
}: {
	projects: Project[];
	onSuccess: () => void;
}) {
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

// Add similar components for other forms...
function AddNotableProjectForm({ onSuccess }: { onSuccess: () => void }) {
	return (
		<div className="text-gray-300">Notable Project form coming soon...</div>
	);
}

function EditNotableProjectsForm({
	projects,
	onSuccess,
}: {
	projects: NotableProject[];
	onSuccess: () => void;
}) {
	return (
		<div className="text-gray-300">
			Edit Notable Projects form coming soon...
		</div>
	);
}

function DeleteNotableProjectsForm({
	projects,
	onSuccess,
}: {
	projects: NotableProject[];
	onSuccess: () => void;
}) {
	return (
		<div className="text-gray-300">
			Delete Notable Projects form coming soon...
		</div>
	);
}

function EditEducationForm({
	education,
	onSuccess,
}: {
	education: Education[];
	onSuccess: () => void;
}) {
	return (
		<div className="text-gray-300">Edit Education form coming soon...</div>
	);
}

function EditResponsibilitiesForm({
	responsibilities,
	onSuccess,
}: {
	responsibilities: Responsibility[];
	onSuccess: () => void;
}) {
	return (
		<div className="text-gray-300">
			Edit Responsibilities form coming soon...
		</div>
	);
}

function AddSkillForm({ onSuccess }: { onSuccess: () => void }) {
	return <div className="text-gray-300">Add Skill form coming soon...</div>;
}

function ReorderProjectsForm({
	projects,
	onSuccess,
}: {
	projects: Project[];
	onSuccess: () => void;
}) {
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

function ReorderNotableProjectsForm({
	projects,
	onSuccess,
}: {
	projects: NotableProject[];
	onSuccess: () => void;
}) {
	const [reorderedProjects, setReorderedProjects] = useState<NotableProject[]>(
		[]
	);
	const [loading, setLoading] = useState(false);
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

	useEffect(() => {
		setReorderedProjects([...projects]);
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
			const response = await fetch("/api/notable-projects/reorder", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					projects: reorderedProjects.map((project, index) => ({
						_id: project._id,
						position: index + 1,
					})),
				}),
			});

			if (response.ok) {
				onSuccess();
			}
		} catch (error) {
			console.error("Error reordering notable projects:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-4">
			<p className="text-gray-300">
				Drag or use buttons to reorder notable projects:
			</p>
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

function UpdateSocialsForm({ onSuccess }: { onSuccess: () => void }) {
	const [socialData, setSocialData] = useState({
		InstaID: "",
		LeetCodeID: "",
		GithubID: "",
		LinkedInID: "",
		TwitterID: "",
		ResumeLink: "",
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// Fetch current social links
		fetchSocialData();
	}, []);

	const fetchSocialData = async () => {
		try {
			const response = await fetch("/api/socials");
			if (response.ok) {
				const data = await response.json();
				setSocialData({
					InstaID: data.InstaID || "",
					LeetCodeID: data.LeetCodeID || "",
					GithubID: data.GithubID || "",
					LinkedInID: data.LinkedInID || "",
					TwitterID: data.TwitterID || "",
					ResumeLink: data.ResumeLink || "",
				});
			}
		} catch (error) {
			console.error("Error fetching social data:", error);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch("/api/socials", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(socialData),
			});

			if (response.ok) {
				onSuccess();
			}
		} catch (error) {
			console.error("Error updating social data:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<p className="text-gray-300 mb-4">
				Update your social media information:
			</p>

			<div>
				<label className="block text-sm font-medium text-gray-300 mb-2">
					Instagram Username
				</label>
				<Input
					placeholder="e.g., khan_tashif"
					value={socialData.InstaID}
					onChange={(e) =>
						setSocialData((prev) => ({ ...prev, InstaID: e.target.value }))
					}
					className="bg-white/5 text-gray-300 border-orange-500/20"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-300 mb-2">
					LeetCode Username
				</label>
				<Input
					placeholder="e.g., tashif-khan"
					value={socialData.LeetCodeID}
					onChange={(e) =>
						setSocialData((prev) => ({ ...prev, LeetCodeID: e.target.value }))
					}
					className="bg-white/5 text-gray-300 border-orange-500/20"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-300 mb-2">
					GitHub Username
				</label>
				<Input
					placeholder="e.g., tashifkhan"
					value={socialData.GithubID}
					onChange={(e) =>
						setSocialData((prev) => ({ ...prev, GithubID: e.target.value }))
					}
					className="bg-white/5 text-gray-300 border-orange-500/20"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-300 mb-2">
					LinkedIn Profile ID
				</label>
				<Input
					placeholder="e.g., tashif-ahmad-khan-982304244"
					value={socialData.LinkedInID}
					onChange={(e) =>
						setSocialData((prev) => ({ ...prev, LinkedInID: e.target.value }))
					}
					className="bg-white/5 text-gray-300 border-orange-500/20"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-300 mb-2">
					Twitter Username
				</label>
				<Input
					placeholder="e.g., tashifkhan_"
					value={socialData.TwitterID}
					onChange={(e) =>
						setSocialData((prev) => ({ ...prev, TwitterID: e.target.value }))
					}
					className="bg-white/5 text-gray-300 border-orange-500/20"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-300 mb-2">
					Resume Link
				</label>
				<Input
					placeholder="https://yourwebsite.com/resume.pdf"
					value={socialData.ResumeLink}
					onChange={(e) =>
						setSocialData((prev) => ({ ...prev, ResumeLink: e.target.value }))
					}
					className="bg-white/5 text-gray-300 border-orange-500/20"
				/>
			</div>

			<Button
				type="submit"
				disabled={loading}
				className="w-full bg-orange-500 hover:bg-orange-600"
			>
				{loading ? "Updating..." : "Update Social Links"}
			</Button>
		</form>
	);
}

// Python Script Form Components
function AutoAddProjectsForm({ onSuccess }: { onSuccess: () => void }) {
	const [formData, setFormData] = useState({
		username: "tashifkhan",
		numProjects: 5,
	});
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any[]>([]);
	const { pyodide, loading: pyodideLoading, error } = usePyodide();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!pyodide) {
			console.log("❌ Pyodide not loaded yet");
			return;
		}

		console.log("🚀 Starting Auto Add Projects process...");
		console.log("📝 Form data:", formData);

		setLoading(true);
		try {
			// Set data in Python globals
			console.log("🔧 Setting Python globals...");
			pyodide.globals.set("github_username", formData.username);
			pyodide.globals.set("num_projects", formData.numProjects);
			console.log("✅ Python globals set:", {
				username: formData.username,
				numProjects: formData.numProjects,
			});

			const pythonCode = `
import json
from pyodide.http import pyfetch
from typing import List, Optional

print("🐍 Python script started")
print(f"📊 Username: {github_username}")
print(f"📊 Number of projects: {num_projects}")

class Response:
    def __init__(self, title, description=None, live_website_url=None, languages=None, num_commits=0, readme=None, status=None):
        self.title = title
        self.description = description
        self.live_website_url = live_website_url
        self.languages = languages or []
        self.num_commits = num_commits
        self.readme = readme
        self.status = status

async def get_projects(github_username):
    print(f"🌐 Fetching projects for user: {github_username}")
    url = f"https://github-stats.tashif.codes/{github_username}/repos"
    print(f"🔗 URL: {url}")
    
    try:
        res = await pyfetch(url)
        print(f"📡 Response status: {res.status}")
        
        if res.status != 200:
            print(f"❌ HTTP Error: {res.status}")
            raise Exception(f"Failed to fetch projects for {github_username}. Status code: {res.status}")
        
        projects = await res.json()
        print(f"📦 Raw projects data: {projects}")
        print(f"📊 Number of projects fetched: {len(projects)}")
        
        response_objects = []
        for i, project in enumerate(projects):
            print(f"🔍 Processing project {i+1}: {project.get('title', 'Unknown')}")
            response_obj = Response(
                title=project.get("title", "Unknown Project"),
                description=project.get("description"),
                live_website_url=project.get("live_website_url"),
                languages=project.get("languages", []),
                num_commits=project.get("num_commits", 0),
                readme=project.get("readme"),
                status=project.get("status")
            )
            response_objects.append(response_obj)
            print(f"✅ Project {i+1} processed: {response_obj.title}")
        
        print(f"🎯 Total projects processed: {len(response_objects)}")
        return response_objects
        
    except Exception as e:
        print(f"💥 Error in get_projects: {e}")
        raise e

def gen_desc(title, languages, readme):
    """Generate description using rule-based approach (similar to main.py logic)"""
    print(f"📝 Generating description for: {title}")
    
    # Start with basic description
    description = f"A {title} project"
    
    # Add languages if available
    if languages and len(languages) > 0:
        lang_list = languages[:3]  # Take first 3 languages
        description += f" built with {', '.join(lang_list)}"
    
    # Try to extract meaningful description from README
    if readme:
        lines = readme.split('\\n')
        for line in lines:
            line = line.strip()
            # Skip headers, empty lines, and very short lines
            if (line and 
                not line.startswith('#') and 
                not line.startswith('---') and
                not line.startswith('[') and
                len(line) > 30 and 
                len(line) < 200):
                # Check if it looks like a meaningful description
                if any(keyword in line.lower() for keyword in ['is a', 'provides', 'features', 'platform', 'application', 'tool', 'system']):
                    description = line
                    break
    
    print(f"📄 Generated description: {description}")
    return description

def gen_project_status(title, live_url, num_commits, readme):
    """Analyze project status using rule-based approach (similar to main.py logic)"""
    print(f"🏷️ Analyzing status for: {title}")
    
    title_lower = title.lower()
    readme_lower = readme.lower() if readme else ""
    
    # Check for completion indicators
    completion_indicators = [
        'complete', 'finished', 'stable', 'production', 'deployed',
        'live demo', 'live site', 'working demo', 'final version'
    ]
    
    # Check for WIP indicators
    wip_indicators = [
        'todo', 'in progress', 'under development', 'coming soon',
        'work in progress', 'development', 'beta', 'alpha'
    ]
    
    # Check for planning indicators
    planning_indicators = [
        'planned', 'concept', 'idea', 'proposal', 'design',
        'coming soon', 'future', 'roadmap'
    ]
    
    # Rule-based status determination
    if live_url and num_commits > 50:
        status = "Completed"
    elif any(indicator in readme_lower for indicator in completion_indicators):
        status = "Completed"
    elif any(indicator in readme_lower for indicator in wip_indicators):
        status = "In Progress"
    elif any(indicator in readme_lower for indicator in planning_indicators):
        status = "Planned"
    elif num_commits > 20:
        status = "In Progress"
    elif num_commits > 5:
        status = "In Progress"
    else:
        status = "Planned"
    
    print(f"🏷️ Status determined: {status} (commits: {num_commits}, live_url: {bool(live_url)})")
    return status

def gen_tech_stack(languages, readme):
    """Extract tech stack using rule-based approach (similar to main.py logic)"""
    print(f"🔧 Extracting tech stack from languages: {languages}")
    
    readme_lower = readme.lower() if readme else ""
    
    # Comprehensive tech keywords (from original tech_extractor.py)
    tech_keywords = [
        # Programming Languages
        "python", "javascript", "typescript", "java", "c++", "c#", "go", "rust", "php", "ruby", "swift", "kotlin",
        
        # Frontend Frameworks
        "react", "next.js", "vue", "angular", "svelte", "nuxt", "gatsby", "ember",
        
        # Backend Frameworks
        "node.js", "express", "fastapi", "django", "flask", "spring", "laravel", "rails", "asp.net",
        
        # Databases
        "postgresql", "mongodb", "mysql", "redis", "sqlite", "elasticsearch", "cassandra", "dynamodb",
        
        # Cloud & Deployment
        "docker", "kubernetes", "aws", "azure", "gcp", "vercel", "netlify", "heroku", "digitalocean",
        
        # CSS Frameworks
        "tailwind", "bootstrap", "material-ui", "chakra", "styled-components", "sass", "less",
        
        # Libraries & Tools
        "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch", "chart.js", "d3.js", "lodash",
        
        # Version Control & DevOps
        "git", "github", "gitlab", "jenkins", "github actions", "gitlab ci", "travis ci",
        
        # Other Tools
        "webpack", "vite", "babel", "eslint", "prettier", "jest", "cypress", "storybook"
    ]
    
    found_tech = []
    for tech in tech_keywords:
        if tech in readme_lower:
            found_tech.append(tech)
    
    # Combine languages and found technologies
    all_tech = list(set(languages + found_tech))
    
    # Remove duplicates (case-insensitive)
    seen = set()
    unique_tech = []
    for tech in all_tech:
        if tech.lower() not in seen:
            unique_tech.append(tech)
            seen.add(tech.lower())
    
    print(f"🔧 Tech stack extracted: {unique_tech}")
    return unique_tech

def process_projects(projects_data):
    print(f"⚙️ Processing {len(projects_data)} projects...")
    processed_projects = []
    for i, project in enumerate(projects_data):
        print(f"🔄 Processing project {i+1}: {project.get('title', 'Unknown')}")
        
        # Generate description if missing
        if not project.get("description"):
            project["description"] = gen_desc(project.get("title", ""), project.get("languages", []), project.get("readme", ""))
        
        # Generate status if missing
        if not project.get("status"):
            project["status"] = gen_project_status(
                project.get("title", ""),
                project.get("live_website_url", ""),
                project.get("num_commits", 0),
                project.get("readme", "")
            )
        
        # Generate tech stack
        project["technologies"] = gen_tech_stack(project.get("languages", []), project.get("readme", ""))
        
        # Create final project object
        project_json = {
            "position": i,
            "title": project.get("title", ""),
            "description": project.get("description", ""),
            "technologies": project.get("technologies", []),
            "status": project.get("status", "In Progress"),
            "githubLink": f"https://github.com/{github_username}/{project.get('title', '')}",
            "liveLink": project.get("live_website_url", ""),
        }
        processed_projects.append(project_json)
        print(f"✅ Project {i+1} finalized: {project_json}")
    
    print(f"🎉 All projects processed! Total: {len(processed_projects)}")
    return processed_projects

print("🚀 Starting project fetch...")
# Fetch and process projects
projects = await get_projects(github_username)
print(f"📦 Projects fetched: {len(projects)}")

projects_data = [{
    "title": p.title,
    "description": p.description,
    "live_website_url": p.live_website_url,
    "languages": p.languages,
    "num_commits": p.num_commits,
    "readme": p.readme,
    "status": p.status
} for p in projects]

print(f"📊 Projects data prepared: {len(projects_data)}")

# Limit to requested number
projects_data = projects_data[:num_projects]
print(f"📏 Limited to {num_projects} projects")

# Process all projects
result = process_projects(projects_data)

# Ensure we return a list
if not isinstance(result, list):
    print("⚠️ Result is not a list, converting...")
    result = []

print(f"🎯 Final result: {len(result)} projects")
print("📋 Result preview:", result[:2] if result else "No projects")

result
`;
			console.log("🐍 Running Python code...");
			const processed = await pyodide.runPythonAsync(pythonCode);
			console.log("✅ Python execution completed");
			console.log("📦 Raw Python result:", processed);

			const projectsArray = Array.isArray(processed) ? processed : [];
			console.log("🔧 Processed array:", projectsArray);
			setResult(projectsArray);

			// Add projects to database
			if (projectsArray.length > 0) {
				console.log("💾 Adding projects to database...");
				const addPromises = projectsArray.map((project, index) => {
					console.log(`📤 Adding project ${index + 1}:`, project);
					return fetch("/api/projects", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(project),
					});
				});

				const responses = await Promise.all(addPromises);
				console.log("📡 Database responses:", responses);

				const failed = responses.filter((r) => !r.ok);
				if (failed.length > 0) {
					console.error("❌ Some projects failed to add:", failed);
				} else {
					console.log("✅ All projects added successfully!");
				}
			} else {
				console.log("⚠️ No projects to add to database");
			}

			console.log("🎉 Auto Add Projects process completed successfully!");
			onSuccess();
		} catch (error) {
			console.error("💥 Error auto-adding projects:", error);
			console.error("🔍 Error details:", {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			});
			setResult([]);
		} finally {
			console.log("🏁 Process finished, setting loading to false");
			setLoading(false);
		}
	};

	return (
		<div className="space-y-4">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						GitHub Username
					</label>
					<Input
						placeholder="Enter GitHub username"
						value={formData.username}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, username: e.target.value }))
						}
						className="bg-white/5 text-gray-300 border-orange-500/20"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Number of Projects to Add
					</label>
					<Input
						type="number"
						placeholder="Enter number of projects"
						value={formData.numProjects}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								numProjects: parseInt(e.target.value) || 5,
							}))
						}
						className="bg-white/5 text-gray-300 border-orange-500/20"
						min="1"
						max="20"
						required
					/>
				</div>
				<Button
					type="submit"
					disabled={loading || pyodideLoading || !pyodide}
					className="w-full bg-orange-500 hover:bg-orange-600"
				>
					{loading || pyodideLoading
						? "Processing and Adding Projects..."
						: "Auto Add Projects"}
				</Button>
			</form>
			{error && <div className="text-red-500">{error}</div>}
			{result && result.length > 0 && (
				<div className="mt-6">
					<h4 className="text-orange-300 font-medium mb-3">
						Processed and Added Projects ({result.length})
					</h4>
					<div className="space-y-2 max-h-60 overflow-y-auto">
						{result.map((project, index) => (
							<div
								key={index}
								className="bg-white/5 p-3 rounded border border-orange-500/20"
							>
								<h5 className="text-white font-medium">{project.title}</h5>
								<p className="text-gray-400 text-sm">
									{project.description || "No description"}
								</p>
								<div className="flex items-center gap-4 mt-2">
									<span className="text-xs text-gray-500">
										Position: {project.position}
									</span>
									<span className="text-xs text-gray-500">
										Status: {project.status}
									</span>
								</div>
								<div className="flex flex-wrap gap-1 mt-2">
									{project.technologies
										?.slice(0, 3)
										.map((tech: string, i: number) => (
											<span
												key={i}
												className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs"
											>
												{tech}
											</span>
										))}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
