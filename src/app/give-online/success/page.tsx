"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DonationSuccessPage() {
  const [donationDetails, setDonationDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonationDetails = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get("session_id");

        if (!sessionId) {
          setError("No session ID found");
          setIsLoading(false);
          return;
        }

        // Fetch donation details from our API
        const response = await fetch(`/api/donations/session/${sessionId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch donation details");
        }

        const data = await response.json();
        setDonationDetails(data.donation);
      } catch (error) {
        console.error("Error fetching donation details:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonationDetails();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#090909] to-black flex items-center justify-center">
        <div className="text-center">
          <svg className="h-12 w-12 animate-spin text-gold mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <p className="text-gray-300">Processing your donation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#090909] to-black p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h1 className="font-serif text-4xl text-gold mb-4">
              Unable to Load Details
            </h1>
            
            <p className="text-lg text-gray-300 mb-2">
              {error}
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/give-online"
              className="inline-block w-full rounded-lg bg-gradient-to-r from-gold to-gold/80 px-6 py-3 font-semibold text-royal-purple text-center shadow-lg transition-all hover:scale-105"
            >
              Try Again
            </Link>
            
            <Link
              href="/"
              className="inline-block w-full rounded-lg border border-gold/30 px-6 py-3 font-semibold text-gold text-center hover:bg-gold/10 transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);
  };

  const formatDate = (date: string | Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090909] to-black p-6">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="font-serif text-5xl text-gold mb-4 drop-shadow-lg">
            Thank You!
          </h1>
          
          <p className="text-xl text-gray-300 mb-2">
            Your generous donation has been received successfully.
          </p>
          
          <p className="text-gray-400">
            A detailed receipt has been sent to your email address.
          </p>
        </div>

        {/* Donation Details Card */}
        {donationDetails && (
          <div className="bg-white/10 backdrop-blur border border-gold/30 rounded-xl p-8 shadow-xl mb-8">
            <h2 className="text-2xl font-bold text-gold mb-6">Donation Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gold/10">
                <span className="text-gray-300">Donor Name:</span>
                <span className="font-semibold text-white">{donationDetails.donorName}</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-gold/10">
                <span className="text-gray-300">Email:</span>
                <span className="font-semibold text-white">{donationDetails.donorEmail}</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-gold/10">
                <span className="text-gray-300">Amount:</span>
                <span className="font-bold text-3xl text-gold">{formatCurrency(donationDetails.amount)}</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-gold/10">
                <span className="text-gray-300">Frequency:</span>
                <span className="font-semibold text-white capitalize">
                  {donationDetails.frequency === 'one-time' ? 'One-time' : 
                   donationDetails.frequency === 'monthly' ? 'Monthly' : 
                   donationDetails.frequency === 'weekly' ? 'Weekly' : donationDetails.frequency}
                </span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-gold/10">
                <span className="text-gray-300">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  donationDetails.status === 'completed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {donationDetails.status.charAt(0).toUpperCase() + donationDetails.status.slice(1)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-300">Date:</span>
                <span className="text-white">{formatDate(donationDetails.createdAt)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gold/10 border border-gold/20 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Receipt Number:</p>
              <p className="font-mono text-sm text-gold">{donationDetails.id}</p>
            </div>
          </div>
        )}

        {/* Impact Section */}
        <div className="bg-gradient-to-r from-royal-purple/20 to-burgundy/20 border border-gold/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gold mb-6">Your Impact</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🙏</div>
              <div>
                <h3 className="font-semibold text-white mb-2">Spiritual Growth</h3>
                <p className="text-sm text-gray-300">
                  Supporting ministries that help members grow deeper in their faith
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="text-3xl">🤝</div>
              <div>
                <h3 className="font-semibold text-white mb-2">Community Outreach</h3>
                <p className="text-sm text-gray-300">
                  Reaching out to serve and bless our local community
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="text-3xl">🌍</div>
              <div>
                <h3 className="font-semibold text-white mb-2">Global Mission</h3>
                <p className="text-sm text-gray-300">
                  Extending God's kingdom around the world
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full rounded-lg bg-gradient-to-r from-gold to-gold/80 px-6 py-3 font-semibold text-royal-purple text-center shadow-lg transition-all hover:scale-105"
          >
            Return to Homepage
          </Link>
          
          <Link
            href="/give-online"
            className="inline-block w-full rounded-lg border border-gold/30 px-6 py-3 font-semibold text-gold text-center hover:bg-gold/10 transition-colors"
          >
            Make Another Donation
          </Link>
        </div>
      </div>
    </div>
  );
}
