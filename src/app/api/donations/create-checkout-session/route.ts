import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe-config";

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripeClient();
    const { amount, frequency, donationType, donorInfo } = await request.json();

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid donation amount" },
        { status: 400 }
      );
    }

    // Convert amount to cents (Stripe uses cents)
    const amountInCents = Math.round(amount * 100);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: frequency === "one-time" ? "payment" : "subscription",
      
      line_items: [
        {
          price_data: frequency === "one-time" 
            ? {
                currency: "usd",
                product_data: {
                  name: `${donationType ? donationType.replace('_', ' ').charAt(0).toUpperCase() + donationType.replace('_', ' ').slice(1) : 'General'} Donation to Maranatha Christian Church`,
                  description: frequency === "one-time" 
                    ? `One-time ${donationType ? donationType.replace('_', ' ') : 'general'} donation` 
                    : `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} ${donationType ? donationType.replace('_', ' ') : 'general'} donation`,
                  images: ["https://your-church-logo-url.com/logo.png"],
                },
                unit_amount: amountInCents,
              }
            : {
                currency: "usd",
                product_data: {
                  name: "Recurring Donation to Maranatha Christian Church",
                  description: `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} donation`,
                  images: ["https://your-church-logo-url.com/logo.png"],
                },
                unit_amount: amountInCents,
                recurring: {
                  interval: frequency === "monthly" ? "month" : "year",
                },
              },
          quantity: 1,
        },
      ],

      customer_creation: donorInfo.email ? "always" : "if_required",
      customer_email: donorInfo.email || undefined,

      metadata: {
        donor_name: donorInfo.name || "Anonymous",
        donor_email: donorInfo.email || "",
        donor_phone: donorInfo.phone || "",
        frequency: frequency,
        donation_type: donationType || "general",
        church: "Maranatha Christian Church",
      },

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/offering/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/offering?cancelled=true`,

      billing_address_collection: "auto",
      allow_promotion_codes: true,

      custom_text: {
        submit: {
          message: "Your donation supports our ministry and community outreach programs.",
        },
      },
    });

    // Log donation attempt for admin tracking
    console.log("Donation session created:", {
      sessionId: session.id,
      amount: amount,
      frequency: frequency,
      donationType: donationType,
      donorEmail: donorInfo.email,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to create donation session",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
