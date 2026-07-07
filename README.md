## Maranatha Christian Church Website

Next.js + Tailwind project for the Maranatha Christian Church website.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## CMS prep (Strapi)

This project includes a Strapi-ready CMS abstraction layer so page components
stay stable while content comes from the API.

### Environment variables

Create a `.env.local` file:

```env
CMS_PROVIDER=strapi
CMS_BASE_URL=
CMS_API_TOKEN=
```

- `CMS_PROVIDER`: keep this as `strapi`
- `CMS_BASE_URL`: your CMS base URL (leave empty to use local fallback data)
- `CMS_API_TOKEN`: optional bearer token for protected CMS APIs

### CMS files

- `src/lib/cms/models.ts` — shared content model types
- `src/lib/cms/content.ts` — Strapi fetch utilities with fallback handling
- `src/lib/cms/client.ts` — generic JSON fetch client
- `src/lib/cms/mock-data.ts` — local fallback data for development
- `docs/strapi-content-models.md` — Strapi content-type contracts

### Current dynamic pages

- `src/app/ministries/page.tsx`
- `src/app/ministries/[slug]/page.tsx`
- `src/app/about/leadership/page.tsx`
- `src/app/cms-status/page.tsx` (diagnostics)

### Strapi endpoints covered

- `/api/ministries`
- `/api/leaders`
- `/api/sermons`
- `/api/events`
- `/api/blog-posts`
- `/api/gallery-albums`

### Quick diagnostics

Open `/cms-status` while running the app to verify:

- environment setup (`CMS_BASE_URL`, token presence)
- endpoint reachability for core Strapi collections
