"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LanguageItem = {
	name: string;
	icon: string;
};

type FrameworkItem = {
	name: string;
	description: string;
};

type ToolItem = {
	name: string;
	icon: string;
	description: string;
};

type SoftSkillItem = {
	name: string;
	icon: string;
	category: "Soft Skills" | "Other Avocations" | string;
};

type SkillsDoc = {
	_id?: string;
	languages: LanguageItem[];
	frameworks: FrameworkItem[];
	tools: ToolItem[];
	softSkills: SoftSkillItem[];
};

interface Props {
	initialData?: SkillsDoc | null;
	onSuccess: () => void;
}

export default function EditSkillsForm({ initialData, onSuccess }: Props) {
	const [languages, setLanguages] = useState<LanguageItem[]>([]);
	const [frameworks, setFrameworks] = useState<FrameworkItem[]>([]);
	const [tools, setTools] = useState<ToolItem[]>([]);
	const [softSkills, setSoftSkills] = useState<SoftSkillItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const normalized = useMemo<SkillsDoc | null>(() => {
		if (!initialData) return null;
		if (
			initialData &&
			(Array.isArray((initialData as any).languages) ||
				Array.isArray((initialData as any).frameworks) ||
				Array.isArray((initialData as any).tools) ||
				Array.isArray((initialData as any).softSkills))
		) {
			return initialData as SkillsDoc;
		}
		return null;
	}, [initialData]);

	useEffect(() => {
		let ignore = false;
		const hydrate = async () => {
			try {
				setLoading(true);
				if (normalized) {
					if (!ignore) {
						setLanguages(normalized.languages || []);
						setFrameworks(normalized.frameworks || []);
						setTools(normalized.tools || []);
						setSoftSkills(normalized.softSkills || []);
					}
				} else {
					const res = await fetch("/api/skills/edit-skills", {
						cache: "no-store",
					});
					if (!res.ok) throw new Error("Failed to fetch skills data");
					const doc = (await res.json()) as SkillsDoc;
					if (!ignore) {
						setLanguages(doc?.languages || []);
						setFrameworks(doc?.frameworks || []);
						setTools(doc?.tools || []);
						setSoftSkills(doc?.softSkills || []);
					}
				}
			} catch (e: any) {
				if (!ignore) setError(e?.message ?? "Failed to load skills");
			} finally {
				if (!ignore) setLoading(false);
			}
		};
		hydrate();
		return () => {
			ignore = true;
		};
	}, [normalized]);

	// Helpers for CRUD within arrays
	const handleLangChange = (
		idx: number,
		key: keyof LanguageItem,
		value: string
	) => {
		setLanguages((prev) => {
			const next = [...prev];
			next[idx] = { ...next[idx], [key]: value } as LanguageItem;
			return next;
		});
	};
	const addLanguage = () => setLanguages((p) => [...p, { name: "", icon: "" }]);
	const removeLanguage = (idx: number) =>
		setLanguages((p) => p.filter((_, i) => i !== idx));

	const handleFrameworkChange = (
		idx: number,
		key: keyof FrameworkItem,
		value: string
	) => {
		setFrameworks((prev) => {
			const next = [...prev];
			next[idx] = { ...next[idx], [key]: value } as FrameworkItem;
			return next;
		});
	};
	const addFramework = () =>
		setFrameworks((p) => [...p, { name: "", description: "" }]);
	const removeFramework = (idx: number) =>
		setFrameworks((p) => p.filter((_, i) => i !== idx));

	const handleToolChange = (
		idx: number,
		key: keyof ToolItem,
		value: string
	) => {
		setTools((prev) => {
			const next = [...prev];
			next[idx] = { ...next[idx], [key]: value } as ToolItem;
			return next;
		});
	};
	const addTool = () =>
		setTools((p) => [...p, { name: "", icon: "", description: "" }]);
	const removeTool = (idx: number) =>
		setTools((p) => p.filter((_, i) => i !== idx));

	const handleSoftSkillChange = (
		idx: number,
		key: keyof SoftSkillItem,
		value: string
	) => {
		setSoftSkills((prev) => {
			const next = [...prev];
			next[idx] = { ...next[idx], [key]: value } as SoftSkillItem;
			return next;
		});
	};
	const addSoftSkill = () =>
		setSoftSkills((p) => [
			...p,
			{ name: "", icon: "", category: "Soft Skills" },
		]);
	const removeSoftSkill = (idx: number) =>
		setSoftSkills((p) => p.filter((_, i) => i !== idx));

	const isValid = () => {
		const langsOk = languages.every((l) => l.name && l.icon);
		const frameworksOk = frameworks.every((f) => f.name && f.description);
		const toolsOk = tools.every((t) => t.name && t.icon && t.description);
		const softOk = softSkills.every((s) => s.name && s.icon && s.category);
		return langsOk && frameworksOk && toolsOk && softOk;
	};

	const handleSave = async () => {
		try {
			setSaving(true);
			setError(null);
			if (!isValid()) {
				setError("Please complete all required fields in each section");
				setSaving(false);
				return;
			}
			const res = await fetch("/api/skills/edit-skills", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ languages, frameworks, tools, softSkills }),
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data?.error || "Failed to update skills");
			}
			onSuccess();
		} catch (e: any) {
			setError(e?.message ?? "Failed to update skills");
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center py-8">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{error && (
				<div className="p-3 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30">
					{error}
				</div>
			)}

			{/* Languages */}
			<section className="space-y-3">
				<div className="flex items-center justify-between">
					<h4 className="text-lg font-mono">Languages</h4>
					<Button
						onClick={addLanguage}
						className="bg-orange-500 hover:bg-orange-600"
					>
						+ Add language
					</Button>
				</div>
				{languages.length === 0 && (
					<div className="text-sm text-slate-400">No languages yet.</div>
				)}
				<div className="space-y-3">
					{languages.map((item, idx) => (
						<div
							key={idx}
							className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3"
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								<div>
									<label className="block text-xs text-slate-400 mb-1">
										Name
									</label>
									<Input
										value={item.name}
										onChange={(e) =>
											handleLangChange(idx, "name", e.target.value)
										}
										placeholder="Python"
									/>
								</div>
								<div>
									<label className="block text-xs text-slate-400 mb-1">
										Icon
									</label>
									<Input
										value={item.icon}
										onChange={(e) =>
											handleLangChange(idx, "icon", e.target.value)
										}
										placeholder="FaPython"
									/>
								</div>
							</div>
							<div className="flex justify-end">
								<Button
									variant="ghost"
									onClick={() => removeLanguage(idx)}
									className="text-red-300 hover:text-red-200"
								>
									Remove
								</Button>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Frameworks */}
			<section className="space-y-3">
				<div className="flex items-center justify-between">
					<h4 className="text-lg font-mono">Frameworks</h4>
					<Button
						onClick={addFramework}
						className="bg-orange-500 hover:bg-orange-600"
					>
						+ Add framework
					</Button>
				</div>
				{frameworks.length === 0 && (
					<div className="text-sm text-slate-400">No frameworks yet.</div>
				)}
				<div className="space-y-3">
					{frameworks.map((item, idx) => (
						<div
							key={idx}
							className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3"
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								<div>
									<label className="block text-xs text-slate-400 mb-1">
										Name
									</label>
									<Input
										value={item.name}
										onChange={(e) =>
											handleFrameworkChange(idx, "name", e.target.value)
										}
										placeholder="Next.js"
									/>
								</div>
								<div>
									<label className="block text-xs text-slate-400 mb-1">
										Description
									</label>
									<Input
										value={item.description}
										onChange={(e) =>
											handleFrameworkChange(idx, "description", e.target.value)
										}
										placeholder="React Framework"
									/>
								</div>
							</div>
							<div className="flex justify-end">
								<Button
									variant="ghost"
									onClick={() => removeFramework(idx)}
									className="text-red-300 hover:text-red-200"
								>
									Remove
								</Button>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Tools */}
			<section className="space-y-3">
				<div className="flex items-center justify-between">
					<h4 className="text-lg font-mono">Tools & Technologies</h4>
					<Button
						onClick={addTool}
						className="bg-orange-500 hover:bg-orange-600"
					>
						+ Add tool
					</Button>
				</div>
				{tools.length === 0 && (
					<div className="text-sm text-slate-400">No tools yet.</div>
				)}
				<div className="space-y-3">
					{tools.map((item, idx) => (
						<div
							key={idx}
							className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3"
						>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
								<div>
									<label className="block text-xs text-slate-400 mb-1">
										Name
									</label>
									<Input
										value={item.name}
										onChange={(e) =>
											handleToolChange(idx, "name", e.target.value)
										}
										placeholder="Docker"
									/>
								</div>
								<div>
									<label className="block text-xs text-slate-400 mb-1">
										Icon
									</label>
									<Input
										value={item.icon}
										onChange={(e) =>
											handleToolChange(idx, "icon", e.target.value)
										}
										placeholder="Box"
									/>
								</div>
								<div>
									<label className="block text-xs text-slate-400 mb-1">
										Description
									</label>
									<Input
										value={item.description}
										onChange={(e) =>
											handleToolChange(idx, "description", e.target.value)
										}
										placeholder="Containerization Platform"
									/>
								</div>
							</div>
							<div className="flex justify-end">
								<Button
									variant="ghost"
									onClick={() => removeTool(idx)}
									className="text-red-300 hover:text-red-200"
								>
									Remove
								</Button>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Soft Skills */}
			<section className="space-y-3">
				<div className="flex items-center justify-between">
					<h4 className="text-lg font-mono">Soft Skills & Avocations</h4>
					<Button
						onClick={addSoftSkill}
						className="bg-orange-500 hover:bg-orange-600"
					>
						+ Add soft skill
					</Button>
				</div>
				{softSkills.length === 0 && (
					<div className="text-sm text-slate-400">No soft skills yet.</div>
				)}
				<div className="space-y-3">
					{softSkills.map((item, idx) => (
						<div
							key={idx}
							className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3"
						>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
								<div>
									<label className="block text-xs text-slate-400 mb-1">
										Name
									</label>
									<Input
										value={item.name}
										onChange={(e) =>
											handleSoftSkillChange(idx, "name", e.target.value)
										}
										placeholder="Leadership"
									/>
								</div>
								<div>
									<label className="block text-xs text-slate-400 mb-1">
										Icon
									</label>
									<Input
										value={item.icon}
										onChange={(e) =>
											handleSoftSkillChange(idx, "icon", e.target.value)
										}
										placeholder="Users"
									/>
								</div>
								<div>
									<label className="block text-xs text-slate-400 mb-1">
										Category
									</label>
									<select
										className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 focus:outline-none"
										value={item.category}
										onChange={(e) =>
											handleSoftSkillChange(idx, "category", e.target.value)
										}
									>
										<option value="Soft Skills">Soft Skills</option>
										<option value="Other Avocations">Other Avocations</option>
									</select>
								</div>
							</div>
							<div className="flex justify-end">
								<Button
									variant="ghost"
									onClick={() => removeSoftSkill(idx)}
									className="text-red-300 hover:text-red-200"
								>
									Remove
								</Button>
							</div>
						</div>
					))}
				</div>
			</section>

			<div className="flex justify-end gap-3 pt-2">
				<Button
					onClick={handleSave}
					disabled={saving}
					className="bg-orange-500 hover:bg-orange-600"
				>
					{saving ? "Saving..." : "Save changes"}
				</Button>
			</div>
		</div>
	);
}
