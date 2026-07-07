"use client";

import { useState, useEffect } from "react";
import { ZoomMeeting } from "@/components/ui/zoom-meeting";
import { useLanguage } from "@/contexts/language-context";
import { defaultStreamingConfig, type ServiceConfig } from "@/lib/streaming-config";

export default function LiveStreamPage() {
  const { language } = useLanguage();
  const [isLive, setIsLive] = useState(false);
  const [currentService, setCurrentService] = useState<ServiceConfig | null>(null);
  const [nextService, setNextService] = useState<ServiceConfig | null>(null);
  const [streamType, setStreamType] = useState<"youtube" | "vimeo" | "zoom">("youtube");

  const serviceSchedule = defaultStreamingConfig.services;

  useEffect(() => {
    const checkLiveStatus = () => {
      const now = new Date();
      const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });

      const todayServices = serviceSchedule.filter((s) => s.day === currentDay);

      for (const service of todayServices) {
        const [hours, minutes] = service.time.split(":").map(Number);
        const serviceStart = new Date();
        serviceStart.setHours(hours, minutes, 0, 0);
        const serviceEnd = new Date(serviceStart);
        const parts = service.duration.split(" ");
        const durationHours = parts[0]?.includes("hour") ? parseInt(parts[0]) : 0;
        const durationMins = parts.find((p) => p.includes("minute"))
          ? parseInt(parts[parts.indexOf(parts.find((p) => p.includes("minute"))!) - 1]) / 60
          : 0;
        serviceEnd.setHours(serviceEnd.getHours() + durationHours + durationMins);

        if (now >= serviceStart && now <= serviceEnd) {
          setIsLive(true);
          setCurrentService(service);
          return;
        }
      }

      setIsLive(false);
      setCurrentService(null);

      const dayMap: Record<string, number> = {
        Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
        Thursday: 4, Friday: 5, Saturday: 6,
      };
      const todayIndex = now.getDay();
      const upcoming = serviceSchedule.find((s) => {
        const target = dayMap[s.day] ?? -1;
        return target > todayIndex;
      });
      setNextService(upcoming ?? serviceSchedule[0] ?? null);
    };

    checkLiveStatus();
    const id = setInterval(checkLiveStatus, 60_000);
    return () => clearInterval(id);
  }, [serviceSchedule]);

  const label = {
    en: { title: "Live Streaming", subtitle: "Join our services live from anywhere in the world. Experience worship, teaching, and community in real-time." },
    es: { title: "Transmisión en Vivo", subtitle: "Únete a nuestros servicios en vivo desde cualquier lugar del mundo." },
    fr: { title: "Diffusion en Direct", subtitle: "Rejoignez nos services en direct depuis n'importe où dans le monde." },
    nl: { title: "Live Streaming", subtitle: "Neem deel aan onze diensten live waar ook ter wereld." },
  }[language as "en" | "es" | "fr" | "nl"] ?? { title: "Live Streaming", subtitle: "" };

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 md:px-6">

      {/* ── Header ── */}
      <section className="text-center">
        {/* Live / Offline badge */}
        <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-gold/20 bg-gold/[0.06] px-5 py-2">
          {isLive ? (
            <>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                Live Now
              </span>
            </>
          ) : (
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Offline
            </span>
          )}
        </div>

        <h1 className="mb-4 font-serif text-4xl font-bold text-neutral-50 lg:text-5xl">
          {label.title}
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-400">
          {label.subtitle}
        </p>
      </section>

      {/* ── Stream type toggle (only when live) ── */}
      {isLive && currentService && (
        <section className="flex justify-center">
          <div className="inline-flex rounded-full border border-white/[0.08] bg-[#111111] p-1">
            {(["youtube", "vimeo", "zoom"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setStreamType(type)}
                className={`rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                  streamType === type
                    ? "bg-gold text-neutral-950 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-200"
                }`}
              >
                {type === "youtube" ? "YouTube" : type === "vimeo" ? "Vimeo" : "Zoom"}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Main Player ── */}
      <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0d0d]">
        <div className="aspect-video relative">
          {isLive && currentService ? (
            <>
              {streamType === "youtube" && (
                <iframe
                  src={currentService.youtubeUrl}
                  className="h-full w-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title="Live Stream"
                />
              )}
              {streamType === "vimeo" && (
                <iframe
                  src={currentService.vimeoUrl}
                  className="h-full w-full"
                  allowFullScreen
                  allow="autoplay; fullscreen; picture-in-picture"
                  title="Live Stream"
                />
              )}
              {streamType === "zoom" && (
                <ZoomMeeting
                  meetingId={currentService.zoomMeetingId}
                  meetingPassword={currentService.zoomPassword}
                  isLive={isLive}
                  title={currentService.title}
                />
              )}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                <span className="text-xs font-semibold uppercase text-white">
                  {streamType === "youtube" ? "YouTube Live" : streamType === "vimeo" ? "Vimeo Live" : "Zoom"}
                </span>
              </div>
            </>
          ) : (
            /* Offline placeholder */
            <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-[#0d0d0d] text-center px-6">
              <svg className="h-16 w-16 text-gold/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="font-serif text-xl font-semibold text-neutral-100">
                  {nextService ? `Next: ${nextService.title}` : "No Live Service Currently"}
                </p>
                {nextService && (
                  <p className="mt-1 text-sm text-neutral-500">
                    {nextService.day} at {nextService.time}
                    {nextService.streamType === "zoom" && " · Zoom Meeting"}
                    {nextService.streamType === "youtube" && " · YouTube Live"}
                    {nextService.streamType === "vimeo" && " · Vimeo Live"}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Currently streaming info ── */}
      {isLive && currentService && (
        <section className="rounded-2xl border border-gold/15 bg-[#111111] p-8">
          <h2 className="mb-5 font-serif text-2xl font-bold text-neutral-50">
            Currently Streaming
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-100">{currentService.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-neutral-400">{currentService.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {currentService.speaker}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {currentService.duration}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
                  <span className="text-sm font-semibold text-white">LIVE</span>
                </div>
                <p className="text-xs text-neutral-500">Started at {currentService.time}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Service Schedule ── */}
      <section className="rounded-2xl border border-white/[0.07] bg-[#111111] p-8">
        <h2 className="mb-6 font-serif text-2xl font-bold text-neutral-50">
          Service Schedule
        </h2>
        <div className="grid gap-4">
          {serviceSchedule.map((service) => {
            const isActive = isLive && currentService?.id === service.id;
            return (
              <div
                key={service.id}
                className={`rounded-xl border p-5 transition-all duration-200 ${
                  isActive
                    ? "border-gold/30 bg-gold/[0.06]"
                    : "border-white/[0.06] bg-[#161616] hover:border-white/[0.12]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-3 flex items-center gap-3">
                      <h3 className="font-serif text-lg font-semibold text-neutral-100">
                        {service.title}
                      </h3>
                      {isActive && (
                        <span className="flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-white">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                          Live
                        </span>
                      )}
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-neutral-500">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-neutral-600">
                      <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {service.day}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {service.time} · {service.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {service.speaker}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600">
                      {isActive ? "Watching" : "Next Stream"}
                    </p>
                    <p className={`mt-0.5 font-serif text-base font-bold ${isActive ? "text-gold" : "text-neutral-300"}`}>
                      {service.day}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── How to Watch ── */}
      <section className="rounded-2xl border border-white/[0.07] bg-[#111111] p-8">
        <h2 className="mb-8 font-serif text-2xl font-bold text-neutral-50">
          How to Watch
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: (
                <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              title: "Visit This Page",
              body: "Come to this page during service times to watch live.",
            },
            {
              icon: (
                <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              ),
              title: "YouTube Channel",
              body: "Subscribe to our YouTube channel for live notifications.",
            },
            {
              icon: (
                <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Set Reminders",
              body: "Add our service times to your calendar so you never miss a service.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/[0.08]">
                {item.icon}
              </div>
              <h3 className="mb-1.5 font-serif text-base font-semibold text-neutral-100">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
