import type { Metadata } from "next";
import { MinistryCard } from "@/components/ministry-card";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Discover Maranatha's ministries — Youth, Worship, Outreach, Small Groups, and more. Find your place to serve and grow.",
  openGraph: { title: "Ministries | Maranatha Christian Church", url: "/ministries" },
};
import { getMinistries } from "@/lib/cms/content";
import Image from "next/image";

export default async function MinistriesPage() {
  const ministries = await getMinistries();

  return (
    <div className="min-h-screen bg-[#090909]">

      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/walk.png"
            alt="Walking in faith"
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/35" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-22">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/22 bg-black/40 px-5 py-2 backdrop-blur-sm">
            <span className="block h-px w-6 bg-gold/45" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/85">
              Our Ministries
            </span>
            <span className="block h-px w-6 bg-gold/45" />
          </div>

          <h1 className="gold-metallic mb-5 font-serif text-5xl font-bold leading-tight lg:text-6xl">
            Ministries
          </h1>

          {/* Divider */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/45" />
            <div className="h-1.5 w-1.5 rotate-45 border border-gold/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/45" />
          </div>

          <p className="max-w-2xl text-base leading-relaxed text-neutral-400">
            Every ministry exists to glorify Christ and serve people. Explore the
            ministry areas below and discover where you can grow, serve, and belong.
          </p>
        </div>
      </div>

      {/* ── Ministry Grid ── */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {ministries.map((ministry) => (
            <MinistryCard key={ministry.slug} ministry={ministry} />
          ))}
        </div>
      </div>

    </div>
  );
}
