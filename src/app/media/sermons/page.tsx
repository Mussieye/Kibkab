"use client";

import { SEOLayout } from "@/components/seo/seo-layout";
import { useLanguage } from "@/contexts/language-context";
import { SermonMediaCard } from "@/components/sermons/sermon-media-card";
import { SermonUploadForm } from "@/components/sermons/sermon-upload-form";
import { useState } from "react";
import Image from "next/image";

function SermonsPageContent() {
  const { t, language } = useLanguage();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpeaker, setSelectedSpeaker] = useState("all");

  const mockSermons = [
    {
      id: "1",
      title: language === "en" ? "Finding Hope in Difficult Times" : language === "es" ? "Encontrando Esperanza en Tiempos Difíciles" : language === "fr" ? "Trouver l'Espoir dans les Temps Difficiles" : "Hoop Vinden in Moeilijke Tijden",
      speaker: "Pastor Michael Johnson",
      date: "2024-01-21",
      tags: ["hope", "faith", "encouragement"],
      media: { videoUrl: "/videos/sermons/2024/01-21-finding-hope.mp4", thumbnailUrl: "/images/sermons/thumbnail.jpg", photoUrls: [] },
    },
    {
      id: "2",
      title: language === "en" ? "The Transforming Power of Grace" : language === "es" ? "El Poder Transformador de la Gracia" : language === "fr" ? "Le Pouvoir Transformateur de la Grâce" : "De Transformerende Kracht van Genade",
      speaker: "Pastor Sarah Williams",
      date: "2024-01-14",
      tags: ["grace", "transformation", "redemption"],
      media: { videoUrl: "/videos/sermons/2024/01-14-transforming-grace.mp4", thumbnailUrl: "/images/sermons/thumbnail.jpg", photoUrls: [] },
    },
    {
      id: "3",
      title: language === "en" ? "Walking in Divine Purpose" : language === "es" ? "Caminando en Propósito Divino" : language === "fr" ? "Marcher selon le Divin Dessein" : "Lopen in Goddelijk Doel",
      speaker: "Pastor David Chen",
      date: "2024-01-07",
      tags: ["purpose", "calling", "direction"],
      media: { videoUrl: "/videos/sermons/2024/01-07-divine-purpose.mp4", thumbnailUrl: "/images/sermons/thumbnail.jpg", photoUrls: [] },
    },
    {
      id: "4",
      title: language === "en" ? "Building Strong Foundations" : language === "es" ? "Construyendo Fundamentos Fuertes" : language === "fr" ? "Construire des Fondations Solides" : "Sterke Funderingen Bouwen",
      speaker: "Pastor Emily Rodriguez",
      date: "2023-12-31",
      tags: ["foundation", "building", "community"],
      media: { videoUrl: "/videos/sermons/2023/12-31-strong-foundations.mp4", thumbnailUrl: "/images/sermons/thumbnail.jpg", photoUrls: [] },
    },
    {
      id: "5",
      title: language === "en" ? "The Joy of Serving Others" : language === "es" ? "La Alegría de Servir a Otros" : language === "fr" ? "La Joie de Servir les Autres" : "De Vreugde van het Dienen aan Anderen",
      speaker: "Pastor James Thompson",
      date: "2023-12-24",
      tags: ["service", "joy", "ministry"],
      media: { videoUrl: "/videos/sermons/2023/12-24-joy-of-serving.mp4", thumbnailUrl: "/images/sermons/thumbnail.jpg", photoUrls: [] },
    },
    {
      id: "6",
      title: language === "en" ? "Peace in the Storm" : language === "es" ? "Paz en la Tormenta" : language === "fr" ? "La Paix dans la Tempête" : "Vrede in de Storm",
      speaker: "Pastor Rachel Kim",
      date: "2023-12-17",
      tags: ["peace", "trials", "trust"],
      media: { videoUrl: "/videos/sermons/2023/12-17-peace-storm.mp4", thumbnailUrl: "/images/sermons/thumbnail.jpg", photoUrls: [] },
    },
  ];

  const allSpeakers = ["all", ...Array.from(new Set(mockSermons.map((s) => s.speaker)))];

  const filtered = mockSermons.filter((s) => {
    const q = searchTerm.toLowerCase();
    const matchSearch = !q || s.title.toLowerCase().includes(q) || s.speaker.toLowerCase().includes(q) || s.tags.some((t) => t.includes(q));
    const matchSpeaker = selectedSpeaker === "all" || s.speaker === selectedSpeaker;
    return matchSearch && matchSpeaker;
  });

  const handleUpload = async (data: any) => {
    await new Promise((r) => setTimeout(r, 2000));
    setShowUploadForm(false);
    alert("Sermon uploaded successfully! (Demo — files are not actually stored)");
  };

  return (
    <div className="min-h-screen bg-[#090909]">
      {/* ── Page Header ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0">
          <Image
            src="/ban.png"
            alt="Sermon Archive"
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
              Media Library
            </span>
            <span className="block h-px w-6 bg-gold/50" />
          </div>
          <h1 className="gold-metallic mb-5 font-serif text-5xl font-bold leading-tight lg:text-6xl xl:text-7xl">
            {t("sermonArchive")}
          </h1>
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
            <div className="h-1 w-1 rotate-45 border border-gold/40" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-neutral-500">
            {t("sermonDescription")}
          </p>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="inline-flex items-center gap-2 rounded-xl border border-gold/25 bg-gold/[0.07] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold transition-all duration-200 hover:border-gold/45 hover:bg-gold/[0.13]"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" />
            </svg>
            {showUploadForm ? "Cancel" : "Upload New Sermon"}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* ── Upload Form ── */}
        {showUploadForm && (
          <div className="mb-10">
            <SermonUploadForm onUpload={handleUpload} onCancel={() => setShowUploadForm(false)} />
          </div>
        )}

        {/* ── Filters ── */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative max-w-sm flex-1">
            <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search sermons, speakers, topics…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all focus:border-gold/30 focus:ring-1 focus:ring-gold/20"
            />
          </div>

          {/* Speaker filter */}
          <select
            value={selectedSpeaker}
            onChange={(e) => setSelectedSpeaker(e.target.value)}
            className="rounded-xl border border-white/[0.08] bg-[#111111] px-4 py-2.5 text-sm text-neutral-400 outline-none transition-all focus:border-gold/30 focus:ring-1 focus:ring-gold/20"
          >
            {allSpeakers.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All Speakers" : s}
              </option>
            ))}
          </select>
        </div>

        {/* ── Sermon Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((sermon) => (
              <SermonMediaCard
                key={sermon.id}
                id={sermon.id}
                title={sermon.title}
                speaker={sermon.speaker}
                date={sermon.date}
                tags={sermon.tags}
                media={sermon.media}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-neutral-600">No sermons match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SermonsPage() {
  return (
    <SEOLayout
      seoProps={{
        title: "Sermon Archive — Maranatha Christian Church",
        description: "Watch and listen to powerful biblical sermons from Maranatha Christian Church.",
        keywords: "sermons, biblical teaching, church messages, Christian preaching, sermon archive",
        canonical: "/media/sermons",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Sermon Archive",
            description: "Collection of biblical sermons and teachings from Maranatha Christian Church",
            url: "https://maranatha.church/media/sermons",
          },
        ],
      }}
    >
      <SermonsPageContent />
    </SEOLayout>
  );
}
