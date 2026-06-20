"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { getLocalizedTestimonials } from "@/content/i18n";
import { type Locale } from "@/i18n/routing";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function QuoteIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
      <path d="M10 18c0-3.3 2.7-6 6-6V8C9.8 8 6 11.8 6 16v8h10v-8H10zm14 0c0-3.3 2.7-6 6-6V8c-6.2 0-10 3.8-10 8v8h10v-8H24z" />
    </svg>
  );
}

export function TestimonialsSection({
  title,
  locale,
}: {
  title: string;
  locale: Locale;
}) {
  const t = useTranslations("common");
  const testimonials = useMemo(
    () => getLocalizedTestimonials(locale),
    [locale],
  );
  const [active, setActive] = useState(0);
  const count = testimonials.length;

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % count), 7000);
    return () => clearInterval(timer);
  }, [count]);

  const goTo = (index: number) => {
    setActive((index + count) % count);
  };

  return (
    <section className="relative overflow-hidden bg-midex-navy mx-mesh-bg py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-midex-mint/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-midex-blue/10 blur-3xl" />

      <div className="relative mx-container">
        <div className="mb-12 text-center lg:mb-14">
          <span className="mx-badge mb-4 border-white/20 bg-white/10 text-white">
            Midex
          </span>
          <h2 className="mx-section-title text-white">{title}</h2>
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-midex-mint to-midex-blue" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl shadow-black/20">
            <div className="relative min-h-[280px] px-8 py-10 sm:min-h-[260px] sm:px-12 sm:py-12 lg:min-h-[240px]">
              {testimonials.map((item, index) => (
                <figure
                  key={item.name}
                  className={`absolute inset-0 flex flex-col justify-center px-8 py-10 transition-all duration-700 ease-out sm:px-12 sm:py-12 ${
                    index === active
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-4 opacity-0"
                  }`}
                  aria-hidden={index !== active}
                >
                  <QuoteIcon className="h-10 w-10 text-midex-mint" />
                  <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed text-midex-navy sm:text-2xl">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-midex-navy/8 pt-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-midex-mint to-midex-blue text-sm font-bold text-white shadow-md">
                      {initials(item.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-midex-navy">{item.name}</p>
                      <p className="text-sm text-midex-gray/65">{item.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-midex-mint hover:bg-white/20"
              aria-label={t("prevTestimonial")}
              onClick={() => goTo(active - 1)}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  aria-label={t("showTestimonial", { name: item.name })}
                  aria-current={index === active ? "true" : undefined}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === active
                      ? "w-8 bg-midex-mint"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-midex-mint hover:bg-white/20"
              aria-label={t("nextTestimonial")}
              onClick={() => goTo(active + 1)}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-12 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={`rounded-xl border p-4 text-left transition-all duration-300 ${
                index === active
                  ? "border-midex-mint/50 bg-white/15 shadow-lg shadow-black/10"
                  : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
              }`}
              onClick={() => goTo(index)}
            >
              <p className="line-clamp-2 text-sm leading-relaxed text-white/80">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="mt-3 text-xs font-semibold text-midex-mint">{item.name}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
