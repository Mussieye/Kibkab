"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { User } from "@/lib/auth/types";

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-[#0d0d0d] px-4 py-3.5 text-neutral-200 placeholder-neutral-700 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed";
const labelClass =
  "mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500";

export default function MemberProfilePage() {
  const [user, setUser]         = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving]   = useState(false);
  const [formData, setFormData]   = useState({ name: "", phone: "", address: "" });
  const [message, setMessage]     = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => {
        setUser(d.user);
        setFormData({ name: d.user.name, phone: d.user.phone || "", address: d.user.address || "" });
      })
      .catch(() => { window.location.href = "/ember-login"; })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setUser(data.user);
      setMessage({ text: "Profile updated successfully.", ok: true });
    } catch (err) {
      setMessage({ text: err instanceof Error ? err.message : "Update failed.", ok: false });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090909]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-gold/60" />
          <p className="text-sm text-neutral-600">Loading profile…</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const joinDate = user.membershipDate
    ? new Date(user.membershipDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  return (
    <div className="min-h-screen bg-[#090909]">

      {/* ── Header ── */}
      <header className="sticky top-0 z-30 border-b border-white/[0.05] bg-[#090909]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/membership/dashboard" className="flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-200">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/Maranathachruch.png" alt="Maranatha" width={28} height={28} className="object-contain" />
            <span className="gold-metallic hidden font-serif text-sm font-bold sm:block">Maranatha</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-12">

        {/* ── Page heading ── */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-black/40 px-5 py-2 backdrop-blur-sm">
            <span className="block h-px w-5 bg-gold/50" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/90">Member Portal</span>
            <span className="block h-px w-5 bg-gold/50" />
          </div>
          <h1 className="gold-metallic font-serif text-3xl font-bold lg:text-4xl">Edit Profile</h1>
          <p className="mt-2 text-sm text-neutral-600">Update your personal information and preferences.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Avatar ── */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
            <h2 className="gold-metallic mb-5 font-serif text-lg font-bold">Profile Picture</h2>
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/[0.08]">
                <span className="text-2xl font-bold text-gold">{initials}</span>
              </div>
              <div>
                <button
                  type="button"
                  className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-neutral-400 transition-colors hover:border-gold/25 hover:text-gold"
                >
                  Change Photo
                </button>
                <p className="mt-2 text-[11px] text-neutral-700">JPG, PNG or GIF. Max 2 MB.</p>
              </div>
            </div>
          </div>

          {/* ── Personal info ── */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
            <h2 className="gold-metallic mb-6 font-serif text-lg font-bold">Personal Information</h2>
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <input type="email" value={user.email} disabled className={inputClass} />
                <p className="mt-1.5 text-[11px] text-neutral-700">Email cannot be changed. Contact admin if needed.</p>
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Address</label>
                <textarea
                  rows={3}
                  placeholder="Your address"
                  value={formData.address}
                  onChange={e => setFormData(p => ({ ...p, address: e.target.value }))}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* ── Account info (read-only) ── */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
            <h2 className="gold-metallic mb-5 font-serif text-lg font-bold">Account Information</h2>
            <div className="space-y-4">
              {[
                { label: "Member Role",   value: user.role.charAt(0).toUpperCase() + user.role.slice(1) },
                { label: "Member Since",  value: joinDate },
                { label: "Account Status", value: "Active" },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between border-b border-white/[0.05] pb-4 last:border-0 last:pb-0">
                  <span className="text-sm text-neutral-500">{row.label}</span>
                  <span className="text-sm font-semibold text-neutral-200">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Status message ── */}
          {message && (
            <div className={`rounded-xl border px-4 py-3 text-sm ${
              message.ok
                ? "border-green-500/20 bg-green-500/[0.08] text-green-400"
                : "border-red-500/20 bg-red-500/[0.08] text-red-400"
            }`}>
              {message.text}
            </div>
          )}

          {/* ── Actions ── */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 rounded-xl py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-neutral-950 shadow-[0_0_28px_rgba(201,169,110,0.22)] transition-all duration-300 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(90deg,#a8844a 0%,#e0c28e 40%,#ffe57a 55%,#e0c28e 70%,#a8844a 100%)" }}
            >
              {isSaving ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Saving…
                </span>
              ) : "Save Changes"}
            </button>
            <Link
              href="/membership/dashboard"
              className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-neutral-500 transition-colors hover:border-white/20 hover:text-neutral-300"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
