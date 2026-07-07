import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory store for dev. Replace with Mailchimp / ConvertKit API call in production.
const subscribers = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email address required." }, { status: 400 });
    }

    const normalised = email.toLowerCase().trim();

    if (subscribers.has(normalised)) {
      // Silently accept duplicates so as not to reveal subscriber list
      return NextResponse.json({ success: true });
    }

    subscribers.add(normalised);

    /*
     * Production hook — uncomment and fill in your provider:
     *
     * await fetch("https://api.mailchimp.com/3.0/lists/<LIST_ID>/members", {
     *   method: "POST",
     *   headers: {
     *     Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
     *     "Content-Type": "application/json",
     *   },
     *   body: JSON.stringify({ email_address: normalised, status: "subscribed" }),
     * });
     */

    console.log(`Newsletter subscription: ${normalised}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }
}
