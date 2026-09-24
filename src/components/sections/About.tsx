import { about } from "@/data/portfolio";
import { HudCard } from "@/components/ui/HudCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <Section id="sobre-mi">
      <SectionHeading index="01" title="Sobre mí" />

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5 leading-relaxed text-muted sm:text-lg">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="space-y-4">
          {about.pillars.map((pillar, i) => (
            <HudCard key={pillar.title} accent={i % 2 === 0 ? "cyan" : "violet"} className="p-5">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{pillar.description}</p>
            </HudCard>
          ))}
        </div>
      </div>
    </Section>
  );
}
