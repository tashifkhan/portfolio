import React from "react";
import { LoaderCircle, CheckCheck, Waypoints } from "lucide-react";

interface ProjectStatusProps {
	status: string;
}

const ProjectStatus: React.FC<ProjectStatusProps> = ({ status }) => {
	const renderStatusIcon = (status: string) => {
		const iconClass = "w-5 h-5";
		if (status === "In Progress") {
			return <LoaderCircle className={`${iconClass} text-orange-500`} />;
		}
		if (status === "Completed") {
			return <CheckCheck className={`${iconClass} text-green-500`} />;
		}
		if (status === "Planned") {
			return <Waypoints className={`${iconClass} text-blue-500`} />;
		}
	};

	const getStatusColor = (status: string) => {
		if (status === "In Progress")
			return "bg-orange-500/20 text-orange-300 border-orange-500/30";
		if (status === "Completed")
			return "bg-green-500/20 text-green-300 border-green-500/30";
		if (status === "Planned")
			return "bg-blue-500/20 text-blue-300 border-blue-500/30";
		return "bg-gray-500/20 text-gray-300 border-gray-500/30";
	};

	return (
		<div
			className={`flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full border ${getStatusColor(
				status
			)}`}
		>
			{renderStatusIcon(status)}
			<span className="font-medium text-sm sm:text-base">{status}</span>
		</div>
	);
};

export default ProjectStatus;
