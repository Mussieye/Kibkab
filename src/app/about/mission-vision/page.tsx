export default function MissionVisionPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-royal-purple/15 bg-white p-8 shadow-sm">
        <h1 className="font-serif text-4xl text-royal-purple">Mission & Vision</h1>
        <p className="mt-4 max-w-3xl text-charcoal/90">
          Our mission is to know Christ deeply, make Him known boldly, and build
          a faith-filled community rooted in scripture, prayer, and worship.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-royal-purple/15 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl text-royal-purple">Our Mission</h2>
          <p className="mt-3 text-sm text-charcoal/90">
            We exist to glorify God by preaching the Gospel, discipling believers,
            and serving people with the love and truth of Jesus Christ.
          </p>
        </article>
        <article className="rounded-xl border border-royal-purple/15 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl text-royal-purple">Our Vision</h2>
          <p className="mt-3 text-sm text-charcoal/90">
            We envision a spiritually mature, mission-minded church that impacts
            families, communities, and nations for the Kingdom of God.
          </p>
        </article>
      </section>
    </div>
  );
}
