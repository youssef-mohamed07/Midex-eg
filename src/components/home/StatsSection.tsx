"use client";

import { useEffect, useRef, useState } from "react";

type StatItem = {
  value: number;
  label: string;
};

function easeOutQuart(progress: number) {
  return 1 - (1 - progress) ** 4;
}

function StatCounter({
  value,
  active,
  duration = 2200,
}: {
  value: number;
  active: boolean;
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
      {count.toLocaleString()}+
    </span>
  );
}

export function StatsSection({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: StatItem[];
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
    <section className="mx-section bg-midex-surface">
      <div ref={sectionRef} className="mx-container">
        <div className="mb-14 text-center">
          <span className="mx-badge mb-4">Midex</span>
          <h2 className="mx-section-title text-midex-navy">{title}</h2>
          <p className="mx-section-subtitle mx-auto text-midex-gray/80">{subtitle}</p>
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-midex-mint to-midex-blue" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((stat, index) => (
            <div
              key={stat.label}
              className={`rounded-2xl border border-midex-navy/5 bg-white p-8 text-center shadow-sm transition-all duration-700 ${
                active
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: active ? `${index * 120}ms` : "0ms" }}
            >
              <p className="font-display text-4xl font-bold text-midex-blue lg:text-5xl">
                <StatCounter value={stat.value} active={active} duration={2000 + index * 150} />
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-midex-gray/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
