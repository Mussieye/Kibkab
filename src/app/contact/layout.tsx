import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Maranatha Christian Church. Find our address, phone, email, service times, and send us a message.",
  openGraph: {
    title: "Contact | Maranatha Christian Church",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
