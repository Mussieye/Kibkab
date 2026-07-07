"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";

interface CalendarUIProps {
  events?: any[];
  onEventClick?: (event: any) => void;
  className?: string;
}

export function CalendarUISimple({ events = [], onEventClick, className = "" }: CalendarUIProps) {
  const { language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Simple month navigation
  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  // Format month name
  const formatMonth = (date: Date) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  return (
    <div className={`bg-white rounded-xl border border-royal-purple/20 p-6 ${className}`}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth("prev")}
          className="p-2 rounded-lg hover:bg-royal-purple/10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h3 className="text-xl font-semibold text-royal-purple">
          {formatMonth(currentDate)}
        </h3>
        
        <button
          onClick={() => navigateMonth("next")}
          className="p-2 rounded-lg hover:bg-royal-purple/10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="text-center text-sm font-medium text-charcoal/60 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="h-10" />
        ))}
        
        {/* Days of the month */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isToday = new Date().getDate() === day && 
                          new Date().getMonth() === currentDate.getMonth() && 
                          new Date().getFullYear() === currentDate.getFullYear();
          
          return (
            <div
              key={day}
              className={`h-10 flex items-center justify-center rounded-lg text-sm cursor-pointer transition-colors
                ${isToday ? 'bg-gold text-white font-semibold' : 'hover:bg-royal-purple/10'}`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Events List */}
      {events.length > 0 && (
        <div className="mt-6 pt-6 border-t border-royal-purple/20">
          <h4 className="font-semibold text-royal-purple mb-3">
            {language === 'en' ? 'Upcoming Events' :
             language === 'es' ? 'Próximos Eventos' :
             language === 'fr' ? 'Événements à Venir' :
             language === 'nl' ? 'Aankomende Evenementen' : ''}
          </h4>
          <div className="space-y-2">
            {events.slice(0, 3).map((event, index) => (
              <div
                key={index}
                className="p-3 bg-off-white rounded-lg cursor-pointer hover:bg-royal-purple/5 transition-colors"
                onClick={() => onEventClick?.(event)}
              >
                <div className="font-medium text-royal-purple">{event.title}</div>
                <div className="text-sm text-charcoal/60">{event.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
