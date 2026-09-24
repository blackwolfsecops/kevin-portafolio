import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-cyan/10 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="flex items-center gap-2">
          <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-cyan" />
          Desarrollo · Ciberseguridad
        </p>
      </div>
    </footer>
  );
}
