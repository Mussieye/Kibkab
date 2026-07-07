import React from "react";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gold text-royal-purple px-4 py-2 rounded-md font-medium z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold"
    >
      Skip to main content
    </a>
  );
}
