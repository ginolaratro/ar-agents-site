# AR Agents — marketing site

Static Next.js marketing site. Home page + five industry pages, no database, no auth.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your domain — used in `sitemap.xml` |
| `NEXT_PUBLIC_DEMO_URL` | Where "Book a demo" links (Calendly, HubSpot, etc.) |
| `NEXT_PUBLIC_APP_URL` | Your app's address. "Sign in" only appears when set. |

## Deploy on Vercel (≈ 5 minutes)

1. Go to [vercel.com/new](https://vercel.com/new) and import this repo.
2. No build settings need to be changed.
3. Add the three env vars under **Project Settings → Environment Variables**.
4. Connect your domain under **Project Settings → Domains**.

## Local development

```bash
npm install
cp .env.example .env.local  # fill in values
npm run dev
```

## Customise

All brand copy, product names and industry content live in [`src/app/content.ts`](src/app/content.ts).
Replace `BRAND.name` and the `INDUSTRIES` array to adapt the site to a new name or vertical.
