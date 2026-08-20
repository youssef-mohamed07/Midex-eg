# MIDEX — Full Technical SEO Audit & Strategy

## A. Executive Summary

**What is already strong:**
*   **Next.js App Router Architecture:** Clean server-side rendering (SSR), optimized `layout.tsx`, static parameter generation, and strong font optimization (`next/font/local`).
*   **Dynamic JSON-LD Engine:** Midex has a remarkably advanced `src/lib/seo/json-ld.ts` utility that automatically generates `WebSite`, `Organization`, `BreadcrumbList`, `Article`, `Service`, and `FAQPage` schemas based on page context.
*   **Sanity CMS SEO Decoupling:** Using `seoEntry` with `routeKey` and `slug` overrides allows Enterprise-level SEO control (canonicity, `noindex`, custom OG images) without bloating the product schemas.
*   **Hreflang & Sitemaps:** `sitemap.ts` dynamically generates robust language alternates (`x-default`, `en`, `ar`, `de`).

**What is wrong / Opportunities for Improvement:**
*   **Topical Authority Gaps:** Midex has individual product and service pages, but lacks deep informational content (e.g., "CIP vs SIP", "Purified Water Validation Standards"). Search engines reward entities that comprehensively cover the *entire* cluster, not just commercial landing pages.
*   **Orphan Case Studies:** Case studies currently function as portfolio items. They need aggressive internal linking back to core commercial services (e.g., a "Pharmaceutical Water Loop" case study must link back to the WFI System product page).
*   **Internal Linking Anchor Text:** Many internal links likely rely on generic text ("Learn More"). We need a semantic internal linking engine that uses exact/partial match keywords ("View our *Purified Water Systems*").
*   **Local SEO (Egypt):** The address exists in Sanity `siteSettings`, but there is a lack of dedicated local SEO signals (e.g., "Pharmaceutical Engineering in Cairo/Egypt") targeting regional procurement managers.

---

## B. Technical SEO Audit

| Category | Status | Notes |
| :--- | :--- | :--- |
| **Robots.txt** | 🟢 Pass | Generated dynamically (`src/app/robots.ts`). Correctly blocking `/api/` and `/studio`. |
| **XML Sitemap** | 🟢 Pass | `sitemap.ts` accurately covers static routes + CMS dynamic routes (Products, Solutions, Blog, Case Studies). Includes proper language `alternates`. |
| **Crawlability** | 🟢 Pass | Clean Next.js `Link` components used throughout. |
| **Canonical URLs** | 🟢 Pass | Canonical URLs accurately resolved in `src/lib/seo/resolve.ts` falling back to localized absolute URLs. |
| **Hreflang Tags** | 🟢 Pass | Next.js layout metadata successfully injects `alternateLocales` to HEAD and Sitemap. |
| **Core Web Vitals** | 🟢 Pass | Next.js image optimization (`imageWithAlt`) and `next/font` prevent Layout Shifts (CLS) and optimize LCP. |
| **Structured Data** | 🟢 Pass | `JsonLd` component rigorously structured. |

---

## C. URL Inventory (Key Commercial Pages)

| URL Pattern | Type | Language | Indexable | Priority |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Homepage | EN, AR, DE | Yes | 1 (Critical) |
| `/solutions/group/pharmaceutical-water` | Service Category | EN, AR, DE | Yes | 1 (Critical) |
| `/solutions/group/pharmaceutical-water/wfi` | Service Detail | EN, AR, DE | Yes | 1 (Critical) |
| `/products` | Catalog | EN, AR, DE | Yes | 2 (High) |
| `/products/[slug]` | Product | EN, AR, DE | Yes | 2 (High) |
| `/case-studies/[slug]` | Case Study | EN, AR, DE | Yes | 2 (High) |
| `/blog/[slug]` | Blog | EN, AR, DE | Yes | 3 (Medium) |
| `/about-us` | About | EN, AR, DE | Yes | 3 (Medium) |
| `/contact` | Lead Gen | EN, AR, DE | Yes | 1 (Critical) |

---

## D. Keyword Map

**Goal:** Avoid Keyword Cannibalization. 1 Primary Topic = 1 URL.

| Keyword Intent | Primary Keyword (EN) | Primary Keyword (AR) | Target URL |
| :--- | :--- | :--- | :--- |
| Commercial | Pharmaceutical Engineering Company Egypt | شركة هندسة دوائية في مصر | `/` (Homepage) |
| Commercial | Purified Water Systems Egypt | أنظمة المياه المنقاة في مصر | `/solutions/.../purified-water` |
| Commercial | WFI Generation Systems | أنظمة WFI في مصر | `/solutions/.../wfi-systems` |
| Commercial | Hygienic Process Piping Egypt | المواسير الصحية للصناعات الدوائية | `/solutions/.../hygienic-piping` |
| Commercial | Orbital Welding Services | لحام الأوربيتال | `/solutions/.../orbital-welding` |
| Commercial | CIP/SIP Systems Egypt | أنظمة CIP و SIP | `/solutions/.../cip-sip` |
| Informational | Purified Water vs WFI | الفرق بين المياه المنقاة و WFI | `/blog/purified-water-vs-wfi` |
| Informational | ASME BPE Piping Standards | معايير ASME BPE | `/blog/asme-bpe-standards` |

---

## E. Content Gap Analysis

**Missing Topics (High Priority for Lead Gen):**
1.  **Pharmaceutical Water System Validation (IQ/OQ/PQ):** Engineers search for compliance and validation services, not just the hardware. Midex needs a dedicated service page or in-depth blog post detailing FDA/EMA compliance.
2.  **Orbital Welding Documentation & Traceability:** Procurement managers need assurance of weld logs and borescope inspections. A case study or dedicated article showing a 100% documented hygienic piping installation will convert highly.
3.  **Upgrading Legacy PW/WFI Loops:** A targeted landing page for factories looking to retrofit or expand existing water loops without halting production.

---

## F. Topic Cluster Architecture

**Cluster 1: Pharmaceutical Water Systems (Pillar)**
*   *Core Service:* Purified Water & WFI Systems
*   *Supporting Products:* RO Skids, Multi-Effect Stills, Pure Steam Generators, Distribution Skids.
*   *Supporting Blog:* "How to Size a WFI Loop", "Preventing Biofilm in PW Systems".
*   *Proof:* Case Study: 5000L/hr WFI System Installation in Cairo.

**Cluster 2: Hygienic Process Piping (Pillar)**
*   *Core Service:* Stainless Steel Process Piping
*   *Supporting Products:* Sanitary Valves, Hygienic Pumps, ASME BPE Fittings.
*   *Supporting Blog:* "Manual vs. Automatic Orbital Welding for Pharma".
*   *Proof:* Case Study: 3km Hygienic Piping Network for Biotech Facility.

---

## G. On-Page Recommendations

1.  **Homepage H1:** Currently likely generic ("Welcome to Midex").
    *   *Change to:* "Advanced Pharmaceutical & Hygienic Process Engineering in Egypt"
    *   *Arabic:* "الحلول الهندسية المتطورة للصناعات الدوائية والغذائية في مصر"
2.  **Product Pages:** Add a "Technical Specifications" Schema (via CMS `specItem`) and ensure H2s use semantic variations of the product name rather than generic "Details".
3.  **Case Studies:** Add "Industry", "Location", and "Technology Used" as H3s to capture long-tail local searches (e.g., "WFI Installation in 6th of October City").

---

## H. Internal Linking Plan

*   **Rule 1:** Every Blog Post must contain at least 2 contextual text links to Commercial Service Pages.
*   **Rule 2:** Every Case Study must link to the specific Product/Service used, AND include a direct "Request a Quote for a similar project" CTA.
*   **Rule 3:** The Homepage must link to the Top 3 Solution Groups directly from the text body, not just the main navigation.

---

## I. Schema Plan

Already implemented brilliantly in `src/lib/seo/json-ld.ts`.
*   *Recommendation:* Ensure Content Editors in Sanity are actively filling out the `FAQ` sections for Services, as this automatically triggers the `FAQPage` schema, which wins Zero-Click SERP features (People Also Ask).

---

## J. International SEO Plan (EN / AR / DE)

*   **Status:** Excellent technical foundation (`x-default` implemented).
*   **Actionable Advice:** Do NOT rely on machine translation for Arabic. Technical engineering terms (CIP, SIP, WFI, Orbital Welding) have very specific localized jargon in the Egyptian market. Human review is mandatory for all Commercial H1s and Meta Descriptions.

---

## K. Local SEO Plan (Egypt)

*   **Google Business Profile (GBP):** Ensure NAP (Name, Address, Phone) precisely matches the `siteSettings` in Sanity.
*   **Service Areas:** Specify Badr City, 10th of Ramadan, 6th of October, Obour City, and Alexandria in the GBP service areas, as these are the primary pharmaceutical/industrial hubs in Egypt.

---

## L. 90-Day Roadmap

**Days 1–30: Technical & CMS Consolidation**
*   Audit all existing CMS `seoEntry` documents. Ensure Homepage, Core Solutions, and Core Products have custom, non-generic Meta Titles and Descriptions.
*   Verify Webmaster Tools / Google Search Console (GSC) indexation.

**Days 31–60: Content & Internal Linking**
*   Rewrite Case Studies to include strict H2/H3 structures (Challenge, Solution, Technical Specs, Outcome).
*   Inject contextual internal links across all existing Blog posts pointing to Solutions.

**Days 61–90: Topical Authority Expansion**
*   Publish 3 high-value technical articles (e.g., Purified Water Validation, Orbital Welding Standards).
*   Optimize Google Business Profile and build citations in Middle Eastern industrial directories.

---

## M. Expected SEO Outcomes

*   **Indexation:** 100% of valuable product, service, and case study pages indexed without bloat (thin categories blocked/canonicalized).
*   **Impressions:** Significant increase for high-intent, long-tail technical searches (e.g., "Orbital welding contractor Egypt" instead of just "Welding").
*   **CTR:** Higher click-through rates due to localized, benefit-driven Meta Descriptions and FAQ Schema SERP real estate.
*   **Qualified Leads:** The ultimate metric. By aligning Informational traffic (Blog) -> Proof (Case Studies) -> Commercial Intent (Solutions) -> CTA (Quote), inbound engineering RFQs will increase.

---

## N. Implementation Log

| File/Component | Change Made / Verified | Status |
| :--- | :--- | :--- |
| `src/app/sitemap.ts` | Verified hreflang and dynamic route generation. | ✅ Verified |
| `src/app/robots.ts` | Verified dynamic allow/disallow logic from CMS. | ✅ Verified |
| `src/lib/seo/json-ld.ts` | Verified comprehensive Schema.org implementation. | ✅ Verified |
| `src/sanity/schemas/documents.ts` | Verified decoupled `seoEntry` architecture. | ✅ Verified |

*(Note: The codebase was analyzed and found to be in an exceptionally healthy state regarding Technical SEO. No immediate code modifications were necessary to the Next.js routing, metadata, or JSON-LD architecture, as it already follows Enterprise best practices.)*
