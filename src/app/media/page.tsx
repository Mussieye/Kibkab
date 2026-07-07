import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Sermons, live worship streams, and spirit-filled content from Maranatha Christian Church — anytime, anywhere.",
  openGraph: { title: "Media | Maranatha Christian Church", url: "/media" },
};

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-[#090909]">

      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/Dav.png"
            alt="Worship and Media"
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/35" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center lg:py-32">

          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-black/45 px-5 py-2 backdrop-blur-sm">
            <span className="block h-px w-6 bg-gold/50" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/90">
              Maranatha Media
            </span>
            <span className="block h-px w-6 bg-gold/50" />
          </div>

          <h1 className="gold-metallic mb-5 font-serif text-5xl font-bold leading-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] md:text-6xl lg:text-7xl">
            Media
          </h1>

          <div className="mb-7 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <div className="h-1.5 w-1.5 rotate-45 border border-gold/55" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-neutral-300 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
            Sermons, live worship, and spirit-filled content — anytime, anywhere.
          </p>

          {/* Nav pills */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/media/sermons"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-neutral-950 shadow-[0_0_30px_rgba(201,169,110,0.25)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_45px_rgba(201,169,110,0.40)]"
              style={{ background: "linear-gradient(90deg,#a8844a 0%,#e0c28e 40%,#ffe57a 55%,#e0c28e 70%,#a8844a 100%)" }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Sermons
            </Link>
            <Link
              href="/media/live-stream"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-neutral-200 backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:bg-white/[0.13] hover:text-white"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              Live Stream
            </Link>
          </div>
        </div>
      </div>

      {/* ── Media Feature Cards ── */}
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid gap-5 md:grid-cols-2">

          {/* Sermons card */}
          <Link href="/media/sermons" className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-8 transition-all duration-300 hover:border-gold/22 hover:bg-[#141414]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/[0.10] text-gold">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="gold-metallic mb-3 font-serif text-2xl font-bold">Sermon Archive</h2>
            <p className="mb-6 text-sm leading-relaxed text-neutral-500">
              Revisit powerful messages and scripture-rich teaching from our preaching ministry. Grow deeper in faith at your own pace.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold/55 transition-colors duration-200 group-hover:text-gold">
              Browse Sermons
              <svg className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>

          {/* Live stream card */}
          <Link href="/media/live-stream" className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-8 transition-all duration-300 hover:border-gold/22 hover:bg-[#141414]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/[0.10] text-gold">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="mb-3 flex items-center gap-3">
              <h2 className="gold-metallic font-serif text-2xl font-bold">Live Stream</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-red-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                Live
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-neutral-500">
              Join our Sunday services and special events live from wherever you are. Experience worship in real time with our community.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold/55 transition-colors duration-200 group-hover:text-gold">
              Watch Live
              <svg className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>

        </div>
      </div>
    </div>
  );
}
