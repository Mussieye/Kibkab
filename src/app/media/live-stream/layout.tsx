import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Stream",
  description:
    "Watch Maranatha Christian Church services live. Join our Sunday worship and special events in real time from anywhere in the world.",
  openGraph: {
    title: "Live Stream | Maranatha Christian Church",
    url: "/media/live-stream",
  },
};

export default function LiveStreamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
