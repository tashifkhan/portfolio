"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
	Project,
	Education,
	Skill,
	NotableProject,
	Responsibility,
	Socials,
} from "@/types/content";

import ActionMenu from "./ActionMenu";
import AddProjectForm from "./forms/AddProjectForm";
import EditProjectsForm from "./forms/EditProjectsForm";
import DeleteProjectsForm from "./forms/DeleteProjectsForm";
import ReorderProjectsForm from "./forms/ReorderProjectsForm";
import UpdateSocialsForm from "./forms/UpdateSocialsForm";
import AutoAddProjectsForm from "./forms/AutoAddProjectsForm";
import EditExperienceForm from "./forms/EditExperienceForm";
import {
	AddNotableProjectForm,
	DeleteNotableProjectsForm,
	ReorderNotableProjectsForm,
} from "./forms/PlaceholderForms";
import { EditSkillsForm } from "./forms";
import {
	EditEducationForm,
	EditResponsibilitiesForm as RealEditResponsibilitiesForm,
	EditNotableProjectsForm,
} from "./forms";
import { ActionType } from "./types";

export default function UpdateForm() {
	const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
	const [projects, setProjects] = useState<Project[]>([]);
	const [notableProjects, setNotableProjects] = useState<NotableProject[]>([]);
	const [education, setEducation] = useState<Education[]>([]);
	const [responsibilities, setResponsibilities] = useState<Responsibility[]>(
		[]
	);
	const [skills, setSkills] = useState<any>(null);
	const [socials, setSocials] = useState<Socials | null>(null);
	const [experiences, setExperiences] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

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
				const response = await fetch("/api/skills/edit-skills");
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

		if (selectedAction === "manageExperience") {
			const response = await fetch("/api/experience");
			if (response.ok) {
				const data = await response.json();
				setExperiences(data);
			}
		}
	};

	const showMessage = (type: "success" | "error", text: string) => {
		setMessage({ type, text });
		setTimeout(() => setMessage(null), 5000);
	};

	if (!selectedAction) {
		return <ActionMenu onActionSelect={setSelectedAction} />;
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
							initialData={education as any}
							onSuccess={() => {
								showMessage("success", "Education updated successfully!");
								fetchData();
							}}
						/>
					)}
					{selectedAction === "editResponsibilities" && (
						<RealEditResponsibilitiesForm
							initialData={education as any}
							onSuccess={() => {
								showMessage(
									"success",
									"Responsibilities updated successfully!"
								);
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
						<EditSkillsForm
							initialData={skills}
							onSuccess={() => {
								showMessage("success", "Skills updated successfully!");
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
					{selectedAction === "manageExperience" && (
						<EditExperienceForm
							experiences={experiences}
							onSuccess={() => {
								showMessage("success", "Experience updated successfully!");
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
