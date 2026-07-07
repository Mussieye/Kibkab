"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { LazyLoad } from "@/components/performance/intersection-observer";

export function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <LazyLoad
      fallback={
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-royal-purple/20 to-burgundy/20">
          <div className="animate-pulse text-center">
            <div className="h-8 w-32 bg-royal-purple/30 rounded mx-auto mb-4"></div>
            <div className="h-4 w-48 bg-royal-purple/20 rounded mx-auto"></div>
          </div>
        </section>
      }
    >
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Enhanced background with multiple visual layers */}
        {/* Royal purple to burgundy gradient (church colors) */}
        <div className="absolute inset-0 bg-gradient-to-br from-royal-purple/60 via-burgundy/50 to-royal-purple/40"></div>
        
        {/* Radial gradients at corners for depth */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-royal-purple/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-burgundy/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-burgundy/25 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-royal-purple/25 to-transparent rounded-full blur-3xl"></div>
        
        {/* Diagonal line patterns with church colors */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diagonalPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="60" y2="60" stroke="rgba(61, 0, 80, 0.4)" strokeWidth="1"/>
                <line x1="30" y1="0" x2="30" y2="60" stroke="rgba(123, 15, 22, 0.3)" strokeWidth="0.5"/>
                <line x1="0" y1="30" x2="60" y2="30" stroke="rgba(212, 160, 23, 0.2)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonalPattern)"/>
          </svg>
        </div>
        
        {/* Cross pattern overlay for spiritual theme */}
        <div className="absolute inset-0 opacity-25">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="crossPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(212, 160, 23, 0.3)" strokeWidth="2"/>
                <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(212, 160, 23, 0.3)" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#crossPattern)"/>
          </svg>
        </div>
        
        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gold/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Enhanced Content with animations */}
        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up text-center px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center">
          <h1 className="mb-4 font-serif text-6xl md:text-8xl font-black text-white leading-tight animate-fade-in-down text-ultra-bold text-gradient-animate text-center" style={{animationDelay: "0.2s"}}>
            Maranatha
            <span className="block text-5xl md:text-7xl text-gold animate-fade-in-up text-bold-animate" style={{animationDelay: "0.4s"}}>
              Christian Church
            </span>
          </h1>
          
          <div className="mb-6 w-full text-center">
            <p className="text-base md:text-lg text-white/80 font-medium animate-fade-in-up" style={{animationDelay: "0.6s"}}>
              {t('maranathaMeaning')}
            </p>
          </div>
          
          <div className="mb-8 w-full text-center">
            <p className="text-lg md:text-xl text-white font-serif font-bold animate-fade-in-up" style={{animationDelay: "0.8s"}}>
              {t('bibleVerse')}
            </p>
            <p className="text-sm md:text-base text-white/80 font-semibold animate-fade-in-up" style={{animationDelay: "1s"}}>
              {t('bibleReference')}
            </p>
          </div>
          
          <p className="mb-8 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed animate-fade-in-up text-center" style={{animationDelay: "1.2s"}}>
            {t('communityMessage')}
          </p>
          
                  </div>
        
        {/* Decorative Elements */}
        <div className="absolute right-8 top-8 hidden h-24 w-24 rounded-full border-4 border-gold/20 opacity-50 md:block"></div>
        <div className="absolute bottom-8 left-8 hidden h-16 w-16 rounded-full border-4 border-gold/20 opacity-50 md:block"></div>
      </section>
    </LazyLoad>
  );
}
