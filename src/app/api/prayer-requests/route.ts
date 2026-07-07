import { NextRequest, NextResponse } from "next/server";
import type { PrayerRequest } from "@/lib/cms/models";
import { getCMSConfig } from "@/lib/cms/config";

// In a real implementation, this would connect to your CMS
// For now, we'll store in memory and log the requests
const prayerRequests: PrayerRequest[] = [];

export async function POST(request: NextRequest) {
  try {
    const body: { name?: string; request: string; isPrivate?: boolean } = await request.json();
    const { name, request: prayerRequestText, isPrivate } = body;

    // Validate the request
    if (!prayerRequestText || typeof prayerRequestText !== "string" || prayerRequestText.trim().length === 0) {
      return NextResponse.json(
        { error: "Prayer request is required" },
        { status: 400 }
      );
    }

    // Create prayer request object
    const prayerRequest: PrayerRequest = {
      id: `prayer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name?.trim() || undefined,
      request: prayerRequestText.trim(),
      date: new Date().toISOString(),
      isPrivate: Boolean(isPrivate),
    };

    // Store the request (in memory for now)
    prayerRequests.push(prayerRequest);

    // Log for debugging (in production, this would go to a database)
    console.log("New prayer request:", prayerRequest);

    // Try to send to CMS if configured
    const cmsConfig = getCMSConfig();
    if (cmsConfig.baseUrl && cmsConfig.apiToken) {
      try {
        await sendToCMS(prayerRequest, cmsConfig);
      } catch (cmsError) {
        console.error("Failed to send to CMS:", cmsError);
        // Continue anyway - we have the request in memory
      }
    }

    // Send email notification to admin (if configured)
    try {
      await sendEmailNotification(prayerRequest);
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // Continue anyway - the prayer request is saved
    }

    return NextResponse.json(
      {
        success: true,
        message: "Prayer request submitted successfully",
        id: prayerRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Prayer request submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to send to CMS
async function sendToCMS(prayerRequest: PrayerRequest, cmsConfig: any) {
  // This would be implemented based on your CMS (Strapi/WordPress)
  // For Strapi, it might look like:
  const response = await fetch(`${cmsConfig.baseUrl}/api/prayer-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cmsConfig.apiToken}`,
    },
    body: JSON.stringify({
      data: {
        name: prayerRequest.name,
        request: prayerRequest.request,
        date: prayerRequest.date,
        isPrivate: prayerRequest.isPrivate,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`CMS submission failed: ${response.statusText}`);
  }

  return response.json();
}

// Helper function to send email notification
async function sendEmailNotification(prayerRequest: PrayerRequest) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.log("No admin email configured, skipping notification");
    return;
  }

  // In a real implementation, you'd use a service like Resend, SendGrid, etc.
  // For now, we'll just log the notification
  const emailContent = {
    to: adminEmail,
    subject: "New Prayer Request - Maranatha Christian Church",
    html: `
      <h2>New Prayer Request Received</h2>
      <p><strong>Date:</strong> ${new Date(prayerRequest.date).toLocaleString()}</p>
      ${prayerRequest.name ? `<p><strong>Name:</strong> ${prayerRequest.name}</p>` : ""}
      <p><strong>Private:</strong> ${prayerRequest.isPrivate ? "Yes" : "No"}</p>
      <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #3D0050;">
        <strong>Prayer Request:</strong><br>
        ${prayerRequest.request.replace(/\n/g, "<br>")}
      </div>
      <p style="margin-top: 20px; font-size: 12px; color: #666;">
        This is an automated notification from the Maranatha Christian Church website.
      </p>
    `,
  };

  console.log("Email notification would be sent:", emailContent);
  
  // Example with Resend (if you have it configured):
  // const { Resend } = await import("resend");
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send(emailContent);
}

// GET endpoint for admin to view prayer requests (optional)
export async function GET() {
  try {
    // In a real implementation, this would fetch from your CMS/database
    return NextResponse.json({
      prayerRequests: prayerRequests.map(pr => ({
        ...pr,
        // Don't expose private requests in public endpoints
        request: pr.isPrivate ? "[Private Request]" : pr.request,
      })),
    });
  } catch (error) {
    console.error("Error fetching prayer requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
