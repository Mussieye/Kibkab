import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { sampleBlogs } from "@/data/sample-blogs";

export const metadata: Metadata = {
  title: "Blog & Devotionals",
  description:
    "Spirit-filled devotionals, biblical reflections, and church news from Maranatha Christian Church.",
  openGraph: { title: "Blog & Devotionals | Maranatha Christian Church", url: "/blog-devotionals" },
};

export default function BlogDevotionalsPage() {
  const featured = sampleBlogs.filter((b) => b.featured);
  const rest = sampleBlogs.filter((b) => !b.featured);

  return (
    <div className="min-h-screen bg-[#090909]">
      {/* ── Page Header ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/worship1.png"
            alt="Worship"
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
              Faith &amp; Inspiration
            </span>
            <span className="block h-px w-6 bg-gold/50" />
          </div>

          <h1 className="gold-metallic mb-5 font-serif text-5xl font-bold leading-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] md:text-6xl">
            Blog &amp; Devotionals
          </h1>

          <div className="mb-7 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <div className="h-1.5 w-1.5 rotate-45 border border-gold/55" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-300 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
            Spiritual insights, devotionals, and church news to nourish your faith journey
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* ── Featured Post ── */}
        {featured.map((blog) => (
          <article key={blog.id} className="mb-14">
            <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] transition-colors duration-300 hover:border-gold/20 md:flex">
              {/* Left — decorative panel */}
              <div className="flex items-center justify-center bg-gradient-to-br from-[#1a1208] to-[#0e0d0c] p-10 md:w-1/3">
                <div className="text-center">
                  <span className="mb-4 inline-block rounded-full bg-gold/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-gold/70">
                    Featured
                  </span>
                  <h3 className="font-serif text-2xl font-bold leading-snug text-neutral-100">
                    {blog.title}
                  </h3>
                  <div className="mt-4 h-px w-12 bg-gold/30 mx-auto" />
                </div>
              </div>

              {/* Right — content */}
              <div className="flex flex-col p-8 md:w-2/3">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-gold/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold/80">
                    {blog.category}
                  </span>
                  <span className="text-xs text-neutral-600">
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                  <span className="text-xs text-neutral-600">{blog.readingTime} min read</span>
                </div>

                <h2 className="mb-4 font-serif text-3xl font-bold leading-snug text-neutral-50">
                  {blog.title}
                </h2>
                <p className="mb-6 flex-grow text-base leading-relaxed text-neutral-500 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-neutral-600">By {blog.author}</p>
                  <Link
                    href={`/blog-devotionals/${blog.slug}`}
                    className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-light"
                  >
                    Read More
                    <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* ── Blog Grid ── */}
        <div className="mb-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((blog) => (
            <article
              key={blog.id}
              className="group flex flex-col rounded-2xl border border-white/[0.07] bg-[#111111] p-6 transition-all duration-300 hover:border-gold/20 hover:bg-[#141414]"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-gold/[0.08] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-gold/70">
                  {blog.category}
                </span>
                <span className="text-xs text-neutral-600">{blog.readingTime} min</span>
              </div>

              <h3 className="mb-3 flex-grow font-serif text-xl font-semibold leading-snug text-neutral-100 line-clamp-2">
                {blog.title}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-neutral-500 line-clamp-3">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <p className="text-xs text-neutral-600">
                  {new Date(blog.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
                <Link
                  href={`/blog-devotionals/${blog.slug}`}
                  className="group/link inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold/60 transition-colors hover:text-gold"
                >
                  Read More
                  <svg className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ── Newsletter Signup ── */}
        <section className="relative overflow-hidden rounded-2xl border border-gold/15 bg-[#0f0e0b] px-8 py-14 text-center">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-96 rounded-full bg-gold/[0.04] blur-[80px]" />
          </div>
          <div className="relative">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/60">
              Stay Connected
            </p>
            <h2 className="mb-4 font-serif text-3xl font-bold text-neutral-50">
              Never Miss a Devotional
            </h2>
            <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-neutral-500">
              Get our latest devotionals and church news delivered straight to your inbox
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all focus:border-gold/30 focus:ring-1 focus:ring-gold/20"
              />
              <button className="rounded-xl bg-gold px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-950 transition-all duration-200 hover:bg-gold-light hover:shadow-[0_0_30px_rgba(201,169,110,0.2)]">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
