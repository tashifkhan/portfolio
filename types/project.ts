export interface Project {
	position: number;
	title: string;
	description: string;
	technologies: string[];
	githubLink?: string;
	playStoreLink?: string;
	liveLink?: string;
	status: string;
}

export interface ProjectModalProps {
	project: Project | null;
	isOpen: boolean;
	onClose: () => void;
} 