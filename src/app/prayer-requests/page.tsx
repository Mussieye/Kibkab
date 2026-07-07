import type { Metadata } from "next";
import { PrayerRequestForm } from "@/components/prayer-request-form";

export const metadata: Metadata = {
  title: "Prayer Requests",
  description:
    "Submit your prayer request to Maranatha Christian Church. Our pastoral team prays for every request submitted.",
  openGraph: { title: "Prayer Requests | Maranatha Christian Church", url: "/prayer-requests" },
};

export default function PrayerRequestsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <PrayerRequestForm />
    </div>
  );
}
