"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { CaseStudy } from "@/lib/cms/types";

type Labels = {
  searchPlaceholder: string;
  all: string;
  year: string;
  capability: string;
  industry: string;
  results: string;
  noResults: string;
  clearFilters: string;
  read: string;
};

type Props = {
  studies: CaseStudy[];
  labels: Labels;
};

function parseScope(scope: string) {
  const title = (scope.split(/Location:/i)[0] ?? scope)
    .replace(/\.\s*$/, "")
    .trim();
  const locationMatch = scope.match(/Location:\s*(.+?)(?:\.\s*Year|$)/i);
  const location = locationMatch?.[1]?.replace(/\.\s*$/, "").trim() ?? "";
  return { title, location };
}

function clientInitials(client: string) {
  const parts = client.replace(/[()]/g, " ").split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "M";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
}

const COVER_POOLS: { match: RegExp; images: string[] }[] = [
  {
    match: /\b(wfi|purified water|pw|ro|water station|distiller|membrane)\b/i,
    images: [
      "/images/hero/slide-2.png",
      "/images/services/passivation-test.png",
      "/images/news/news-1756730723.png",
      "/images/events/event-1756814991.jpg",
    ],
  },
  {
    match: /\b(piping|stainless|ss |weld|orbital|homogenizer|pure steam)\b/i,
    images: [
      "/images/services/orbital-welding.png",
      "/images/services/mirror-finish.png",
      "/images/services/pickling-passivation.png",
      "/images/services/bore-scoping.png",
    ],
  },
  {
    match: /\b(filter|filtration|housing)\b/i,
    images: [
      "/images/products/product-1725277497.webp",
      "/images/products/product-1725277406.webp",
      "/images/services/spray-ball.png",
      "/images/news/news-1756383611.png",
    ],
  },
  {
    match: /\b(compressed air|clean gas|sanitary drain|cip|sip|scada)\b/i,
    images: [
      "/images/services/mechanical-polishing.png",
      "/images/services/welding-docs.png",
      "/images/hero/slide-3.png",
      "/images/events/event-1755506225.jpg",
    ],
  },
  {
    match: /\b(spare|heat exchanger|hex|dosing|metering)\b/i,
    images: [
      "/images/products/product-1725239365.jpg",
      "/images/products/product-1724113383.jpg",
      "/images/services/roughness-test.png",
      "/images/events/event-1755506266.jpg",
    ],
  },
];

const DEFAULT_COVERS = [
  "/images/events/event-1755506196.jpg",
  "/images/events/event-1755506209.jpg",
  "/images/events/event-1755506225.jpg",
  "/images/events/event-1755506266.jpg",
  "/images/events/event-1755506276.jpg",
  "/images/hero/slide-1.png",
  "/images/news/news-1756383611.png",
  "/images/blog/blog-1725325779.jpg",
];

function hashSlug(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function resolveCover(study: CaseStudy) {
  const galleryCover = study.gallery?.find(Boolean);
  if (galleryCover) return { src: galleryCover, kind: "photo" as const };

  const haystack = `${study.scope} ${study.tags.join(" ")}`;
  for (const pool of COVER_POOLS) {
    if (pool.match.test(haystack)) {
      const index = hashSlug(study.slug) % pool.images.length;
      return { src: pool.images[index]!, kind: "photo" as const };
    }
  }

  const index = hashSlug(study.slug) % DEFAULT_COVERS.length;
  return { src: DEFAULT_COVERS[index]!, kind: "photo" as const };
}

function FilterSelect({
  label,
  options,
  value,
  onChange,
  allLabel,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (next: string | null) => void;
  allLabel: string;
}) {
  if (options.length === 0) return null;

  return (
    <label className="group relative min-w-0 flex-1 sm:min-w-[9.5rem] sm:flex-none">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-midex-navy/45">
        {label}
      </span>
      <span className="relative block">
        <select
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value || null)}
          className="w-full appearance-none rounded-xl border border-midex-line/80 bg-white py-2.5 pe-9 ps-3 text-sm font-medium text-midex-navy outline-none transition hover:border-midex-navy/25 focus:border-midex-mint/70 focus:ring-2 focus:ring-midex-mint/20"
          aria-label={label}
        >
          <option value="">{allLabel}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-midex-navy/40 transition group-hover:text-midex-navy/70"
          aria-hidden
        >
          ▾
        </span>
      </span>
    </label>
  );
}

function YearSegment({
  label,
  options,
  value,
  onChange,
  allLabel,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (next: string | null) => void;
  allLabel: string;
}) {
  if (options.length === 0) return null;

  const items = [null, ...options] as const;

  return (
    <div className="min-w-0">
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-midex-navy/45">
        {label}
      </p>
      <div
        className="inline-flex max-w-full overflow-x-auto rounded-xl border border-midex-line/80 bg-midex-surface/60 p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="listbox"
        aria-label={label}
      >
        {items.map((item) => {
          const selected = item === value || (item === null && !value);
          const key = item ?? "all";
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(item)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:px-3.5 sm:text-sm ${
                selected
                  ? "bg-midex-navy text-white shadow-sm"
                  : "text-midex-navy/60 hover:bg-white hover:text-midex-navy"
              }`}
            >
              {item ?? allLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CaseStudyCard({ study, readLabel }: { study: CaseStudy; readLabel: string }) {
  const { title, location } = parseScope(study.scope);
  const year = /^\d{4}$/.test(study.statValue) ? study.statValue : null;
  const cover = resolveCover(study);
  const logo = study.image || null;

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-midex-line/80 bg-white no-underline transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/40 hover:shadow-[0_24px_50px_-32px_rgba(11,31,59,0.35)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-midex-navy">
        <Image
          src={cover.src}
          alt=""
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-midex-navy/75 via-midex-navy/15 to-midex-navy/10"
          aria-hidden
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3.5 sm:p-4">
          {year ? (
            <span className="rounded-lg bg-white/95 px-2.5 py-1 text-[11px] font-bold tracking-wide text-midex-navy shadow-sm">
              {year}
            </span>
          ) : (
            <span />
          )}
          <span className="rounded-lg bg-midex-navy/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            {study.industry}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 sm:p-4">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/70 bg-white shadow-sm sm:h-14 sm:w-14">
            {logo ? (
              <Image
                src={logo}
                alt={study.client}
                fill
                className="object-contain p-1.5"
                sizes="56px"
              />
            ) : (
              <span className="text-xs font-bold tracking-wide text-midex-navy/75">
                {clientInitials(study.client)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
        <h3 className="font-display text-xl font-bold leading-snug text-midex-navy transition-colors group-hover:text-midex-blue">
          {study.client}
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-midex-navy/80">
          {title || study.scope}
        </p>
        {location ? (
          <p className="mt-2 line-clamp-1 text-sm text-midex-gray/60">{location}</p>
        ) : null}

        <div className="mt-auto pt-5">
          <span className="mx-link-arrow text-sm font-semibold text-midex-navy group-hover:text-midex-blue">
            {readLabel}
            <span className="mx-arrow">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CaseStudiesExplorer({ studies, labels }: Props) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState<string | null>(null);
  const [capability, setCapability] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);

  const years = useMemo(() => {
    const set = new Set<string>();
    for (const study of studies) {
      if (/^\d{4}$/.test(study.statValue)) set.add(study.statValue);
    }
    return [...set].sort((a, b) => Number(b) - Number(a));
  }, [studies]);

  const capabilities = useMemo(() => {
    const counts = new Map<string, number>();
    for (const study of studies) {
      for (const tag of study.tags) {
        const cleaned = tag.replace(/\.$/, "").trim();
        if (!cleaned) continue;
        counts.set(cleaned, (counts.get(cleaned) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .filter(([, count]) => count >= 3)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag);
  }, [studies]);

  const industries = useMemo(() => {
    const set = new Set(studies.map((study) => study.industry).filter(Boolean));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [studies]);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();

    return studies.filter((study) => {
      if (year && study.statValue !== year) return false;
      if (industry && study.industry !== industry) return false;
      if (capability) {
        const hasTag = study.tags.some(
          (tag) => tag.replace(/\.$/, "").trim() === capability,
        );
        if (!hasTag) return false;
      }
      if (!q) return true;

      const haystack = [
        study.client,
        study.industry,
        study.scope,
        study.outcome,
        ...study.tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [studies, year, industry, capability, deferredQuery]);

  const hasFilters = Boolean(query.trim() || year || capability || industry);

  function clearFilters() {
    setQuery("");
    setYear(null);
    setCapability(null);
    setIndustry(null);
  }

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-midex-line/80 bg-gradient-to-b from-white to-midex-surface/40">
        <div className="border-b border-midex-line/60 px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
          <label className="relative block">
            <span className="sr-only">{labels.searchPlaceholder}</span>
            <span
              className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-midex-navy/35"
              aria-hidden
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full rounded-xl border border-midex-line/70 bg-white py-3 pe-4 ps-10 text-sm text-midex-navy outline-none transition placeholder:text-midex-gray/45 focus:border-midex-mint/70 focus:ring-2 focus:ring-midex-mint/20"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4 px-4 py-4 sm:px-5 sm:py-5 lg:flex-row lg:items-end lg:justify-between lg:gap-6 lg:px-6">
          <YearSegment
            label={labels.year}
            options={years}
            value={year}
            onChange={setYear}
            allLabel={labels.all}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-3">
            <FilterSelect
              label={labels.capability}
              options={capabilities}
              value={capability}
              onChange={setCapability}
              allLabel={labels.all}
            />
            {industries.length > 1 ? (
              <FilterSelect
                label={labels.industry}
                options={industries}
                value={industry}
                onChange={setIndustry}
                allLabel={labels.all}
              />
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-midex-line/60 bg-white/70 px-4 py-3 sm:px-5 lg:px-6">
          <p className="text-sm text-midex-gray/65">
            <strong className="font-semibold text-midex-navy">{filtered.length}</strong>
            <span className="mx-1 text-midex-line">/</span>
            {studies.length} {labels.results}
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg px-2.5 py-1 text-sm font-semibold text-midex-blue transition hover:bg-midex-mint/15 hover:text-midex-navy"
            >
              {labels.clearFilters}
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-midex-line bg-midex-surface/40 px-6 py-16 text-center">
          <p className="text-sm text-midex-gray/70">{labels.noResults}</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 text-sm font-semibold text-midex-blue hover:text-midex-navy"
          >
            {labels.clearFilters}
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {filtered.map((study) => (
            <CaseStudyCard key={study.slug} study={study} readLabel={labels.read} />
          ))}
        </div>
      )}
    </div>
  );
}
