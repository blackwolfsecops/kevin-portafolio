import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

/** Contenedor estándar de sección con ancla y animación de entrada. */
export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`relative px-4 py-20 sm:px-6 sm:py-28 ${className}`}>
      <Reveal className="mx-auto max-w-6xl">{children}</Reveal>
    </section>
  );
}
