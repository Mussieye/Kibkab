import Link from "next/link";

export default function Home() {
  return (
    <section className="rounded-2xl border border-royal-purple/15 bg-white px-6 py-14 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-burgundy">
        Welcome
      </p>
      <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-royal-purple md:text-5xl">
        Maranatha Christian Church Website Foundation
      </h1>
      <p className="mt-6 max-w-3xl text-lg text-charcoal/90">
        The project shell is now prepared with Next.js, Tailwind CSS, royal
        brand styling, shared layout, and route scaffolding for the core
        ministry sections.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/about"
          className="rounded-full bg-royal-purple px-6 py-3 text-sm font-semibold uppercase tracking-wider text-off-white transition hover:bg-burgundy"
        >
          Explore About
        </Link>
        <Link
          href="/ministries"
          className="rounded-full border border-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-royal-purple transition hover:bg-gold/10"
        >
          View Ministries
        </Link>
      </div>
    </section>
  );
}
