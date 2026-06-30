"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

const SLIDE_DURATION = 6500;

function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const mqSm = window.matchMedia("(min-width: 640px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (mqLg.matches) setCount(3);
      else if (mqSm.matches) setCount(2);
      else setCount(1);
    };

    update();
    mqSm.addEventListener("change", update);
    mqLg.addEventListener("change", update);

    return () => {
      mqSm.removeEventListener("change", update);
      mqLg.removeEventListener("change", update);
    };
  }, []);

  return count;
}

function PersonAvatar({ name }: { name: string }) {
  return (
    <div className="relative mx-auto shrink-0 transition-transform duration-500 group-hover:scale-105">
      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-midex-mint/45 to-midex-blue/35 blur-[2px] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-midex-navy to-midex-blue shadow-md ring-2 ring-white transition-shadow duration-500 group-hover:shadow-lg group-hover:ring-midex-mint/40 sm:h-16 sm:w-16 sm:ring-[3px]">
        <svg
          className="h-6 w-6 text-white/95 transition-transform duration-500 group-hover:scale-110 sm:h-7 sm:w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.6}
            d="M12 12a4 4 0 100-8 4 4 0 000 8z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.6}
            d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6"
          />
        </svg>
        <span className="sr-only">{name}</span>
      </div>
    </div>
  );
}

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  return (
    <figure
      className="group mx-testimonial-card flex h-full flex-col rounded-xl border border-midex-line/80 bg-white/95 p-4 shadow-lg shadow-midex-navy/5 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-midex-mint/45 hover:shadow-xl hover:shadow-midex-navy/10 sm:rounded-2xl sm:p-7"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <PersonAvatar name={item.name} />
      <blockquote className="mt-4 flex-1 text-[13px] leading-relaxed text-midex-gray/85 transition-colors duration-300 group-hover:text-midex-gray sm:mt-5 sm:text-[15px] sm:leading-[1.65]">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 border-t border-midex-line pt-4 text-center transition-colors duration-300 group-hover:border-midex-mint/30">
        <p className="font-display text-base font-bold text-midex-navy transition-colors duration-300 group-hover:text-midex-blue">
          {item.name}
        </p>
        <p className="mt-1 text-xs text-midex-gray/65 sm:text-sm">{item.role}</p>
      </figcaption>
    </figure>
  );
}

export function TestimonialsSlider({
  title,
  testimonials,
}: {
  title: string;
  testimonials: Testimonial[];
}) {
  const t = useTranslations("common");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const visibleCount = useVisibleCount();
  const count = testimonials.length;

  const visibleItems = useMemo(() => {
    if (count === 0) return [];
    const slots = Math.min(visibleCount, count);
    return Array.from({ length: slots }, (_, index) => ({
      item: testimonials[(active + index) % count],
      index,
    }));
  }, [active, count, testimonials, visibleCount]);

  useEffect(() => {
    if (count <= visibleCount || paused) return;

    const timer = setInterval(() => {
      setActive((index) => (index + 1) % count);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [count, paused, visibleCount]);

  if (count === 0) return null;

  const goTo = (index: number) => setActive((index + count) % count);
  const gridCols =
    visibleCount >= 3
      ? "md:grid-cols-3"
      : visibleCount === 2
        ? "sm:grid-cols-2"
        : "grid-cols-1";

  return (
    <section className="relative mx-section overflow-x-hidden bg-gradient-to-b from-midex-surface/60 via-white to-midex-surface/40">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -start-20 top-10 h-56 w-56 rounded-full bg-midex-mint/10 blur-3xl" />
        <div className="absolute -end-16 bottom-0 h-64 w-64 rounded-full bg-midex-blue/8 blur-3xl" />
      </div>

      <div className="relative mx-container">
        <div className="mb-6 text-center sm:mb-10 lg:mb-12">
          <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
          <h2 className="mx-section-title mt-4">{title}</h2>
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div key={`${active}-${visibleCount}`} className={`grid gap-4 sm:gap-5 ${gridCols} lg:gap-6`}>
            {visibleItems.map(({ item, index }) => (
              <TestimonialCard key={`${item.name}-${active}-${index}`} item={item} index={index} />
            ))}
          </div>

          {count > visibleCount && (
            <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-midex-line bg-white text-midex-navy shadow-sm transition-all duration-300 hover:border-midex-mint/50 hover:text-midex-blue hover:shadow-md"
                aria-label={t("prevTestimonial")}
                onClick={() => goTo(active - 1)}
              >
                ‹
              </button>

              <div className="flex max-w-[12rem] flex-wrap items-center justify-center gap-2 sm:max-w-none">
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={t("showTestimonial", { name: item.name })}
                    aria-current={index === active ? "true" : undefined}
                    onClick={() => goTo(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === active
                        ? "h-2 w-8 bg-midex-blue"
                        : "h-2 w-2 bg-midex-line hover:scale-125 hover:bg-midex-mint/60"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-midex-line bg-white text-midex-navy shadow-sm transition-all duration-300 hover:border-midex-mint/50 hover:text-midex-blue hover:shadow-md"
                aria-label={t("nextTestimonial")}
                onClick={() => goTo(active + 1)}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
