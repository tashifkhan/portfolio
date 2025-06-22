"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Project,
	NotableProject,
	Education,
	Responsibility,
	Skill,
} from "@/types/content";

interface AddNotableProjectFormProps {
	onSuccess: () => void;
}

export function AddNotableProjectForm({
	onSuccess,
}: AddNotableProjectFormProps) {
	return (
		<div className="text-gray-300">
			<p className="mb-4">Notable Project form coming soon...</p>
			<Button onClick={onSuccess} className="bg-orange-500 hover:bg-orange-600">
				Simulate Success
			</Button>
		</div>
	);
}

interface EditNotableProjectsFormProps {
	projects: NotableProject[];
	onSuccess: () => void;
}

export function EditNotableProjectsForm({
	projects,
	onSuccess,
}: EditNotableProjectsFormProps) {
	return (
		<div className="text-gray-300">
			<p className="mb-4">Edit Notable Projects form coming soon...</p>
			<Button onClick={onSuccess} className="bg-orange-500 hover:bg-orange-600">
				Simulate Success
			</Button>
		</div>
	);
}

interface DeleteNotableProjectsFormProps {
	projects: NotableProject[];
	onSuccess: () => void;
}

export function DeleteNotableProjectsForm({
	projects,
	onSuccess,
}: DeleteNotableProjectsFormProps) {
	return (
		<div className="text-gray-300">
			<p className="mb-4">Delete Notable Projects form coming soon...</p>
			<Button onClick={onSuccess} className="bg-orange-500 hover:bg-orange-600">
				Simulate Success
			</Button>
		</div>
	);
}

interface ReorderNotableProjectsFormProps {
	projects: NotableProject[];
	onSuccess: () => void;
}

export function ReorderNotableProjectsForm({
	projects,
	onSuccess,
}: ReorderNotableProjectsFormProps) {
	return (
		<div className="text-gray-300">
			<p className="mb-4">Reorder Notable Projects form coming soon...</p>
			<Button onClick={onSuccess} className="bg-orange-500 hover:bg-orange-600">
				Simulate Success
			</Button>
		</div>
	);
}

interface EditEducationFormProps {
	education: Education[];
	onSuccess: () => void;
}

export function EditEducationForm({
	education,
	onSuccess,
}: EditEducationFormProps) {
	return (
		<div className="text-gray-300">
			<p className="mb-4">Edit Education form coming soon...</p>
			<Button onClick={onSuccess} className="bg-orange-500 hover:bg-orange-600">
				Simulate Success
			</Button>
		</div>
	);
}

interface EditResponsibilitiesFormProps {
	responsibilities: Responsibility[];
	onSuccess: () => void;
}

export function EditResponsibilitiesForm({
	responsibilities,
	onSuccess,
}: EditResponsibilitiesFormProps) {
	return (
		<div className="text-gray-300">
			<p className="mb-4">Edit Responsibilities form coming soon...</p>
			<Button onClick={onSuccess} className="bg-orange-500 hover:bg-orange-600">
				Simulate Success
			</Button>
		</div>
	);
}

interface AddSkillFormProps {
	onSuccess: () => void;
}

export function AddSkillForm({ onSuccess }: AddSkillFormProps) {
	return (
		<div className="text-gray-300">
			<p className="mb-4">Add Skill form coming soon...</p>
			<Button onClick={onSuccess} className="bg-orange-500 hover:bg-orange-600">
				Simulate Success
			</Button>
		</div>
	);
}
