"use client";

import { useState, useEffect } from "react";
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
	Project,
	Education,
	Skill,
	NotableProject,
	Responsibility,
	ProgrammingLanguage,
	Framework,
	BaseSkill,
	SoftSkill,
	CollageData,
} from "@/types/content";

type ContentType = "projects" | "education" | "skills";

export default function UpdateForm() {
	const { pending } = useFormStatus();
	const [contentType, setContentType] = useState<ContentType>("projects");
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const [notableProjects, setNotableProjects] = useState<NotableProject[]>([]);
	const [education, setEducation] = useState<Education[]>([]);
	const [skills, setSkills] = useState<Skill[]>([]);
	const [languages, setLanguages] = useState<ProgrammingLanguage[]>([]);
	const [frameworks, setFrameworks] = useState<Framework[]>([]);
	const [tools, setTools] = useState<BaseSkill[]>([]);
	const [softSkills, setSoftSkills] = useState<SoftSkill[]>([]);
	const [collageData, setCollageData] = useState<CollageData[]>([]);
	const [responsibilities, setResponsibilities] = useState<Responsibility[]>(
		[]
	);
	const [projects, setProjects] = useState<Project[]>([]);

	const [notableprojectFormVisible, setnotabkeProjectFormVisible] =
		useState<NotableProject>();
	const [projectFormData, setProjectFormData] = useState<Project>();
	const [responsibilityFormData, setResponsibilityFormData] =
		useState<Responsibility>();
	const [educationFormData, setEducationFormData] = useState<Education>();
	const [skillFormData, setSkillFormData] = useState<Skill>();
	const [languageFormData, setLanguageFormData] =
		useState<ProgrammingLanguage>();
	const [frameworkFormData, setFrameworkFormData] = useState<Framework>();
	const [toolFormData, setToolFormData] = useState<BaseSkill>();
	const [softSkillFormData, setSoftSkillFormData] = useState<SoftSkill>();

	useEffect(() => {}, [contentType]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form data: \n-------> dead <-------");
	};

	const [selectedAction, setSelectedAction] = useState<string | null>(null);
	if (!selectedAction) {
		return (
			<div className="relative backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 rounded-2xl p-8 shadow-xl border border-none">
				<h2 className="text-2xl font-mono mb-6 text-center bg-gradient-to-r from-orange-300 to-gray-300 via-amber-500 bg-clip-text text-transparent">
					Portfolio Management
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{[
						{ icon: "🎯", label: "Add Skills", action: "addSkills" },
						{
							icon: "🎓",
							label: "Update Education",
							action: "updateEducation",
						},
						{
							icon: "📝",
							label: "Edit Responsibilities",
							action: "editResponsibilities",
						},
						{ icon: "🌐", label: "Update Socials", action: "updateSocials" },
						{ icon: "🚀", label: "Edit Projects", action: "editProjects" },
						{ icon: "💡", label: "Add Projects", action: "addProjects" },
						{ icon: "🗑️", label: "Delete Projects", action: "deleteProjects" },
						{
							icon: "↕️",
							label: "Reorder Projects",
							action: "reorderProjects",
						},
						{
							icon: "⭐",
							label: "Add Notable Projects",
							action: "addNotableProjects",
						},
						{
							icon: "✨",
							label: "Update Notable Projects",
							action: "updateNotableProjects",
						},
						{
							icon: "❌",
							label: "Delete Notable Projects",
							action: "deleteNotableProjects",
						},
						{
							icon: "📊",
							label: "Reorder Notable Projects",
							action: "reorderNotableProjects",
						},
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
		</div>
	);
}
