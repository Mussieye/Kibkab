import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe-config";
import { storeDonationRecord, updateDonationStatus } from "@/lib/donations";
import {
  sendDonationReceipt,
  sendAdminDonationNotification,
  sendFailedPaymentNotification,
} from "@/lib/email-service";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripeClient();
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing Stripe signature" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        await handleSuccessfulPayment(session);
        break;

      case "invoice.payment_succeeded":
        const invoice = event.data.object as Stripe.Invoice;
        await handleRecurringPayment(invoice);
        break;

      case "payment_intent.payment_failed":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handleFailedPayment(paymentIntent);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    const amount = session.amount_total || 0;
    const currency = session.currency || "usd";
    const frequency = (session.metadata?.frequency as 'one-time' | 'monthly' | 'weekly') || "one-time";
    const donorName = session.metadata?.donor_name || "Anonymous";
    const donorEmail = session.metadata?.donor_email || "";
    const donationType = session.metadata?.donation_type || "general";

    // Store donation record
    const donation = await storeDonationRecord({
      sessionId: session.id,
      amount,
      currency,
      frequency,
      status: "completed",
      donorEmail,
      donorName,
      createdAt: new Date(session.created * 1000),
      completedAt: new Date(),
      metadata: {
        donation_type: donationType,
        stripe_customer_id: (session.customer as string) || "",
        payment_method: (session.payment_intent as string) || "",
      },
    });

    console.log(`✅ [DONATION COMPLETED] ${donation.id} - $${(amount / 100).toFixed(2)} from ${donorEmail}`);

    // Send email receipt to donor
    await sendDonationReceipt(donation);

    // Send admin notification
    await sendAdminDonationNotification(donation);
  } catch (error) {
    console.error("Error handling successful payment:", error);
  }
}

async function handleRecurringPayment(invoice: Stripe.Invoice) {
  try {
    const amount = invoice.amount_paid || 0;
    const currency = invoice.currency || "usd";
    const inv = invoice as Stripe.Invoice & {
      subscription?: string | null;
      paid?: boolean;
      customer_email?: string | null;
      customer_name?: string | null;
      status_transitions?: { paid_at?: number | null };
    };
    const subscriptionId = inv.subscription || null;
    const isPaid = inv.paid ?? inv.status === 'paid';

    // Find or create donation record for recurring payment
    const donation = await storeDonationRecord({
      sessionId: subscriptionId ? subscriptionId : `inv_${invoice.id}`,
      amount,
      currency,
      frequency: "monthly",
      status: isPaid ? "completed" : "pending",
      donorEmail: inv.customer_email || "",
      donorName: inv.customer_name || "Recurring Donor",
      createdAt: new Date(invoice.created * 1000),
      completedAt: isPaid && inv.status_transitions?.paid_at
        ? new Date(inv.status_transitions.paid_at * 1000)
        : undefined,
      metadata: {
        invoice_id: invoice.id,
        subscription_id: subscriptionId || "",
      },
    });

    if (isPaid) {
      console.log(`✅ [RECURRING DONATION] ${donation.id} - $${(amount / 100).toFixed(2)}`);
      await sendDonationReceipt(donation);
      await sendAdminDonationNotification(donation);
    }
  } catch (error) {
    console.error("Error handling recurring payment:", error);
  }
}

async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.error(`❌ [PAYMENT FAILED] ${paymentIntent.id} - Amount: $${(paymentIntent.amount / 100).toFixed(2)}`);
    console.error("Error:", paymentIntent.last_payment_error);

    const pi = paymentIntent as Stripe.PaymentIntent & { customer_email?: string | null };
    if (pi.customer_email) {
      await sendFailedPaymentNotification(
        pi.customer_email,
        paymentIntent.amount,
        "donation",
        paymentIntent.last_payment_error?.message || "Unknown error"
      );
    }
  } catch (error) {
    console.error("Error handling failed payment:", error);
  }
}

