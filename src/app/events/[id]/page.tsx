import { notFound } from "next/navigation";
import { getEventById, getEvents } from "@/lib/cms/content";
import Link from "next/link";

type EventDetailPageProps = {
  params: Promise<{ id: string }>;
};

function formatDateTime(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString("en-US", {
    weekday: "long", year: "numeric", month: "long",
    day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ id: e.id }));
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const eventItem = await getEventById(id);
  if (!eventItem) notFound();

  return (
    <div className="min-h-screen bg-[#090909]">
      <div className="mx-auto max-w-3xl px-6 py-16">

        <Link
          href="/events"
          className="mb-10 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/60 transition-colors hover:text-gold"
        >
          <svg className="h-3 w-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          All Events
        </Link>

        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-gold/[0.06] px-4 py-1.5">
          <span className="block h-px w-4 bg-gold/40" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/80">Event Details</span>
          <span className="block h-px w-4 bg-gold/40" />
        </div>

        <h1 className="gold-metallic mb-6 font-serif text-5xl font-bold leading-tight lg:text-6xl">
          {eventItem!.title}
        </h1>

        <div className="mb-4 flex items-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-gold/40 to-transparent" />
          <div className="h-1 w-1 rotate-45 border border-gold/40" />
          <div className="h-px w-16 bg-gradient-to-l from-gold/40 to-transparent" />
        </div>

        <div className="mb-10 rounded-2xl border border-white/[0.07] bg-[#111111] p-8 space-y-5">
          <div className="flex items-start gap-5">
            <span className="mt-0.5 w-28 shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/60">
              Date &amp; Time
            </span>
            <span className="text-neutral-300">{formatDateTime(eventItem!.dateTime)}</span>
          </div>
          <div className="h-px bg-white/[0.05]" />
          <div className="flex items-start gap-5">
            <span className="mt-0.5 w-28 shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/60">
              Location
            </span>
            <span className="text-neutral-300">{eventItem!.location}</span>
          </div>
        </div>

        {eventItem!.rsvpLink ? (
          <a
            href={eventItem!.rsvpLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-neutral-950 shadow-[0_0_30px_rgba(201,169,110,0.25)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_45px_rgba(201,169,110,0.4)]"
            style={{ background: "linear-gradient(90deg,#a8844a 0%,#e0c28e 40%,#ffe57a 55%,#e0c28e 70%,#a8844a 100%)" }}
          >
            RSVP for this Event
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ) : (
          <p className="text-sm text-neutral-600">RSVP link will be added soon.</p>
        )}
      </div>
    </div>
  );
}
