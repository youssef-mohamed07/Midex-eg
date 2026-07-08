"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { Milestone } from "@/lib/cms/types";

const DISPLAY_COUNT = 6;

function easeOutQuart(progress: number) {
  return 1 - (1 - progress) ** 4;
}

function MilestoneCounter({
  value,
  active,
  suffix = "",
  duration = 1800,
}: {
  value: number;
  active: boolean;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let startTime: number | null = null;
    let frame = 0;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.round(easeOutQuart(progress) * value));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, value, duration]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function AboutMilestonesSection({
  milestones,
  title,
  subtitle,
}: {
  milestones: Milestone[];
  title: string;
  subtitle: string;
}) {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const items = milestones.slice(0, DISPLAY_COUNT).map((item) => ({
    value: item.value,
    label: item.label?.trim() ? item.label : t(item.labelKey),
    suffix: item.suffix ?? "",
  }));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="mx-section--tight">
      <div ref={sectionRef} className="mx-container">
        <div className="mb-8 flex flex-col gap-3 border-b border-midex-line/60 pb-6 sm:mb-10 sm:pb-7 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-lg">
            <h2 className="mx-section-title mt-3">{title}</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-midex-gray/75 sm:text-base lg:text-end">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-midex-line bg-midex-line shadow-lg sm:rounded-3xl sm:grid-cols-2 lg:grid-cols-3">
          {items.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative bg-white px-4 py-6 text-center transition-all duration-700 sm:px-6 sm:py-10 ${
                active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: active ? `${index * 90}ms` : "0ms" }}
            >
              <p className="font-display text-3xl font-extrabold tracking-tight text-midex-navy sm:text-4xl lg:text-5xl">
                <MilestoneCounter
                  value={stat.value}
                  active={active}
                  suffix={stat.suffix}
                  duration={1600 + index * 120}
                />
              </p>
              <span
                className="mx-auto mt-3 block h-0.5 w-8 rounded-full bg-midex-mint"
                aria-hidden
              />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-midex-teal sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
