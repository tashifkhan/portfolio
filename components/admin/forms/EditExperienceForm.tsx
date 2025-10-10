"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Experience {
	_id?: string;
	title: string;
	company: string;
	location: string;
	startDate: string;
	endDate?: string;
	current?: boolean;
	description: string[];
	technologies: string[];
	companyUrl?: string;
}

interface Props {
	experiences: Experience[];
	onSuccess: () => void;
}

export default function EditExperienceForm({ experiences, onSuccess }: Props) {
	const [editing, setEditing] = useState<Experience | null>(null);
	const [form, setForm] = useState<Experience | null>(null);
	const [loading, setLoading] = useState(false);
	const [descInput, setDescInput] = useState("");
	const [techInput, setTechInput] = useState("");

	const startAdd = () => {
		const empty: Experience = {
			title: "",
			company: "",
			location: "",
			startDate: new Date().toISOString().slice(0, 10),
			endDate: "",
			current: false,
			description: [],
			technologies: [],
		};
		setEditing(empty);
		setForm(empty);
	};

	const handleEditClick = (exp: Experience) => {
		setEditing(exp);
		setForm({ ...exp });
	};

	const addDescription = () => {
		if (!form) return;
		if (descInput.trim()) {
			setForm({
				...form,
				description: [...form.description, descInput.trim()],
			});
			setDescInput("");
		}
	};

	const removeDescription = (idx: number) => {
		if (!form) return;
		setForm({
			...form,
			description: form.description.filter((_, i) => i !== idx),
		});
	};

	const addTech = () => {
		if (!form) return;
		if (techInput.trim() && !form.technologies.includes(techInput.trim())) {
			setForm({
				...form,
				technologies: [...form.technologies, techInput.trim()],
			});
			setTechInput("");
		}
	};

	const removeTech = (tech: string) => {
		if (!form) return;
		setForm({
			...form,
			technologies: form.technologies.filter((t) => t !== tech),
		});
	};

	const handleSave = async () => {
		if (!form) return;
		setLoading(true);
		try {
			const method = form._id ? "PUT" : "POST";
			const body = form._id ? form : form;

			const res = await fetch("/api/experience", {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			if (res.ok) {
				onSuccess();
				setEditing(null);
				setForm(null);
			}
		} catch (err) {
			console.error("Experience save error:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id?: string) => {
		if (!id) return;
		setLoading(true);
		try {
			const res = await fetch("/api/experience", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ _id: id }),
			});
			if (res.ok) {
				onSuccess();
			}
		} catch (err) {
			console.error("Experience delete error:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		setEditing(null);
		setForm(null);
	};

	if (editing && form) {
		return (
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="text-orange-300 font-medium">
						{form._id ? `Editing: ${form.title}` : "Add Experience"}
					</h3>
					<Button
						variant="ghost"
						onClick={handleCancel}
						className="text-gray-400"
					>
						Cancel
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm text-gray-300 mb-1">Title</label>
						<Input
							value={form.title}
							onChange={(e) => setForm({ ...form, title: e.target.value })}
							className="bg-white/5 text-gray-300"
						/>
					</div>
					<div>
						<label className="block text-sm text-gray-300 mb-1">Company</label>
						<Input
							value={form.company}
							onChange={(e) => setForm({ ...form, company: e.target.value })}
							className="bg-white/5 text-gray-300"
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label className="block text-sm text-gray-300 mb-1">Location</label>
						<Input
							value={form.location}
							onChange={(e) => setForm({ ...form, location: e.target.value })}
							className="bg-white/5 text-gray-300"
						/>
					</div>
					<div>
						<label className="block text-sm text-gray-300 mb-1">
							Start Date
						</label>
						<Input
							type="date"
							value={form.startDate}
							onChange={(e) => setForm({ ...form, startDate: e.target.value })}
							className="bg-white/5 text-gray-300"
						/>
					</div>
					<div>
						<label className="block text-sm text-gray-300 mb-1">End Date</label>
						<Input
							type="date"
							value={form.endDate || ""}
							onChange={(e) => setForm({ ...form, endDate: e.target.value })}
							className="bg-white/5 text-gray-300"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm text-gray-300 mb-1">
						Company URL
					</label>
					<Input
						value={form.companyUrl || ""}
						onChange={(e) => setForm({ ...form, companyUrl: e.target.value })}
						className="bg-white/5 text-gray-300"
					/>
				</div>

				<div>
					<label className="block text-sm text-gray-300 mb-1">
						Description
					</label>
					<div className="flex gap-2 mb-2">
						<Input
							value={descInput}
							onChange={(e) => setDescInput(e.target.value)}
							onKeyPress={(e) =>
								e.key === "Enter" && (e.preventDefault(), addDescription())
							}
							className="bg-white/5 text-gray-300"
						/>
						<Button
							type="button"
							onClick={addDescription}
							className="bg-orange-500"
						>
							Add
						</Button>
					</div>
					<div className="space-y-2">
						{form.description.map((d, i) => (
							<div
								key={i}
								className="flex items-center justify-between bg-white/5 p-2 rounded"
							>
								<div className="text-sm text-white/80">{d}</div>
								<Button
									variant="ghost"
									onClick={() => removeDescription(i)}
									className="text-red-400"
								>
									Remove
								</Button>
							</div>
						))}
					</div>
				</div>

				<div>
					<label className="block text-sm text-gray-300 mb-1">
						Technologies
					</label>
					<div className="flex gap-2 mb-2">
						<Input
							value={techInput}
							onChange={(e) => setTechInput(e.target.value)}
							onKeyPress={(e) =>
								e.key === "Enter" && (e.preventDefault(), addTech())
							}
							className="bg-white/5 text-gray-300"
						/>
						<Button type="button" onClick={addTech} className="bg-orange-500">
							Add
						</Button>
					</div>
					<div className="flex flex-wrap gap-2">
						{form.technologies.map((t) => (
							<div
								key={t}
								className="bg-white/5 px-3 py-1 rounded flex items-center gap-2"
							>
								<span className="text-sm text-white/80">{t}</span>
								<Button
									variant="ghost"
									onClick={() => removeTech(t)}
									className="text-red-400"
								>
									×
								</Button>
							</div>
						))}
					</div>
				</div>

				<div className="flex gap-2">
					<Button
						onClick={handleSave}
						disabled={loading}
						className="bg-orange-500"
					>
						{loading ? "Saving..." : "Save"}
					</Button>
					{form._id && (
						<Button
							onClick={() => handleDelete(form._id)}
							disabled={loading}
							className="bg-red-500"
						>
							{loading ? "Deleting..." : "Delete"}
						</Button>
					)}
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-orange-300 font-medium">Manage Experience</h3>
				<Button onClick={startAdd} className="bg-orange-500">
					Add Experience
				</Button>
			</div>

			<div className="space-y-3">
				{experiences.map((exp) => (
					<div
						key={exp._id || exp.title}
						className="bg-white/5 p-3 rounded flex items-center justify-between"
					>
						<div>
							<div className="text-white/90 font-medium">
								{exp.title} @ {exp.company}
							</div>
							<div className="text-sm text-gray-400">
								{exp.location} • {exp.startDate} -{" "}
								{exp.current ? "Present" : exp.endDate}
							</div>
						</div>
						<div className="flex gap-2">
							<Button
								onClick={() => handleEditClick(exp)}
								className="bg-amber-500"
							>
								Edit
							</Button>
							<Button
								onClick={() => handleDelete(exp._id)}
								className="bg-red-500"
							>
								Delete
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
