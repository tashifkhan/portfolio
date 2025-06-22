import React from "react";
import { Badge } from "@/components/ui/badge";

interface ProjectTechStackProps {
	technologies: string[];
}

const ProjectTechStack: React.FC<ProjectTechStackProps> = ({
	technologies,
}) => {
	return (
		<div className="space-y-4 sm:space-y-6">
			<div>
				<h3 className="text-base sm:text-lg font-semibold text-white/90 mb-3 sm:mb-4">
					Technologies Used
				</h3>
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
					{technologies.map((tech, index) => (
						<Badge
							key={index}
							variant="outline"
							className="p-2 sm:p-3 text-center justify-center bg-gradient-to-r from-orange-500/10 to-orange-500/5 
                        border-orange-500/30 text-orange-200 hover:bg-orange-500/20 hover:border-orange-500/50
                        transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
						>
							{tech}
						</Badge>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProjectTechStack;
