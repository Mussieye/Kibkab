import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-royal-purple/20 bg-gradient-to-br from-royal-purple to-burgundy px-6 py-16 text-off-white shadow-sm md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
          Welcome Home
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
          A Reverent Community Centered on Christ
        </h1>
        <p className="mt-6 max-w-2xl text-base text-off-white/90 md:text-lg">
          Maranatha Christian Church is a place of worship, spiritual growth,
          and compassionate outreach. Whether you are visiting for the first
          time or growing with us in faith, you are warmly welcomed.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/about/mission-vision"
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-royal-purple transition hover:bg-gold/90"
          >
            Our Mission
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-off-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-wider transition hover:bg-off-white/10"
          >
            Plan Your Visit
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-royal-purple/15 bg-white p-6">
          <h2 className="font-serif text-2xl text-royal-purple">Prayer</h2>
          <p className="mt-3 text-sm text-charcoal/90">
            Join us in faithful prayer and submit personal requests to our
            pastoral team.
          </p>
          <Link href="/prayer-requests" className="mt-4 inline-block text-sm font-semibold text-burgundy underline">
            Submit a request
          </Link>
        </article>
        <article className="rounded-xl border border-royal-purple/15 bg-white p-6">
          <h2 className="font-serif text-2xl text-royal-purple">Sermons</h2>
          <p className="mt-3 text-sm text-charcoal/90">
            Explore scripture-rich teaching and revisit past messages from our
            preaching ministry.
          </p>
          <Link href="/media/sermons" className="mt-4 inline-block text-sm font-semibold text-burgundy underline">
            Browse archive
          </Link>
        </article>
        <article className="rounded-xl border border-royal-purple/15 bg-white p-6">
          <h2 className="font-serif text-2xl text-royal-purple">Give</h2>
          <p className="mt-3 text-sm text-charcoal/90">
            Partner with us in ministry through secure online tithes and
            offerings.
          </p>
          <Link href="/give-online" className="mt-4 inline-block text-sm font-semibold text-burgundy underline">
            Give online
          </Link>
        </article>
      </section>

      <section className="rounded-2xl border border-royal-purple/15 bg-white p-8">
        <h2 className="font-serif text-3xl text-royal-purple">
          Life-Giving Ministries
        </h2>
        <p className="mt-3 max-w-3xl text-charcoal/90">
          Our ministries serve every generation through discipleship, worship,
          and practical care. Find your place in youth fellowship, worship arts,
          outreach, and small groups.
        </p>
        <Link
          href="/ministries"
          className="mt-6 inline-block rounded-full border border-gold px-5 py-2 text-sm font-semibold uppercase tracking-wide text-royal-purple transition hover:bg-gold/10"
        >
          Explore ministries
        </Link>
      </section>
    </div>
  );
}
