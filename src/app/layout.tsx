import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguageProvider } from "@/contexts/language-context";
import { AuthProvider } from "@/contexts/auth-context";
import { PerformanceToggle } from "@/components/performance/performance-monitor";
import { AccessibilityPanel } from "@/components/accessibility/accessibility-panel";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maranathachristianchurch.org"),
  title: {
    default: "Maranatha Christian Church",
    template: "%s | Maranatha Christian Church",
  },
  description:
    "Maranatha Christian Church — a vibrant community of faith in the Netherlands. Discover sermons, events, ministries, live worship, and more.",
  keywords: [
    "Maranatha Christian Church",
    "church Netherlands",
    "sermons",
    "church events",
    "worship",
    "Christian community",
    "live stream church",
    "online giving",
  ],
  authors: [{ name: "Maranatha Christian Church" }],
  creator: "Maranatha Christian Church",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://maranathachristianchurch.org",
    siteName: "Maranatha Christian Church",
    title: "Maranatha Christian Church",
    description:
      "A vibrant community of faith. Sermons, events, ministries, and live worship — anytime, anywhere.",
    images: [
      {
        url: "/Maranatha.png",
        width: 1024,
        height: 1024,
        alt: "Maranatha Christian Church",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maranatha Christian Church",
    description: "A vibrant community of faith. Sermons, events, ministries, and live worship.",
    images: ["/Maranatha.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/Maranatha.png",
    apple: "/Maranatha.png",
  },
};

const churchJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "Maranatha Christian Church",
  url: "https://maranathachristianchurch.org",
  logo: "https://maranathachristianchurch.org/Maranatha.png",
  description: "A vibrant community of faith in the Netherlands.",
  telephone: "+33759495540",
  email: "maranatachurch1983@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "NL",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday",    opens: "09:00", closes: "13:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "19:00", closes: "21:00" },
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }}
        />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <AuthProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main id="main-content" className="flex-1 w-full pt-[68px]">
                {children}
              </main>
              <SiteFooter />
            </div>
            <PerformanceToggle />
            <AccessibilityPanel />
          </LanguageProvider>
        </AuthProvider>
        <GoogleAnalytics measurementId={GA_ID} />
      </body>
    </html>
  );
}
