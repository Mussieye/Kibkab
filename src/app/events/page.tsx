"use client";

import { useLanguage } from "@/contexts/language-context";
import { SEOLayout } from "@/components/seo/seo-layout";
import { GoogleCalendarSync } from "@/components/events/google-calendar-sync-simple";
import { useState } from "react";
import Image from "next/image";

export default function EventsPage() {
  const { language } = useLanguage();
  const [googleCalendarEvents, setGoogleCalendarEvents] = useState<any[]>([]);
  const [showCalendarSync, setShowCalendarSync] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Events");

  const handleGoogleCalendarEvents = (events: any[]) => {
    setGoogleCalendarEvents(events);
  };

  const events = [
    {
      id: "1",
      title: language === "en" ? "Sunday Morning Service" : language === "es" ? "Servicio Dominical de la Mañana" : language === "fr" ? "Service du Dimanche Matin" : "Zondagochtendienst",
      date: "2026-05-04",
      day: "04",
      month: "May",
      time: "10:00 AM",
      location: language === "en" ? "Main Sanctuary" : language === "es" ? "Santuario Principal" : language === "fr" ? "Sanctuaire Principal" : "Hoofdsanctuarium",
      description: language === "en" ? "Join us for uplifting worship, biblical teaching, and fellowship." : language === "es" ? "Únase a nosotros para adoración edificante, enseñanza bíblica y comunión." : language === "fr" ? "Rejoignez-nous pour un culte édifiant, un enseignement biblique et la communion." : "Sluit u aan voor verheffende aanbidding, bijbelse onderwijs en gemeenschap.",
      category: "Weekly Services",
    },
    {
      id: "2",
      title: language === "en" ? "Bible Study: Romans" : language === "es" ? "Estudio Bíblico: Romanos" : language === "fr" ? "Étude Biblique: Romains" : "Bijbelstudie: Romeinen",
      date: "2026-05-07",
      day: "07",
      month: "May",
      time: "7:00 PM",
      location: language === "en" ? "Fellowship Hall" : language === "es" ? "Salón de Comunión" : language === "fr" ? "Salle de Communion" : "Gemeenschapszaal",
      description: language === "en" ? "Deep dive into Paul's letter to the Romans. All are welcome!" : language === "es" ? "Inmersión profunda en la carta de Pablo a los Romanos. ¡Todos son bienvenidos!" : language === "fr" ? "Plongée profonde dans la lettre de Paul aux Romains. Tous sont les bienvenus!" : "Diepe duik in Paulus' brief aan de Romeinen. Iedereen is welkom!",
      category: "Bible Study",
    },
    {
      id: "3",
      title: language === "en" ? "Youth Night" : language === "es" ? "Noche de Jóvenes" : language === "fr" ? "Soirée Jeunesse" : "JongerenAvond",
      date: "2026-05-10",
      day: "10",
      month: "May",
      time: "6:30 PM",
      location: language === "en" ? "Youth Centre" : language === "es" ? "Centro Juvenil" : language === "fr" ? "Centre de Jeunesse" : "Jongerencentrum",
      description: language === "en" ? "A vibrant evening of worship, games, and community for young people." : language === "es" ? "Una noche vibrante de adoración, juegos y comunidad para jóvenes." : language === "fr" ? "Une soirée vibrante de culte, jeux et communauté pour les jeunes." : "Een levendige avond van aanbidding, spellen en gemeenschap voor jongeren.",
      category: "Youth",
    },
    {
      id: "4",
      title: language === "en" ? "Prayer & Fasting" : language === "es" ? "Oración y Ayuno" : language === "fr" ? "Prière et Jeûne" : "Gebed en Vasten",
      date: "2026-05-14",
      day: "14",
      month: "May",
      time: "6:00 AM",
      location: language === "en" ? "Main Sanctuary" : language === "es" ? "Santuario Principal" : language === "fr" ? "Sanctuaire Principal" : "Hoofdsanctuarium",
      description: language === "en" ? "A corporate morning of prayer and seeking God together." : language === "es" ? "Una mañana corporativa de oración y búsqueda de Dios juntos." : language === "fr" ? "Une matinée corporative de prière et de recherche de Dieu ensemble." : "Een gezamenlijke ochtend van gebed en het zoeken van God.",
      category: "Prayer",
    },
    {
      id: "5",
      title: language === "en" ? "Women's Fellowship" : language === "es" ? "Comunión de Mujeres" : language === "fr" ? "Communion des Femmes" : "Vrouwengemeenschap",
      date: "2026-05-17",
      day: "17",
      month: "May",
      time: "10:00 AM",
      location: language === "en" ? "Conference Room" : language === "es" ? "Sala de Conferencias" : language === "fr" ? "Salle de Conférence" : "Conferentiezaal",
      description: language === "en" ? "Encouragement, prayer, and community for the women of our church." : language === "es" ? "Aliento, oración y comunidad para las mujeres de nuestra iglesia." : language === "fr" ? "Encouragement, prière et communauté pour les femmes de notre église." : "Aanmoediging, gebed en gemeenschap voor de vrouwen van onze kerk.",
      category: "Fellowship",
    },
    {
      id: "6",
      title: language === "en" ? "Community Outreach" : language === "es" ? "Alcance Comunitario" : language === "fr" ? "Sensibilisation Communautaire" : "Gemeenschapsbereik",
      date: "2026-05-24",
      day: "24",
      month: "May",
      time: "9:00 AM",
      location: language === "en" ? "City Centre" : language === "es" ? "Centro de la Ciudad" : language === "fr" ? "Centre-Ville" : "Stadscentrum",
      description: language === "en" ? "Serving our city together — food drives, outreach, and sharing God's love." : language === "es" ? "Sirviendo a nuestra ciudad juntos: colectas de alimentos, alcance y compartiendo el amor de Dios." : language === "fr" ? "Servir notre ville ensemble — collectes de nourriture, sensibilisation et partage de l'amour de Dieu." : "Onze stad samen dienen — voedselinzameling, bereik en het delen van Gods liefde.",
      category: "Outreach",
    },
  ];

  const categories = ["All Events", "Weekly Services", "Bible Study", "Youth", "Prayer", "Fellowship", "Outreach"];
  const filtered = activeFilter === "All Events" ? events : events.filter(e => e.category === activeFilter);

  return (
    <SEOLayout
      seoProps={{
        title: "Church Events — Maranatha Christian Church",
        description: "Join us for worship services, Bible studies, youth activities, and community events at Maranatha Christian Church.",
        keywords: "church events, worship services, Bible study, youth activities, community outreach",
      }}
    >
      <div className="min-h-screen bg-[#090909]">
        {/* ── Hero Header ── */}
        <div className="relative overflow-hidden border-b border-white/[0.06]">

          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/new.png"
              alt="Church Events"
              fill
              priority
              quality={90}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/35" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 py-7 text-center lg:py-10">

            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-black/45 px-5 py-2 backdrop-blur-sm">
              <span className="block h-px w-6 bg-gold/50" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/90">
                What&rsquo;s On
              </span>
              <span className="block h-px w-6 bg-gold/50" />
            </div>

            <h1 className="gold-metallic mb-5 font-serif text-5xl font-bold leading-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] md:text-6xl lg:text-7xl">
              {language === "en" ? "Church Events" : language === "es" ? "Eventos de la Iglesia" : language === "fr" ? "Événements de l'Église" : language === "am" ? "የቤተ ክርስቲያን ዝግጅቶች" : language === "ti" ? "ናይ ቤተ ክርስቲያን ምርኢታት" : "Kerk Evenementen"}
            </h1>

            <div className="mb-7 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
              <div className="h-1.5 w-1.5 rotate-45 border border-gold/55" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
            </div>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-300 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              {language === "en"
                ? "Join us for worship services, fellowship gatherings, and special events throughout the year"
                : language === "es"
                ? "Únase a nosotros para servicios de adoración, reuniones de comunión y eventos especiales durante todo el año"
                : language === "fr"
                ? "Rejoignez-nous pour les services de culte, les rassemblements de communion et les événements spéciaux tout au long de l'année"
                : language === "am"
                ? "ለአምልኮ አገልግሎቶች፥ የኅብረት ስብሰባዎች እና ልዩ ዝግጅቶች ይቀላቀሉን"
                : language === "ti"
                ? "ንኣምልኾ ኣገልግሎታት፡ ናይ ሕብረት ኣኼባታት፡ ፍሉይ ምርኢታት ሓቡኑ"
                : "Sluit u aan voor erediensten, gemeenschapsbijeenkomsten en speciale evenementen"}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-16">
          {/* ── Category Filters ── */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={activeFilter === cat ? { background: "linear-gradient(90deg,#a8844a 0%,#e0c28e 40%,#ffe57a 55%,#e0c28e 70%,#a8844a 100%)" } : undefined}
                className={`rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                  activeFilter === cat
                    ? "text-neutral-950 shadow-[0_0_24px_rgba(201,169,110,0.25)]"
                    : "border border-white/[0.08] text-neutral-500 hover:border-gold/25 hover:text-gold/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Events Grid ── */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <div
                key={event.id}
                className="group flex flex-col rounded-2xl border border-white/[0.07] bg-[#111111] p-6 transition-all duration-300 hover:border-gold/20 hover:bg-[#141414]"
              >
                {/* Date + Category row */}
                <div className="mb-5 flex items-start justify-between">
                  <div className="text-center">
                    <p className="gold-metallic font-serif text-4xl font-bold leading-none">
                      {event.day}
                    </p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                      {event.month}
                    </p>
                  </div>
                  <span className="rounded-full bg-gold/[0.08] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gold/70">
                    {event.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-2 font-serif text-xl font-semibold leading-snug text-neutral-100">
                  {event.title}
                </h3>

                {/* Meta */}
                <div className="mb-4 space-y-1.5">
                  <p className="flex items-center gap-2 text-xs text-neutral-500">
                    <svg className="h-3.5 w-3.5 flex-shrink-0 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-neutral-500">
                    <svg className="h-3.5 w-3.5 flex-shrink-0 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </p>
                </div>

                {/* Description */}
                <p className="mb-6 flex-grow text-sm leading-relaxed text-neutral-600">
                  {event.description}
                </p>

                {/* Register button */}
                <button className="w-full rounded-xl border border-gold/20 bg-gold/[0.06] py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold transition-all duration-200 hover:border-gold/35 hover:bg-gold/[0.12]">
                  {language === "en" ? "Register" : language === "es" ? "Registrarse" : language === "fr" ? "S'inscrire" : "Inschrijven"}
                </button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-neutral-600">No events in this category yet.</p>
            </div>
          )}

          {/* ── Google Calendar Sync ── */}
          <div className="mt-20 rounded-2xl border border-white/[0.07] bg-[#111111] p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/60">
                  Admin
                </p>
                <h2 className="font-serif text-2xl font-semibold text-neutral-100">
                  {language === "en" ? "Calendar Management" : language === "es" ? "Gestión de Calendario" : language === "fr" ? "Gestion du Calendrier" : "Kalender Beheer"}
                </h2>
              </div>
              <button
                onClick={() => setShowCalendarSync(!showCalendarSync)}
                className="rounded-xl border border-white/[0.08] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400 transition-all duration-200 hover:border-gold/25 hover:text-gold/80"
              >
                {showCalendarSync
                  ? (language === "en" ? "Hide Sync" : language === "es" ? "Ocultar" : language === "fr" ? "Masquer" : "Verberg")
                  : (language === "en" ? "Show Sync" : language === "es" ? "Mostrar" : language === "fr" ? "Afficher" : "Toon")}
              </button>
            </div>

            {showCalendarSync && (
              <GoogleCalendarSync
                onEventsFetched={handleGoogleCalendarEvents}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}
                calendarId={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "primary"}
              />
            )}

            {googleCalendarEvents.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  {language === "en" ? "Synced Events" : language === "es" ? "Eventos Sincronizados" : language === "fr" ? "Événements Synchronisés" : "Gesynchroniseerde Evenementen"}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {googleCalendarEvents.map((event) => (
                    <div key={event.id} className="rounded-xl border border-white/[0.06] bg-[#171717] p-4">
                      <h4 className="mb-2 font-medium text-neutral-200">{event.title}</h4>
                      <div className="space-y-1 text-sm text-neutral-500">
                        <p><span className="text-neutral-400">Date:</span> {new Date(event.startTime).toLocaleDateString()}</p>
                        <p><span className="text-neutral-400">Time:</span> {new Date(event.startTime).toLocaleTimeString()}</p>
                        {event.location && <p><span className="text-neutral-400">Location:</span> {event.location}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SEOLayout>
  );
}
