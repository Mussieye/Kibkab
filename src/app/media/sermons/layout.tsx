import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sermon Archive",
  description:
    "Browse the full sermon archive of Maranatha Christian Church. Powerful messages, scripture-rich teaching, and spiritual growth resources.",
  openGraph: {
    title: "Sermons | Maranatha Christian Church",
    url: "/media/sermons",
  },
};

export default function SermonsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
