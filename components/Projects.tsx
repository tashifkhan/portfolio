import React from "react";
import ProjectCard from "@/components/ProjectCard";

type Props = {};

const Projects = (props: Props) => {
	return (
		<div className="h-screen flex relative overflow-hidden flex-col text-lft md:flex-row max-w-full px-10 justify-evenly mx-auto items-center">
			<h3 className="absolute top-0 pt-32 uppercase tracking-[20px] text-yellow-50 text-3xl">
				Projects
			</h3>
			<div>
				<ProjectCard />
			</div>
			<div>
				<ProjectCard />
			</div>
			<div>
				<ProjectCard />
			</div>
		</div>
	);
};

export default Projects;
