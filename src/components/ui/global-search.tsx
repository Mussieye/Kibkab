"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

interface SearchResult {
  id: string;
  type: "sermon" | "event" | "blog" | "page";
  title: string;
  description: string;
  url: string;
  category?: string;
  date?: string;
  speaker?: string;
}

export function GlobalSearch() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock search data - in a real app, this would come from your CMS or API
  const mockSearchData: SearchResult[] = [
    {
      id: "1",
      type: "sermon",
      title: language === 'en' ? "Finding Hope in Difficult Times" :
             language === 'es' ? "Encontrando Esperanza en Tiempos Difíciles" :
             language === 'fr' ? "Trouver l'Espoir dans les Temps Difficiles" : "Hoop Vinden in Moeilijke Tijden",
      description: language === 'en' ? "A powerful message about finding hope through faith during challenging seasons of life." :
                   language === 'es' ? "Un mensaje poderoso sobre encontrar esperanza a través de la fe durante temporadas desafiantes de la vida." :
                   language === 'fr' ? "Un message puissant sur la façon de trouver l'espoir par la foi pendant les saisons difficiles de la vie." :
                   language === 'nl' ? "Een krachtige boodschap over het vinden van hoop door geloof tijdens uitdagende seizoenen van het leven." : "",
      url: "/media/sermons",
      category: "sermon",
      date: "2024-01-21",
      speaker: "Pastor Michael Johnson"
    },
    {
      id: "2",
      type: "event",
      title: language === 'en' ? "Sunday Morning Service" :
             language === 'es' ? "Servicio Dominical de la Mañana" :
             language === 'fr' ? "Service du Dimanche Matin" : "Zondagochtendienst",
      description: language === 'en' ? "Join us for uplifting worship, biblical teaching, and fellowship." :
                   language === 'es' ? "Únase a nosotros para adoración edificante, enseñanza bíblica y comunión." :
                   language === 'fr' ? "Rejoignez-nous pour un culte édifiant, un enseignement biblique et la communion." :
                   language === 'nl' ? "Sluit u aan voor verheffende aanbidding, bijbelse onderwijs en gemeenschap." : "",
      url: "/events",
      category: "weekly service",
      date: "2024-01-28"
    },
    {
      id: "3",
      type: "page",
      title: language === 'en' ? "About Us" :
             language === 'es' ? "Acerca de Nosotros" :
             language === 'fr' ? "À Propos de Nous" : "Over Ons",
      description: language === 'en' ? "Learn more about Maranatha Christian Church, our beliefs, and our mission." :
                   language === 'es' ? "Conozca más sobre la Iglesia Cristiana Maranatha, nuestras creencias y nuestra misión." :
                   language === 'fr' ? "En savoir plus sur l'Église Chrétienne Maranatha, nos croyances et notre mission." :
                   language === 'nl' ? "Leer meer over de Maranatha Christelijke Kerk, onze overtuigingen en onze missie." : "",
      url: "/about",
      category: "page"
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      const filteredResults = mockSearchData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setResults(filteredResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, mockSearchData]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sermon":
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
      case "event":
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>;
      case "blog":
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>;
      default:
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "sermon":
        return language === 'en' ? "Sermon" :
               language === 'es' ? "Sermón" :
               language === 'fr' ? "Prédication" : "Preek";
      case "event":
        return language === 'en' ? "Event" :
               language === 'es' ? "Evento" :
               language === 'fr' ? "Événement" : "Evenement";
      case "blog":
        return language === 'en' ? "Blog" :
               language === 'es' ? "Blog" :
               language === 'fr' ? "Blog" : "Blog";
      default:
        return language === 'en' ? "Page" :
               language === 'es' ? "Página" :
               language === 'fr' ? "Page" : "Pagina";
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-royal-purple/20 rounded-lg hover:bg-royal-purple/5 transition-colors"
        aria-label={language === 'en' ? "Search" : language === 'es' ? "Buscar" : language === 'fr' ? "Rechercher" : "Zoeken"}
      >
        <svg className="w-5 h-5 text-royal-purple" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <span className="text-charcoal/80">
          {language === 'en' ? "Search..." :
           language === 'es' ? "Buscar..." :
           language === 'fr' ? "Rechercher..." : "Zoeken..."}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full md:w-96 bg-white rounded-xl border border-royal-purple/20 shadow-xl z-50">
          <div className="p-4 border-b border-royal-purple/10">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  language === 'en' ? "Search sermons, events, and more..." :
                  language === 'es' ? "Buscar sermones, eventos y más..." :
                  language === 'fr' ? "Rechercher des sermons, des événements et plus..." :
                  language === 'nl' ? "Zoek preken, evenementen en meer..." : ""
                }
                className="w-full pl-10 pr-4 py-2 border border-royal-purple/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple/50 focus:border-transparent"
                autoFocus
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-royal-purple/50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center">
                <svg className="w-8 h-8 animate-spin mx-auto text-royal-purple" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416"/>
                </svg>
              </div>
            ) : searchTerm.length < 2 ? (
              <div className="p-8 text-center text-charcoal/60">
                <svg className="w-12 h-12 mx-auto mb-4 text-royal-purple/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <p>
                  {language === 'en' ? "Type at least 2 characters to search" :
                   language === 'es' ? "Escribe al menos 2 caracteres para buscar" :
                   language === 'fr' ? "Tapez au moins 2 caractères pour rechercher" :
                   language === 'nl' ? "Typ minimaal 2 karakters om te zoeken" : ""}
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-charcoal/60">
                <p>
                  {language === 'en' ? "No results found" :
                   language === 'es' ? "No se encontraron resultados" :
                   language === 'fr' ? "Aucun résultat trouvé" : "Geen resultaten gevonden"}
                </p>
              </div>
            ) : (
              <div className="p-2">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    className="block p-3 hover:bg-royal-purple/5 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-royal-purple/10 rounded-lg flex items-center justify-center text-royal-purple">
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-royal-purple uppercase tracking-wide">
                            {getTypeLabel(result.type)}
                          </span>
                          {result.date && (
                            <span className="text-xs text-charcoal/60">
                              {new Date(result.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <h4 className="font-medium text-charcoal truncate">{result.title}</h4>
                        <p className="text-sm text-charcoal/70 line-clamp-2">{result.description}</p>
                        {result.speaker && (
                          <p className="text-xs text-charcoal/60 mt-1">
                            {language === 'en' ? "Speaker:" :
                             language === 'es' ? "Orador:" :
                             language === 'fr' ? "Orateur:" : "Spreker:"} {result.speaker}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
