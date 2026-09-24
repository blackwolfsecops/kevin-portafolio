import type { Project } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";
import { HudCard } from "@/components/ui/HudCard";

type ProjectCardProps = {
  project: Project;
  accent?: "cyan" | "violet";
};

export function ProjectCard({ project, accent = "cyan" }: ProjectCardProps) {
  const isOnline = project.status === "online" && project.url;

  return (
    <HudCard accent={accent} className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted">{project.code}</span>
        {isOnline ? (
          <Badge variant="cyan">
            <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-cyan" />
            En línea
          </Badge>
        ) : (
          <Badge variant="violet">Enlace pendiente</Badge>
        )}
      </div>

      <h3 className="font-display text-lg font-bold tracking-wide text-white">
        {project.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.features.map((feature) => (
          <li key={feature}>
            <Badge>{feature}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        {isOnline ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-cyan transition-colors hover:text-white"
          >
            Visitar proyecto
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        ) : (
          <span className="font-mono text-sm uppercase tracking-wider text-muted/70">
            Próximamente
          </span>
        )}
      </div>
    </HudCard>
  );
}
