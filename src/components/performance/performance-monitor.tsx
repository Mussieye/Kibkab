"use client";

import { useEffect, useState } from "react";

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") return;

    const measurePerformance = () => {
      if (typeof window !== "undefined" && "performance" in window) {
        const perfData = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        
        // Calculate Core Web Vitals
        const fcp = perfData.responseEnd - perfData.requestStart;
        const lcp = perfData.loadEventEnd - perfData.loadEventStart;
        
        setMetrics({
          fcp: Math.round(fcp),
          lcp: Math.round(lcp),
          fid: 0, // Would need PerformanceObserver for this
          cls: 0, // Would need PerformanceObserver for this
        });
      }
    };

    // Measure after page load
    if (document.readyState === "complete") {
      measurePerformance();
    } else {
      window.addEventListener("load", measurePerformance);
    }

    return () => {
      window.removeEventListener("load", measurePerformance);
    };
  }, []);

  if (!isVisible || !metrics) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50">
      <div className="mb-2 font-bold">Performance Metrics</div>
      <div>FCP: {metrics.fcp}ms</div>
      <div>LCP: {metrics.lcp}ms</div>
      <div>FID: {metrics.fid}ms</div>
      <div>CLS: {metrics.cls}</div>
      <button
        onClick={() => setIsVisible(false)}
        className="mt-2 text-gray-300 hover:text-white"
      >
        Close
      </button>
    </div>
  );
}

export function PerformanceToggle() {
  const [isVisible, setIsVisible] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 bg-royal-purple text-white px-3 py-2 rounded-lg text-xs z-40 hover:bg-royal-purple/90"
      >
        {isVisible ? "Hide" : "Show"} Performance
      </button>
      {isVisible && <PerformanceMonitor />}
    </>
  );
}
