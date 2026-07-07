import type { Metadata } from "next";
import { DonationForm } from "@/components/ui/donation-form";

export const metadata: Metadata = {
  title: "Give Online",
  description:
    "Support Maranatha Christian Church through secure online giving. Your generosity fuels our mission and community.",
  openGraph: { title: "Give Online | Maranatha Christian Church", url: "/give-online" },
};
import Image from "next/image";
import Link from "next/link";

export default function GiveOnlinePage() {
  return (
    <div className="min-h-screen bg-[#090909]">

      {/* ── Hero Header ── */}
      <div className="relative border-b border-white/[0.06]" style={{ height: '65vh' }}>

        {/* Full image */}
        <Image
          src="/Offe.png"
          alt="Give Offering"
          fill
          priority
          quality={90}
          className="object-contain object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Text content */}
        <div className="absolute inset-0 flex items-center justify-center">
        <div className="mx-auto max-w-3xl px-6 text-center">

          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-black/50 px-5 py-2 backdrop-blur-sm">
            <span className="block h-px w-6 bg-gold/50" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/90">
              Support Our Mission
            </span>
            <span className="block h-px w-6 bg-gold/50" />
          </div>

          {/* Title */}
          <h1 className="gold-metallic mb-5 font-serif text-5xl font-bold leading-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] lg:text-6xl">
            Give Offering
          </h1>

          {/* Ornamental divider */}
          <div className="mb-7 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/55" />
            <div className="h-1.5 w-1.5 rotate-45 border border-gold/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/55" />
          </div>

          {/* Description */}
          <p className="mx-auto max-w-xl text-base leading-relaxed text-neutral-300 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
            Your generous offering helps us continue our mission to spread the Gospel,
            serve our community, and make a difference in the lives of many.
          </p>
        </div>
        </div>
      </div>

{/* ── Donation Form ── */}
      <div className="mx-auto max-w-2xl px-6 py-16 lg:py-20">
        <DonationForm />

        <div className="mt-12 text-center">
          <p className="mb-3 text-sm text-neutral-600">
            Questions about giving?{" "}
            <Link href="/contact" className="text-gold underline hover:text-gold-light">
              Contact our office
            </Link>
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-700">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Secured by Stripe • PCI Compliant • 256-bit SSL Encryption
          </div>
        </div>
      </div>
    </div>
  );
}
