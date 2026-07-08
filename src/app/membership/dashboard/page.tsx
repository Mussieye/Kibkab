"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { User } from "@/lib/auth/types";

const roleColors: Record<string, string> = {
  admin:  "bg-red-500/15 text-red-400 border-red-500/25",
  editor: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  member: "bg-gold/[0.12] text-gold border-gold/25",
};

export default function MemberDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => setUser(d.user))
      .catch(() => { window.location.href = "/ember-login"; })
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090909]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-gold/60" />
          <p className="text-sm text-neutral-600">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const joinDate = user.membershipDate
    ? new Date(user.membershipDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  const quickActions = [
    { href: "/membership/profile",  label: "Edit Profile",   sub: "Update your personal info",    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { href: "/blog-devotionals",    label: "Devotionals",    sub: "Member-exclusive devotionals",  icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { href: "/events",              label: "Events",         sub: "View & RSVP to church events",  icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { href: "/media/sermons",       label: "Sermons",        sub: "Browse the sermon archive",     icon: "M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
    { href: "/give-online",         label: "Give Online",    sub: "Support the ministry",          icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
    { href: "/prayer-requests",     label: "Prayer Requests", sub: "Submit & view prayer needs",  icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  ];

  const benefits = [
    { title: "Exclusive Content",   desc: "Access member-only devotionals and spiritual resources" },
    { title: "Event Priority",      desc: "Early registration and reserved seating for church events" },
    { title: "Community Access",    desc: "Join small groups, ministry teams, and prayer circles" },
    { title: "Pastoral Support",    desc: "Direct access to pastoral care and counseling services" },
  ];

  return (
    <div className="min-h-screen bg-[#090909]">

      {/* ── Top header bar ── */}
      <header className="sticky top-0 z-30 border-b border-white/[0.05] bg-[#090909]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/maranatha-icon.png" alt="Maranatha" width={32} height={32} className="object-contain" />
            <span className="gold-metallic hidden font-serif text-base font-bold sm:block">
              Maranatha
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
                {initials}
              </div>
              <span className="text-sm text-neutral-400">{user.name}</span>
            </div>
            {user.role === "admin" && (
              <Link
                href="/admin/members"
                className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-400 transition-colors hover:border-gold/25 hover:text-gold"
              >
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-400 transition-colors hover:border-red-500/30 hover:text-red-400"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">

        {/* ── Welcome hero ── */}
        <div className="relative mb-10 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-8 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#c9a96e]/[0.05] blur-[80px]" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/[0.08]">
              <span className="text-2xl font-bold text-gold">{initials}</span>
            </div>

            <div className="flex-1">
              <div className="mb-1 inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] ${roleColors[user.role]}">
                <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${roleColors[user.role] ?? roleColors.member}`}>
                  {user.role}
                </span>
              </div>
              <h1 className="gold-metallic mt-1 font-serif text-3xl font-bold lg:text-4xl">
                Welcome, {user.name.split(" ")[0]}
              </h1>
              <p className="mt-1 text-sm text-neutral-500">
                Member since {joinDate} &mdash; {user.email}
              </p>
            </div>

            <Link
              href="/membership/profile"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400 transition-all hover:border-gold/25 hover:text-gold"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </Link>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Member Since",   value: joinDate },
            { label: "Account Role",   value: user.role.charAt(0).toUpperCase() + user.role.slice(1) },
            { label: "Status",         value: "Active" },
          ].map(s => (
            <div key={s.label} className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-5">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">{s.label}</p>
              <p className="mt-1 text-lg font-semibold text-neutral-200">{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Quick Actions ── */}
        <div className="mb-10">
          <h2 className="gold-metallic mb-5 font-serif text-xl font-bold">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map(a => (
              <Link
                key={a.href}
                href={a.href}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-6 transition-all duration-300 hover:border-gold/20 hover:bg-[#141414]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold/[0.08] text-gold">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={a.icon} />
                  </svg>
                </div>
                <h3 className="mb-1 font-semibold text-neutral-200">{a.label}</h3>
                <p className="text-[12px] text-neutral-600">{a.sub}</p>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Member Benefits ── */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
          <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-[#c9a96e]/[0.04] blur-[60px]" />

          <h2 className="gold-metallic mb-6 font-serif text-xl font-bold">Member Benefits</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map(b => (
              <div key={b.title} className="flex items-start gap-3.5">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold">
                  <svg className="h-3 w-3 text-neutral-950" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-200">{b.title}</h3>
                  <p className="text-sm text-neutral-600">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
