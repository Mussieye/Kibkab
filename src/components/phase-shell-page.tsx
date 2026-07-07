type PhaseShellPageProps = {
  title: string;
  description: string;
};

export function PhaseShellPage({ title, description }: PhaseShellPageProps) {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[#111111] p-8">
      <h1 className="font-serif text-4xl text-neutral-50">{title}</h1>
      <p className="mt-4 max-w-2xl text-neutral-400">{description}</p>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold/60">
        Phase 0 placeholder route
      </p>
    </section>
  );
}
