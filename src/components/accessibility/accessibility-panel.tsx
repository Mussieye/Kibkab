"use client";

import { useState, useEffect } from "react";

interface AccessibilitySettings {
  fontSize: "normal" | "large" | "extra-large";
  highContrast: boolean;
  reducedMotion: boolean;
  screenReaderOnly: boolean;
}

export function AccessibilityPanel() {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: "normal",
    highContrast: false,
    reducedMotion: false,
    screenReaderOnly: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Apply settings to document
    const root = document.documentElement;
    
    // Font size
    root.classList.remove("text-normal", "text-large", "text-extra-large");
    root.classList.add(`text-${settings.fontSize}`);
    
    // High contrast
    root.classList.toggle("high-contrast", settings.highContrast);
    
    // Reduced motion
    root.classList.toggle("reduce-motion", settings.reducedMotion);
    
    // Screen reader optimizations
    root.classList.toggle("screen-reader-only", settings.screenReaderOnly);
  }, [settings]);

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {/* Accessibility Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 right-4 bg-royal-purple text-white p-3 rounded-full shadow-lg hover:bg-royal-purple/90 transition-colors z-40"
        aria-label="Toggle accessibility options"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed top-20 right-4 w-80 bg-white rounded-lg shadow-xl border border-royal-purple/20 p-6 z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-royal-purple">Accessibility Options</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-charcoal hover:text-royal-purple"
              aria-label="Close accessibility panel"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Text Size
              </label>
              <div className="flex gap-2">
                {(["normal", "large", "extra-large"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => updateSetting("fontSize", size)}
                    className={`px-3 py-1 rounded border transition-colors ${
                      settings.fontSize === size
                        ? "bg-royal-purple text-white border-royal-purple"
                        : "bg-white text-charcoal border-gray-300 hover:border-royal-purple"
                    }`}
                  >
                    {size === "normal" ? "A" : size === "large" ? "A+" : "A++"}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={(e) => updateSetting("highContrast", e.target.checked)}
                  className="w-4 h-4 text-royal-purple border-gray-300 rounded focus:ring-royal-purple"
                />
                <span className="text-sm text-charcoal">High Contrast Mode</span>
              </label>
            </div>

            {/* Reduced Motion */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.reducedMotion}
                  onChange={(e) => updateSetting("reducedMotion", e.target.checked)}
                  className="w-4 h-4 text-royal-purple border-gray-300 rounded focus:ring-royal-purple"
                />
                <span className="text-sm text-charcoal">Reduce Motion</span>
              </label>
            </div>

            {/* Screen Reader Optimizations */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.screenReaderOnly}
                  onChange={(e) => updateSetting("screenReaderOnly", e.target.checked)}
                  className="w-4 h-4 text-royal-purple border-gray-300 rounded focus:ring-royal-purple"
                />
                <span className="text-sm text-charcoal">Screen Reader Mode</span>
              </label>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => setSettings({
              fontSize: "normal",
              highContrast: false,
              reducedMotion: false,
              screenReaderOnly: false,
            })}
            className="w-full mt-4 px-4 py-2 bg-gray-100 text-charcoal rounded hover:bg-gray-200 transition-colors"
          >
            Reset to Defaults
          </button>
        </div>
      )}
    </>
  );
}
