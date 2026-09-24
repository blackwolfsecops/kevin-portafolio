type SectionHeadingProps = {
  index: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ index, title, subtitle }: SectionHeadingProps) {
  return (
    <header className="mb-12">
      <p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
        <span className="text-violet">{index}</span>
        <span className="h-px w-10 bg-linear-to-r from-cyan to-transparent" />
      </p>
      <h2 className="font-display text-2xl font-bold tracking-wide text-white sm:text-3xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>}
    </header>
  );
}
