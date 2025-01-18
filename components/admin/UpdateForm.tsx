"use client";

import { useState, useEffect, useCallback } from "react";
import { useFormStatus } from "react-dom";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
	getProjects,
	addProject,
	updateProject,
	getEducation,
	addEducation,
	updateEducation,
	getSkills,
	addSkill,
	updateSkill,
} from "@/hooks/mongo-actions";
import { Project, Education, Skill } from "@/types/content";

type ContentType = "projects" | "education" | "skills";

export default function UpdateForm() {
	const { pending } = useFormStatus();
	const [contentType, setContentType] = useState<ContentType>("projects");
	const [items, setItems] = useState<(Project | Education | Skill)[]>([]);
	const [selectedItem, setSelectedItem] = useState<any>(null);

	// Initialize empty form data for each content type
	const [formData, setFormData] = useState({
		projects: {
			title: "",
			description: "",
			technologies: [] as string[],
			status: "In Progress" as "Completed" | "In Progress" | "Planned",
			githubLink: "",
			liveLink: "",
			playstoreLink: "",
			location: 0,
		},
		education: {
			title: "",
			institution: "",
			score: "",
			duration: "",
		},
		skills: {
			name: "",
			type: "language" as "language" | "framework" | "tool" | "softSkill",
			icon: "",
			description: "",
			category: "Soft Skills" as "Soft Skills" | "Other Avocations",
		},
	});

	useEffect(() => {
		loadItems();
	}, [contentType]);

	const loadItems = useCallback(async () => {
		let response;
		switch (contentType) {
			case "projects":
				response = await getProjects();
				break;
			case "education":
				response = await getEducation();
				break;
			case "skills":
				response = await getSkills();
				break;
		}
		if (response.data) setItems(response.data);
	}, [contentType]);

	const resetForm = () => {
		setSelectedItem(null);
		setFormData((prev) => ({
			...prev,
			[contentType]: Object.fromEntries(
				Object.keys(prev[contentType]).map((key) => [key, ""])
			),
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (pending) return;

		const data = formData[contentType];
		let result;

		switch (contentType) {
			case "projects": {
				const projectData = data as typeof formData.projects;
				const payload: Project = {
					...projectData,
					createdAt: selectedItem?.createdAt || new Date(),
					updatedAt: new Date(),
				};
				result = selectedItem?._id
					? await updateProject({ ...payload, _id: selectedItem._id })
					: await addProject(payload);
				break;
			}
			case "education": {
				const educationData = data as typeof formData.education;
				const payload: Education = {
					...educationData,
					createdAt: selectedItem?.createdAt || new Date(),
					updatedAt: new Date(),
				};
				result = selectedItem?._id
					? await updateEducation({ ...payload, _id: selectedItem._id })
					: await addEducation(payload);
				break;
			}
			case "skills": {
				const skillData = data as typeof formData.skills;
				const basePayload = {
					name: skillData.name,
					createdAt: selectedItem?.createdAt || new Date(),
					updatedAt: new Date(),
				};

				let payload: Skill;
				switch (skillData.type) {
					case "language":
						payload = {
							...basePayload,
							type: "language",
							icon: skillData.icon,
						};
						break;
					case "framework":
						payload = {
							...basePayload,
							type: "framework",
							description: skillData.description,
						};
						break;
					case "tool":
						payload = {
							...basePayload,
							type: "tool",
							icon: skillData.icon,
							description: skillData.description,
						};
						break;
					case "softSkill":
						payload = {
							...basePayload,
							type: "softSkill",
							icon: skillData.icon,
							category: skillData.category,
						};
						break;
				}

				result = selectedItem?._id
					? await updateSkill({ ...payload, _id: selectedItem._id })
					: await addSkill(payload);
				break;
			}
		}

		await loadItems();
		resetForm();
	};

	const [selectedAction, setSelectedAction] = useState<string | null>(null);
	if (!selectedAction) {
		return (
			<div className="relative backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 rounded-2xl p-8 shadow-xl border border-none">
				<h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
					Portfolio Management
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{[
						{ icon: "✨", label: "Update Skills", action: "updateSkills" },
						{ icon: "➕", label: "Add Skills", action: "addSkills" },
						{
							icon: "🎓",
							label: "Update Education",
							action: "updateEducation",
						},
						{ icon: "📚", label: "Add Education", action: "addEducation" },
						{
							icon: "📝",
							label: "Edit Responsibilities",
							action: "editResponsibilities",
						},
						{
							icon: "✍️",
							label: "Add Responsibilities",
							action: "addResponsibilities",
						},
						{ icon: "🚀", label: "Edit Projects", action: "editProjects" },
						{ icon: "💡", label: "Add Projects", action: "addProjects" },
					].map(({ icon, label, action }) => (
						<Button
							key={action}
							variant="ghost"
							onClick={() => setSelectedAction(action)}
							className="relative group h-24 overflow-hidden transition-all hover:bg-white/10"
						>
							<div className="flex flex-col items-center space-y-2">
								<span className="text-2xl group-hover:scale-110 transition-transform">
									{icon}
								</span>
								<span className="font-medium text-sm text-gray-200 group-hover:text-white transition-colors">
									{label}
								</span>
							</div>
							<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
						</Button>
					))}
				</div>

				<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-600/20 dark:from-orange-800/5 dark:to-amber-900/20 rounded-2xl -z-10" />
			</div>
		);
	}

	// Add a back button and show the rest of the content when an action is selected
	return (
		<div className="relative backdrop-blur-lg bg-gray-800/30 rounded-2xl p-6 shadow-xl border border-none">
			<Button
				variant="ghost"
				onClick={() => setSelectedAction(null)}
				className="mb-4 text-slate-400"
			>
				← Back to menu
			</Button>
			<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-600/20 dark:from-orange-800/5 dark:to-amber-900/20 rounded-2xl -z-10" />

			<div className="mt-4">
				<Tabs
					defaultValue="projects"
					onValueChange={(v) => setContentType(v as ContentType)}
				>
					<TabsList className="w-full mb-6">
						<TabsTrigger value="projects">Projects</TabsTrigger>
						<TabsTrigger value="education">Education</TabsTrigger>
						<TabsTrigger value="skills">Skills</TabsTrigger>
					</TabsList>

					<TabsContent value="projects">
						<form onSubmit={handleSubmit} className="space-y-4">
							<h2 className="text-2xl font-bold text-white mb-6 font-mono text-center">
								{selectedItem ? "Edit Project" : "Add New Project"}
							</h2>

							<Input
								type="text"
								placeholder="Project Title"
								value={formData.projects.title}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										projects: { ...prev.projects, title: e.target.value },
									}))
								}
								className="bg-white/5 text-gray-400 border-none transition-colors"
							/>

							<Textarea
								placeholder="Project Description"
								value={formData.projects.description}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										projects: { ...prev.projects, description: e.target.value },
									}))
								}
								className="bg-white/5 text-gray-400 border-none transition-colors min-h-[100px]"
							/>

							<Input
								placeholder="Technologies (comma-separated)"
								value={formData.projects.technologies.join(", ")}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										projects: {
											...prev.projects,
											technologies: e.target.value
												.split(",")
												.map((t) => t.trim()),
										},
									}))
								}
								className="bg-white/5 text-gray-400 border-none transition-colors"
							/>

							<Select
								value={formData.projects.status}
								onValueChange={(
									value: "Completed" | "In Progress" | "Planned"
								) =>
									setFormData((prev) => ({
										...prev,
										projects: { ...prev.projects, status: value },
									}))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Completed">Completed</SelectItem>
									<SelectItem value="In Progress">In Progress</SelectItem>
									<SelectItem value="Planned">Planned</SelectItem>
								</SelectContent>
							</Select>

							<Input
								type="number"
								placeholder="Location"
								value={formData.projects.location}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										projects: {
											...prev.projects,
											location: parseInt(e.target.value),
										},
									}))
								}
								className="bg-white/5 text-gray-400 border-none transition-colors"
							/>

							<div className="flex gap-2">
								<Button
									type="submit"
									className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 transition-colors text-white"
								>
									{selectedItem ? "Update Project" : "Add Project"}
								</Button>

								{selectedItem && (
									<Button
										type="button"
										variant="ghost"
										onClick={resetForm}
										className="text-gray-400 hover:text-white"
									>
										Cancel
									</Button>
								)}
							</div>
						</form>
					</TabsContent>

					<TabsContent value="education">
						<form onSubmit={handleSubmit} className="space-y-4">
							<Input
								placeholder="Institution"
								value={formData.education.institution}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										education: {
											...prev.education,
											institution: e.target.value,
										},
									}))
								}
								className="bg-white/5 text-gray-400 border-none"
							/>
							<Input
								placeholder="Degree"
								value={formData.education.title}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										education: { ...prev.education, title: e.target.value },
									}))
								}
								className="bg-white/5 text-gray-400 border-none"
							/>
							{/* Add other education fields */}
							<Button type="submit">
								{selectedItem ? "Update Education" : "Add Education"}
							</Button>
						</form>
					</TabsContent>

					<TabsContent value="skills">
						<form onSubmit={handleSubmit} className="space-y-4">
							<Input
								placeholder="Skill Name"
								value={formData.skills.name}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										skills: { ...prev.skills, name: e.target.value },
									}))
								}
								className="bg-white/5 text-gray-400 border-none"
							/>
							<Select
								value={formData.skills.category}
								onValueChange={(value: "Soft Skills" | "Other Avocations") =>
									setFormData((prev) => ({
										...prev,
										skills: { ...prev.skills, category: value },
									}))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Soft Skills">Soft Skills</SelectItem>
									<SelectItem value="Other Avocations">
										Other Avocations
									</SelectItem>
								</SelectContent>
							</Select>
							{/* Add other skill fields */}
							<Button type="submit">
								{selectedItem ? "Update Skill" : "Add Skill"}
							</Button>
						</form>
					</TabsContent>
				</Tabs>

				{/* Display existing items */}
				<div className="mt-6"></div>
			</div>
			<h3 className="text-lg font-semibold text-white mb-2">
				Existing {contentType}
			</h3>
			<div className="space-y-2">
				{items.map((item) => (
					<Button
						key={item._id}
						variant="ghost"
						className="w-full text-left"
						onClick={() => {
							setSelectedItem(item);
							setFormData((prev) => ({
								...prev,
								[contentType]: item,
							}));
						}}
					>
						{(item as any).name || (item as any).institution}
					</Button>
				))}
			</div>
		</div>
	);
}
