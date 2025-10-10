"use client";

import { Button } from "@/components/ui/button";

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

interface ActionMenuProps {
	onActionSelect: (action: ActionType) => void;
}

export default function ActionMenu({ onActionSelect }: ActionMenuProps) {
	const actions = [
		{ label: "Update Skills", action: "addSkills" as ActionType },
		{ label: "Update Education", action: "updateEducation" as ActionType },
		{
			label: "Edit Responsibilities",
			action: "editResponsibilities" as ActionType,
		},
		{ label: "Update Socials", action: "updateSocials" as ActionType },
		{ label: "Edit Projects", action: "editProjects" as ActionType },
		{ label: "Add Projects", action: "addProjects" as ActionType },
		{ label: "Delete Projects", action: "deleteProjects" as ActionType },
		{ label: "Reorder Projects", action: "reorderProjects" as ActionType },
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
		{ label: "Auto Add Projects", action: "autoAddProjects" as ActionType },
		{ label: "Manage Experience", action: "manageExperience" as ActionType },
	];

	return (
		<div className="relative backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 rounded-2xl p-8 shadow-xl border border-white/20">
			<h2 className="text-2xl font-mono mb-6 text-center bg-gradient-to-r from-orange-300 to-gray-300 via-amber-500 bg-clip-text text-transparent">
				Portfolio Management
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{actions.map(({ label, action }) => (
					<Button
						key={action}
						variant="ghost"
						onClick={() => onActionSelect(action)}
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
