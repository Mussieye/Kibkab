import type { Metadata } from "next";
import { getLeadership } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Our Leadership",
  description:
    "Meet the pastoral team and church leaders of Maranatha Christian Church.",
  openGraph: { title: "Leadership | Maranatha Christian Church", url: "/about/leadership" },
};

export default async function LeadershipPage() {
  const leaders = await getLeadership();

  return (
    <div className="min-h-screen bg-[#090909]">
      <div className="mx-auto max-w-6xl px-6 py-16">

        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-gold/[0.06] px-5 py-2">
            <span className="block h-px w-5 bg-gold/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/80">Servant Leaders</span>
            <span className="block h-px w-5 bg-gold/40" />
          </div>
          <h1 className="gold-metallic mb-5 font-serif text-5xl font-bold leading-tight lg:text-6xl">
            Our Leadership
          </h1>
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
            <div className="h-1.5 w-1.5 rotate-45 border border-gold/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-500">
            Our leadership team serves with humility, prayer, and a commitment to biblical discipleship.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader) => (
            <article
              key={leader.name}
              className="rounded-2xl border border-white/[0.07] bg-[#111111] p-6 transition-all duration-300 hover:border-gold/20 hover:bg-[#141414]"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/[0.08] text-gold">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="mb-1 font-serif text-xl font-semibold text-neutral-100">{leader.name}</h2>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/70">{leader.role}</p>
              <div className="mb-4 h-px bg-white/[0.05]" />
              <p className="text-sm leading-relaxed text-neutral-500">{leader.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
