"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export type HomeSolutionCard = {
  slug: string;
  label: string;
  description: string;
  image: string;
  href: string;
  tags: string[];
  serviceCount: number;
  items?: string[];
};

type Props = {
  cards: HomeSolutionCard[];
  exploreLabel: string;
  servicesLabel: string;
};

const ACTIVE_WIDTH = 54;

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ExpandIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

export function HomeSolutionsAccordion({ cards, exploreLabel, servicesLabel }: Props) {
  const [active, setActive] = useState(0);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const inactiveWidth =
    cards.length > 1 ? (100 - ACTIVE_WIDTH) / (cards.length - 1) : ACTIVE_WIDTH;

  if (cards.length === 0) return null;

  return (
    <div
      className="mt-8 flex h-[min(420px,62vh)] gap-2 sm:mt-10 sm:h-[min(480px,68vh)] sm:gap-3 lg:h-[520px]"
      role="tablist"
      aria-label="Solutions"
    >
      {cards.map((card, index) => {
        const isActive = active === index;
        const width = isActive ? ACTIVE_WIDTH : inactiveWidth;

        return (
          <article
            key={card.slug}
            role="tab"
            aria-selected={isActive}
            tabIndex={0}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => {
              if (!canHover) setActive(index);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActive(index);
              }
            }}
            style={{ width: `${width}%` }}
            className="group/card relative h-full min-h-0 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-transparent transition-[width,box-shadow,ring-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-xl hover:shadow-midex-navy/20 hover:ring-midex-mint/45 motion-reduce:transition-none sm:rounded-2xl"
          >
            <Image
              src={card.image || "/images/hero/slide-1.webp"}
              alt={card.label}
              fill
              className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.06] ${
                isActive ? "scale-100" : "scale-110"
              }`}
              sizes={
                isActive
                  ? "(max-width: 1024px) 70vw, 560px"
                  : "(max-width: 1024px) 18vw, 160px"
              }
              priority={index === 0}
            />

            <div
              className={`absolute inset-0 transition-all duration-500 group-hover/card:from-midex-navy/55 group-hover/card:via-midex-navy/15 ${
                isActive
                  ? "bg-gradient-to-b from-midex-navy/75 via-midex-navy/25 to-midex-navy/90 group-hover/card:to-midex-navy/85"
                  : "bg-gradient-to-b from-midex-navy/40 via-midex-navy/25 to-midex-navy/88 group-hover/card:to-midex-navy/75"
              }`}
              aria-hidden
            />

            <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-3 sm:p-4">
              {isActive ? (
                <>
                  {card.serviceCount > 0 && (
                    <span className="rounded-full border border-midex-mint/35 bg-midex-mint/20 px-2.5 py-1 text-[10px] font-semibold text-midex-mint sm:text-[11px]">
                      {card.serviceCount} {servicesLabel}
                    </span>
                  )}

                  <Link
                    href={card.href}
                    onClick={(event) => event.stopPropagation()}
                    className="group inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-midex-mint text-midex-navy shadow-lg transition hover:scale-105 hover:bg-white sm:h-11 sm:w-11"
                    aria-label={exploreLabel}
                  >
                    <ArrowIcon className="h-5 w-5 shrink-0 sm:h-[1.35rem] sm:w-[1.35rem]" />
                  </Link>
                </>
              ) : (
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-midex-navy shadow-md transition duration-300 group-hover/card:scale-110 group-hover/card:bg-midex-mint group-hover/card:shadow-lg sm:h-9 sm:w-9">
                  <ExpandIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
              )}
            </div>

            {!isActive && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 top-12 z-10 flex items-center justify-center px-0.5 sm:top-14">
                <span className="max-h-[70%] font-display text-[10px] font-bold uppercase leading-none tracking-[0.16em] text-white/90 transition-colors duration-300 group-hover/card:text-midex-mint sm:text-[11px] [writing-mode:vertical-rl] [dir=rtl]:[writing-mode:vertical-lr]">
                  {card.label}
                </span>
              </div>
            )}

            <div
              className={`absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:p-5 ${
                isActive
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0"
              }`}
            >
              <h3 className="font-display text-base font-bold leading-snug text-white sm:text-2xl lg:text-[1.65rem]">
                {card.label}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/80">
                {card.description}
              </p>
              {card.items && card.items.length > 0 && (
                <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[13px] leading-snug text-white/75 sm:text-sm"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-midex-mint" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={card.href}
                onClick={(event) => event.stopPropagation()}
                className="group mx-btn mt-4 shrink-0 self-start border-0 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-midex-navy shadow-md hover:-translate-y-0.5 hover:bg-midex-mint hover:shadow-lg sm:px-6 sm:py-3 sm:text-sm"
              >
                {exploreLabel}
                <span className="mx-arrow" aria-hidden>→</span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
