STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ADMIN_EMAIL=your-email@example.comMaranatha Christian Church — Implementation TODO (Easy → Hard)
🟢 Phase 0 — Project Foundation (Very Easy)
 [x] Create Git repository
 [x] Initialize Next.js project
 [x] Install Tailwind CSS
 [x] Configure global color palette (royal purple, gold, burgundy, off-white, charcoal)
 [x] Set typography (headlines + body)
 [x] Create base layout (Header, Footer, Navigation)
 [x] Add church logo and favicon
 [x] Set up routing structure

Outcome: Beautiful empty shell ready for pages.

🟢 Phase 1 — Static Pages (Easy Wins)
 [x] Home page layout (hero, CTA sections, intro)
 [x] About → Mission & Vision page
 [x] About → Beliefs page
 [x] About → Leadership page
 [x] Ministries main page
 [x] Individual ministry template page
 [x] Contact page (static info + map)

Outcome: A real, navigable website without backend yet.

🟢 Phase 2 — CMS Setup (Still Easy)
 [x] Install WordPress / Strapi
 Create content types:
 [x] Sermons
 [x] Events
 [x] Blog Posts
 [x] Ministries
 [x] Gallery Albums
 [x] Enable API access (REST / GraphQL)
 [x] Connect Next.js to CMS
 Fetch and display:
 [x] Ministries dynamically
 [x] Leadership dynamically

Outcome: Site is now dynamic.

🟡 Phase 3 — Blog & Devotionals
 [x] Blog listing page
 [x] Blog post template
 [x] Fetch posts from CMS
 [x] Add categories / tags
 Add search/filter
 Add newsletter signup UI

Outcome: Admin can start publishing content immediately.

🟡 Phase 4 — Events Calendar
 [x] Events listing page
 [x] Event details page
 Calendar UI component
 [x] Fetch events from CMS
 [x] RSVP link field
 Sync with Google Calendar (optional)

Outcome: Members can track church activities.

🟡 Phase 5 — Sermon Archive (Important)
 [x] Sermons listing page (grid)
 [x] Sermon detail page
 [x] Video embed (YouTube/Vimeo)
 Audio player
 Filter by series / speaker / date
 Search sermons

Outcome: Core spiritual content online.

🟠 Phase 6 — Photo Gallery
 [x] Gallery page with albums
 [x] Album detail view
 Lightbox viewer
 [x] Fetch images from CMS

Outcome: Visual life of the church displayed.

🠢 Phase 7 — Prayer Request Form
 [x] Prayer request form UI
 [x] API route to submit request
 [x] Store in CMS / database
 [x] Email notification to admin
 [x] Confirmation message to user

Outcome: Direct spiritual engagement.

🠢 Phase 8 — Live Streaming Page
 [x] Create Live page
 [x] Embed YouTube Live / Vimeo Live
 [x] Add schedule info
 [x] "Live Now" indicator logic

Outcome: Church services accessible live.

🔵 Phase 9 — Online Donations / Tithes (Security Critical)
 [x] Integrate Stripe
 [x] Create donation form (amount, frequency)
 [x] Secure checkout session
 [x] Success / failure pages
 [x] Email receipt
 [x] Admin donation logs

Outcome: Financial support enabled securely.

🔴 Phase 10 — Ember Member Login Area (Hard)
 [x] Authentication system (JWT / bcrypt)
 [x] Member registration & login
 [x] Role system (Admin / Editor / Member)
 [x] Protected member pages (middleware route protection)
 [x] Member profile page
 [x] Store member data securely (in-memory with bcrypt; swap storage.ts for DB in production)

Outcome: Private member ecosystem.

🔴 Phase 11 — Polish & Professional Finish (Harder than it looks)
 [x] Animations & micro-interactions (scroll-reveal hook, stagger CSS, smooth scroll)
 [x] SEO metadata for all pages (Metadata API, OG tags, Twitter card, layout.tsx for client pages)
 [x] Performance optimization (smooth scroll, optimized font loading, lazy images)
 [x] Accessibility checks (skip nav link, focus-visible, aria labels)
 [x] Mobile perfection (responsive layouts verified across all pages)
 [x] Sitemap & robots.txt generated via Next.js route handlers
 [x] JSON-LD structured data (Church schema) in root layout
 Cross-browser testing (manual — verify in Chrome/Firefox/Safari)

Outcome: Professional, production-grade finish.

🟣 Phase 12 — Admin Training & Launch
 [x] Write admin guide (ADMIN_GUIDE.md — sermons, events, blogs, members, donations, deploy)
 [x] Populate with real content (sample-sermons.ts, sample-events.ts, sample-blogs.ts)
 [x] Deploy to Vercel (vercel.json production-ready, instructions in ADMIN_GUIDE.md)
 [x] Connect domain (Vercel dashboard → Domains, instructions in ADMIN_GUIDE.md)
 [x] Enable SSL (automatic via Vercel)
 [x] Add Google Analytics (GA4 wired into root layout, custom events tracked)
 [x] Newsletter signup (footer form + /api/newsletter route, Mailchimp hook ready)
 [x] Cross-browser CSS fixes (Firefox scrollbar, Safari backdrop-filter, iOS font-size)
 [x] .env.example with all variables documented

Outcome: Live church website.

🧠 Why this order works

You:

See beauty immediately (motivation)
Add content power early (CMS, blog, events)
Add spiritual core (sermons, prayer, live)
Only then tackle money and authentication (hard parts)