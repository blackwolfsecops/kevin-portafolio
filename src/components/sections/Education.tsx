import { education } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";
import { HudCard } from "@/components/ui/HudCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Education() {
  return (
    <Section id="formacion">
      <SectionHeading
        index="04"
        title="Formación"
        subtitle="Programas actualmente en curso."
      />

      <ol className="relative space-y-6 border-l border-cyan/20 pl-6 sm:pl-8">
        {education.map((item, i) => (
          <li key={item.title} className="relative">
            <span className="absolute -left-[31px] top-7 h-3 w-3 rotate-45 border border-cyan bg-void sm:-left-[39px]" />
            <HudCard accent={i % 2 === 0 ? "cyan" : "violet"}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-base font-bold tracking-wide text-white sm:text-lg">
                    {item.title}
                  </h3>
                  {item.institution && (
                    <p className="mt-1 font-mono text-xs uppercase tracking-wider text-violet">
                      {item.institution}
                    </p>
                  )}
                </div>
                <Badge variant="cyan">
                  <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-cyan" />
                  {item.status}
                </Badge>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
            </HudCard>
          </li>
        ))}
      </ol>
    </Section>
  );
}
