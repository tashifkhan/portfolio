"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePyodide } from "@/hooks/usePyodide";

interface AutoAddProjectsFormProps {
	onSuccess: () => void;
}

export default function AutoAddProjectsForm({
	onSuccess,
}: AutoAddProjectsFormProps) {
	const [formData, setFormData] = useState({
		username: "tashifkhan",
		numProjects: 5,
	});
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any[]>([]);
	const { pyodide, loading: pyodideLoading, error } = usePyodide();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!pyodide) {
			console.log("Pyodide not loaded yet");
			return;
		}

		setLoading(true);
		try {
			pyodide.globals.set("github_username", formData.username);
			pyodide.globals.set("num_projects", formData.numProjects);

			const pythonCode = `
import json
from pyodide.http import pyfetch
from typing import List, Optional

class Response:
    def __init__(self, title, description=None, live_website_url=None, languages=None, num_commits=0, readme=None, status=None):
        self.title = title
        self.description = description
        self.live_website_url = live_website_url
        self.languages = languages or []
        self.num_commits = num_commits
        self.readme = readme
        self.status = status

async def get_projects(github_username):
    url = f"https://github-stats.tashif.codes/{github_username}/repos"
    
    try:
        res = await pyfetch(url)
        
        if res.status != 200:
            raise Exception(f"Failed to fetch projects for {github_username}. Status code: {res.status}")
        
        projects = await res.json()
        
        response_objects = []
        for i, project in enumerate(projects):
            response_obj = Response(
                title=project.get("title", "Unknown Project"),
                description=project.get("description"),
                live_website_url=project.get("live_website_url"),
                languages=project.get("languages", []),
                num_commits=project.get("num_commits", 0),
                readme=project.get("readme"),
                status=project.get("status")
            )
            response_objects.append(response_obj)
        
        return response_objects
        
    except Exception as e:
        raise e

def gen_desc(title, languages, readme):
    description = f"A {title} project"
    
    if languages and len(languages) > 0:
        lang_list = languages[:3]
        description += f" built with {', '.join(lang_list)}"
    
    if readme:
        lines = readme.split('\\n')
        for line in lines:
            line = line.strip()
            if (line and 
                not line.startswith('#') and 
                not line.startswith('---') and
                not line.startswith('[') and
                len(line) > 30 and 
                len(line) < 200):
                if any(keyword in line.lower() for keyword in ['is a', 'provides', 'features', 'platform', 'application', 'tool', 'system']):
                    description = line
                    break
    
    return description

def gen_project_status(title, live_url, num_commits, readme):
    title_lower = title.lower()
    readme_lower = readme.lower() if readme else ""
    
    completion_indicators = [
        'complete', 'finished', 'stable', 'production', 'deployed',
        'live demo', 'live site', 'working demo', 'final version'
    ]
    
    wip_indicators = [
        'todo', 'in progress', 'under development', 'coming soon',
        'work in progress', 'development', 'beta', 'alpha'
    ]
    
    planning_indicators = [
        'planned', 'concept', 'idea', 'proposal', 'design',
        'coming soon', 'future', 'roadmap'
    ]
    
    if live_url and num_commits > 50:
        status = "Completed"
    elif any(indicator in readme_lower for indicator in completion_indicators):
        status = "Completed"
    elif any(indicator in readme_lower for indicator in wip_indicators):
        status = "In Progress"
    elif any(indicator in readme_lower for indicator in planning_indicators):
        status = "Planned"
    elif num_commits > 20:
        status = "In Progress"
    elif num_commits > 5:
        status = "In Progress"
    else:
        status = "Planned"
    
    return status

def gen_tech_stack(languages, readme):
    readme_lower = readme.lower() if readme else ""
    
    tech_keywords = [
        "python", "javascript", "typescript", "java", "c++", "c#", "go", "rust", "php", "ruby", "swift", "kotlin",
        "react", "next.js", "vue", "angular", "svelte", "nuxt", "gatsby", "ember",
        "node.js", "express", "fastapi", "django", "flask", "spring", "laravel", "rails", "asp.net",
        "postgresql", "mongodb", "mysql", "redis", "sqlite", "elasticsearch", "cassandra", "dynamodb",
        "docker", "kubernetes", "aws", "azure", "gcp", "vercel", "netlify", "heroku", "digitalocean",
        "tailwind", "bootstrap", "material-ui", "chakra", "styled-components", "sass", "less",
        "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch", "chart.js", "d3.js", "lodash",
        "git", "github", "gitlab", "jenkins", "github actions", "gitlab ci", "travis ci",
        "webpack", "vite", "babel", "eslint", "prettier", "jest", "cypress", "storybook"
    ]
    
    found_tech = []
    for tech in tech_keywords:
        if tech in readme_lower:
            found_tech.append(tech)
    
    all_tech = list(set(languages + found_tech))
    
    seen = set()
    unique_tech = []
    for tech in all_tech:
        if tech.lower() not in seen:
            unique_tech.append(tech)
            seen.add(tech.lower())
    
    return unique_tech

def process_projects(projects_data):
    processed_projects = []
    for i, project in enumerate(projects_data):
        if not project.get("description"):
            project["description"] = gen_desc(project.get("title", ""), project.get("languages", []), project.get("readme", ""))
        
        if not project.get("status"):
            project["status"] = gen_project_status(
                project.get("title", ""),
                project.get("live_website_url", ""),
                project.get("num_commits", 0),
                project.get("readme", "")
            )
        
        project["technologies"] = gen_tech_stack(project.get("languages", []), project.get("readme", ""))
        
        project_json = {
            "position": i,
            "title": project.get("title", ""),
            "description": project.get("description", ""),
            "technologies": project.get("technologies", []),
            "status": project.get("status", "In Progress"),
            "githubLink": f"https://github.com/{github_username}/{project.get('title', '')}",
            "liveLink": project.get("live_website_url", ""),
        }
        processed_projects.append(project_json)
    
    return processed_projects

projects = await get_projects(github_username)

projects_data = [{
    "title": p.title,
    "description": p.description,
    "live_website_url": p.live_website_url,
    "languages": p.languages,
    "num_commits": p.num_commits,
    "readme": p.readme,
    "status": p.status
} for p in projects]

projects_data = projects_data[:num_projects]

result = process_projects(projects_data)

if not isinstance(result, list):
    result = []

result
`;

			const processed = await pyodide.runPythonAsync(pythonCode);
			const projectsArray = Array.isArray(processed) ? processed : [];
			setResult(projectsArray);

			if (projectsArray.length > 0) {
				const addPromises = projectsArray.map((project, index) => {
					return fetch("/api/projects", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(project),
					});
				});

				const responses = await Promise.all(addPromises);
				const failed = responses.filter((r) => !r.ok);
				if (failed.length > 0) {
					console.error("Some projects failed to add:", failed);
				}
			}

			onSuccess();
		} catch (error) {
			console.error("Error auto-adding projects:", error);
			setResult([]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-4">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						GitHub Username
					</label>
					<Input
						placeholder="Enter GitHub username"
						value={formData.username}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, username: e.target.value }))
						}
						className="bg-white/5 text-gray-300 border-orange-500/20"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Number of Projects to Add
					</label>
					<Input
						type="number"
						placeholder="Enter number of projects"
						value={formData.numProjects}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								numProjects: parseInt(e.target.value) || 5,
							}))
						}
						className="bg-white/5 text-gray-300 border-orange-500/20"
						min="1"
						max="20"
						required
					/>
				</div>
				<Button
					type="submit"
					disabled={loading || pyodideLoading || !pyodide}
					className="w-full bg-orange-500 hover:bg-orange-600"
				>
					{loading || pyodideLoading
						? "Processing and Adding Projects..."
						: "Auto Add Projects"}
				</Button>
			</form>
			{error && <div className="text-red-500">{error}</div>}
			{result && result.length > 0 && (
				<div className="mt-6">
					<h4 className="text-orange-300 font-medium mb-3">
						Processed and Added Projects ({result.length})
					</h4>
					<div className="space-y-2 max-h-60 overflow-y-auto">
						{result.map((project, index) => (
							<div
								key={index}
								className="bg-white/5 p-3 rounded border border-orange-500/20"
							>
								<h5 className="text-white font-medium">{project.title}</h5>
								<p className="text-gray-400 text-sm">
									{project.description || "No description"}
								</p>
								<div className="flex items-center gap-4 mt-2">
									<span className="text-xs text-gray-500">
										Position: {project.position}
									</span>
									<span className="text-xs text-gray-500">
										Status: {project.status}
									</span>
								</div>
								<div className="flex flex-wrap gap-1 mt-2">
									{project.technologies
										?.slice(0, 3)
										.map((tech: string, i: number) => (
											<span
												key={i}
												className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs"
											>
												{tech}
											</span>
										))}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
