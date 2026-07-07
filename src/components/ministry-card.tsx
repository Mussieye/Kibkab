import Link from "next/link";
import type { Ministry } from "@/lib/cms/models";

type MinistryCardProps = {
  ministry: Ministry;
};

export function MinistryCard({ ministry }: MinistryCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-7 transition-all duration-300 hover:border-gold/22 hover:bg-[#141414]">

      {/* Top gold accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

      {/* Ministry name */}
      <h2 className="gold-metallic mb-3 font-serif text-2xl font-bold leading-snug">
        {ministry.name}
      </h2>

      {/* Summary */}
      <p className="mb-6 text-sm leading-relaxed text-neutral-400">
        {ministry.summary}
      </p>

      {/* Details */}
      <dl className="mb-7 space-y-3 border-t border-white/[0.06] pt-5">
        <div className="flex gap-4">
          <dt className="w-20 flex-shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold/55 pt-0.5">
            Focus
          </dt>
          <dd className="text-sm text-neutral-300">{ministry.focus}</dd>
        </div>
        <div className="flex gap-4">
          <dt className="w-20 flex-shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold/55 pt-0.5">
            Schedule
          </dt>
          <dd className="text-sm text-neutral-300">{ministry.schedule}</dd>
        </div>
        <div className="flex gap-4">
          <dt className="w-20 flex-shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold/55 pt-0.5">
            Lead
          </dt>
          <dd className="text-sm text-neutral-300">{ministry.lead}</dd>
        </div>
      </dl>

      {/* CTA */}
      <Link
        href={`/ministries/${ministry.slug}`}
        className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold/55 transition-colors duration-200 group-hover:text-gold"
      >
        View Ministry Details
        <svg
          className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>

      {/* Bottom shimmer on hover */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
}
