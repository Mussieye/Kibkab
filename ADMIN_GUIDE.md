# Maranatha Christian Church — Admin Guide

## Quick Reference

| Task | URL | Role Required |
|------|-----|---------------|
| Member management | `/admin/members` | Admin |
| Donation logs | `/admin/donations` | Admin |
| Member dashboard | `/membership/dashboard` | Any member |
| Edit profile | `/membership/profile` | Any member |

---

## 1. Logging In

Go to **/ember-login** on your website.

### Default Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@maranathachurch.org` | `Admin1234` |
| Editor | `editor@maranathachurch.org` | `Editor1234` |
| Member | `member@maranathachurch.org` | `Member1234` |

> **Important:** Change these passwords before going live. The admin email is
> controlled by the `ADMIN_EMAIL` environment variable.

### Password Requirements
- Minimum 8 characters, uppercase + lowercase + number

---

## 2. Member Management (`/admin/members`)

As **Admin** you can view all registered members, filter by role and status,
and see statistics (total, active, new in last 30 days).

### Role Permissions

| Permission | Member | Editor | Admin |
|------------|--------|--------|-------|
| View content | ✅ | ✅ | ✅ |
| Submit prayer requests | ✅ | ✅ | ✅ |
| Make donations | ✅ | ✅ | ✅ |
| Manage own profile | ✅ | ✅ | ✅ |
| Manage all content | — | ✅ | ✅ |
| Manage events & sermons | — | ✅ | ✅ |
| View analytics | — | ✅ | ✅ |
| Manage users / settings | — | — | ✅ |

---

## 3. Adding Sermons

Sermon data is in `src/data/sample-sermons.ts`. Add a new entry:

```ts
{
  id: "sermon-XX",
  title: "Your Sermon Title",
  speaker: "Pastor Name",
  date: "2026-01-01",
  scripture: "John 3:16",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
  audioUrl: "",          // optional MP3 link
  notesUrl: "",          // optional PDF
  series: "Series Name",
  tags: ["faith", "hope"],
  duration: "45 min",
  featured: false,
}
```

---

## 4. Adding Events

Events are in `src/data/sample-events.ts`. Key fields:

```ts
{
  id: "event-XX",
  title: "Event Name",
  date: "2026-01-01",
  time: "10:00 AM",
  location: "Main Hall",
  description: "...",
  category: "worship",     // worship | outreach | youth | community | conference
  rsvpLink: "https://...", // optional
  registrationRequired: false,
  cost: "Free",
}
```

---

## 5. Adding Blog Posts / Devotionals

Blog posts are in `src/data/sample-blogs.ts`. Key fields:

```ts
{
  id: "blog-XX",
  slug: "url-friendly-title",
  title: "Post Title",
  excerpt: "Short summary...",
  content: "Full content in Markdown...",
  author: "Author Name",
  publishedAt: "2026-01-01",
  category: "devotional",  // devotional | sermon-notes | church-news | testimony
  tags: ["faith", "prayer"],
  featuredImage: "/images/blog/image.jpg",
  readTime: "5 min read",
  featured: false,
}
```

---

## 6. Donations (`/admin/donations`)

Shows all Stripe transactions with status, amount, frequency, and session IDs.

**To go live with Stripe:**
1. In Vercel → Environment Variables, replace `sk_test_...` with `sk_live_...`
2. Replace `pk_test_...` with `pk_live_...`
3. Update `STRIPE_WEBHOOK_SECRET` from your live webhook endpoint

---

## 7. Newsletter

The footer newsletter form sends to `/api/newsletter/route.ts`.  
To connect Mailchimp, open that file and uncomment the Mailchimp block, then set:
- `MAILCHIMP_API_KEY`
- `MAILCHIMP_LIST_ID`

---

## 8. Google Analytics (GA4)

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Copy the Measurement ID (`G-XXXXXXXXXX`)
3. Set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX` in Vercel env vars
4. Redeploy — analytics starts immediately

Events tracked automatically: donations, prayer requests, member registrations, event registrations.

---

## 9. Deploying to Vercel

```bash
# First time
npm i -g vercel && vercel login && vercel

# Subsequent deployments (auto on git push if connected)
git push origin main
```

### Required Environment Variables

| Variable | Where to get it |
|----------|----------------|
| `JWT_SECRET` | `openssl rand -base64 32` |
| `STRIPE_SECRET_KEY` | dashboard.stripe.com |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | dashboard.stripe.com |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook settings |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | analytics.google.com |
| `ADMIN_EMAIL` | Your admin email |
| `NOTIFICATION_EMAIL` | Where prayer emails go |

**SSL** is provisioned automatically by Vercel. No action needed.

---

## 10. Live Streaming

The live stream page (`/media/live-stream`) embeds your YouTube channel.

1. Set `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` to your channel ID
2. Set `YOUTUBE_API_KEY` for the "Live Now" indicator to work
3. When streaming, set the YouTube broadcast to **Public**

---

## 11. Languages

The site supports 6 languages: English, Spanish, French, Dutch, Amharic, Tigrinya.  
Translation strings are in `src/contexts/language-context.tsx`.

---

## 12. Troubleshooting

| Problem | Fix |
|---------|-----|
| Members can't log in | Check `JWT_SECRET` is set in Vercel env vars |
| Donations failing | Verify Stripe keys (test vs live) match |
| Emails not sending | Check `SMTP_*` env vars and Gmail app password |
| Analytics not tracking | Confirm `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` starts with `G-` |
| Live stream blank | Check YouTube channel ID and `YOUTUBE_API_KEY` |
| Images not loading on deploy | Add image hostname to `next.config.ts` remotePatterns |
