'use client';

import { Folder, Github, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export function ProjectCard({ title, description, technologies, githubUrl, liveUrl }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full bg-card/80 backdrop-blur-sm border-muted transition-all hover:border-primary">
      <CardHeader className="flex flex-row items-center gap-2">
        <Folder className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-primary transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}