"use client";

import { useEffect, useRef } from "react";

export type TimelineItem = {
  key: string;
  step: string;
  title: string;
  text: string;
};

function useRevealOnScroll<T extends HTMLElement>(side?: "left" | "right") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const baseClass =
    side === "left"
      ? "mx-timeline-item mx-timeline-item--left"
      : side === "right"
        ? "mx-timeline-item mx-timeline-item--right"
        : "mx-reveal";

  return { ref, className: baseClass };
}

function TimelineDot({ side }: { side: "left" | "right" }) {
  const { ref, className } = useRevealOnScroll<HTMLSpanElement>(side);

  return (
    <span
      className="absolute top-1/2 z-10 hidden lg:left-1/2 lg:block lg:-translate-x-1/2 lg:-translate-y-1/2"
      aria-hidden
    >
      <span
        ref={ref}
        className={`${className} mx-timeline-dot block h-4 w-4 rounded-full border-[3px] border-white bg-midex-mint shadow-md ring-4 ring-midex-mint/25`}
      />
    </span>
  );
}

function MobileDot({ side }: { side: "left" | "right" }) {
  const { ref, className } = useRevealOnScroll<HTMLSpanElement>(side);

  return (
    <span
      ref={ref}
      className={`${className} mx-timeline-dot absolute top-5 block h-2.5 w-2.5 rounded-full border-2 border-white bg-midex-mint shadow-sm ring-2 ring-midex-mint/20 -start-[1.35rem] sm:top-6 sm:h-3 sm:w-3 sm:ring-4 sm:-start-[1.65rem] lg:hidden`}
      aria-hidden
    />
  );
}

function TimelineCard({
  item,
  side,
}: {
  item: TimelineItem;
  side: "left" | "right";
}) {
  const { ref, className } = useRevealOnScroll<HTMLElement>(side);

  return (
    <article
      ref={ref}
      className={`${className} lg:max-w-md ${
        side === "left"
          ? "lg:col-start-1 lg:justify-self-end lg:pe-12 lg:text-end"
          : "lg:col-start-2 lg:justify-self-start lg:ps-12 lg:text-start"
      }`}
    >
      <div className="rounded-xl border border-midex-line bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:rounded-2xl sm:p-6">
        <span className="font-display text-xs font-bold tabular-nums text-midex-blue sm:text-sm">
          {item.step}
        </span>
        <h3 className="mt-1.5 font-display text-base font-bold text-midex-navy sm:mt-2 sm:text-xl">
          {item.title}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-midex-gray/75 sm:mt-2 sm:text-base">
          {item.text}
        </p>
      </div>
    </article>
  );
}

export function TimelineTrack({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative mx-auto max-w-4xl">
      <div
        className="absolute bottom-0 top-0 hidden w-px bg-gradient-to-b from-midex-mint/50 via-midex-blue to-midex-mint/50 lg:left-1/2 lg:block lg:-translate-x-px"
        aria-hidden
      />

      <ol className="relative space-y-5 border-s-2 border-midex-line ps-6 sm:space-y-8 sm:ps-8 lg:space-y-0 lg:border-0 lg:ps-0">
        {items.map((item, index) => {
          const side: "left" | "right" = index % 2 === 0 ? "left" : "right";

          return (
            <li
              key={item.key}
              className="relative lg:grid lg:grid-cols-2 lg:items-center lg:py-12"
            >
              <MobileDot side={side} />
              <TimelineDot side={side} />

              {side === "right" && <div className="hidden lg:block" aria-hidden />}

              <TimelineCard item={item} side={side} />

              {side === "left" && <div className="hidden lg:block" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
