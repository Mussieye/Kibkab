// Browser compatibility utilities
export class BrowserCompatibility {
  // Detect browser type
  static getBrowser() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf("Firefox") > -1) return "Firefox";
    if (userAgent.indexOf("Chrome") > -1) return "Chrome";
    if (userAgent.indexOf("Safari") > -1) return "Safari";
    if (userAgent.indexOf("Edge") > -1) return "Edge";
    if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) return "Opera";
    if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) return "Internet Explorer";
    
    return "Unknown";
  }

  // Check if browser supports certain features
  static supportsFeature(feature: string): boolean {
    switch (feature) {
      case "webp":
        return this.supportsWebP();
      case "avif":
        return this.supportsAVIF();
      case "intersection-observer":
        return "IntersectionObserver" in window;
      case "resize-observer":
        return "ResizeObserver" in window;
      case "css-grid":
        return CSS.supports("display", "grid");
      case "css-flexbox":
        return CSS.supports("display", "flexbox");
      case "css-custom-properties":
        return CSS.supports("color", "var(--test)");
      case "webgl":
        return this.supportsWebGL();
      default:
        return false;
    }
  }

  // Check WebP support
  private static supportsWebP(): boolean {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  }

  // Check AVIF support
  private static supportsAVIF(): boolean {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL("image/avif").indexOf("data:image/avif") === 0;
  }

  // Check WebGL support
  private static supportsWebGL(): boolean {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      return gl !== null;
    } catch (e) {
      return false;
    }
  }

  // Get optimal image format for the browser
  static getOptimalImageFormat(): "avif" | "webp" | "jpg" | "png" {
    if (this.supportsFeature("avif")) return "avif";
    if (this.supportsFeature("webp")) return "webp";
    return "jpg";
  }

  // Check if device is mobile
  static isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Check if device is touch-enabled
  static isTouchDevice(): boolean {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  // Check if browser prefers reduced motion
  static prefersReducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // Check if browser prefers dark mode
  static prefersDarkMode(): boolean {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // Get viewport information
  static getViewport() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
    };
  }

  // Add browser-specific CSS classes
  static addBrowserClasses() {
    const html = document.documentElement;
    const browser = this.getBrowser().toLowerCase();
    
    html.classList.add(`browser-${browser}`);
    html.classList.add(this.isMobile() ? "device-mobile" : "device-desktop");
    html.classList.add(this.isTouchDevice() ? "device-touch" : "device-no-touch");
    
    if (this.prefersReducedMotion()) {
      html.classList.add("prefers-reduced-motion");
    }
    
    if (this.prefersDarkMode()) {
      html.classList.add("prefers-dark-mode");
    }
    
    // Add feature support classes
    if (this.supportsFeature("webp")) html.classList.add("supports-webp");
    if (this.supportsFeature("avif")) html.classList.add("supports-avif");
    if (this.supportsFeature("intersection-observer")) html.classList.add("supports-intersection-observer");
    if (this.supportsFeature("css-grid")) html.classList.add("supports-css-grid");
    if (this.supportsFeature("css-flexbox")) html.classList.add("supports-css-flexbox");
  }

  // Fix for iOS Safari viewport height
  static fixIOSViewportHeight() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (!isIOS) return;

    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);
  }

  // Initialize all compatibility fixes
  static initialize() {
    this.addBrowserClasses();
    this.fixIOSViewportHeight();
  }
}

// CSS for browser compatibility
export const browserCompatibilityCSS = `
  /* Browser-specific fixes */
  .browser-internet-explorer .animate-fade-in-up,
  .browser-internet-explorer .animate-fade-in-down,
  .browser-internet-explorer .animate-fade-in-left,
  .browser-internet-explorer .animate-fade-in-right {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .browser-internet-explorer .hover-lift:hover {
    transform: none;
  }

  .browser-internet-explorer .gpu-accelerated {
    transform: none;
  }

  /* Safari fixes */
  .browser-safari .hover-scale:hover {
    transform: scale(1.05) translateZ(0);
  }

  /* Mobile fixes */
  .device-mobile .hover-lift:hover {
    transform: translateY(-3px);
  }

  .device-touch .btn-primary:hover::before {
    display: none;
  }

  /* Reduced motion */
  .prefers-reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* iOS Safari viewport height fix */
  @supports (-webkit-touch-callout: none) {
    .full-height {
      height: 100vh;
      height: calc(var(--vh, 1vh) * 100);
    }
  }

  /* Grid fallback for older browsers */
  .browser-internet-explorer .grid,
  .browser-internet-explorer .md\\:grid-cols-3 {
    display: block;
  }

  .browser-internet-explorer .grid > * {
    display: block;
    margin-bottom: 1rem;
  }

  /* Flexbox fallback */
  .browser-internet-explorer .flex {
    display: block;
  }

  .browser-internet-explorer .flex > * {
    display: inline-block;
    margin-right: 1rem;
  }
`;
