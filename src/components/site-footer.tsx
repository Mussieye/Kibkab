"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const quickLinks = [
  { href: "/about",            label: "About Us" },
  { href: "/ministries",       label: "Ministries" },
  { href: "/media/sermons",    label: "Sermons" },
  { href: "/media/live-stream",label: "Live Stream" },
  { href: "/events",           label: "Events" },
  { href: "/blog-devotionals", label: "Devotionals" },
  { href: "/give-online",      label: "Give Online" },
  { href: "/prayer-requests",  label: "Prayer Requests" },
  { href: "/gallery",          label: "Gallery" },
  { href: "/contact",          label: "Contact" },
];

const serviceInfo = [
  { day: "Sunday Worship",   time: "9:00 AM & 11:00 AM" },
  { day: "Wednesday Prayer", time: "7:00 PM" },
  { day: "Friday Youth",     time: "6:30 PM" },
];

export function SiteFooter() {
  const [email, setEmail]       = useState("");
  const [status, setStatus]     = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#0a0a0a]">
      {/* Top gold line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr]">

          {/* ── Brand column ── */}
          <div>
            <Link href="/" className="mb-5 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg ring-1 ring-white/10">
                <Image
                  src="/Maranatha.png"
                  alt="Maranatha Christian Church"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="leading-none">
                <p className="gold-metallic font-serif text-[13px] font-semibold">Maranatha</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-600">
                  Christian Church
                </p>
              </div>
            </Link>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-neutral-600">
              A vibrant community of faith rooted in Christ — serving through
              worship, prayer, and outreach in the Netherlands.
            </p>

            {/* Service times */}
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/60">
                Service Times
              </p>
              <ul className="space-y-2">
                {serviceInfo.map(s => (
                  <li key={s.day} className="flex items-center justify-between text-[12px]">
                    <span className="text-neutral-600">{s.day}</span>
                    <span className="text-neutral-400">{s.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/60">
              Quick Links
            </p>
            <ul className="space-y-2.5">
              {quickLinks.slice(0, 5).map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-neutral-600 transition-colors duration-150 hover:text-neutral-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/60">
              Community
            </p>
            <ul className="space-y-2.5">
              {quickLinks.slice(5).map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-neutral-600 transition-colors duration-150 hover:text-neutral-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/ember-login"
                  className="text-sm text-gold/60 transition-colors duration-150 hover:text-gold"
                >
                  Member Login
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Newsletter ── */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/60">
              Stay Connected
            </p>
            <p className="mb-5 text-sm leading-relaxed text-neutral-600">
              Receive sermon notes, event reminders, and devotionals straight to your inbox.
            </p>

            {status === "success" ? (
              <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/[0.07] px-4 py-3">
                <svg className="h-4 w-4 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-green-400">You&rsquo;re subscribed — God bless you!</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-white/[0.08] bg-[#0d0d0d] px-4 py-3 text-sm text-neutral-200 placeholder-neutral-700 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/15 transition-colors"
                />
                {status === "error" && (
                  <p className="text-[11px] text-red-400">Something went wrong — please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-xl py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-950 shadow-[0_0_20px_rgba(201,169,110,0.18)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_36px_rgba(201,169,110,0.32)] disabled:opacity-50"
                  style={{ background: "linear-gradient(90deg,#a8844a 0%,#e0c28e 40%,#ffe57a 55%,#e0c28e 70%,#a8844a 100%)" }}
                >
                  {status === "loading" ? "Subscribing…" : "Subscribe"}
                </button>
              </form>
            )}

            {/* Contact snippet */}
            <div className="mt-7 space-y-2 border-t border-white/[0.05] pt-6">
              <a
                href="mailto:maranatachurch1983@gmail.com"
                className="flex items-center gap-2 text-[12px] text-neutral-600 transition-colors hover:text-neutral-300"
              >
                <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                maranatachurch1983@gmail.com
              </a>
              <a
                href="tel:+33759495540"
                className="flex items-center gap-2 text-[12px] text-neutral-600 transition-colors hover:text-neutral-300"
              >
                <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +33 7 59 49 55 40
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.04] bg-black/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row lg:px-10">
          <p className="text-[11px] text-neutral-700">
            &copy; {new Date().getFullYear()} Maranatha Christian Church. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/contact"      className="text-[11px] text-neutral-700 transition-colors hover:text-neutral-400">Contact</Link>
            <Link href="/ember-login"  className="text-[11px] text-neutral-700 transition-colors hover:text-neutral-400">Member Login</Link>
            <Link href="/give-online"  className="text-[11px] text-gold/50 transition-colors hover:text-gold">Give Online</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
