type PhaseShellPageProps = {
  title: string;
  description: string;
};

export function PhaseShellPage({ title, description }: PhaseShellPageProps) {
  return (
    <section className="rounded-2xl border border-royal-purple/15 bg-white p-8 shadow-sm">
      <h1 className="font-serif text-4xl text-royal-purple">{title}</h1>
      <p className="mt-4 max-w-2xl text-charcoal/90">{description}</p>
      <p className="mt-6 text-sm uppercase tracking-[0.2em] text-burgundy">
        Phase 0 placeholder route
      </p>
    </section>
  );
}
