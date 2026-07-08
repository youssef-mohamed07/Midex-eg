"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type ExplorerProduct = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  image: string;
  category: string;
  categoryLabel: string;
};

type ExplorerCategory = {
  slug: string;
  label: string;
  count: number;
};

type Labels = {
  all: string;
  viewDetails: string;
  requestQuote: string;
  quoteShort: string;
  productsLabel: string;
  explore: string;
};

type Props = {
  products: ExplorerProduct[];
  categories: ExplorerCategory[];
  labels: Labels;
  initialCategory?: string | null;
};

function quoteUrlFor(title: string) {
  return `/contact?item=${encodeURIComponent(title)}`;
}

export function ProductsExplorer({ products, categories, labels, initialCategory = null }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [activeSlug, setActiveSlug] = useState<string>(() => {
    const first = initialCategory
      ? products.find((p) => p.category === initialCategory)
      : products[0];
    return first?.slug ?? products[0]?.slug ?? "";
  });

  const filtered = useMemo(
    () =>
      activeCategory ? products.filter((p) => p.category === activeCategory) : products,
    [activeCategory, products],
  );

  const active = useMemo(
    () => filtered.find((p) => p.slug === activeSlug) ?? filtered[0],
    [filtered, activeSlug],
  );

  function handleCategory(slug: string | null) {
    setActiveCategory(slug);
    const next = slug ? products.find((p) => p.category === slug) : products[0];
    if (next) setActiveSlug(next.slug);
  }

  if (!active) return null;

  return (
    <div>
      <div className="relative -mx-4 sm:mx-0">
        <div
          className="pointer-events-none absolute inset-y-0 start-0 z-10 w-6 bg-gradient-to-r from-white to-transparent sm:hidden"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 end-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:hidden"
          aria-hidden
        />
        <div
          className="flex gap-1.5 overflow-x-auto px-4 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 sm:px-0 [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label={labels.all}
        >
          <button
            type="button"
            onClick={() => handleCategory(null)}
            className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
              !activeCategory
                ? "bg-midex-navy text-white"
                : "border border-midex-line/70 bg-white text-midex-gray/75 hover:border-midex-mint/40 hover:text-midex-blue"
            }`}
          >
            {labels.all}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => handleCategory(cat.slug)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
                activeCategory === cat.slug
                  ? "bg-midex-navy text-white"
                  : "border border-midex-line/70 bg-white text-midex-gray/75 hover:border-midex-mint/40 hover:text-midex-blue"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: self-contained product cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
        {filtered.map((product) => (
          <article
            key={product.slug}
            className="group relative overflow-hidden rounded-2xl border border-midex-line/60 bg-midex-navy shadow-md"
          >
            <Link href={`/products/${product.slug}`} className="block no-underline">
              <div className="relative h-44 w-full sm:h-40">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midex-navy via-midex-navy/45 to-transparent"
                  aria-hidden
                />
                <span className="absolute start-3 top-3 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  {product.categoryLabel}
                </span>
                <h3 className="absolute inset-x-0 bottom-0 p-4 font-display text-base font-bold leading-snug text-white">
                  {product.title}
                </h3>
              </div>
            </Link>
            <div className="flex gap-2 p-3">
              <Link
                href={`/products/${product.slug}`}
                className="group inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-midex-navy no-underline transition-colors hover:bg-midex-mint"
              >
                {labels.viewDetails}
                <span className="mx-arrow">→</span>
              </Link>
              <Link
                href={quoteUrlFor(product.title)}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white no-underline transition-colors hover:border-midex-mint/50 hover:text-midex-mint"
              >
                {labels.quoteShort}
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop: interactive split explorer */}
      <div className="hidden gap-6 lg:grid lg:grid-cols-[1fr_minmax(0,1.15fr)]">
        <div className="order-2 lg:sticky lg:top-[calc(var(--midex-header-height)+1rem)] lg:self-start">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-midex-line/60 bg-midex-navy shadow-xl shadow-midex-navy/15">
            <div className="relative aspect-[16/11] w-full">
              {filtered.map((product) => (
                <Image
                  key={product.slug}
                  src={product.image}
                  alt={product.title}
                  fill
                  className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    product.slug === active.slug
                      ? "scale-100 opacity-100"
                      : "scale-105 opacity-0"
                  }`}
                  sizes="55vw"
                  priority={product.slug === products[0]?.slug}
                />
              ))}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midex-navy via-midex-navy/40 to-transparent"
                aria-hidden
              />
              <span className="absolute start-4 top-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                {active.categoryLabel}
              </span>
            </div>

            <div className="p-7">
              <h3 className="font-display text-2xl font-bold leading-tight text-white">
                {active.title}
              </h3>
              <p className="mt-2.5 text-base leading-relaxed text-white/70">
                {active.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/products/${active.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-midex-navy no-underline transition-colors hover:bg-midex-mint"
                >
                  {labels.viewDetails}
                  <span className="mx-arrow">→</span>
                </Link>
                <Link
                  href={quoteUrlFor(active.title)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:border-midex-mint/50 hover:text-midex-mint"
                >
                  {labels.requestQuote}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <ul className="order-1 flex flex-col gap-1.5">
          {filtered.map((product, index) => {
            const isActive = product.slug === active.slug;
            return (
              <li key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  onMouseEnter={() => setActiveSlug(product.slug)}
                  onFocus={() => setActiveSlug(product.slug)}
                  className={`group flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-start no-underline transition-all duration-300 ${
                    isActive
                      ? "border-midex-navy/15 bg-midex-navy text-white shadow-lg shadow-midex-navy/15"
                      : "border-midex-line/60 bg-white text-midex-navy hover:border-midex-mint/40 hover:bg-midex-surface/40"
                  }`}
                >
                  <span
                    className={`shrink-0 font-display text-sm font-bold tabular-nums transition-colors ${
                      isActive ? "text-midex-mint" : "text-midex-gray/40 group-hover:text-midex-blue"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                        isActive ? "text-white/60" : "text-midex-blue"
                      }`}
                    >
                      {product.categoryLabel}
                    </span>
                    <span className="mt-0.5 block line-clamp-2 font-display text-base font-bold leading-snug">
                      {product.title}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-lg transition-all duration-300 ${
                      isActive
                        ? "translate-x-0 text-midex-mint opacity-100"
                        : "-translate-x-1 text-midex-gray/30 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
