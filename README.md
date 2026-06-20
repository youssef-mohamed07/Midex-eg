# Midex

**Midex for Integrated Projects and Contracting** — corporate website for pharmaceutical, food, and cosmetics engineering.

Built with **Next.js 16**, React 19, Tailwind CSS 4, and **next-intl** (English / Arabic / German).

---

## Features

- **Multilingual** — EN, AR (RTL), DE with flag language switcher; locale prefix on every URL (`/en`, `/ar`, `/de`); first visit locale detected from IP country (falls back to browser language)
- **Localized content** — products, solutions, blog, news, services, and testimonials translated per locale
- **SEO collection** — per-page meta titles, descriptions, Open Graph, Twitter cards, JSON-LD, `sitemap.xml`, and `robots.txt`
- **Responsive UI** — shared layout, hero, stats, testimonials carousel, client logo marquee, contact form
- **Static generation** — product, solution, and blog routes pre-rendered at build time

---

## Requirements

| Tool | Version |
|------|---------|
| [Node.js](https://nodejs.org/) | 20+ |

```bash
brew install node
```

---

## Quick start

```bash
git clone https://github.com/youssef-mohamed07/Midex-eg.git
cd Midex-eg

npm install
npm run sync:images   # optional — download images from midex-eg.org
cp .env.example .env.local   # optional — see Environment
npm run dev
```

Open **http://localhost:3000** — you are redirected to a locale-prefixed path (e.g. `/en`, `/ar`, `/de`).

| Language | Example |
|----------|---------|
| English | `/en/products` |
| Arabic (RTL) | `/ar/products` |
| German | `/de/products` |

**Default locale on first visit:** inferred from the visitor's IP country (Egypt and Arab countries → Arabic, DACH → German, otherwise English). If geo is unavailable (local dev), the browser `Accept-Language` header is used. Users can override via the header language switcher (stored in a cookie).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run sync:images` | Sync images into `public/images/` |

---

## Environment

Create `.env.local` from `.env.example`:

```bash
# Production site URL (canonical links, sitemap, Open Graph)
NEXT_PUBLIC_SITE_URL=https://www.midex-eg.com

# Contact form email (production)
RESEND_API_KEY=re_...
CONTACT_FROM=Midex Website <noreply@midex-eg.com>
```

- **Development:** contact form submissions are logged to the terminal.
- **Production:** set `RESEND_API_KEY` for email delivery to `sales@midex-eg.com`.

---

## Project structure

```
Midex/
├── src/
│   ├── app/[locale]/       # App Router pages + API routes
│   ├── components/         # UI, layout, home, products, solutions, blog…
│   ├── content/            # Products, solutions, site data
│   │   ├── i18n/           # AR / DE content overlays
│   │   └── seo/            # SEO entries (CMS-ready)
│   ├── cms/collections/    # SEO collection schema
│   ├── lib/seo/            # Metadata, JSON-LD, sitemap helpers
│   └── i18n/               # next-intl routing & navigation
├── messages/               # UI strings (en, ar, de)
├── public/images/          # Static assets
├── scripts/sync-images.sh
└── package.json
```

---

## Site map

```
/en/                           Home (English)
/ar/                           Home (Arabic, RTL)
/de/                           Home (German)
/en/about-us                   About
/en/contact                    Contact form
/en/products                   Product catalog
/en/products/[slug]            Product detail
/en/products/category/[slug]   Category redirect → catalog filter
/en/solutions                  Solutions overview
/en/solutions/group/[slug]     Solution group
/en/solutions/group/[slug]/[child] Service detail
/en/solutions/[slug]           Featured solution
/en/blog                       Blog listing
/en/blog/[slug]                Blog post
/sitemap.xml                   SEO sitemap
/robots.txt                    Robots rules
```

---

## SEO content

Edit SEO per page/locale in `src/content/seo/entries.ts`. The collection schema lives in `src/cms/collections/seo.ts` and can be mapped to a headless CMS later.

Templates support placeholders such as `{title}` and `{description}` for dynamic routes (products, blog posts, solutions).

---

## Contact

- **Email:** sales@midex-eg.com
- **Phone:** 01026228403 / 01006683803

---

## License

All rights reserved — Midex for Integrated Projects and Contracting.
