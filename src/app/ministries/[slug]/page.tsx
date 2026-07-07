import { notFound } from "next/navigation";
import { getMinistries } from "@/lib/cms/content";
import Link from "next/link";

type MinistryDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const ministries = await getMinistries();
  return ministries.map((ministry) => ({ slug: ministry.slug }));
}

export default async function MinistryDetailPage({ params }: MinistryDetailPageProps) {
  const ministries = await getMinistries();
  const { slug } = await params;
  const ministry = ministries.find((item) => item.slug === slug);

  if (!ministry) notFound();

  return (
    <div className="min-h-screen bg-[#090909]">
      <div className="mx-auto max-w-4xl px-6 py-16">

        <Link
          href="/ministries"
          className="mb-10 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/60 transition-colors hover:text-gold"
        >
          <svg className="h-3 w-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          All Ministries
        </Link>

        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-gold/[0.06] px-4 py-1.5">
          <span className="block h-px w-4 bg-gold/40" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/80">Ministry</span>
          <span className="block h-px w-4 bg-gold/40" />
        </div>

        <h1 className="gold-metallic mb-6 font-serif text-5xl font-bold leading-tight lg:text-6xl">
          {ministry!.name}
        </h1>

        <div className="mb-4 flex items-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-gold/40 to-transparent" />
          <div className="h-1 w-1 rotate-45 border border-gold/40" />
          <div className="h-px w-16 bg-gradient-to-l from-gold/40 to-transparent" />
        </div>

        <p className="mb-12 max-w-3xl text-lg leading-relaxed text-neutral-400">
          {ministry!.summary}
        </p>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            { label: "Focus",        value: ministry!.focus    },
            { label: "Schedule",     value: ministry!.schedule },
            { label: "Ministry Lead", value: ministry!.lead   },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/[0.07] bg-[#111111] p-6 transition-colors duration-300 hover:border-gold/20 hover:bg-[#141414]"
            >
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/60">
                {item.label}
              </p>
              <p className="text-base leading-relaxed text-neutral-300">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
