# Stripe Donations Integration Setup Guide

## Overview

This guide explains how to set up and configure the Stripe donations system for Maranatha Christian Church website.

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

### Stripe Configuration

```env
# Get these from https://dashboard.stripe.com/apikeys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Get this from https://dashboard.stripe.com/webhooks
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Your domain (used for success/cancel redirects)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Email Configuration (Choose One)

#### Option 1: Using Resend (Recommended for Next.js)

```env
RESEND_API_KEY=re_your_resend_api_key_here
EMAIL_FROM=donations@maranatha.church
```

Install Resend: `npm install resend`

#### Option 2: Using SendGrid

```env
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
EMAIL_FROM=donations@maranatha.church
```

Install SendGrid: `npm install @sendgrid/mail`

#### Option 3: Using SMTP (Nodemailer)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=donations@maranatha.church
```

Install Nodemailer: `npm install nodemailer`

### Admin Configuration

```env
# Admin email to receive donation notifications
ADMIN_EMAIL=pastor@maranatha.church

# Optional: Admin API key for accessing admin endpoints
ADMIN_API_KEY=your_secret_admin_key_here
```

## Step-by-Step Setup

### 1. Create a Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Sign up for a new account
3. Complete your business information
4. Verify your email address

### 2. Get Your API Keys

1. Go to the [API Keys page](https://dashboard.stripe.com/apikeys)
2. You'll see two sets of keys: **Test** and **Live**
3. For development, use **Test** keys (they start with `pk_test_` and `sk_test_`)
4. Copy your **Publishable Key** and **Secret Key**

### 3. Create a Webhook Endpoint

1. Go to [Webhooks settings](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. For development, use: `http://localhost:3000/api/donations/webhook`
4. For production, use: `https://your-domain.com/api/donations/webhook`
5. Select events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `payment_intent.payment_failed`
6. Copy the **Signing Secret** (starts with `whsec_`)

### 4. Set Up Email Service

Choose your preferred email provider and follow the configuration for your choice above.

### 5. Configure Environment Variables

Copy the values into your `.env.local` file:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ADMIN_EMAIL=admin@maranatha.church
RESEND_API_KEY=re_...  # Or other email service key
EMAIL_FROM=donations@maranatha.church
```

### 6. Test the Integration Locally

1. Run the development server: `npm run dev`
2. Go to http://localhost:3000/give-online
3. Fill out the donation form
4. Use Stripe test card: `4242 4242 4242 4242`
5. Enter any future expiration date and any 3-digit CVC
6. Complete the donation
7. You should see a success page and receive email receipt (check console for dev emails)

### 7. Set Up Admin Dashboard

1. Admin donations dashboard is at: `/admin/donations`
2. Requires `ADMIN_EMAIL` to be configured
3. Shows:
   - Total donations and revenue
   - Donation breakdown by frequency
   - Individual donation records
   - Filtering and search capabilities

## Stripe Test Cards

For testing different scenarios:

| Card Number | Result |
|---|---|
| 4242 4242 4242 4242 | Succeeds (default) |
| 4000 0000 0000 0002 | Declined |
| 4000 0000 0000 0127 | Declined (insufficient funds) |
| 4000 0000 0000 3220 | Requires 3D Secure |
| 5555 5555 5555 4444 | Mastercard success |

## Email Configuration Details

### Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Get your API key from the dashboard
4. In `src/lib/email-service.ts`, uncomment the Resend section

### SendGrid Setup

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key in Settings > API Keys
3. Verify your sender identity
4. In `src/lib/email-service.ts`, uncomment the SendGrid section

### SMTP Setup (Gmail Example)

1. Enable 2-factor authentication on your Gmail account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the app password in `SMTP_PASSWORD`
4. In `src/lib/email-service.ts`, uncomment the Nodemailer section

## Production Deployment

### Before Going Live

1. **Switch to Live Keys**
   - In Stripe dashboard, toggle to Live mode
   - Copy your Live keys (they start with `pk_live_` and `sk_live_`)
   - Update environment variables

2. **Configure Production Webhook**
   - In Stripe Webhooks, create new endpoint for production URL
   - Update webhook endpoint to: `https://your-domain.com/api/donations/webhook`
   - Get new webhook signing secret

3. **Update Email Service**
   - Test email sending in production
   - Ensure admin email is correct
   - Configure proper sender information

4. **Security Checklist**
   - [ ] Use HTTPS only
   - [ ] Enable webhook signature verification
   - [ ] Set strong admin API key
   - [ ] Use environment variables (never hardcode keys)
   - [ ] Enable rate limiting on donation endpoints
   - [ ] Set up monitoring for failed payments
   - [ ] Enable Stripe's fraud detection

5. **Deploy**
   - Update `.env` on your production server
   - Redeploy your application
   - Test with a small donation
   - Monitor webhook logs

## Troubleshooting

### Webhook Not Receiving Events

1. Check webhook URL is correct and publicly accessible
2. Verify webhook signing secret is correct
3. Check Stripe dashboard > Webhooks for error logs
4. Ensure server logs show webhook calls

### Emails Not Sending

1. Check if email service credentials are correct
2. Verify sender email is authenticated (SendGrid/Resend)
3. Check spam/junk folder
4. Review email service logs for errors
5. For SMTP, test connection separately

### Donation Not Recorded

1. Check database/storage is working
2. Verify webhook is being called (check Stripe logs)
3. Look for errors in server logs
4. Test API endpoint directly: `/api/admin/donations`

### Payment Fails During Checkout

1. Check test card is valid
2. Verify Stripe publishable key is correct
3. Check network tab for API errors
4. Ensure browser allows JavaScript from Stripe

## Support Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Webhook Events](https://stripe.com/docs/api/events)

## Key Features Implemented

✅ One-time and recurring donations
✅ Multiple donation types (Tithe, Offering, Missions, etc.)
✅ Secure checkout with Stripe
✅ Automatic email receipts
✅ Admin donation dashboard
✅ Donation statistics and reporting
✅ Webhook payment notifications
✅ Failed payment notifications
✅ Success/cancellation pages with details
✅ Multi-currency support (easily expandable)

## Next Steps

1. Configure your email service (pick one from above)
2. Set up Stripe webhook
3. Add environment variables to `.env.local`
4. Test the donation flow
5. Deploy to production with live keys
