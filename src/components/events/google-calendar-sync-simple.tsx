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

export function GoogleCalendarSync({ calendarId = "primary", apiKey, onEventsFetched }: GoogleCalendarSyncProps) {
  const { language } = useLanguage();
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState("");
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Check if Google Calendar API is available
  const isApiAvailable = apiKey && apiKey !== "your-google-calendar-api-key";

  // Fetch events from Google Calendar
  const fetchCalendarEvents = async () => {
    if (!isApiAvailable) {
      setSyncError(
        language === 'en' ? "Google Calendar API key not configured" :
        language === 'es' ? "Clave de API de Google Calendar no configurada" :
        language === 'fr' ? "Clé d'API Google Calendar non configurée" :
        language === 'nl' ? "Google Calendar API-sleutel niet geconfigureerd" : ""
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

      // Construct API URL
      const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&key=${apiKey}`;

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        // Transform Google Calendar events to our format
        const transformedEvents: GoogleCalendarEvent[] = data.items.map((item: any) => ({
          id: item.id,
          title: item.summary || "Untitled Event",
          description: item.description || "",
          startTime: item.start?.dateTime || item.start?.date || "",
          endTime: item.end?.dateTime || item.end?.date || "",
          location: item.location || "",
          category: categorizeEvent(item.summary || "", item.description || "")
        }));

        setIsConnected(true);
        setLastSyncTime(new Date());
        
        if (onEventsFetched) {
          onEventsFetched(transformedEvents);
        }
      } else {
        setIsConnected(true);
        setLastSyncTime(new Date());
        if (onEventsFetched) {
          onEventsFetched([]);
        }
      }

    } catch (error) {
      console.error("Error fetching Google Calendar events:", error);
      setSyncError(
        language === 'en' ? "Failed to sync with Google Calendar" :
        language === 'es' ? "Error al sincronizar con Google Calendar" :
        language === 'fr' ? "Échec de la synchronisation avec Google Calendar" :
        language === 'nl' ? "Synchronisatie met Google Calendar mislukt" : ""
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
    
    if (titleLower.includes("service") || titleLower.includes("worship") || titleLower.includes("sermon")) {
      return "Weekly Services";
    }
    if (titleLower.includes("bible") || titleLower.includes("study") || descLower.includes("bible")) {
      return "Bible Study";
    }
    if (titleLower.includes("prayer") || descLower.includes("prayer")) {
      return "Prayer Meeting";
    }
    if (titleLower.includes("youth") || descLower.includes("youth")) {
      return "Youth";
    }
    if (titleLower.includes("fellowship") || titleLower.includes("social") || descLower.includes("fellowship")) {
      return "Fellowship";
    }
    
    return "Other";
  };

  // Auto-sync on component mount if API is available
  useEffect(() => {
    if (isApiAvailable) {
      fetchCalendarEvents();
    }
  }, [isApiAvailable]);

  const getStatusText = () => {
    if (isSyncing) {
      return language === 'en' ? "Syncing..." :
             language === 'es' ? "Sincronizando..." :
             language === 'fr' ? "Synchronisation..." :
             language === 'nl' ? "Synchroniseren..." : "";
    }
    
    if (syncError) {
      return syncError;
    }
    
    if (isConnected && lastSyncTime) {
      return language === 'en' ? `Last synced: ${lastSyncTime.toLocaleTimeString()}` :
             language === 'es' ? `Última sincronización: ${lastSyncTime.toLocaleTimeString()}` :
             language === 'fr' ? `Dernière synchronisation: ${lastSyncTime.toLocaleTimeString()}` :
             language === 'nl' ? `Laatst gesynchroniseerd: ${lastSyncTime.toLocaleTimeString()}` : "";
    }
    
    if (!isApiAvailable) {
      return language === 'en' ? "Google Calendar not configured" :
             language === 'es' ? "Google Calendar no configurado" :
             language === 'fr' ? "Google Calendar non configuré" :
             language === 'nl' ? "Google Calendar niet geconfigureerd" : "";
    }
    
    return language === 'en' ? "Ready to sync" :
           language === 'es' ? "Listo para sincronizar" :
           language === 'fr' ? "Prêt à synchroniser" :
           language === 'nl' ? "Klaar om te synchroniseren" : "";
  };

  const dotColor = isConnected
    ? "bg-emerald-500"
    : syncError
    ? "bg-red-500"
    : isSyncing
    ? "bg-blue-400 animate-pulse"
    : "bg-neutral-600";

  const statusColor = isConnected
    ? "text-emerald-400"
    : syncError
    ? "text-red-400"
    : isSyncing
    ? "text-blue-400"
    : "text-neutral-500";

  if (!isApiAvailable) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-[#171717] p-6 text-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-neutral-600" />
          <span className="font-medium text-neutral-400">
            {language === 'en' ? "Google Calendar not configured" :
             language === 'es' ? "Google Calendar no configurado" :
             language === 'fr' ? "Google Calendar non configuré" :
             language === 'nl' ? "Google Calendar niet geconfigureerd" : ""}
          </span>
        </div>
        <ol className="space-y-2 text-xs leading-relaxed text-neutral-500">
          <li className="flex gap-2">
            <span className="flex-shrink-0 font-semibold text-gold/60">1.</span>
            Go to <span className="text-neutral-300">console.cloud.google.com</span> → New Project → Enable <span className="text-neutral-300">Google Calendar API</span>
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0 font-semibold text-gold/60">2.</span>
            Under <span className="text-neutral-300">Credentials</span> → Create Credentials → <span className="text-neutral-300">API key</span> — copy it
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0 font-semibold text-gold/60">3.</span>
            In Google Calendar → Settings → your calendar → <span className="text-neutral-300">Integrate calendar</span> → copy the Calendar ID
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0 font-semibold text-gold/60">4.</span>
            Make the calendar public: Settings → Access permissions → tick <span className="text-neutral-300">Make available to public</span>
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0 font-semibold text-gold/60">5.</span>
            Add both values to <span className="text-neutral-300">.env.local</span> and restart the dev server
          </li>
        </ol>
        <div className="mt-4 rounded-lg bg-black/30 px-4 py-3 font-mono text-[11px] text-neutral-500">
          <p>NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY=<span className="text-gold/60">your-api-key</span></p>
          <p>NEXT_PUBLIC_GOOGLE_CALENDAR_ID=<span className="text-gold/60">your-calendar-id</span></p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <div className={`flex items-center gap-2 ${statusColor}`}>
        <div className={`h-2 w-2 rounded-full ${dotColor}`} />
        <span>{getStatusText()}</span>
      </div>
      {!isSyncing && (
        <button
          onClick={fetchCalendarEvents}
          className="rounded-lg border border-white/[0.07] px-3 py-1 text-xs text-neutral-400 transition-colors hover:border-gold/25 hover:text-gold/80"
        >
          {language === 'en' ? "Sync Now" :
           language === 'es' ? "Sincronizar Ahora" :
           language === 'fr' ? "Synchroniser Maintenant" :
           language === 'nl' ? "Nu Synchroniseren" : ""}
        </button>
      )}
    </div>
  );
}
