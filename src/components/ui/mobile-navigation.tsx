"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navigationItems } from "@/lib/navigation";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className={`md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-medium transition-all ${
          isScrolled ? "scale-90" : "scale-100"
        }`}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-5 relative flex flex-col justify-between">
          <span
            className={`block h-0.5 w-full bg-royal-purple transition-all ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-royal-purple transition-all ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-royal-purple transition-all ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          />
          
          <nav
            className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="p-6 border-b border-royal-purple/20">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl text-royal-purple">Menu</h2>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg hover:bg-royal-purple/10 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <svg className="h-5 w-5 text-royal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <ul className="space-y-4">
                {navigationItems.map((item, index) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`block py-3 px-4 rounded-lg text-charcoal hover:bg-gold/10 hover:text-royal-purple transition-all transform hover:translate-x-2 animate-fade-in-right`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="p-4 bg-gradient-to-br from-royal-purple/5 to-burgundy/5 rounded-lg">
                <p className="text-sm text-charcoal/70 text-center">
                  Need help?{" "}
                  <Link href="/contact" className="text-gold hover:text-gold-light font-semibold">
                    Contact us
                  </Link>
                </p>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
