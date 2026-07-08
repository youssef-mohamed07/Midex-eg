"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  title: string;
  intro: string;
  items: string[];
  image: string;
  imageAlt: string;
};

/** Viewport line (0–1) used to pick which overview row is "active" while scrolling. */
const SCROLL_FOCUS_RATIO = 0.42;

export function SolutionOverviewPanel({ title, intro, items, image, imageAlt }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollFrame = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagePulse, setImagePulse] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
  }, [items, image]);

  const syncActiveFromScroll = useCallback(() => {
    const panel = panelRef.current;
    if (!panel || items.length === 0) return;

    const panelRect = panel.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const panelInView =
      panelRect.top < viewportHeight * 0.8 && panelRect.bottom > viewportHeight * 0.2;

    if (!panelInView) return;

    const focusY = viewportHeight * SCROLL_FOCUS_RATIO;
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distance = Math.abs(itemCenter - focusY);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });

    setActiveIndex((current) => (current === bestIndex ? current : bestIndex));
  }, [items.length]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const onScrollOrResize = () => {
      if (scrollFrame.current) return;
      scrollFrame.current = window.requestAnimationFrame(() => {
        scrollFrame.current = 0;
        syncActiveFromScroll();
      });
    };

    syncActiveFromScroll();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (scrollFrame.current) window.cancelAnimationFrame(scrollFrame.current);
    };
  }, [syncActiveFromScroll]);

  useEffect(() => {
    setImagePulse(true);
    const id = window.setTimeout(() => setImagePulse(false), 650);
    return () => window.clearTimeout(id);
  }, [activeIndex, image]);

  const selectItem = useCallback((index: number) => {
    setActiveIndex(index);
    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  return (
    <div
      ref={panelRef}
      className="grid items-stretch gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-12 xl:gap-16"
    >
      <div className="order-2 lg:order-1">
        <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-midex-line/60 shadow-[0_16px_48px_rgba(14,26,50,0.1)] sm:min-h-[360px] sm:rounded-[1.75rem] lg:min-h-[560px] lg:rounded-[2rem] xl:min-h-[620px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              imagePulse ? "scale-[1.04]" : "scale-100"
            }`}
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-midex-navy/30 via-transparent to-transparent"
            aria-hidden
          />
        </div>
      </div>

      <div className="order-1 flex flex-col justify-center lg:order-2">
        <h2 className="mx-section-title text-balance">{title}</h2>
        <p className="mx-section-subtitle mt-4 max-w-none text-balance">{intro}</p>

        {items.length > 0 && (
          <ul
            className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3"
            role="tablist"
            aria-label={title}
          >
            {items.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <li key={`${item}-${index}`} role="presentation">
                  <button
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => selectItem(index)}
                    className={`flex w-full items-center gap-3 rounded-full border px-4 py-3.5 text-start transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:px-5 sm:py-4 ${
                      isActive
                        ? "border-midex-line bg-white text-midex-navy shadow-[0_8px_24px_rgba(14,26,50,0.08)]"
                        : "border-transparent bg-midex-surface/50 text-midex-gray/45 hover:border-midex-line/40 hover:bg-midex-surface/80 hover:text-midex-gray/70"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full transition-all duration-500 ${
                        isActive
                          ? "scale-125 bg-midex-blue shadow-[0_0_0_4px_rgba(59,130,246,0.12)]"
                          : "bg-midex-gray/20"
                      }`}
                      aria-hidden
                    />
                    <span
                      className={`text-sm leading-snug transition-colors duration-500 sm:text-[15px] ${
                        isActive ? "font-semibold text-midex-navy" : "font-normal"
                      }`}
                    >
                      {item}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
