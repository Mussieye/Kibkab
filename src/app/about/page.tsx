import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Maranatha Christian Church — our mission, vision, core values, and the story of our community.",
  openGraph: { title: "About Us | Maranatha Christian Church", url: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#090909]">

      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/ban.png"
            alt="About Maranatha"
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/35" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center lg:py-32">

          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-black/40 px-5 py-2 backdrop-blur-sm">
            <span className="block h-px w-6 bg-gold/50" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/90">
              Who We Are
            </span>
            <span className="block h-px w-6 bg-gold/50" />
          </div>

          <h1 className="gold-metallic mb-5 font-serif text-5xl font-bold leading-tight lg:text-6xl xl:text-7xl">
            Maranatha Christian Church
          </h1>

          <div className="mb-7 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <div className="h-1.5 w-1.5 rotate-45 border border-gold/55" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-300">
            We are a worshiping community committed to biblical teaching, vibrant
            prayer, and transformed lives through Jesus Christ. Our heart is to
            welcome every visitor, disciple every believer, and serve our city
            with unwavering compassion.
          </p>
        </div>
      </div>

      {/* ── Core Values ── */}
      <div className="border-b border-white/[0.06] bg-[#0c0c0c]">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:py-18">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: "Faith",      sub: "Rooted in Scripture"       },
              { value: "Community",  sub: "United in Brotherhood"     },
              { value: "Service",    sub: "Called to Serve"           },
              { value: "Worship",    sub: "Glorifying God Always"     },
            ].map((item) => (
              <div key={item.value} className="text-center">
                <p className="gold-metallic font-serif text-2xl font-bold lg:text-3xl">
                  {item.value}
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mission Statement ── */}
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left: text */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/65">
              Our Purpose
            </p>
            <h2 className="mb-6 font-serif text-4xl font-bold leading-tight text-neutral-50 lg:text-5xl">
              A Church Built on{" "}
              <em className="gold-metallic not-italic">The Word</em>
            </h2>
            <p className="mb-5 text-base leading-relaxed text-neutral-400">
              Founded on the unshakeable truth of God&rsquo;s Word, Maranatha Christian
              Church exists to exalt Jesus Christ, equip His people, and extend
              His kingdom in our generation.
            </p>
            <p className="mb-8 text-base leading-relaxed text-neutral-500">
              From our Sunday services to our midweek discipleship, every
              programme is designed to move people from first contact with the
              Gospel to mature, multiplying followers of Christ.
            </p>

            {/* Scripture */}
            <div className="rounded-xl border border-gold/15 bg-gold/[0.04] px-6 py-5">
              <p className="text-sm italic leading-relaxed text-neutral-300">
                &ldquo;And they devoted themselves to the apostles&rsquo; teaching and
                the fellowship, to the breaking of bread and the prayers.&rdquo;
              </p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/60">
                Acts 2:42
              </p>
            </div>
          </div>

          {/* Right: pillars */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: "Biblical Teaching",
                body: "Every sermon is anchored in Scripture, rightly divided and faithfully applied.",
              },
              {
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Vibrant Prayer",
                body: "We believe prayer moves mountains and transforms hearts — individually and corporately.",
              },
              {
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "True Fellowship",
                body: "Deep, authentic community where every person is known, loved, and supported.",
              },
              {
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064" />
                  </svg>
                ),
                title: "City Outreach",
                body: "Actively serving our city through compassion ministries and Gospel proclamation.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-white/[0.07] bg-[#111111] p-5 transition-colors duration-200 hover:border-gold/15">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold/[0.08] text-gold">
                  {item.icon}
                </div>
                <h3 className="mb-1.5 font-serif text-base font-semibold text-neutral-100">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Navigation Cards ── */}
      <div className="border-t border-white/[0.06] bg-[#0c0c0c]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">

          <div className="mb-12 text-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/65">
              Learn More
            </p>
            <h2 className="font-serif text-3xl font-bold text-neutral-50 lg:text-4xl">
              Explore Our Church
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                href: "/about/leadership",
                label: "Leadership",
                title: "Our Pastors & Leaders",
                body: "Meet the pastors and ministry leaders who shepherd our church family with wisdom and grace.",
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
              },
              {
                href: "/about/beliefs",
                label: "Beliefs",
                title: "What We Believe",
                body: "The biblical convictions and doctrinal foundations that shape every aspect of our church life.",
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                href: "/about/mission-vision",
                label: "Mission & Vision",
                title: "Our Mission & Vision",
                body: "Discover why Maranatha exists and the God-given direction that drives everything we do.",
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-7 transition-all duration-300 hover:border-gold/22 hover:bg-[#141414]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/[0.09] text-gold transition-colors duration-200 group-hover:bg-gold/[0.15]">
                  {card.icon}
                </div>

                <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-gold/55">
                  {card.label}
                </p>
                <h3 className="mb-3 font-serif text-xl font-bold text-neutral-100">
                  {card.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-neutral-500">
                  {card.body}
                </p>

                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold/55 transition-colors duration-200 group-hover:text-gold">
                  Learn More
                  <svg className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>

                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="relative overflow-hidden border-t border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[90px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center lg:py-32">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/60">
            You Are Welcome Here
          </p>
          <h2 className="mb-5 font-serif text-4xl font-bold text-neutral-50 lg:text-5xl">
            Come as You Are.<br />
            <em className="gold-metallic not-italic">Leave Transformed.</em>
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-neutral-500">
            Whether this is your first visit or you are returning home — there is a
            seat, a community, and a purpose waiting for you at Maranatha.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full px-9 py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-neutral-950 shadow-[0_0_30px_rgba(201,169,110,0.22)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_45px_rgba(201,169,110,0.38)]"
              style={{ background: "linear-gradient(90deg,#a8844a 0%,#e0c28e 40%,#ffe57a 55%,#e0c28e 70%,#a8844a 100%)" }}
            >
              Plan Your Visit
            </Link>
            <Link
              href="/prayer-requests"
              className="rounded-full border border-white/12 px-9 py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-neutral-400 transition-all duration-200 hover:border-white/25 hover:text-neutral-100"
            >
              Submit a Prayer
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
