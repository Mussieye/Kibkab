import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SEOLayout } from "@/components/seo/seo-layout";

export const metadata: Metadata = {
  title: "Maranatha Christian Church — Home",
  description:
    "Welcome to Maranatha Christian Church. A vibrant community of faith with worship services, sermons, events, and ministries.",
  openGraph: {
    title: "Maranatha Christian Church",
    description: "A vibrant community of faith — worship, sermons, and community life.",
    url: "/",
  },
};

export default function Home() {
  return (
    <SEOLayout
      seoProps={{
        title: "Home — Maranatha Christian Church",
        description:
          "Experience hope, worship, and community at Maranatha Christian Church. Join us for inspiring services, meaningful connections, and spiritual growth.",
        keywords:
          "Christian church, worship services, community, faith, Maranatha church",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "PlaceOfWorship",
            name: "Maranatha Christian Church",
            description:
              "A Christian church dedicated to worship, community, and spiritual growth",
            url: "https://maranatha.church",
          },
        ],
      }}
    >
      {/* ═══════════════════════════════════════
          HERO — Cinematic full-screen with scripture
      ═══════════════════════════════════════ */}
      <section className="relative flex min-h-screen overflow-hidden bg-black -mt-[68px]">

        {/* ── BACKGROUND: Full-width cinematic image ── */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 hero-cinema-reveal">
            <Image
              src="/Jesus_Christ_carrying.jpeg"
              alt="Jesus carrying the cross"
              fill
              priority
              quality={95}
              className="object-cover"
              style={{ objectPosition: "62% center" }}
            />
          </div>

          {/* Pulsing golden glow orb */}
          <div className="absolute right-[30%] top-[42%] -translate-y-1/2">
            <div
              className="hero-glow-breath h-[680px] w-[680px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,169,110,0.22) 0%, rgba(201,169,110,0.10) 35%, rgba(201,169,110,0.03) 60%, transparent 75%)",
              }}
            />
          </div>

          {/* Left gradient — keeps text column readable */}
          <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-black via-black/85 to-transparent" />
          {/* Top edge */}
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black via-black/60 to-transparent" />
          {/* Bottom edge */}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black to-transparent" />
          {/* Right edge — darkens behind the corner scripture text */}
          <div className="absolute inset-y-0 right-0 w-[420px] bg-gradient-to-l from-black/55 via-black/15 to-transparent" />
        </div>

        {/* ── LEFT: Text content column ── */}
        <div className="relative z-10 flex w-full flex-col justify-center px-8 pb-24 pt-[88px] lg:w-[52%] lg:px-14 lg:pb-32 xl:px-20">

          {/* Top fade to blend with transparent header */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#090909] via-[#090909]/60 to-transparent" />

          {/* Church name badge — drops in from above */}
          <div className="hero-badge relative mb-8 inline-flex self-start items-center gap-3 rounded-full border border-gold/22 bg-black/40 px-5 py-2 backdrop-blur-sm">
            <span className="block h-px w-6 bg-gold/45" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/85">
              Maranatha Christian Church
            </span>
            <span className="block h-px w-6 bg-gold/45" />
          </div>

          {/* Headline — each line rises independently */}
          <h1 className="relative mb-6 font-serif font-bold leading-[1.06]">
            <span className="hero-line-1 block text-5xl text-white drop-shadow-[0_2px_20px_rgba(0,0,0,1)] sm:text-6xl lg:text-7xl xl:text-[5rem]">
              Where Faith
            </span>
            <span className="hero-line-2 gold-shimmer block text-5xl drop-shadow-[0_2px_24px_rgba(0,0,0,1)] sm:text-6xl lg:text-7xl xl:text-[5rem]">
              Comes Alive
            </span>
          </h1>

          {/* Ornamental divider — lines expand from center, diamond spins in */}
          <div className="relative mb-6 flex items-center gap-4">
            <div className="hero-divider-line h-px w-16 bg-gradient-to-r from-transparent to-gold/45" />
            <div className="hero-divider-gem h-1.5 w-1.5 border border-gold/50" />
            <div className="hero-divider-line h-px w-16 bg-gradient-to-l from-transparent to-gold/45" />
          </div>

          {/* Scripture */}
          <div className="relative mb-10">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-2 -top-5 select-none font-serif text-8xl leading-none text-gold/15"
            >&ldquo;</span>
            <p className="hero-scripture relative font-serif text-base italic leading-loose tracking-wide text-neutral-200 drop-shadow-[0_1px_14px_rgba(0,0,0,1)] sm:text-[1.1rem]">
              For where two or three gather in my name,{" "}
              <span className="text-gold/90 drop-shadow-[0_0_10px_rgba(201,169,110,0.35)]">
                there am I with them.
              </span>
            </p>
            <div className="hero-verse mt-3 flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-gold/55 to-transparent" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold/65">
                Matthew 18:20
              </span>
            </div>
          </div>

          {/* CTAs — rise together as a unit */}
          <div className="hero-ctas relative flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="rounded-full bg-gold px-9 py-3.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-neutral-950 shadow-[0_0_40px_rgba(201,169,110,0.25)] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_60px_rgba(201,169,110,0.45)]"
            >
              Join Us Sunday
            </Link>
            <Link
              href="/media/live-stream"
              className="group inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/[0.06] px-9 py-3.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-neutral-200 backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:bg-white/[0.12] hover:text-white"
            >
              Watch Online
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>

        {/* ── RIGHT: Isaiah 53:5 — floats directly on the image, right corner ── */}
        <div className="relative z-10 hidden lg:flex lg:flex-1 items-center justify-end pr-16">
          <div
            className="w-[300px] text-right"
            style={{ opacity: 0, animation: "scriptureRise 1s cubic-bezier(0.2,0,0,1) 1s both" }}
          >
            {/* Reference label */}
            <p
              className="mb-4 text-[9px] font-semibold uppercase tracking-[0.32em] text-gold/90 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]"
              style={{ opacity: 0, animation: "scriptureRise 0.8s ease-out 1.3s both" }}
            >
              Isaiah 53 · Verse 5
            </p>

            {/* Gold ornamental rule */}
            <div
              className="mb-5 flex items-center justify-end gap-3"
              style={{ opacity: 0, animation: "scriptureRise 0.7s ease-out 1.45s both" }}
            >
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/55" />
              <div className="h-1 w-1 rotate-45 border border-gold/55" />
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/55" />
            </div>

            {/* Line 1 */}
            <p
              className="font-serif text-[15px] italic leading-[1.85] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,1)] drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]"
              style={{ opacity: 0, animation: "scriptureRise 1s cubic-bezier(0.2,0,0,1) 1.6s both" }}
            >
              &ldquo;But He was wounded
            </p>
            <p
              className="font-serif text-[15px] italic leading-[1.85] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,1)] drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]"
              style={{ opacity: 0, animation: "scriptureRise 1s cubic-bezier(0.2,0,0,1) 1.6s both" }}
            >
              for our transgressions,
            </p>

            {/* Line 2 */}
            <p
              className="font-serif text-[15px] italic leading-[1.85] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,1)] drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]"
              style={{ opacity: 0, animation: "scriptureRise 1s cubic-bezier(0.2,0,0,1) 1.8s both" }}
            >
              He was bruised
            </p>
            <p
              className="font-serif text-[15px] italic leading-[1.85] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,1)] drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]"
              style={{ opacity: 0, animation: "scriptureRise 1s cubic-bezier(0.2,0,0,1) 1.8s both" }}
            >
              for our iniquities;
            </p>

            {/* Line 3 */}
            <p
              className="font-serif text-[15px] italic leading-[1.85] text-neutral-200 drop-shadow-[0_2px_12px_rgba(0,0,0,1)] drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]"
              style={{ opacity: 0, animation: "scriptureRise 1s cubic-bezier(0.2,0,0,1) 2s both" }}
            >
              The chastisement for our peace
            </p>
            <p
              className="font-serif text-[15px] italic leading-[1.85] text-neutral-200 drop-shadow-[0_2px_12px_rgba(0,0,0,1)] drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]"
              style={{ opacity: 0, animation: "scriptureRise 1s cubic-bezier(0.2,0,0,1) 2s both" }}
            >
              was upon Him,
            </p>

            {/* Line 4 — gold climax */}
            <p
              className="mt-1 font-serif text-[16px] font-semibold italic leading-[1.85] drop-shadow-[0_2px_16px_rgba(0,0,0,1)]"
              style={{
                opacity: 0,
                animation: "scriptureRise 1s cubic-bezier(0.2,0,0,1) 2.2s both, scriptureGoldBreath 5s ease-in-out 3.8s infinite",
                color: "#e0c28e",
              }}
            >
              And by His stripes
            </p>
            <p
              className="font-serif text-[16px] font-semibold italic leading-[1.85] drop-shadow-[0_2px_16px_rgba(0,0,0,1)]"
              style={{
                opacity: 0,
                animation: "scriptureRise 1s cubic-bezier(0.2,0,0,1) 2.2s both, scriptureGoldBreath 5s ease-in-out 3.8s infinite",
                color: "#e0c28e",
              }}
            >
              we are healed.&rdquo;
            </p>

            {/* Bottom rule */}
            <div
              className="mt-5 flex items-center justify-end gap-3"
              style={{ opacity: 0, animation: "scriptureRise 0.7s ease-out 2.5s both" }}
            >
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/55" />
              <div className="h-1 w-1 rotate-45 border border-gold/55" />
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/55" />
            </div>
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════
          SCRIPTURE BANNER — Revelation 22:20-21
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#0a0a0a]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.05] blur-[90px]" />
        </div>

        {/* Top & bottom gold rule */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="relative mx-auto max-w-4xl px-8 py-16 text-center lg:py-20">

          {/* Ornament top */}
          <div className="mb-8 flex items-center justify-center gap-5">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/40" />
            <svg className="h-3 w-3 text-gold/50 animate-spin" style={{ animationDuration: "12s" }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          {/* Verse 20 */}
          <p className="scripture-reveal mb-2 font-serif text-[10px] font-semibold uppercase tracking-[0.32em] text-gold/50">
            Revelation 22 · Verse 20
          </p>
          <blockquote
            className="scripture-line-1 mb-6 font-serif text-2xl font-bold italic leading-relaxed text-neutral-100 drop-shadow-[0_2px_20px_rgba(201,169,110,0.15)] lg:text-3xl"
          >
            &ldquo;Surely I am coming quickly.&rdquo;
          </blockquote>
          <p className="scripture-line-2 mb-1 font-serif text-xl italic leading-relaxed text-gold/80 lg:text-2xl">
            Amen. Even so, come, Lord Jesus!
          </p>

          {/* Divider */}
          <div className="scripture-divider my-8 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/35" />
            <div className="h-1.5 w-1.5 rotate-45 border border-gold/40" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/35" />
          </div>

          {/* Verse 21 */}
          <p className="scripture-reveal mb-2 font-serif text-[10px] font-semibold uppercase tracking-[0.32em] text-gold/50">
            Verse 21
          </p>
          <blockquote
            className="scripture-line-3 font-serif text-xl italic leading-relaxed text-neutral-300 lg:text-2xl"
          >
            &ldquo;The grace of our Lord Jesus Christ be with you all. Amen.&rdquo;
          </blockquote>

          {/* Ornament bottom */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/40" />
            <svg className="h-3 w-3 text-gold/50 animate-spin" style={{ animationDuration: "12s", animationDirection: "reverse" }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURE CARDS — How We Serve You
      ═══════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="mb-16 text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/65">
            Connect With Us
          </p>
          <h2 className="font-serif text-4xl font-bold text-neutral-50 lg:text-5xl">
            How We Can Serve You
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ),
              title: "Prayer & Intercession",
              body: "Submit your prayer requests to our dedicated pastoral team for spiritual support and intercession around the clock.",
              href: "/prayer-requests",
              cta: "Submit a Request",
            },
            {
              icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              ),
              title: "Sermon Archive",
              body: "Explore scripture-rich teaching and revisit powerful messages from our preaching ministry to deepen your faith.",
              href: "/media/sermons",
              cta: "Browse Sermons",
            },
            {
              icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              ),
              title: "Give Online",
              body: "Partner with us in ministry through secure online tithes and offerings, supporting our mission to spread the Gospel.",
              href: "/give-online",
              cta: "Give a Gift",
            },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-8 transition-all duration-300 hover:border-gold/20 hover:bg-[#141414]"
            >
              {/* Gold icon bubble */}
              <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors duration-200 group-hover:bg-gold/16">
                {card.icon}
              </div>

              <h3 className="mb-3 font-serif text-xl font-semibold text-neutral-100">
                {card.title}
              </h3>
              <p className="mb-7 text-sm leading-relaxed text-neutral-500">
                {card.body}
              </p>

              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold/60 transition-colors duration-200 group-hover:text-gold">
                {card.cta}
                <svg
                  className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>

              {/* Bottom shimmer on hover */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MINISTRIES — What We Offer
      ═══════════════════════════════════════ */}
      <section className="border-t border-white/[0.06] bg-[#0c0c0c]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-start">

            {/* Left: copy */}
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/65">
                Our Ministries
              </p>
              <h2 className="mb-6 font-serif text-4xl font-bold text-neutral-50 leading-tight lg:text-5xl">
                Life-Giving{" "}
                <em className="gold-metallic not-italic">Communities</em>
                <br />
                for Every Season
              </h2>
              <p className="mb-10 text-base leading-relaxed text-neutral-500">
                Our ministries serve every generation through discipleship,
                worship, and practical care. Find your place and grow alongside
                people who share your faith.
              </p>
              <Link
                href="/ministries"
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.07] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold transition-all duration-200 hover:border-gold/50 hover:bg-gold/[0.13]"
              >
                Explore All Ministries
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Right: ministry list */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Youth & Family",
                  body: "Nurturing the next generation in faith and leadership.",
                  icon: (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
                {
                  title: "Worship Arts",
                  body: "Expressing faith through music, arts, and creative ministry.",
                  icon: (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                    </svg>
                  ),
                },
                {
                  title: "Outreach & Service",
                  body: "Serving our community and sharing God's love in action.",
                  icon: (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064" />
                    </svg>
                  ),
                },
                {
                  title: "Small Groups",
                  body: "Building community through fellowship and discipleship.",
                  icon: (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/[0.07] bg-[#111111] p-6 transition-colors duration-200 hover:border-gold/15"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold/[0.08] text-gold">
                    {item.icon}
                  </div>
                  <h3 className="mb-1.5 font-serif text-base font-semibold text-neutral-100">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          UPCOMING — Events Preview
      ═══════════════════════════════════════ */}
      <section className="border-t border-white/[0.06] bg-[#090909]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/65">
                Upcoming Events
              </p>
              <h2 className="font-serif text-4xl font-bold text-neutral-50 lg:text-5xl">
                Join Us in{" "}
                <em className="gold-metallic not-italic">Person</em>
              </h2>
            </div>
            <Link
              href="/events"
              className="group inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500 transition-colors hover:text-gold"
            >
              All Events
              <svg className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                date: { day: "04", month: "May" },
                title: "Sunday Morning Worship",
                time: "9:00 AM & 11:00 AM",
                tag: "Weekly",
              },
              {
                date: { day: "07", month: "May" },
                title: "Midweek Bible Study",
                time: "7:00 PM",
                tag: "Wednesday",
              },
              {
                date: { day: "10", month: "May" },
                title: "Youth Night",
                time: "6:30 PM",
                tag: "Youth",
              },
            ].map((event) => (
              <div
                key={event.title}
                className="group flex gap-5 rounded-2xl border border-white/[0.07] bg-[#111111] p-6 transition-all duration-200 hover:border-gold/18 hover:bg-[#141414]"
              >
                {/* Date badge */}
                <div className="flex-shrink-0 text-center">
                  <p className="gold-metallic font-serif text-3xl font-bold leading-none">
                    {event.date.day}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                    {event.date.month}
                  </p>
                </div>

                <div className="min-w-0">
                  <span className="mb-2 inline-block rounded-full bg-gold/[0.08] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-gold/70">
                    {event.tag}
                  </span>
                  <h3 className="font-serif text-base font-semibold text-neutral-100 leading-snug">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-600">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA BANNER — Join Our Community
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-white/[0.06]">
        {/* Glow behind CTA */}
        <div className="pointer-events-none absolute inset-0 bg-[#0c0c0c]">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:py-36">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/60">
            You Are Welcome Here
          </p>
          <h2 className="mb-6 font-serif text-4xl font-bold text-neutral-50 leading-tight lg:text-[3.25rem]">
            Ready to Find Your{" "}
            <em className="gold-metallic not-italic">Community?</em>
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-base leading-relaxed text-neutral-500">
            Whether you&rsquo;re visiting for the first time or looking to go
            deeper in faith — there is a place for you at Maranatha.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/about"
              className="rounded-full bg-gold px-9 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-950 transition-all duration-200 hover:bg-gold-light hover:shadow-[0_0_40px_rgba(201,169,110,0.25)]"
            >
              Plan Your Visit
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/12 px-9 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-400 transition-all duration-200 hover:border-white/25 hover:text-neutral-100"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </SEOLayout>
  );
}
