"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LanguageSelectorAdvanced } from "@/components/ui/language-selector-advanced";
import { useLanguage } from "@/contexts/language-context";

export function SiteHeader() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Build nav inside the component so labels re-render when language changes
  const navLinks = [
    { href: "/about",            label: t("navAbout") },
    { href: "/ministries",       label: t("navMinistries") },
    { href: "/media",            label: t("navMedia") },
    { href: "/events",           label: t("navEvents") },
    { href: "/blog-devotionals", label: t("navDevotionals") },
    { href: "/contact",          label: t("navContact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#090909]/90 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* ── Logo ── */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg ring-1 ring-white/10 transition-all duration-300 group-hover:ring-gold/40">
            <Image
              src="/Maranatha.png"
              alt="Maranatha Christian Church"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block leading-none">
            <p className="gold-metallic font-serif text-[13px] font-semibold leading-none">
              Maranatha
            </p>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-500 leading-none">
              Christian Church
            </p>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors duration-200 ${
                  isActive
                    ? "text-gold"
                    : "text-neutral-500 hover:text-neutral-200"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold/60 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Right Side ── */}
        <div className="flex items-center gap-3">
          <LanguageSelectorAdvanced />
          <Link
            href="/give-online"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-950 shadow-[0_0_18px_rgba(201,169,110,0.30)] transition-all duration-300 hover:shadow-[0_0_32px_rgba(201,169,110,0.55)] hover:brightness-110"
            style={{ background: "linear-gradient(90deg,#a8844a 0%,#e0c28e 40%,#ffe57a 55%,#e0c28e 70%,#a8844a 100%)" }}
          >
            {t("navGiveOnline")}
          </Link>

          {/* Mobile toggle */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white/5 hover:text-neutral-100 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/[0.06] bg-[#090909]/95 backdrop-blur-2xl px-6 pb-8 pt-6">
          <nav className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.15em] transition-colors ${
                    isActive
                      ? "bg-gold/10 text-gold"
                      : "text-neutral-500 hover:bg-white/[0.04] hover:text-neutral-200"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/give-online"
              className="flex items-center justify-center rounded-full py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-950 shadow-[0_0_18px_rgba(201,169,110,0.3)]"
              style={{ background: "linear-gradient(90deg,#a8844a 0%,#e0c28e 40%,#ffe57a 55%,#e0c28e 70%,#a8844a 100%)" }}
            >
              {t("navGiveOnline")}
            </Link>
            <Link
              href="/prayer-requests"
              className="flex items-center justify-center rounded-full border border-white/10 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-400"
            >
              {t("card1Cta")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
