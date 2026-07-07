"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English",   nativeName: "English",    flag: "🇬🇧" },
  { code: "es", name: "Spanish",   nativeName: "Español",    flag: "🇪🇸" },
  { code: "fr", name: "French",    nativeName: "Français",   flag: "🇫🇷" },
  { code: "nl", name: "Dutch",     nativeName: "Nederlands", flag: "🇳🇱" },
  { code: "am", name: "Amharic",   nativeName: "አማርኛ",      flag: "🇪🇹" },
  { code: "ti", name: "Tigrinya",  nativeName: "ትግርኛ",      flag: "🇪🇷" },
];

export function LanguageSelectorAdvanced() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === language) ?? languages[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* ── Compact trigger ── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Select language"
        aria-expanded={isOpen}
        className="flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 text-sm transition-all duration-200 hover:border-gold/25 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/30"
      >
        {/* Globe icon */}
        <svg
          className="h-3.5 w-3.5 flex-shrink-0 text-neutral-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" strokeWidth={1.6} />
          <path strokeWidth={1.6} d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
        </svg>

        {/* Flag + code */}
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-300">
          {current.code}
        </span>

        {/* Chevron */}
        <svg
          className={`h-3 w-3 flex-shrink-0 text-neutral-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* ── Dropdown ── */}
      <div
        className={`absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-white/[0.08] bg-[#111111] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.7)] transition-all duration-200 ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="border-b border-white/[0.06] px-4 py-2.5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-gold/55">
            Language
          </p>
        </div>

        {/* Options */}
        <div className="py-1">
          {languages.map((lang) => {
            const isActive = lang.code === language;
            return (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code as any); setIsOpen(false); }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150 ${
                  isActive
                    ? "bg-gold/[0.07] text-neutral-100"
                    : "text-neutral-400 hover:bg-white/[0.04] hover:text-neutral-200"
                }`}
              >
                <span className="text-base leading-none">{lang.flag}</span>
                <span className="flex-1 text-[12px] font-medium">{lang.nativeName}</span>
                {isActive && (
                  <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gold">
                    <svg className="h-2.5 w-2.5 text-neutral-950" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.06] px-4 py-2">
          <p className="text-[9px] text-neutral-700">6 languages available</p>
        </div>
      </div>
    </div>
  );
}
