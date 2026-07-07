"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";
import type { Language } from "@/contexts/language-context";

export function LanguageDropdown() {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find current language info
  const currentLanguage = availableLanguages.find(lang => lang.code === language) || availableLanguages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          inline-flex items-center gap-2 px-4 py-2
          rounded-full border border-royal-purple/20 
          bg-white shadow-sm hover:shadow-md
          transition-all duration-200
          font-medium text-sm
          ${isOpen ? 'ring-2 ring-royal-purple/50 border-royal-purple/40' : 'hover:border-royal-purple/30'}
        `}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* Current language flag and name */}
        <span className="text-base">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-royal-purple">{currentLanguage.name}</span>
        <span className="sm:hidden text-royal-purple">{currentLanguage.code.toUpperCase()}</span>
        
        {/* Dropdown arrow */}
        <svg 
          className={`
            w-4 h-4 text-royal-purple transition-transform duration-200
            ${isOpen ? 'rotate-180' : ''}
          `}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-50 min-w-[200px]">
          <div className="rounded-xl border border-royal-purple/20 bg-white shadow-lg overflow-hidden">
            <div className="py-1" role="listbox">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`
                    w-full px-4 py-3 text-left flex items-center gap-3
                    transition-colors duration-150
                    ${language === lang.code 
                      ? 'bg-royal-purple/10 text-royal-purple font-semibold' 
                      : 'text-charcoal hover:bg-royal-purple/5 hover:text-royal-purple'
                    }
                  `}
                  role="option"
                  aria-selected={language === lang.code}
                >
                  {/* Language flag */}
                  <span className="text-xl flex-shrink-0">{lang.flag}</span>
                  
                  {/* Language name and code */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{lang.name}</div>
                    <div className="text-xs opacity-70">{lang.code.toUpperCase()}</div>
                  </div>
                  
                  {/* Checkmark for selected language */}
                  {language === lang.code && (
                    <svg className="w-5 h-5 text-royal-purple flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
