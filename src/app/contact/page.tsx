"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full rounded-xl border border-white/[0.08] bg-[#0d0d0d] px-4 py-3.5 text-neutral-200 placeholder-neutral-700 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors";

  return (
    <div className="min-h-screen bg-[#090909]">

      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0">
          <Image
            src="/Contact1.png"
            alt="Contact Maranatha"
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/35" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center lg:py-32">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-black/40 px-5 py-2 backdrop-blur-sm">
            <span className="block h-px w-6 bg-gold/50" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/90">
              Get In Touch
            </span>
            <span className="block h-px w-6 bg-gold/50" />
          </div>

          <h1 className="gold-metallic mb-5 font-serif text-5xl font-bold leading-tight lg:text-6xl xl:text-7xl">
            Contact Us
          </h1>

          <div className="mb-7 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <div className="h-1.5 w-1.5 rotate-45 border border-gold/55" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-neutral-300">
            We would love to hear from you. Reach out with any questions, prayer
            requests, or to learn more about our community.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">

          {/* ── Left: Details ── */}
          <div className="space-y-5">

            {/* Church Details */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-7">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
              <h2 className="gold-metallic mb-6 font-serif text-xl font-bold">Church Details</h2>
              <ul className="space-y-4">
                {[
                  {
                    icon: (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    label: "Address",
                    value: "123 Faith Avenue, City Name",
                  },
                  {
                    icon: (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                    label: "Phone",
                    value: "+33 7 59 49 55 40",
                  },
                  {
                    icon: (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    label: "Email",
                    value: "maranatachurch1983@gmail.com",
                  },
                  {
                    icon: (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    label: "Office Hours",
                    value: "Mon – Fri, 9:00 AM – 5:00 PM",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3.5">
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gold/[0.08] text-gold">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/55">{item.label}</p>
                      <p className="mt-0.5 text-sm text-neutral-300">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Times */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-7">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
              <h2 className="gold-metallic mb-6 font-serif text-xl font-bold">Service Times</h2>
              <ul className="space-y-4">
                {[
                  { day: "Sunday Worship",    time: "9:00 AM & 11:00 AM" },
                  { day: "Wednesday Prayer",  time: "7:00 PM"            },
                  { day: "Friday Youth",      time: "6:30 PM"            },
                ].map((s) => (
                  <li key={s.day} className="flex items-center justify-between border-b border-white/[0.05] pb-4 last:border-0 last:pb-0">
                    <span className="text-sm font-medium text-neutral-400">{s.day}</span>
                    <span className="text-sm font-semibold text-neutral-200">{s.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

            <h2 className="gold-metallic mb-2 font-serif text-2xl font-bold">Send a Message</h2>
            <p className="mb-8 text-sm leading-relaxed text-neutral-500">
              Fill in the form below and we will get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="gold-metallic mb-2 font-serif text-2xl font-bold">Message Sent!</h3>
                <p className="text-sm text-neutral-500">Thank you for reaching out. We&rsquo;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-neutral-950 shadow-[0_0_28px_rgba(201,169,110,0.22)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_44px_rgba(201,169,110,0.38)]"
                  style={{ background: "linear-gradient(90deg,#a8844a 0%,#e0c28e 40%,#ffe57a 55%,#e0c28e 70%,#a8844a 100%)" }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Map ── */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.07]">
          <div className="border-b border-white/[0.06] bg-[#111111] px-7 py-5">
            <h2 className="gold-metallic font-serif text-xl font-bold">Our Location</h2>
            <p className="mt-1 text-sm text-neutral-500">Maranatha Christian Church — Netherlands</p>
          </div>
          <div className="h-80 w-full">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d388347.4725487556!2d5.291921!3d52.130632!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snl!4v1661234567890"
              title="Maranatha Christian Church - Netherlands"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
