/** Fondo decorativo: cuadrícula, resplandores y línea de escaneo. */
export function HudBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0b1d3a_0%,#030712_60%)]" />
      <div className="hud-grid absolute inset-0" />
      <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-cyan/10 blur-3xl" />
      <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-violet/10 blur-3xl" />
      <div className="animate-scan absolute inset-x-0 top-0 h-32 bg-linear-to-b from-transparent via-cyan/[0.03] to-transparent" />
    </div>
  );
}
