import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Church Events",
  description:
    "Stay connected with Maranatha Christian Church events — services, community gatherings, conferences, and special occasions.",
  openGraph: {
    title: "Events | Maranatha Christian Church",
    url: "/events",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
