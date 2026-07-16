# Harris Growth Partners — Website

A single-page marketing site built with Next.js and Tailwind CSS.

## Running it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Editing content

Almost everything text-based lives in these files:

- [`src/lib/site-config.ts`](src/lib/site-config.ts) — business name, tagline, founder name, contact email, Formspree ID
- [`src/components/`](src/components/) — one file per section (`Hero.tsx`, `Services.tsx`, `About.tsx`, etc.). Section copy lives directly in each file.
- [`src/app/globals.css`](src/app/globals.css) — the color palette (`--color-*` variables). Change these to retheme the whole site.

## Turning on the contact form

The contact form works out of the box, but needs a place to send submissions:

1. Create a free account at [formspree.io](https://formspree.io) and add a new form.
2. Copy the form ID (the part after `f/` in the endpoint Formspree gives you).
3. Paste it into `formspreeId` in [`src/lib/site-config.ts`](src/lib/site-config.ts).

Until you do this, the contact section shows a simple "email me directly" message instead of the form, so the site is never broken.

## Deploying

The simplest option is [Vercel](https://vercel.com/new) (made by the Next.js team, free tier is enough for this site):

1. Push this project to a GitHub repo.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — just click Deploy.

Before deploying, update `url` in `src/lib/site-config.ts` to your real domain (used for SEO tags).
