# Editing site copy (editors)

User-facing text should be changed in **Sanity Studio**, not in `messages/*.json` or code.

## Preferred order

1. **Page documents** (Homepage, About, Contact, Products, Solutions, Blog) — heroes, section headers, FAQs, CTAs, form copy.
2. **Site Settings → Nav & Footer** — navigation labels, footer columns, social FAB, language labels.
3. **Collections** — products, solutions, blog posts, case studies, partners, etc.
4. **UI Messages** — shared leftovers (empty states, rare chrome). Organized under Site → UI Messages by area.

## Do not edit for content

- `messages/en.json` / `ar.json` / `de.json` — technical fallbacks only
- React components / constants — for developers

## Homepage section order

Homepage → Bottom CTA group → **Section order** list. Reorder body sections without code.
