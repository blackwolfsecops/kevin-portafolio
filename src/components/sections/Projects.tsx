import { projects } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";

export function Projects() {
  return (
    <Section id="proyectos">
      <SectionHeading
        index="03"
        title="Proyectos"
        subtitle="Plataformas propias desarrolladas combinando desarrollo web y buenas prácticas de seguridad."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.code}
            project={project}
            accent={i % 2 === 0 ? "cyan" : "violet"}
          />
        ))}
      </div>
    </Section>
  );
}
