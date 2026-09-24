import type { ReactNode } from "react";

type HudCardProps = {
  children: ReactNode;
  className?: string;
  accent?: "cyan" | "violet";
};

const accentStyles = {
  cyan: "border-cyan/20 hover:border-cyan/50 hover:shadow-[0_0_32px_-8px_rgb(34_211_238/0.35)]",
  violet:
    "border-violet/20 hover:border-violet/50 hover:shadow-[0_0_32px_-8px_rgb(167_139_250/0.35)]",
};

const cornerColor = {
  cyan: "border-cyan",
  violet: "border-violet",
};

/** Tarjeta con esquinas tipo HUD y brillo sutil al pasar el cursor. */
export function HudCard({
  children,
  className = "",
  accent = "cyan",
}: HudCardProps) {
  const corner = `pointer-events-none absolute h-3 w-3 ${cornerColor[accent]}`;

  return (
    <div
      className={`group relative rounded-lg border bg-panel/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 ${accentStyles[accent]} ${className}`}
    >
      <span className={`${corner} -left-px -top-px rounded-tl-lg border-l-2 border-t-2`} />
      <span className={`${corner} -right-px -top-px rounded-tr-lg border-r-2 border-t-2`} />
      <span className={`${corner} -bottom-px -left-px rounded-bl-lg border-b-2 border-l-2`} />
      <span className={`${corner} -bottom-px -right-px rounded-br-lg border-b-2 border-r-2`} />
      {children}
    </div>
  );
}
