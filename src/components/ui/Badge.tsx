import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "cyan" | "violet" | "neutral";
};

const variants = {
  cyan: "border-cyan/30 bg-cyan/10 text-cyan",
  violet: "border-violet/30 bg-violet/10 text-violet",
  neutral: "border-white/10 bg-white/5 text-ink",
};

export function Badge({ children, variant = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-xs ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
