"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  items: string[];
};

export function SolutionOverviewItemRows({ items }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setShowAll(false);
  }, [items]);

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll("[data-overview-row]");
    if (!rows?.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setShowAll(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0]?.target.getAttribute("data-overview-row");
        if (top !== null && top !== undefined) {
          setActiveIndex(Number(top));
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [items]);

  return (
    <ul ref={listRef} className="mt-8 space-y-2.5 sm:mt-10 sm:space-y-3">
      {items.map((item, index) => {
        const isActive = showAll || index === activeIndex;

        return (
          <li
            key={item}
            data-overview-row={index}
            className={`flex items-center gap-3 rounded-full border px-4 py-3.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5 sm:py-4 ${
              isActive
                ? "border-midex-line bg-white text-midex-navy shadow-sm"
                : "border-transparent bg-midex-surface/50 text-midex-gray/40"
            }`}
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-500 ${
                isActive ? "bg-midex-blue" : "bg-midex-gray/20"
              }`}
              aria-hidden
            />
            <span
              className={`text-sm leading-snug transition-colors duration-500 sm:text-[15px] ${
                isActive ? "font-medium text-midex-navy" : "font-normal"
              }`}
            >
              {item}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
