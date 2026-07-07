"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";

interface GoogleCalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location?: string;
  category: string;
}

interface GoogleCalendarSyncProps {
  calendarId?: string;
  apiKey?: string;
  onEventsFetched?: (events: GoogleCalendarEvent[]) => void;
}

export function GoogleCalendarSync({ 
  calendarId = "primary", 
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY,
  onEventsFetched 
}: GoogleCalendarSyncProps) {
  const { t, language } = useLanguage();
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [syncError, setSyncError] = useState("");
  const [events, setEvents] = useState<GoogleCalendarEvent[]>([]);

  // Check if Google Calendar API is available
  const isApiAvailable = apiKey && apiKey !== "your-google-calendar-api-key";

  // Fetch events from Google Calendar
  const fetchCalendarEvents = async () => {
    if (!isApiAvailable) {
      setSyncError(
        language === 'en' ? "Google Calendar API key not configured" :
        language === 'es' ? "Clave de API de Google Calendar no configurada" :
        language === 'fr' ? "Clé d'API Google Calendar non configurée" :
        "Google Calendar API-sleutel niet geconfigureerd"
      );
      return;
    }

    setIsSyncing(true);
    setSyncError("");

    try {
      // Calculate time range (next 30 days)
      const now = new Date();
      const timeMin = now.toISOString();
      const timeMax = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

      // Fetch events from Google Calendar API
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?` +
        `timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&` +
        `key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform Google Calendar events to our format
      const transformedEvents: GoogleCalendarEvent[] = data.items
        .filter((item: any) => item.status === 'confirmed' && item.summary)
        .map((item: any) => ({
          id: item.id,
          title: item.summary,
          description: item.description || "",
          startTime: item.start.dateTime || item.start.date,
          endTime: item.end.dateTime || item.end.date,
          location: item.location,
          category: categorizeEvent(item.summary, item.description)
        }));

      setEvents(transformedEvents);
      setIsConnected(true);
      setLastSync(new Date());
      
      // Pass events to parent component
      if (onEventsFetched) {
        onEventsFetched(transformedEvents);
      }

    } catch (error) {
      console.error("Error fetching Google Calendar events:", error);
      setSyncError(
        language === 'en' ? "Failed to sync with Google Calendar" :
        language === 'es' ? "Error al sincronizar con Google Calendar" :
        language === 'fr' ? "Échec de la synchronisation avec Google Calendar" :
        "Synchronisatie met Google Calendar mislukt"
      );
      setIsConnected(false);
    } finally {
      setIsSyncing(false);
    }
  };

  // Categorize events based on title and description
  const categorizeEvent = (title: string, description: string): string => {
    const titleLower = title.toLowerCase();
    const descLower = description.toLowerCase();

    if (titleLower.includes("service") || titleLower.includes("worship") || descLower.includes("worship")) {
      return "Weekly Services";
    } else if (titleLower.includes("bible") || titleLower.includes("study") || descLower.includes("bible")) {
      return "Bible Study";
    } else if (titleLower.includes("youth") || descLower.includes("youth")) {
      return "Youth";
    } else if (titleLower.includes("conference") || descLower.includes("conference")) {
      return "Conferences";
    } else if (titleLower.includes("outreach") || descLower.includes("outreach")) {
      return "Outreach";
    } else {
      return "Other";
    }
  };

  // Manual sync trigger
  const handleManualSync = () => {
    fetchCalendarEvents();
  };

  // Auto-sync on component mount if API is available
  useEffect(() => {
    if (isApiAvailable) {
      fetchCalendarEvents();
    }
  }, [isApiAvailable]);

  return (
    <div className="bg-white rounded-xl border border-royal-purple/20 p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-royal-purple to-burgundy rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-royal-purple">
              {language === 'en' ? "Google Calendar Sync" :
               language === 'es' ? "Sincronización Google Calendar" :
               language === 'fr' ? "Synchronisation Google Calendar" :
               "Google Calendar Synchronisatie"}
            </h3>
            <p className="text-sm text-charcoal/60">
              {language === 'en' ? "Automatically sync church events" :
               language === 'es' ? "Sincronizar eventos de iglesia automáticamente" :
               language === 'fr' ? "Synchroniser automatiquement les événements de l'église" :
               "Kerk evenementen automatisch synchroniseren"}
            </p>
          </div>
        </div>
        
        <div className={`w-3 h-3 rounded-full ${
          isConnected ? "bg-green-500" : "bg-gray-300"
        }`} />
      </div>

      {/* Status */}
      <div className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-3 bg-royal-purple/5 rounded-lg">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            )}
            <span className="text-sm font-medium text-charcoal">
              {isConnected ? (
                language === 'en' ? "Connected to Google Calendar" :
                language === 'es' ? "Conectado a Google Calendar" :
                language === 'fr' ? "Connecté à Google Calendar" :
                "Verbonden met Google Calendar"
              ) : (
                !isApiAvailable ? (
                  language === 'en' ? "API Key Required" :
                  language === 'es' ? "Clave de API Requerida" :
                  language === 'fr' ? "Clé API Requise" :
                  "API-sleutel Vereist"
                ) : (
                  language === 'en' ? "Not Connected" :
                  language === 'es' ? "No Conectado" :
                  language === 'fr' ? "Non Connecté" :
                  "Niet Verbonden"
                )
              )}
            </span>
          </div>
          
          <button
            onClick={handleManualSync}
            disabled={!isApiAvailable || isSyncing}
            className="px-3 py-1 bg-royal-purple text-white text-sm rounded-lg hover:bg-royal-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            {isSyncing ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416"/>
                </svg>
                {language === 'en' ? "Syncing..." :
                 language === 'es' ? "Sincronizando..." :
                 language === 'fr' ? "Synchronisation..." :
                 "Synchroniseren..."}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
                </svg>
                {language === 'en' ? "Sync Now" :
                 language === 'es' ? "Sincronizar Ahora" :
                 language === 'fr' ? "Synchroniser Maintenant" :
                 "Nu Synchroniseren"}
              </>
            )}
          </button>
        </div>

        {/* Last Sync Info */}
        {lastSync && (
          <div className="text-sm text-charcoal/60">
            {language === 'en' ? "Last sync:" :
             language === 'es' ? "Última sincronización:" :
             language === 'fr' ? "Dernière synchronisation:" :
             "Laatste synchronisatie:"}{" "}
            {lastSync.toLocaleString()}
          </div>
        )}

        {/* Events Count */}
        {events.length > 0 && (
          <div className="text-sm text-charcoal/60">
            {language === 'en' ? "Events synced:" :
             language === 'es' ? "Eventos sincronizados:" :
             language === 'fr' ? "Événements synchronisés:" :
             "Evenementen gesynchroniseerd:"}{" "}
            {events.length}
          </div>
        )}

        {/* Error Message */}
        {syncError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{syncError}</p>
          </div>
        )}

        {/* Setup Instructions */}
        {!isApiAvailable && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-medium text-amber-800 mb-2">
              {language === 'en' ? "Setup Required" :
               language === 'es' ? "Configuración Requerida" :
               language === 'fr' ? "Configuration Requise" :
               "Installatie Vereist"}
            </h4>
            <ol className="text-sm text-amber-700 space-y-1 list-decimal list-inside">
              <li>
                {language === 'en' ? "Get Google Calendar API key from Google Cloud Console" :
                 language === 'es' ? "Obtén clave de API de Google Calendar desde Google Cloud Console" :
                 language === 'fr' ? "Obtenez la clé API Google Calendar depuis Google Cloud Console" :
                 "Krijg Google Calendar API-sleutel van Google Cloud Console"}
              </li>
              <li>
                {language === 'en' ? "Share your calendar with public access" :
                 language === 'es' ? "Comparte tu calendario con acceso público" :
                 language === 'fr' ? "Partagez votre calendrier avec accès public" :
                 "Deel je kalender met publieke toegang"}
              </li>
              <li>
                {language === 'en' ? "Add API key to environment variables" :
                 language === 'es' ? "Agrega clave de API a variables de entorno" :
                 language === 'fr' ? "Ajoutez la clé API aux variables d'environnement" :
                 "Voeg API-sleutel toe aan omgevingsvariabelen"}
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
