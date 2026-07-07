import { DonationRecord } from './stripe-config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email (stub implementation - configure with your email provider)
 * Supports: SendGrid, Resend, Nodemailer, AWS SES, etc.
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Uncomment and configure one of the providers below:

    // ── Using Resend (recommended for Next.js) ──
    // const { Resend } = await import("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // const result = await resend.emails.send({
    //   from: process.env.EMAIL_FROM || 'donations@maranatha.church',
    //   to: options.to,
    //   subject: options.subject,
    //   html: options.html,
    // });
    // return !!result.data;

    // ── Using SendGrid ──
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: options.to,
    //   from: process.env.EMAIL_FROM || 'donations@maranatha.church',
    //   subject: options.subject,
    //   html: options.html,
    // });
    // return true;

    // ── Using Nodemailer (for SMTP) ──
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: parseInt(process.env.SMTP_PORT || '587'),
    //   secure: process.env.SMTP_SECURE === 'true',
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    // });
    // await transporter.sendMail({
    //   to: options.to,
    //   from: process.env.EMAIL_FROM || 'donations@maranatha.church',
    //   subject: options.subject,
    //   html: options.html,
    //   text: options.text,
    // });
    // return true;

    // For development/demo, just log the email
    console.log(`\n📧 [EMAIL WOULD BE SENT]\nTo: ${options.to}\nSubject: ${options.subject}\n`);
    console.log('HTML Preview:');
    console.log(options.html);
    console.log('\n---\n');

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

/**
 * Generate donation receipt email HTML
 */
export function generateDonationReceiptHTML(donation: DonationRecord & { donationNumber?: number }): string {
  const donationDate = new Date(donation.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const frequencyText = {
    'one-time': 'One-time donation',
    'weekly': 'Weekly recurring donation',
    'monthly': 'Monthly recurring donation',
  }[donation.frequency] || 'Donation';

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #2A2A2A; line-height: 1.6; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { text-align: center; margin-bottom: 30px; }
      .logo { font-size: 24px; font-weight: bold; color: #3D0050; }
      .content { background: #F9F7F3; padding: 30px; border-radius: 12px; margin-bottom: 20px; }
      .donation-details { margin: 20px 0; }
      .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #DDD; }
      .detail-label { font-weight: 600; color: #3D0050; }
      .detail-value { color: #666; }
      .amount { font-size: 28px; font-weight: bold; color: #D4A017; margin: 20px 0; }
      .confirmation { background: #E8F5E9; border-left: 4px solid #4CAF50; padding: 15px; margin: 20px 0; }
      .confirmation-text { color: #2E7D32; }
      .footer { text-align: center; font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #DDD; padding-top: 20px; }
      .button { display: inline-block; background: #D4A017; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
      .impact-section { background: #3D0050; color: white; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center; }
      .impact-text { font-size: 14px; line-height: 1.8; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">🙏 Maranatha Christian Church</div>
        <p style="color: #666; margin-top: 5px;">Donation Receipt</p>
      </div>

      <div class="content">
        <h2 style="color: #3D0050; margin-top: 0;">Thank You for Your Generosity!</h2>
        
        <p>Dear ${donation.donorName},</p>
        
        <p>We are deeply grateful for your ${frequencyText.toLowerCase()}. Your support enables us to continue our mission to serve our community and glorify God.</p>

        <div class="confirmation">
          <p class="confirmation-text">
            ✓ Your donation has been successfully received and processed.
          </p>
        </div>

        <div class="donation-details">
          <div class="detail-row">
            <span class="detail-label">Receipt Number:</span>
            <span class="detail-value">#${donation.donationNumber || donation.id}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Date:</span>
            <span class="detail-value">${donationDate}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Type:</span>
            <span class="detail-value">Church Support</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Frequency:</span>
            <span class="detail-value">${frequencyText}</span>
          </div>
        </div>

        <div style="text-align: center;">
          <div class="amount">$${(donation.amount / 100).toFixed(2)}</div>
          <p style="color: #666; font-size: 12px;">${donation.currency.toUpperCase()}</p>
        </div>

        <div class="impact-section">
          <h3 style="margin-top: 0;">Your Impact</h3>
          <p class="impact-text">
            ${getImpactMessage(donation.amount)}
          </p>
        </div>

        <p>If you have any questions about your donation or would like to learn more about our ministry, please don't hesitate to contact us.</p>

        <p>
          With gratitude and blessings,<br>
          <strong>Maranatha Christian Church</strong>
        </p>
      </div>

      <div class="footer">
        <p>Maranatha Christian Church | Tax ID: [INSERT TAX ID]</p>
        <p>This receipt acknowledges your donation for tax purposes.</p>
        <p style="margin-top: 10px; color: #999;">
          If you did not make this donation, please contact us immediately.
        </p>
      </div>
    </div>
  </body>
</html>
  `.trim();
}

/**
 * Generate admin notification email
 */
export function generateAdminNotificationHTML(donation: DonationRecord): string {
  const donationDate = new Date(donation.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const frequencyText = {
    'one-time': 'One-time',
    'weekly': 'Weekly',
    'monthly': 'Monthly',
  }[donation.frequency] || 'Unknown';

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: monospace; background: #F5F5F5; padding: 20px; }
      .card { background: white; padding: 20px; border-radius: 8px; }
      table { width: 100%; border-collapse: collapse; }
      td { padding: 10px; border-bottom: 1px solid #EEE; }
      .label { font-weight: bold; color: #333; width: 150px; }
      .amount { font-size: 18px; font-weight: bold; color: #D4A017; }
    </style>
  </head>
  <body>
    <div class="card">
      <h2>💰 New Donation Received</h2>
      
      <table>
        <tr>
          <td class="label">Session ID:</td>
          <td><code>${donation.sessionId}</code></td>
        </tr>
        <tr>
          <td class="label">Donor Name:</td>
          <td>${donation.donorName}</td>
        </tr>
        <tr>
          <td class="label">Donor Email:</td>
          <td>${donation.donorEmail}</td>
        </tr>
        <tr>
          <td class="label">Amount:</td>
          <td class="amount">$${(donation.amount / 100).toFixed(2)} ${donation.currency.toUpperCase()}</td>
        </tr>
        <tr>
          <td class="label">Frequency:</td>
          <td>${frequencyText}</td>
        </tr>
        <tr>
          <td class="label">Date:</td>
          <td>${donationDate}</td>
        </tr>
        <tr>
          <td class="label">Status:</td>
          <td><strong>${donation.status}</strong></td>
        </tr>
      </table>

      <p style="margin-top: 20px; font-size: 12px; color: #666;">
        Log in to the admin dashboard to view detailed donation records.
      </p>
    </div>
  </body>
</html>
  `.trim();
}

/**
 * Get a motivational/impact message based on donation amount
 */
function getImpactMessage(amountInCents: number): string {
  const amount = amountInCents / 100;

  if (amount >= 500) {
    return 'Your generous donation will help fund multiple ministry initiatives including outreach programs, community support, and spiritual development for our members.';
  } else if (amount >= 100) {
    return 'Your contribution will support our evangelism efforts, community outreach, and help us reach more people with the Gospel.';
  } else if (amount >= 50) {
    return 'Your donation helps us provide resources for our ministries, including youth programs, prayer initiatives, and community service.';
  } else {
    return 'Your donation, no matter the size, contributes to our mission of serving the community and sharing God\'s love.';
  }
}

/**
 * Send donation receipt to donor
 */
export async function sendDonationReceipt(donation: DonationRecord): Promise<boolean> {
  return sendEmail({
    to: donation.donorEmail,
    subject: `Donation Receipt - Maranatha Christian Church #${donation.id.substring(0, 8)}`,
    html: generateDonationReceiptHTML(donation),
    text: `Thank you for your donation of $${(donation.amount / 100).toFixed(2)} to Maranatha Christian Church.`,
  });
}

/**
 * Send admin notification of new donation
 */
export async function sendAdminDonationNotification(donation: DonationRecord): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.log('⚠️ ADMIN_EMAIL not configured - admin notification skipped');
    return false;
  }

  return sendEmail({
    to: adminEmail,
    subject: `💰 New Donation: $${(donation.amount / 100).toFixed(2)}`,
    html: generateAdminNotificationHTML(donation),
  });
}

/**
 * Send failed payment notification
 */
export async function sendFailedPaymentNotification(
  email: string,
  amount: number,
  frequency: string,
  error: string
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.log('⚠️ ADMIN_EMAIL not configured - failed payment notification skipped');
    return false;
  }

  return sendEmail({
    to: adminEmail,
    subject: `⚠️ Failed Payment - $${(amount / 100).toFixed(2)} from ${email}`,
    html: `
<html>
  <body style="font-family: sans-serif;">
    <h2>Payment Failed</h2>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Amount:</strong> $${(amount / 100).toFixed(2)}</p>
    <p><strong>Frequency:</strong> ${frequency}</p>
    <p><strong>Error:</strong> ${error}</p>
    <p>Please follow up with the donor if this is a recurring donation.</p>
  </body>
</html>
    `,
  });
}
