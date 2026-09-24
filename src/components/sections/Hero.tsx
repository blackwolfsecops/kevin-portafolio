import { profile } from "@/data/portfolio";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center px-4 pb-16 pt-28 sm:px-6"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="animate-fade-up">
          <p className="mb-6 inline-flex items-center gap-2 rounded border border-cyan/30 bg-cyan/5 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            <span className="animate-pulse-soft h-2 w-2 rounded-full bg-cyan" />
            Sistema en línea
          </p>

          <h1 className="font-display text-4xl font-black leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl">
            {profile.name.split(" ")[0]}{" "}
            <span className="bg-linear-to-r from-cyan to-violet bg-clip-text text-transparent">
              {profile.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p className="mt-5 font-mono text-sm uppercase tracking-widest text-violet sm:text-base">
            {profile.role}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.summary}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#proyectos"
              className="rounded border border-cyan bg-cyan/10 px-6 py-3 font-mono text-sm uppercase tracking-wider text-cyan transition-all hover:bg-cyan hover:text-void hover:shadow-[0_0_24px_rgb(34_211_238/0.5)]"
            >
              Ver proyectos
            </a>
            <a
              href="#contacto"
              className="rounded border border-violet/50 px-6 py-3 font-mono text-sm uppercase tracking-wider text-violet transition-all hover:border-violet hover:bg-violet/10"
            >
              Contacto
            </a>
          </div>
        </div>

        <HudReticle />
      </div>
    </section>
  );
}

/** Retícula decorativa animada estilo HUD. */
function HudReticle() {
  return (
    <div
      aria-hidden
      className="relative mx-auto hidden aspect-square w-full max-w-sm animate-fade-up [animation-delay:200ms] sm:block"
    >
      <div className="absolute inset-0 rounded-full border border-cyan/20" />
      <div className="animate-spin-slow absolute inset-4 rounded-full border-2 border-dashed border-cyan/30" />
      <div className="animate-spin-reverse absolute inset-12 rounded-full border border-violet/40 border-t-transparent border-b-transparent" />
      <div className="absolute inset-20 rounded-full border border-cyan/30 bg-cyan/5 shadow-[0_0_60px_rgb(34_211_238/0.15)_inset]" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linear-to-b from-transparent via-cyan/30 to-transparent" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-linear-to-r from-transparent via-cyan/30 to-transparent" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center font-mono">
          <p className="font-display text-3xl font-bold text-cyan">DEV</p>
          <p className="my-1 text-xs text-muted">+</p>
          <p className="font-display text-3xl font-bold text-violet">SEC</p>
        </div>
      </div>
      <span className="absolute left-2 top-2 font-mono text-[10px] text-cyan/60">SYS.READY</span>
      <span className="absolute bottom-2 right-2 font-mono text-[10px] text-violet/60">v1.0</span>
    </div>
  );
}
