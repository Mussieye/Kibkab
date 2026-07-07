"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

export function WatchButton() {
  const { t, language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const buttonText = language === 'en' ? "Watch Live" :
                     language === 'es' ? "Ver en Vivo" :
                     language === 'fr' ? "Regarder en Direct" : 
                     language === 'nl' ? "Live Kijken" : ""

  return (
    <Link
      href="/media/live-stream"
      className={`
        relative inline-flex items-center gap-2.5 px-6 py-3
        rounded-full font-semibold text-sm uppercase tracking-wide
        transition-all duration-300 ease-out
        transform hover:scale-105 active:scale-95
        shadow-lg hover:shadow-xl
        border-2 border-red-500/20
        ${isHovered 
          ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' 
          : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pulsing dot for live indicator */}
      <div className="relative">
        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
        <div className="relative w-2 h-2 bg-white rounded-full"></div>
      </div>
      
      {/* Play icon */}
      <svg 
        className="w-4 h-4" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M8 5v14l11-7z"/>
      </svg>
      
      {/* Button text */}
      <span className="font-medium">{buttonText}</span>
      
      {/* Subtle glow effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 rounded-full bg-red-400/20 blur-md -z-10"></div>
      )}
    </Link>
  );
}
