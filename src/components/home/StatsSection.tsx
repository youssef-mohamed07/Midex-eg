"use client";

import { useEffect, useRef, useState } from "react";

type StatItem = {
  value: number;
  label: string;
  suffix?: string;
};

function easeOutQuart(progress: number) {
  return 1 - (1 - progress) ** 4;
}

function StatCounter({
  value,
  active,
  suffix = "+",
  duration = 2200,
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
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
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

export function StatsSection({
  title,
  subtitle,
  items,
  columns = 4,
}: {
  title: string;
  subtitle: string;
  items: StatItem[];
  columns?: 2 | 3 | 4;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

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
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mx-section">
      <div ref={sectionRef} className="mx-container">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <h2 className="mx-section-title">{title}</h2>
          <p className="mx-section-subtitle mx-auto">{subtitle}</p>
        </div>

        <div
          className={`grid gap-px overflow-hidden rounded-2xl border border-midex-line/80 bg-midex-line/80 shadow-md sm:rounded-3xl sm:grid-cols-2 ${
            columns === 2
              ? "lg:grid-cols-2"
              : columns === 3
                ? "lg:grid-cols-3"
                : "lg:grid-cols-4"
          }`}
        >
          {items.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative bg-white px-4 py-6 text-center transition-all duration-700 sm:px-8 sm:py-10 ${
                active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: active ? `${index * 120}ms` : "0ms" }}
            >
              <p className="font-display text-3xl font-semibold tracking-tight text-midex-navy sm:text-5xl lg:text-6xl">
                <StatCounter
                  value={stat.value}
                  active={active}
                  suffix={stat.suffix || "+"}
                  duration={2000 + index * 150}
                />
              </p>
              <span
                className="mx-auto mt-3 block h-0.5 w-8 rounded-full bg-midex-mint"
                aria-hidden
              />
              <p className="mt-3 text-xs font-semibold text-midex-teal sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
