import { MinistryCard } from "@/components/ministry-card";
import { ministries } from "@/lib/ministries";

export default function MinistriesPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-royal-purple/15 bg-white p-8 shadow-sm">
        <h1 className="font-serif text-4xl text-royal-purple">Ministries</h1>
        <p className="mt-4 max-w-3xl text-charcoal/90">
          Every ministry exists to glorify Christ and serve people. Explore the
          ministry areas below and discover where you can grow, serve, and
          belong.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {ministries.map((ministry) => (
          <MinistryCard key={ministry.slug} ministry={ministry} />
        ))}
      </section>
    </div>
  );
}
