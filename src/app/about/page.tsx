import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-royal-purple/15 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy">
          About
        </p>
        <h1 className="mt-3 font-serif text-4xl text-royal-purple">
          Maranatha Christian Church
        </h1>
        <p className="mt-4 max-w-3xl text-charcoal/90">
          We are a worshiping community committed to biblical teaching, vibrant
          prayer, and transformed lives through Jesus Christ. Our heart is to
          welcome visitors, disciple believers, and serve our city with
          compassion.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/about/mission-vision"
          className="rounded-xl border border-royal-purple/15 bg-white p-6 shadow-sm transition hover:border-gold"
        >
          <h2 className="font-serif text-2xl text-royal-purple">Mission & Vision</h2>
          <p className="mt-2 text-sm text-charcoal/90">
            Discover why we exist and where God is leading us.
          </p>
        </Link>
        <Link
          href="/about/beliefs"
          className="rounded-xl border border-royal-purple/15 bg-white p-6 shadow-sm transition hover:border-gold"
        >
          <h2 className="font-serif text-2xl text-royal-purple">Beliefs</h2>
          <p className="mt-2 text-sm text-charcoal/90">
            Learn the biblical convictions that shape our church life.
          </p>
        </Link>
        <Link
          href="/about/leadership"
          className="rounded-xl border border-royal-purple/15 bg-white p-6 shadow-sm transition hover:border-gold"
        >
          <h2 className="font-serif text-2xl text-royal-purple">Leadership</h2>
          <p className="mt-2 text-sm text-charcoal/90">
            Meet the pastors and ministry leaders serving our church family.
          </p>
        </Link>
      </div>
    </div>
  );
}
