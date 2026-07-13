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
  const { title } = parseScope(study.scope);
  const year = /^\d{4}$/.test(study.statValue) ? study.statValue : null;
  const logo = study.image || null;

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-midex-line/80 bg-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-midex-mint/40 hover:shadow-md"
    >
      <div className="relative flex aspect-[2/1] items-center justify-center bg-gradient-to-br from-midex-surface via-white to-midex-surface px-4 py-3">
        {year ? (
          <span className="absolute start-2.5 top-2.5 rounded bg-midex-navy px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white">
            {year}
          </span>
        ) : null}

        <div className="relative h-[70%] w-[70%] max-w-[180px]">
          {logo ? (
            <Image
              src={logo}
              alt={study.client}
              fill
              className="object-contain transition-transform duration-400 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 40vw, 180px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-2xl font-bold tracking-tight text-midex-navy/20 sm:text-3xl">
                {clientInitials(study.client)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-3 py-3 sm:px-3.5">
        <h3 className="font-display text-[15px] font-bold leading-snug text-midex-navy transition-colors group-hover:text-midex-blue sm:text-base">
          {study.client}
        </h3>
        <p className="mt-1 line-clamp-1 text-[12px] leading-snug text-midex-gray/65">
          {title || study.industry}
        </p>
        <span className="mx-link-arrow mt-2.5 text-xs font-semibold text-midex-navy group-hover:text-midex-blue">
          {readLabel}
          <span className="mx-arrow">→</span>
        </span>
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
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((study) => (
            <CaseStudyCard key={study.slug} study={study} readLabel={labels.read} />
          ))}
        </div>
      )}
    </div>
  );
}
