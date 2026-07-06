"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { Milestone } from "@/lib/cms/types";

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

function MilestoneCard({
  value,
  label,
  suffix,
  active,
  index,
}: {
  value: number;
  label: string;
  suffix?: string;
  active: boolean;
  index: number;
}) {
  return (
    <article
      className={`h-full rounded-xl border border-midex-line/50 bg-white px-4 py-4 text-center shadow-sm transition-all duration-500 sm:px-5 sm:py-5 ${
        active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      style={{ transitionDelay: active ? `${index * 70}ms` : "0ms" }}
    >
      <p className="font-display text-2xl font-extrabold tracking-tight text-midex-navy sm:text-3xl">
        <span className="bg-gradient-to-br from-midex-blue to-midex-navy bg-clip-text text-transparent">
          <MilestoneCounter
            value={value}
            active={active}
            suffix={suffix}
            duration={1600 + index * 100}
          />
        </span>
      </p>
      <p className="mt-2 text-xs leading-snug text-midex-gray/75 sm:text-sm">{label}</p>
    </article>
  );
}

export function AboutMilestonesSection({ milestones }: { milestones: Milestone[] }) {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const items = milestones.map((item) => ({
    value: item.value,
    label: t(item.labelKey),
    suffix: item.suffix ?? "",
  }));

  const mainItems = items.slice(0, 4);
  const tailItems = items.slice(4);

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

  return (
    <section className="mx-section--tight">
      <div ref={sectionRef} className="mx-container">
        <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-8">
          <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
          <h2 className="mx-section-title mt-4">{t("milestonesTitle")}</h2>
          <p className="mx-section-subtitle mx-auto mt-3">{t("milestonesSubtitle")}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {mainItems.map((stat, index) => (
            <MilestoneCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              active={active}
              index={index}
            />
          ))}
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-4">
          {tailItems.map((stat, index) => (
            <MilestoneCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              active={active}
              index={index + 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
