"use client";

import { useState } from "react";

interface PrayerFormData {
  name: string;
  request: string;
  isPrivate: boolean;
}

export function PrayerRequestForm() {
  const [formData, setFormData] = useState<PrayerFormData>({
    name: "",
    request: "",
    isPrivate: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/prayer-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit prayer request");
      }

      setIsSubmitted(true);
      setFormData({ name: "", request: "", isPrivate: false });
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error("Prayer request submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-green-500/20 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-royal-purple mb-2">
          Prayer Request Received
        </h3>
        <p className="text-charcoal/90">
          Thank you for sharing your prayer request with us. Our prayer team will
          lift up your needs in prayer.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-6 rounded-lg bg-royal-purple px-6 py-2 text-white hover:bg-royal-purple/90 transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-royal-purple/15 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="font-serif text-3xl text-royal-purple mb-4">
          Share Your Prayer Request
        </h2>
        <p className="text-charcoal/90">
          We believe in the power of prayer and would be honored to pray with
          you. Share your needs, concerns, or praises with our prayer team.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
            Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-charcoal/20 px-4 py-3 focus:border-royal-purple focus:outline-none focus:ring-2 focus:ring-royal-purple/20 transition-colors"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="request" className="block text-sm font-medium text-charcoal mb-2">
            Prayer Request *
          </label>
          <textarea
            id="request"
            name="request"
            value={formData.request}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full rounded-lg border border-charcoal/20 px-4 py-3 focus:border-royal-purple focus:outline-none focus:ring-2 focus:ring-royal-purple/20 transition-colors resize-none"
            placeholder="Share your prayer request here..."
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPrivate"
            name="isPrivate"
            checked={formData.isPrivate}
            onChange={handleInputChange}
            className="h-4 w-4 rounded border-charcoal/20 text-royal-purple focus:ring-royal-purple/20"
          />
          <label htmlFor="isPrivate" className="ml-2 text-sm text-charcoal/90">
            Keep this request private (visible only to prayer team)
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.request.trim()}
          className="w-full rounded-lg bg-royal-purple px-6 py-3 text-white font-medium hover:bg-royal-purple/90 disabled:bg-charcoal/30 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit Prayer Request"}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-charcoal/10">
        <p className="text-sm text-charcoal/70 text-center">
          "Do not be anxious about anything, but in every situation, by prayer
          and petition, with thanksgiving, present your requests to God."
          <br />
          <span className="text-royal-purple font-medium">— Philippians 4:6</span>
        </p>
      </div>
    </div>
  );
}
