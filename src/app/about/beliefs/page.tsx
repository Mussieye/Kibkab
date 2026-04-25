export default function BeliefsPage() {
  const beliefs = [
    "The Bible is the inspired and authoritative Word of God.",
    "There is one God eternally existent in Father, Son, and Holy Spirit.",
    "Salvation is by grace through faith in Jesus Christ alone.",
    "The Holy Spirit empowers believers for holy living and service.",
    "The Church is called to worship, discipleship, fellowship, and mission.",
  ];

  return (
    <section className="rounded-2xl border border-royal-purple/15 bg-white p-8 shadow-sm">
      <h1 className="font-serif text-4xl text-royal-purple">Beliefs</h1>
      <p className="mt-4 max-w-3xl text-charcoal/90">
        Our faith is grounded in historic Christian doctrine and expressed
        through scripture-centered teaching and daily discipleship.
      </p>
      <ul className="mt-6 space-y-3">
        {beliefs.map((belief) => (
          <li
            key={belief}
            className="rounded-lg border border-royal-purple/15 bg-off-white p-4 text-sm text-charcoal/90"
          >
            {belief}
          </li>
        ))}
      </ul>
    </section>
  );
}
