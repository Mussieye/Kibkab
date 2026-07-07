# Donations System - Developer Quick Reference

## System Overview

The donations system is built on Stripe with a multi-layer architecture:

```
┌─────────────────┐
│  Donation Form  │  (src/components/ui/donation-form.tsx)
│  (React/Client) │
└────────┬────────┘
         │ POST
         ▼
┌──────────────────────────────────────────┐
│  Create Checkout Session API             │  (src/app/api/donations/create-checkout-session)
│  - Validates amount                      │
│  - Creates Stripe session                │
│  - Returns redirect URL                  │
└────────┬─────────────────────────────────┘
         │
         ▼
    ┌─────────────┐
    │ Stripe      │
    │ Checkout   │
    │ Page       │
    └──────┬──────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Webhook Endpoint                    │  (src/app/api/donations/webhook)
│  - Receives Stripe events            │
│  - Stores donation in database       │
│  - Sends email receipts              │
│  - Notifies admin                    │
└──────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Database                            │  (src/lib/donations.ts)
│  - Stores DonationRecord             │
│  - Provides query methods            │
│  - Calculates statistics             │
└──────────────────────────────────────┘
         │
         ▼
    ┌──────────────────────┐
    │ Admin Dashboard      │  (src/app/admin/donations)
    │ - View donations     │
    │ - Filter & sort      │
    │ - Statistics         │
    └──────────────────────┘
```

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── donations/
│   │   │   ├── create-checkout-session/
│   │   │   │   └── route.ts          ← POST: Create checkout
│   │   │   ├── session/
│   │   │   │   └── [sessionId]/
│   │   │   │       └── route.ts      ← GET: Fetch donation by session
│   │   │   └── webhook/
│   │   │       └── route.ts          ← POST: Stripe webhook handler
│   │   └── admin/
│   │       └── donations/
│   │           ├── route.ts          ← GET: All donations
│   │           └── stats/
│   │               └── route.ts      ← GET: Statistics
│   ├── admin/
│   │   └── donations/
│   │       └── page.tsx              ← Admin dashboard
│   └── give-online/
│       ├── page.tsx                  ← Donation page (uses form)
│       ├── success/
│       │   └── page.tsx              ← Success page with details
│       └── cancelled/
│           └── page.tsx              ← Cancellation page
├── components/
│   └── ui/
│       └── donation-form.tsx         ← Donation form component
└── lib/
    ├── donations.ts                  ← Database storage layer
    ├── email-service.ts              ← Email sending with providers
    └── stripe-config.ts              ← Stripe configuration & types
```

## API Endpoints

### Create Checkout Session
```
POST /api/donations/create-checkout-session
Content-Type: application/json

{
  "amount": 50,
  "currency": "usd",
  "frequency": "one-time" | "monthly" | "weekly",
  "donationType": "tithe" | "offering" | "general" | ...,
  "donorInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "address": {
      "line1": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "postal_code": "12345",
      "country": "US"
    }
  }
}

Response (200):
{
  "sessionId": "cs_...",
  "url": "https://checkout.stripe.com/..."
}
```

### Get Donation by Session ID
```
GET /api/donations/session/[sessionId]

Response (200):
{
  "success": true,
  "donation": {
    "id": "don_...",
    "sessionId": "cs_...",
    "amount": 5000,
    "currency": "usd",
    "frequency": "one-time",
    "status": "completed",
    "donorEmail": "john@example.com",
    "donorName": "John Doe",
    "createdAt": "2024-05-03T12:00:00Z",
    "completedAt": "2024-05-03T12:00:30Z",
    "metadata": {...}
  }
}
```

### Get All Donations (Admin)
```
GET /api/admin/donations?status=completed&frequency=monthly

Query Parameters:
  - status: "all" | "completed" | "pending" | "failed"
  - frequency: "all" | "one-time" | "weekly" | "monthly"

Response (200):
{
  "success": true,
  "donations": [...],
  "count": 42
}
```

### Get Donation Statistics
```
GET /api/admin/donations/stats

Response (200):
{
  "success": true,
  "stats": {
    "totalDonations": 42,
    "totalAmount": 125000,
    "averageAmount": 2976,
    "recurringCount": 8,
    "byFrequency": {
      "one-time": { "count": 30, "total": 100000 },
      "weekly": { "count": 4, "total": 15000 },
      "monthly": { "count": 8, "total": 10000 }
    },
    "byStatus": {
      "completed": 40,
      "pending": 2,
      "failed": 0
    }
  }
}
```

### Stripe Webhook
```
POST /api/donations/webhook
X-Stripe-Signature: [signature]

Handles Events:
- checkout.session.completed  → Call handleSuccessfulPayment()
- invoice.payment_succeeded   → Call handleRecurringPayment()
- payment_intent.payment_failed → Call handleFailedPayment()
```

## Core Functions

### Database Operations (donations.ts)

```typescript
// Store a new donation
const record = await storeDonationRecord({
  sessionId, amount, currency, frequency, 
  status, donorEmail, donorName, createdAt, metadata
});

// Query donations
const donations = await getAllDonations({
  status: 'completed',
  frequency: 'monthly',
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-12-31')
});

// Get statistics
const stats = await getDonationStats();

// Update status
await updateDonationStatus(sessionId, 'completed', completedAt);

// Donor history
const donations = await getDonationsByEmail('donor@example.com');
const total = await getTotalDonatedByDonor('donor@example.com');
```

### Email Service (email-service.ts)

```typescript
// Send receipt to donor
await sendDonationReceipt(donationRecord);

// Send admin notification
await sendAdminDonationNotification(donationRecord);

// Send failure notification
await sendFailedPaymentNotification(
  email, amount, frequency, errorMessage
);

// Generate HTML templates
const html = generateDonationReceiptHTML(donation);
const html = generateAdminNotificationHTML(donation);
```

## Environment Variables

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (choose one)
RESEND_API_KEY=re_...
# OR
SENDGRID_API_KEY=SG...
# OR
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASSWORD=...

# Common
EMAIL_FROM=donations@maranatha.church
ADMIN_EMAIL=admin@maranatha.church
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ADMIN_API_KEY=...
```

## Stripe Test Cards

| Card | Use Case |
|------|----------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 0002 | Card declined |
| 4000 0000 0000 0127 | Insufficient funds |
| 4000 0000 0000 3220 | 3D Secure required |
| 5555 5555 5555 4444 | Mastercard success |

## Common Tasks

### Add a new donation type

Edit `stripe-config.ts`:
```typescript
export function getDonationTypeLabel(type: string, language: string = 'en'): string {
  const labels = {
    en: {
      'tithe': 'Tithe',
      'offering': 'Offering',
      'new_type': 'New Type',  // ← Add here
      // ...
    },
    // ... other languages
  };
  return labels[language as keyof typeof labels]?.[type as keyof typeof labels.en] || labels.en[type as keyof typeof labels.en];
}
```

### Switch to live Stripe keys

1. Get Live keys from Stripe dashboard
2. Update `.env.local`:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_... (from live webhook)
   ```
3. Update webhook endpoint URL to production domain
4. Redeploy application

### Add a new currency

Edit `stripe-config.ts`:
```typescript
export const defaultDonationConfig: DonationConfig = {
  donation: {
    currencies: ['USD', 'EUR', 'GBP', 'CAD'],  // ← Add here
    // ...
  },
};
```

### Integrate with database

Replace in-memory store in `donations.ts`:
```typescript
// Current: Stores in memory array
donationsStore.push(record);

// Replace with: Database call
await db.donations.create(record);
```

## Debugging

### Email not sending?
- Check email provider credentials in `.env`
- Look at console logs (dev emails print there)
- Check email provider's dashboard for logs
- Verify sender email is authenticated

### Webhook not working?
- Verify webhook URL is public and accessible
- Check webhook secret in `.env` matches Stripe
- Look at Stripe webhook logs for failures
- Ensure server can make outbound requests

### Stripe errors?
- Check publishable key is correct
- Verify amount is > $0.50
- Look at browser console for network errors
- Check Stripe test mode is enabled

### Donation not showing up?
- Verify webhook was called (Stripe logs)
- Check database/storage is working
- Look at server logs for errors
- Try accessing `/api/admin/donations` directly

## Performance Optimization

### For high volume:
- Add database indexes on sessionId, donorEmail
- Implement caching for statistics
- Use job queue for emails (Bull, RQ)
- Add rate limiting on API endpoints
- Implement pagination for large datasets

### Example pagination:
```typescript
const page = 1;
const limit = 50;
const offset = (page - 1) * limit;
const donations = allDonations.slice(offset, offset + limit);
```

## Security Checklist

- [ ] HTTPS enforced in production
- [ ] Stripe keys never logged or exposed
- [ ] Webhook signature verified
- [ ] Admin API requires authentication
- [ ] Rate limiting on donation endpoints
- [ ] Input validation on all forms
- [ ] CSRF protection enabled
- [ ] Sensitive data encrypted at rest
- [ ] Regular security audits
- [ ] Error messages don't expose sensitive info

---

**Quick Links:**
- Stripe Dashboard: https://dashboard.stripe.com
- API Docs: https://stripe.com/docs/api
- Test Cards: https://stripe.com/docs/testing
- Webhook Events: https://stripe.com/docs/api/events
