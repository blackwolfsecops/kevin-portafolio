import { techGroups } from "@/data/portfolio";
import { HudCard } from "@/components/ui/HudCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Technologies() {
  return (
    <Section id="tecnologias">
      <SectionHeading
        index="02"
        title="Tecnologías"
        subtitle="Herramientas con las que trabajo y aprendo en desarrollo, sistemas y seguridad."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {techGroups.map((group, i) => {
          const accent = i % 2 === 0 ? "cyan" : "violet";
          return (
            <HudCard key={group.title} accent={accent}>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
                  {group.title}
                </h3>
                <span
                  className={`font-mono text-[10px] ${accent === "cyan" ? "text-cyan" : "text-violet"}`}
                >
                  [{group.code}]
                </span>
              </div>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-ink">
                    <span
                      className={`h-1.5 w-1.5 rotate-45 ${accent === "cyan" ? "bg-cyan" : "bg-violet"}`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </HudCard>
          );
        })}
      </div>
    </Section>
  );
}
