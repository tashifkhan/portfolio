'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  lastUpdated: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Crop Mate",
    description: "AI-powered crop management system",
    technologies: ["TS", "Flask", "ML", "NextJS"],
    status: "Completed",
    lastUpdated: "2024-03-20"
  },
  // Add more projects
];

export default function CollectionPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Project Collection</h1>
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <div className="relative overflow-hidden rounded-lg border bg-background/30 backdrop-blur-md shadow">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead>Technologies</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{project.description}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{project.status}</TableCell>
                    <TableCell className="hidden lg:table-cell">{project.lastUpdated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}