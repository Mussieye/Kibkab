export default function LeadershipPage() {
  const leaders = [
    {
      name: "Pastor Daniel Bekele",
      role: "Lead Pastor",
      description:
        "Provides spiritual oversight, preaching, and pastoral care for the church family.",
    },
    {
      name: "Hannah Tesfaye",
      role: "Worship Director",
      description:
        "Leads worship teams and helps cultivate a reverent, Christ-centered worship culture.",
    },
    {
      name: "Samuel Kassa",
      role: "Outreach Coordinator",
      description:
        "Coordinates local outreach efforts, community partnerships, and evangelism initiatives.",
    },
  ];

  return (
    <section className="rounded-2xl border border-royal-purple/15 bg-white p-8 shadow-sm">
      <h1 className="font-serif text-4xl text-royal-purple">Leadership</h1>
      <p className="mt-4 max-w-3xl text-charcoal/90">
        Our leadership team serves with humility, prayer, and a commitment to
        biblical discipleship.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {leaders.map((leader) => (
          <article
            key={leader.name}
            className="rounded-xl border border-royal-purple/15 bg-off-white p-5"
          >
            <h2 className="font-serif text-2xl text-royal-purple">{leader.name}</h2>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-burgundy">
              {leader.role}
            </p>
            <p className="mt-3 text-sm text-charcoal/90">{leader.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
