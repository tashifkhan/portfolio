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
} from "@/types/content";

type ActionType = 
	| "addSkills" | "updateEducation" | "editResponsibilities" | "updateSocials"
	| "editProjects" | "addProjects" | "deleteProjects" | "reorderProjects"
	| "addNotableProjects" | "updateNotableProjects" | "deleteNotableProjects" | "reorderNotableProjects"

export default function UpdateForm() {
	const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
	const [projects, setProjects] = useState<Project[]>([]);
	const [notableProjects, setNotableProjects] = useState<NotableProject[]>([]);
	const [education, setEducation] = useState<Education[]>([]);
	const [responsibilities, setResponsibilities] = useState<Responsibility[]>([]);
	const [skills, setSkills] = useState<Skill[]>([]);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

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
			if (selectedAction.includes('Project')) {
				if (selectedAction.includes('Notable')) {
					const response = await fetch('/api/notable-projects');
					if (response.ok) {
						const data = await response.json();
						setNotableProjects(data);
					}
				} else {
					const response = await fetch('/api/projects');
					if (response.ok) {
						const data = await response.json();
						setProjects(data);
					}
				}
			}
			
			if (selectedAction.includes('Education')) {
				const response = await fetch('/api/edu');
				if (response.ok) {
					const data = await response.json();
					setEducation(data);
				}
			}
			
			if (selectedAction.includes('Responsibilities')) {
				const response = await fetch('/api/responsibilities');
				if (response.ok) {
					const data = await response.json();
					setResponsibilities(data);
				}
			}
			
			if (selectedAction.includes('Skills')) {
				const response = await fetch('/api/skills');
				if (response.ok) {
					const data = await response.json();
					setSkills(data);
				}
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	const showMessage = (type: 'success' | 'error', text: string) => {
		setMessage({ type, text });
		setTimeout(() => setMessage(null), 5000);
	};

	if (!selectedAction) {
		return (
			<div className="relative backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 rounded-2xl p-8 shadow-xl border border-none">
				<h2 className="text-2xl font-mono mb-6 text-center bg-gradient-to-r from-orange-300 to-gray-300 via-amber-500 bg-clip-text text-transparent">
					Portfolio Management
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{[
						{ icon: "🎯", label: "Add Skills", action: "addSkills" as ActionType },
						{ icon: "🎓", label: "Update Education", action: "updateEducation" as ActionType },
						{ icon: "📝", label: "Edit Responsibilities", action: "editResponsibilities" as ActionType },
						{ icon: "🌐", label: "Update Socials", action: "updateSocials" as ActionType },
						{ icon: "🚀", label: "Edit Projects", action: "editProjects" as ActionType },
						{ icon: "💡", label: "Add Projects", action: "addProjects" as ActionType },
						{ icon: "🗑️", label: "Delete Projects", action: "deleteProjects" as ActionType },
						{ icon: "↕️", label: "Reorder Projects", action: "reorderProjects" as ActionType },
						{ icon: "⭐", label: "Add Notable Projects", action: "addNotableProjects" as ActionType },
						{ icon: "✨", label: "Update Notable Projects", action: "updateNotableProjects" as ActionType },
						{ icon: "❌", label: "Delete Notable Projects", action: "deleteNotableProjects" as ActionType },
						{ icon: "📊", label: "Reorder Notable Projects", action: "reorderNotableProjects" as ActionType },
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
			<div className="flex items-center justify-between mb-6">
				<Button
					variant="ghost"
					onClick={() => setSelectedAction(null)}
					className="text-slate-400 hover:text-white"
				>
					← Back to menu
				</Button>
				<h3 className="text-xl font-mono bg-gradient-to-r from-orange-300 to-amber-500 bg-clip-text text-transparent">
					{selectedAction.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
				</h3>
			</div>

			{message && (
				<div className={`mb-4 p-3 rounded-lg ${
					message.type === 'success' 
						? 'bg-green-500/20 text-green-300 border border-green-500/30' 
						: 'bg-red-500/20 text-red-300 border border-red-500/30'
				}`}>
					{message.text}
				</div>
			)}

			{loading ? (
				<div className="flex justify-center items-center py-12">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
				</div>
			) : (
				<>
					{selectedAction === 'addProjects' && <AddProjectForm onSuccess={() => { showMessage('success', 'Project added successfully!'); fetchData(); }} />}
					{selectedAction === 'editProjects' && <EditProjectsForm projects={projects} onSuccess={() => { showMessage('success', 'Project updated successfully!'); fetchData(); }} />}
					{selectedAction === 'deleteProjects' && <DeleteProjectsForm projects={projects} onSuccess={() => { showMessage('success', 'Project deleted successfully!'); fetchData(); }} />}
					{selectedAction === 'addNotableProjects' && <AddNotableProjectForm onSuccess={() => { showMessage('success', 'Notable project added successfully!'); fetchData(); }} />}
					{selectedAction === 'updateNotableProjects' && <EditNotableProjectsForm projects={notableProjects} onSuccess={() => { showMessage('success', 'Notable project updated successfully!'); fetchData(); }} />}
					{selectedAction === 'deleteNotableProjects' && <DeleteNotableProjectsForm projects={notableProjects} onSuccess={() => { showMessage('success', 'Notable project deleted successfully!'); fetchData(); }} />}
					{selectedAction === 'updateEducation' && <EditEducationForm education={education} onSuccess={() => { showMessage('success', 'Education updated successfully!'); fetchData(); }} />}
					{selectedAction === 'editResponsibilities' && <EditResponsibilitiesForm responsibilities={responsibilities} onSuccess={() => { showMessage('success', 'Responsibility updated successfully!'); fetchData(); }} />}
					{selectedAction === 'addSkills' && <AddSkillForm onSuccess={() => { showMessage('success', 'Skill added successfully!'); fetchData(); }} />}
				</>
			)}

			<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-600/20 dark:from-orange-800/5 dark:to-amber-900/20 rounded-2xl -z-10" />
		</div>
	);
}

// Add Project Form Component
function AddProjectForm({ onSuccess }: { onSuccess: () => void }) {
	const [formData, setFormData] = useState<Omit<Project, '_id' | 'createdAt' | 'updatedAt'>>({
		position: 1,
		title: '',
		description: '',
		technologies: [],
		status: 'Planned',
		githubLink: '',
		liveLink: '',
		playstoreLink: ''
	});
	const [techInput, setTechInput] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch('/api/projects', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				onSuccess();
				setFormData({
					position: 1,
					title: '',
					description: '',
					technologies: [],
					status: 'Planned',
					githubLink: '',
					liveLink: '',
					playstoreLink: ''
				});
				setTechInput('');
			}
		} catch (error) {
			console.error('Error adding project:', error);
		} finally {
			setLoading(false);
		}
	};

	const addTechnology = () => {
		if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
			setFormData(prev => ({
				...prev,
				technologies: [...prev.technologies, techInput.trim()]
			}));
			setTechInput('');
		}
	};

	const removeTechnology = (tech: string) => {
		setFormData(prev => ({
			...prev,
			technologies: prev.technologies.filter(t => t !== tech)
		}));
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Input
					placeholder="Project Title"
					value={formData.title}
					onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
					className="bg-white/5 text-gray-300 border-orange-500/20"
					required
				/>
				<Input
					type="number"
					placeholder="Position/Order"
					value={formData.position}
					onChange={(e) => setFormData(prev => ({ ...prev, position: parseInt(e.target.value) }))}
					className="bg-white/5 text-gray-300 border-orange-500/20"
					required
				/>
			</div>

			<Textarea
				placeholder="Project Description"
				value={formData.description}
				onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
				className="bg-white/5 text-gray-300 border-orange-500/20"
				rows={4}
				required
			/>

			<div>
				<div className="flex gap-2 mb-2">
					<Input
						placeholder="Add Technology"
						value={techInput}
						onChange={(e) => setTechInput(e.target.value)}
						onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
						className="bg-white/5 text-gray-300 border-orange-500/20"
					/>
					<Button type="button" onClick={addTechnology} className="bg-orange-500 hover:bg-orange-600">
						Add
					</Button>
				</div>
				<div className="flex flex-wrap gap-2">
					{formData.technologies.map(tech => (
						<span key={tech} className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm flex items-center gap-2">
							{tech}
							<button type="button" onClick={() => removeTechnology(tech)} className="hover:text-red-400">×</button>
						</span>
					))}
				</div>
			</div>

			<Select value={formData.status} onValueChange={(value: Project['status']) => setFormData(prev => ({ ...prev, status: value }))}>
				<SelectTrigger className="bg-white/5 text-gray-300 border-orange-500/20">
					<SelectValue placeholder="Select Status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="Planned">Planned</SelectItem>
					<SelectItem value="In Progress">In Progress</SelectItem>
					<SelectItem value="Completed">Completed</SelectItem>
				</SelectContent>
			</Select>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Input
					placeholder="GitHub Link (optional)"
					value={formData.githubLink}
					onChange={(e) => setFormData(prev => ({ ...prev, githubLink: e.target.value }))}
					className="bg-white/5 text-gray-300 border-orange-500/20"
				/>
				<Input
					placeholder="Live Link (optional)"
					value={formData.liveLink}
					onChange={(e) => setFormData(prev => ({ ...prev, liveLink: e.target.value }))}
					className="bg-white/5 text-gray-300 border-orange-500/20"
				/>
				<Input
					placeholder="Play Store Link (optional)"
					value={formData.playstoreLink}
					onChange={(e) => setFormData(prev => ({ ...prev, playstoreLink: e.target.value }))}
					className="bg-white/5 text-gray-300 border-orange-500/20"
				/>
			</div>

			<Button 
				type="submit" 
				disabled={loading}
				className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
			>
				{loading ? 'Adding Project...' : 'Add Project'}
			</Button>
		</form>
	);
}

// Placeholder components for other forms - you can expand these similarly
function EditProjectsForm({ projects, onSuccess }: { projects: Project[], onSuccess: () => void }) {
	return (
		<div className="space-y-4">
			<p className="text-gray-300">Select a project to edit:</p>
			{projects.map(project => (
				<div key={project._id} className="bg-white/5 p-4 rounded border border-orange-500/20">
					<h4 className="text-orange-300 font-medium">{project.title}</h4>
					<p className="text-gray-400 text-sm">{project.description}</p>
					<Button className="mt-2 bg-orange-500 hover:bg-orange-600 text-sm">
						Edit Project
					</Button>
				</div>
			))}
		</div>
	);
}

function DeleteProjectsForm({ projects, onSuccess }: { projects: Project[], onSuccess: () => void }) {
	const [loading, setLoading] = useState<string | null>(null);

	const handleDelete = async (id: string) => {
		setLoading(id);
		try {
			const response = await fetch('/api/projects', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id })
			});

			if (response.ok) {
				onSuccess();
			}
		} catch (error) {
			console.error('Error deleting project:', error);
		} finally {
			setLoading(null);
		}
	};

	return (
		<div className="space-y-4">
			<p className="text-gray-300">Select a project to delete:</p>
			{projects.map(project => (
				<div key={project._id} className="bg-white/5 p-4 rounded border border-red-500/20">
					<h4 className="text-red-300 font-medium">{project.title}</h4>
					<p className="text-gray-400 text-sm">{project.description}</p>
					<Button 
						onClick={() => project._id && handleDelete(project._id)}
						disabled={loading === project._id}
						className="mt-2 bg-red-500 hover:bg-red-600 text-sm"
					>
						{loading === project._id ? 'Deleting...' : 'Delete Project'}
					</Button>
				</div>
			))}
		</div>
	);
}

// Add similar components for other forms...
function AddNotableProjectForm({ onSuccess }: { onSuccess: () => void }) {
	return <div className="text-gray-300">Notable Project form coming soon...</div>;
}

function EditNotableProjectsForm({ projects, onSuccess }: { projects: NotableProject[], onSuccess: () => void }) {
	return <div className="text-gray-300">Edit Notable Projects form coming soon...</div>;
}

function DeleteNotableProjectsForm({ projects, onSuccess }: { projects: NotableProject[], onSuccess: () => void }) {
	return <div className="text-gray-300">Delete Notable Projects form coming soon...</div>;
}

function EditEducationForm({ education, onSuccess }: { education: Education[], onSuccess: () => void }) {
	return <div className="text-gray-300">Edit Education form coming soon...</div>;
}

function EditResponsibilitiesForm({ responsibilities, onSuccess }: { responsibilities: Responsibility[], onSuccess: () => void }) {
	return <div className="text-gray-300">Edit Responsibilities form coming soon...</div>;
}

function AddSkillForm({ onSuccess }: { onSuccess: () => void }) {
	return <div className="text-gray-300">Add Skill form coming soon...</div>;
}
