"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";

interface ChurchEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  rsvpLink: string;
  isRecurring: boolean;
  recurringPattern: string;
  tags: string[];
}

interface EventManagementProps {
  events?: ChurchEvent[];
  onEventAdd?: (event: ChurchEvent) => void;
  onEventEdit?: (event: ChurchEvent) => void;
  onEventDelete?: (eventId: string) => void;
  className?: string;
}

export function EventManagementSimple({ 
  events = [], 
  onEventAdd, 
  onEventEdit, 
  onEventDelete, 
  className = "" 
}: EventManagementProps) {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ChurchEvent | null>(null);
  const [formData, setFormData] = useState<Partial<ChurchEvent>>({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    category: "Weekly Services",
    rsvpLink: "",
    isRecurring: false,
    recurringPattern: "weekly",
    tags: [],
  });

  // Mock events for demonstration
  const mockEvents: ChurchEvent[] = [
    {
      id: "1",
      title: language === 'en' ? "Sunday Morning Service" : 
             language === 'es' ? "Servicio Dominical" : 
             language === 'fr' ? "Service du Dimanche" : 
             language === 'nl' ? "Zondagochtendienst" : "Sunday Morning Service",
      description: language === 'en' ? "Join us for uplifting worship and biblical teaching" : 
                   language === 'es' ? "Únase a nosotros para adoración y enseñanza bíblica" : 
                   language === 'fr' ? "Rejoignez-nous pour le culte et l'enseignement biblique" : 
                   language === 'nl' ? "Sluit u aan voor aanbidding en bijbelse onderwijs" : "Join us for uplifting worship and biblical teaching",
      date: "2024-01-28",
      startTime: "10:00",
      endTime: "11:30",
      location: language === 'en' ? "Main Sanctuary" : 
                language === 'es' ? "Santuario Principal" : 
                language === 'fr' ? "Sanctuaire Principal" : 
                language === 'nl' ? "Hoofdsanctuarium" : "Main Sanctuary",
      category: "Weekly Services",
      rsvpLink: "",
      isRecurring: true,
      recurringPattern: "weekly",
      tags: ["worship", "teaching"],
    },
    {
      id: "2",
      title: language === 'en' ? "Bible Study" : 
             language === 'es' ? "Estudio Bíblico" : 
             language === 'fr' ? "Étude Biblique" : 
             language === 'nl' ? "Bijbelstudie" : "Bible Study",
      description: language === 'en' ? "Weekly Bible study for all ages" : 
                   language === 'es' ? "Estudio bíblico semanal para todas las edades" : 
                   language === 'fr' ? "Étude biblique hebdomadaire pour tous les âges" : 
                   language === 'nl' ? "Wekelijkse bijbelstudie voor alle leeftijden" : "Weekly Bible study for all ages",
      date: "2024-01-31",
      startTime: "19:00",
      endTime: "20:30",
      location: language === 'en' ? "Fellowship Hall" : 
                language === 'es' ? "Salón de Compañerismo" : 
                language === 'fr' ? "Salle de Fraternité" : 
                language === 'nl' ? "Gemeenschapszaal" : "Fellowship Hall",
      category: "Bible Study",
      rsvpLink: "",
      isRecurring: true,
      recurringPattern: "weekly",
      tags: ["bible", "study", "fellowship"],
    },
  ];

  const displayEvents = events.length > 0 ? events : mockEvents;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Event submitted:", formData);
    setShowAddForm(false);
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      category: "Weekly Services",
      rsvpLink: "",
      isRecurring: false,
      recurringPattern: "weekly",
      tags: [],
    });
  };

  const handleEdit = (event: ChurchEvent) => {
    setEditingEvent(event);
    setFormData(event);
    setShowAddForm(true);
  };

  const handleDelete = (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      onEventDelete?.(eventId);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Weekly Services": "bg-royal-purple text-white",
      "Bible Study": "bg-gold text-royal-purple",
      "Youth": "bg-sky text-white",
      "Fellowship": "bg-burgundy text-white",
      "Outreach": "bg-green-600 text-white",
    };
    return colors[category] || "bg-gray-500 text-white";
  };

  return (
    <div className={`bg-white rounded-xl border border-royal-purple/20 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-royal-purple">
          {language === 'en' ? 'Event Management' :
           language === 'es' ? 'Gestión de Eventos' :
           language === 'fr' ? 'Gestion des Événements' :
           language === 'nl' ? 'Evenementbeheer' : 'Event Management'}
        </h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-royal-purple text-white rounded-lg hover:bg-royal-purple/90 transition-colors"
        >
          {language === 'en' ? 'Add Event' :
           language === 'es' ? 'Agregar Evento' :
           language === 'fr' ? 'Ajouter un Événement' :
           language === 'nl' ? 'Evenement Toevoegen' : 'Add Event'}
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {displayEvents.map((event) => (
          <div
            key={event.id}
            className="border border-royal-purple/20 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-royal-purple">{event.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>
                <p className="text-charcoal/80 mb-2">{event.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-charcoal/60">
                  <span>{event.date}</span>
                  <span>{event.startTime} - {event.endTime}</span>
                  <span>{event.location}</span>
                  {event.isRecurring && (
                    <span className="text-gold font-medium">
                      {language === 'en' ? 'Recurring' :
                       language === 'es' ? 'Recurrente' :
                       language === 'fr' ? 'Récurrent' :
                       language === 'nl' ? 'Terugkerend' : 'Recurring'}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="p-2 text-royal-purple hover:bg-royal-purple/10 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h4 className="text-xl font-semibold text-royal-purple mb-4">
              {editingEvent ? 
                (language === 'en' ? 'Edit Event' :
                 language === 'es' ? 'Editar Evento' :
                 language === 'fr' ? 'Modifier l\'Événement' :
                 language === 'nl' ? 'Evenement Bewerken' : 'Edit Event') :
                (language === 'en' ? 'Add New Event' :
                 language === 'es' ? 'Agregar Nuevo Evento' :
                 language === 'fr' ? 'Ajouter un Nouvel Événement' :
                 language === 'nl' ? 'Nieuw Evenement Toevoegen' : 'Add New Event')
              }
            </h4>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">
                  {language === 'en' ? 'Event Title' :
                   language === 'es' ? 'Título del Evento' :
                   language === 'fr' ? 'Titre de l\'Événement' :
                   language === 'nl' ? 'Evenement Titel' : 'Event Title'}
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">
                  {language === 'en' ? 'Description' :
                   language === 'es' ? 'Descripción' :
                   language === 'fr' ? 'Description' :
                   language === 'nl' ? 'Beschrijving' : 'Description'}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    {language === 'en' ? 'Date' :
                     language === 'es' ? 'Fecha' :
                     language === 'fr' ? 'Date' :
                     language === 'nl' ? 'Datum' : 'Date'}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    {language === 'en' ? 'Category' :
                     language === 'es' ? 'Categoría' :
                     language === 'fr' ? 'Catégorie' :
                     language === 'nl' ? 'Categorie' : 'Category'}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    <option value="Weekly Services">
                      {language === 'en' ? 'Weekly Services' :
                       language === 'es' ? 'Servicios Semanales' :
                       language === 'fr' ? 'Services Hebdomadaires' :
                       language === 'nl' ? 'Wekelijkse Diensten' : 'Weekly Services'}
                    </option>
                    <option value="Bible Study">
                      {language === 'en' ? 'Bible Study' :
                       language === 'es' ? 'Estudio Bíblico' :
                       language === 'fr' ? 'Étude Biblique' :
                       language === 'nl' ? 'Bijbelstudie' : 'Bible Study'}
                    </option>
                    <option value="Youth">
                      {language === 'en' ? 'Youth' :
                       language === 'es' ? 'Juventud' :
                       language === 'fr' ? 'Jeunesse' :
                       language === 'nl' ? 'Jeugd' : 'Youth'}
                    </option>
                    <option value="Fellowship">
                      {language === 'en' ? 'Fellowship' :
                       language === 'es' ? 'Compañerismo' :
                       language === 'fr' ? 'Fraternité' :
                       language === 'nl' ? 'Gemeenschap' : 'Fellowship'}
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-royal-purple text-white rounded-lg hover:bg-royal-purple/90 transition-colors"
                >
                  {editingEvent ? 
                    (language === 'en' ? 'Update Event' :
                     language === 'es' ? 'Actualizar Evento' :
                     language === 'fr' ? 'Mettre à Jour l\'Événement' :
                     language === 'nl' ? 'Evenement Bijwerken' : 'Update Event') :
                    (language === 'en' ? 'Create Event' :
                     language === 'es' ? 'Crear Evento' :
                     language === 'fr' ? 'Créer l\'Événement' :
                     language === 'nl' ? 'Evenement Maken' : 'Create Event')
                  }
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingEvent(null);
                    setFormData({
                      title: "",
                      description: "",
                      date: "",
                      startTime: "",
                      endTime: "",
                      location: "",
                      category: "Weekly Services",
                      rsvpLink: "",
                      isRecurring: false,
                      recurringPattern: "weekly",
                      tags: [],
                    });
                  }}
                  className="flex-1 px-4 py-2 border border-royal-purple text-royal-purple rounded-lg hover:bg-royal-purple/10 transition-colors"
                >
                  {language === 'en' ? 'Cancel' :
                   language === 'es' ? 'Cancelar' :
                   language === 'fr' ? 'Annuler' :
                   language === 'nl' ? 'Annuleren' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
