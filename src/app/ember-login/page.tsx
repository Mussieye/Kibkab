import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/components/auth/auth-forms";

export default function EmberLoginPage() {
  return (
    <div className="min-h-screen bg-[#090909]">

      {/* ── Hero background ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <Image
          src="/Contact1.png"
          alt=""
          fill
          priority
          quality={80}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/50" />
      </div>

      {/* ── Content ── */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">

        {/* Logo & badge */}
        <div className="mb-10 flex flex-col items-center text-center">
          <Link href="/" className="mb-6 inline-block">
            <Image
              src="/Maranathachruch.png"
              alt="Maranatha Church"
              width={64}
              height={64}
              className="object-contain"
            />
          </Link>

          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-black/40 px-5 py-2 backdrop-blur-sm">
            <span className="block h-px w-5 bg-gold/50" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/90">
              Ember Member Area
            </span>
            <span className="block h-px w-5 bg-gold/50" />
          </div>

          <h1 className="gold-metallic font-serif text-4xl font-bold lg:text-5xl">
            Welcome Back
          </h1>

          <div className="my-4 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
            <div className="h-1.5 w-1.5 rotate-45 border border-gold/45" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-neutral-500">
            Sign in to access your member dashboard, exclusive content, and community features.
          </p>
        </div>

        {/* ── Login card ── */}
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
          <LoginForm />
        </div>

        {/* Demo credentials hint */}
        <div className="mt-6 w-full max-w-md rounded-xl border border-white/[0.05] bg-white/[0.02] px-5 py-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
            Demo Accounts
          </p>
          <div className="space-y-1 text-[11px] text-neutral-700">
            <p><span className="text-neutral-500">Admin:</span> admin@maranathachurch.org / <span className="text-gold/50">Admin1234</span></p>
            <p><span className="text-neutral-500">Editor:</span> editor@maranathachurch.org / <span className="text-gold/50">Editor1234</span></p>
            <p><span className="text-neutral-500">Member:</span> member@maranathachurch.org / <span className="text-gold/50">Member1234</span></p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-neutral-800">
          &copy; {new Date().getFullYear()} Maranatha Christian Church. All rights reserved.
        </p>
      </div>
    </div>
  );
}
