"use client";

import { useState } from "react";
import Link from "next/link";
import type { LoginCredentials, RegisterData } from "@/lib/auth/types";

interface AuthFormsProps {
  onSuccess?: (user: unknown) => void;
  onError?: (error: string) => void;
}

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-[#0d0d0d] px-4 py-3.5 text-neutral-200 placeholder-neutral-700 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors";

const labelClass =
  "mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500";

export function LoginForm({ onSuccess, onError }: AuthFormsProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!credentials.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) e.email = "Enter a valid email";
    if (!credentials.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      onSuccess?.(data.user);
      window.location.href = "/membership/dashboard";
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setErrors({ submit: msg });
      onError?.(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass}>Email Address</label>
        <input
          type="email"
          value={credentials.email}
          onChange={(e) => { setCredentials(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: "" })); }}
          placeholder="your@email.com"
          className={`${inputClass} ${errors.email ? "border-red-500/50" : ""}`}
        />
        {errors.email && <p className="mt-1.5 text-[11px] text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label className={labelClass}>Password</label>
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => { setCredentials(p => ({ ...p, password: e.target.value })); setErrors(p => ({ ...p, password: "" })); }}
          placeholder="Your password"
          className={`${inputClass} ${errors.password ? "border-red-500/50" : ""}`}
        />
        {errors.password && <p className="mt-1.5 text-[11px] text-red-400">{errors.password}</p>}
      </div>

      {errors.submit && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3 text-sm text-red-400">
          {errors.submit}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-neutral-950 shadow-[0_0_28px_rgba(201,169,110,0.22)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_44px_rgba(201,169,110,0.38)] disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(90deg,#a8844a 0%,#e0c28e 40%,#ffe57a 55%,#e0c28e 70%,#a8844a 100%)" }}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Signing In…
          </span>
        ) : "Sign In"}
      </button>

      <p className="text-center text-sm text-neutral-600">
        Don&rsquo;t have an account?{" "}
        <Link href="/membership/register" className="font-semibold text-gold/80 hover:text-gold transition-colors">
          Join our community
        </Link>
      </p>
    </form>
  );
}

export function RegisterForm({ onSuccess, onError }: AuthFormsProps) {
  const [formData, setFormData] = useState<RegisterData>({ name: "", email: "", password: "", phone: "", address: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 8) e.password = "Min 8 characters";
    else if (!/(?=.*[a-z])/.test(formData.password)) e.password = "Must include a lowercase letter";
    else if (!/(?=.*[A-Z])/.test(formData.password)) e.password = "Must include an uppercase letter";
    else if (!/(?=.*\d)/.test(formData.password)) e.password = "Must include a number";
    if (!confirmPassword) e.confirmPassword = "Please confirm password";
    else if (formData.password !== confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      onSuccess?.(data.user);
      window.location.href = "/membership/dashboard";
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setErrors({ submit: msg });
      onError?.(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const field = (key: keyof RegisterData) => ({
    value: formData[key] ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(p => ({ ...p, [key]: e.target.value }));
      setErrors(p => ({ ...p, [key]: "" }));
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Full Name</label>
          <input type="text" placeholder="Your full name" {...field("name")}
            className={`${inputClass} ${errors.name ? "border-red-500/50" : ""}`} />
          {errors.name && <p className="mt-1.5 text-[11px] text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label className={labelClass}>Email Address</label>
          <input type="email" placeholder="your@email.com" {...field("email")}
            className={`${inputClass} ${errors.email ? "border-red-500/50" : ""}`} />
          {errors.email && <p className="mt-1.5 text-[11px] text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Password</label>
          <input type="password" placeholder="Create a password" {...field("password")}
            className={`${inputClass} ${errors.password ? "border-red-500/50" : ""}`} />
          {errors.password && <p className="mt-1.5 text-[11px] text-red-400">{errors.password}</p>}
        </div>
        <div>
          <label className={labelClass}>Confirm Password</label>
          <input type="password" placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirmPassword: "" })); }}
            className={`${inputClass} ${errors.confirmPassword ? "border-red-500/50" : ""}`} />
          {errors.confirmPassword && <p className="mt-1.5 text-[11px] text-red-400">{errors.confirmPassword}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Phone Number <span className="text-neutral-700 normal-case tracking-normal">(optional)</span></label>
        <input type="tel" placeholder="+1 (555) 000-0000" {...field("phone")} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Address <span className="text-neutral-700 normal-case tracking-normal">(optional)</span></label>
        <textarea
          placeholder="Your address"
          rows={3}
          value={formData.address ?? ""}
          onChange={(e) => { setFormData(p => ({ ...p, address: e.target.value })); }}
          className={`${inputClass} resize-none`}
        />
      </div>

      {errors.submit && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3 text-sm text-red-400">
          {errors.submit}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-neutral-950 shadow-[0_0_28px_rgba(201,169,110,0.22)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_44px_rgba(201,169,110,0.38)] disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(90deg,#a8844a 0%,#e0c28e 40%,#ffe57a 55%,#e0c28e 70%,#a8844a 100%)" }}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Creating Account…
          </span>
        ) : "Create Account"}
      </button>

      <p className="text-center text-sm text-neutral-600">
        Already a member?{" "}
        <Link href="/ember-login" className="font-semibold text-gold/80 hover:text-gold transition-colors">
          Sign in here
        </Link>
      </p>
    </form>
  );
}
