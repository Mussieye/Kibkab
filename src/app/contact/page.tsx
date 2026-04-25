export default function ContactPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-royal-purple/15 bg-white p-8 shadow-sm">
        <h1 className="font-serif text-4xl text-royal-purple">Contact</h1>
        <p className="mt-4 max-w-3xl text-charcoal/90">
          We would love to hear from you and help you get connected at
          Maranatha Christian Church.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <article className="rounded-xl border border-royal-purple/15 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl text-royal-purple">Church Details</h2>
          <ul className="mt-4 space-y-3 text-sm text-charcoal/90">
            <li>
              <span className="font-semibold text-burgundy">Address:</span> 123
              Faith Avenue, City Name
            </li>
            <li>
              <span className="font-semibold text-burgundy">Phone:</span> +1 (000)
              123-4567
            </li>
            <li>
              <span className="font-semibold text-burgundy">Email:</span>{" "}
              hello@maranathachurch.org
            </li>
            <li>
              <span className="font-semibold text-burgundy">Office Hours:</span>{" "}
              Mon - Fri, 9:00 AM - 5:00 PM
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-royal-purple/15 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl text-royal-purple">Service Times</h2>
          <ul className="mt-4 space-y-3 text-sm text-charcoal/90">
            <li>
              <span className="font-semibold text-burgundy">Sunday Worship:</span>{" "}
              9:00 AM & 11:00 AM
            </li>
            <li>
              <span className="font-semibold text-burgundy">Wednesday Prayer:</span>{" "}
              7:00 PM
            </li>
            <li>
              <span className="font-semibold text-burgundy">Youth Fellowship:</span>{" "}
              Friday 6:30 PM
            </li>
          </ul>
        </article>
      </section>

      <section className="rounded-xl border border-dashed border-royal-purple/35 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-2xl text-royal-purple">Map Placeholder</h2>
        <p className="mt-2 text-sm text-charcoal/90">
          Replace this block with a Google Maps or OpenStreetMap embed in a
          later phase.
        </p>
        <div className="mt-4 flex h-64 items-center justify-center rounded-lg bg-off-white text-sm uppercase tracking-[0.2em] text-burgundy">
          Interactive Map Embed Area
        </div>
      </section>
    </div>
  );
}
