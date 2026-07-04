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
    <section className="mx-section">
      <div ref={sectionRef} className="mx-container">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
          <h2 className="mx-section-title mt-4">{title}</h2>
          <p className="mx-section-subtitle mx-auto">{subtitle}</p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-midex-line bg-midex-line shadow-lg sm:rounded-3xl sm:grid-cols-2 lg:grid-cols-4">
          {items.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative bg-white px-4 py-6 text-center transition-all duration-700 sm:px-8 sm:py-12 ${
                active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: active ? `${index * 120}ms` : "0ms" }}
            >
              <p className="font-display text-3xl font-extrabold tracking-tight text-midex-navy sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-br from-midex-blue to-midex-navy bg-clip-text text-transparent">
                  <StatCounter value={stat.value} active={active} duration={2000 + index * 150} />
                </span>
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-midex-gray/65">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
