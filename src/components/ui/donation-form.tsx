"use client";

import { useState } from "react";

interface DonorInfo {
  name: string;
  email: string;
  phone: string;
}

interface DonationFormProps {
  onSuccess?: (sessionId: string) => void;
  onError?: (error: string) => void;
}

export function DonationForm({ onSuccess, onError }: DonationFormProps) {
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly" | "yearly">("one-time");
  const [customAmount, setCustomAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState<DonorInfo>({
    name: "",
    email: "",
    phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const presetAmounts = [25, 50, 100, 250, 500];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const donationAmount = customAmount || amount;
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      newErrors.amount = "Please enter a valid donation amount";
    }
    if (!donorInfo.name.trim()) {
      newErrors.name = "Please enter your name";
    }
    if (!donorInfo.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsProcessing(true);
    try {
      const donationAmount = customAmount || amount;
      const response = await fetch("/api/donations/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(donationAmount),
          frequency,
          donorInfo: {
            ...donorInfo,
            name: donorInfo.name || "Anonymous Donor",
          },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create donation session");
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Donation error:", error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setErrors({ submit: errorMessage });
      onError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString());
    setCustomAmount("");
    setErrors((prev) => ({ ...prev, amount: "" }));
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount("");
    setErrors((prev) => ({ ...prev, amount: "" }));
  };

  const cardClass = "rounded-2xl border border-white/[0.07] bg-[#111111] p-8";
  const labelClass = "block text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 mb-3";
  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-[#0d0d0d] px-4 py-3.5 text-neutral-200 placeholder-neutral-700 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors ${
      hasError ? "border-red-500/50" : "border-white/[0.08]"
    }`;

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ── Donation Amount ── */}
        <section className={cardClass}>
          <h2 className="gold-metallic font-serif text-2xl font-bold mb-7">
            Select Amount
          </h2>

          {/* Frequency */}
          <div className="mb-6">
            <label className={labelClass}>Donation Frequency</label>
            <div className="grid grid-cols-3 gap-3">
              {(["one-time", "monthly", "yearly"] as const).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setFrequency(freq)}
                  className={`rounded-xl border py-3 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200 ${
                    frequency === freq
                      ? "border-gold/50 bg-gold/[0.12] text-gold shadow-[0_0_16px_rgba(201,169,110,0.12)]"
                      : "border-white/[0.07] bg-white/[0.02] text-neutral-500 hover:border-white/[0.15] hover:text-neutral-300"
                  }`}
                >
                  {freq === "one-time" ? "One Time" : freq.charAt(0).toUpperCase() + freq.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Preset amounts */}
          <div className="mb-6">
            <label className={labelClass}>Quick Select</label>
            <div className="grid grid-cols-5 gap-3">
              {presetAmounts.map((presetAmount) => (
                <button
                  key={presetAmount}
                  type="button"
                  onClick={() => handleAmountSelect(presetAmount)}
                  className={`rounded-xl border py-3.5 font-bold text-sm transition-all duration-200 ${
                    amount === presetAmount.toString() && !customAmount
                      ? "border-gold/50 bg-gold/[0.12] text-gold shadow-[0_0_16px_rgba(201,169,110,0.12)]"
                      : "border-white/[0.07] bg-white/[0.02] text-neutral-400 hover:border-white/[0.15] hover:text-neutral-200"
                  }`}
                >
                  ${presetAmount}
                </button>
              ))}
            </div>
          </div>

          {/* Custom amount */}
          <div>
            <label htmlFor="customAmount" className={labelClass}>Custom Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-neutral-500">$</span>
              <input
                type="number"
                id="customAmount"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder="Enter amount"
                min="1"
                step="0.01"
                className={`${inputClass(!!errors.amount)} pl-10`}
              />
            </div>
            {errors.amount && <p className="mt-2 text-xs text-red-400">{errors.amount}</p>}
          </div>
        </section>

        {/* ── Donor Information ── */}
        <section className={cardClass}>
          <h2 className="gold-metallic font-serif text-2xl font-bold mb-7">
            Your Information
          </h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="name" className={labelClass}>Full Name</label>
              <input
                type="text"
                id="name"
                value={donorInfo.name}
                onChange={(e) => {
                  setDonorInfo((prev) => ({ ...prev, name: e.target.value }));
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="Enter your full name"
                className={inputClass(!!errors.name)}
              />
              {errors.name && <p className="mt-2 text-xs text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>Email Address</label>
              <input
                type="email"
                id="email"
                value={donorInfo.email}
                onChange={(e) => {
                  setDonorInfo((prev) => ({ ...prev, email: e.target.value }));
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
                placeholder="Enter your email for receipt"
                className={inputClass(!!errors.email)}
              />
              {errors.email && <p className="mt-2 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>Phone Number <span className="normal-case text-neutral-700">(Optional)</span></label>
              <input
                type="tel"
                id="phone"
                value={donorInfo.phone}
                onChange={(e) => setDonorInfo((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
                className={inputClass(false)}
              />
            </div>
          </div>
        </section>

        {/* ── Security Notice ── */}
        <section className="rounded-2xl border border-white/[0.05] bg-[#0d0d0d] p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gold/[0.10] text-gold">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="mb-1.5 font-semibold text-neutral-200">Secure &amp; Protected</h3>
              <p className="text-sm leading-relaxed text-neutral-600">
                Your donation is processed securely through Stripe. We never store your payment
                information. All transactions are encrypted with 256-bit SSL.
              </p>
            </div>
          </div>
        </section>

        {/* ── Submit ── */}
        <div>
          {errors.submit && (
            <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/[0.07] p-4 text-sm text-red-400">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full rounded-xl py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-neutral-950 shadow-[0_0_30px_rgba(201,169,110,0.22)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_45px_rgba(201,169,110,0.38)] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: "linear-gradient(90deg,#a8844a 0%,#e0c28e 40%,#ffe57a 55%,#e0c28e 70%,#a8844a 100%)" }}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Processing…
              </span>
            ) : (
              `Give $${customAmount || amount || "—"} ${frequency === "one-time" ? "Now" : frequency}`
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
