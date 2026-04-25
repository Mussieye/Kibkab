import type { Metadata } from "next";
import { Cinzel, Lato } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maranatha Christian Church",
  description:
    "Official website for Maranatha Christian Church: sermons, events, ministries, and community life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-off-white text-charcoal">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 md:px-6">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
