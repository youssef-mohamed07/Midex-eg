/**
 * =============================================================================
 * BEFORE / AFTER SECTION — Standalone reference
 * =============================================================================
 *
 * Dependencies:
 *   - Next.js (Image component)
 *   - Tailwind CSS v4 (see CSS block below)
 *
 * Usage:
 *
 *   import { BeforeAfterSection } from "./before-after-section-full-code";
 *
 *   <BeforeAfterSection
 *     content={{
 *       title: "Before & After",
 *       subtitle: "You will see the difference we bring to your operations",
 *       beforeItems: ["Limited visibility", "Manual documentation", "Reactive follow-ups"],
 *       afterItems: ["Clear visibility", "Automated validation", "Proactive GMP delivery"],
 *       beforeImage: "/images/before-poster.jpg",
 *       afterImage: "/images/after-poster.jpg",
 *       // beforeVideo: "/videos/before.mp4",
 *       // afterVideo: "/videos/after.mp4",
 *     }}
 *   />
 *
 * =============================================================================
 * CSS — add to your globals.css
 * =============================================================================
 *
 * @keyframes marquee-before-after {
 *   from { transform: translateX(-25%); }
 *   to { transform: translateX(0); }
 * }
 *
 * @layer components {
 *   .ba-container {
 *     @apply mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8;
 *   }
 *
 *   .ba-section {
 *     @apply bg-white py-8 sm:py-12 lg:py-16;
 *   }
 *
 *   .ba-section-title {
 *     @apply font-bold text-slate-900;
 *     font-size: clamp(1.5rem, 0.95rem + 2.2vw, 3.1rem);
 *     line-height: 1.1;
 *   }
 *
 *   .ba-section-subtitle {
 *     @apply mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base lg:text-lg;
 *   }
 *
 *   .ba-marquee-track {
 *     @apply flex w-max items-center gap-4;
 *     will-change: transform;
 *   }
 *
 *   .ba-marquee-track--before-after {
 *     animation: marquee-before-after 12s linear infinite;
 *   }
 *
 *   .ba-before-after {
 *     direction: ltr;
 *   }
 *
 *   .ba-reveal {
 *     opacity: 0;
 *     transform: translateY(2rem);
 *     transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
 *                 transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
 *   }
 *
 *   .ba-reveal.is-visible {
 *     opacity: 1;
 *     transform: translateY(0);
 *   }
 *
 *   @media (prefers-reduced-motion: reduce) {
 *     .ba-marquee-track--before-after {
 *       animation: none;
 *     }
 *   }
 * }
 *
 * =============================================================================
 */

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BeforeAfterContent = {
  enabled?: boolean;
  title?: string;
  subtitle?: string;
  beforeTitle?: string;
  afterTitle?: string;
  beforeItems?: string[];
  afterItems?: string[];
  beforeImage?: string;
  afterImage?: string;
  beforeVideo?: string;
  afterVideo?: string;
};

// ---------------------------------------------------------------------------
// RevealOnScroll
// ---------------------------------------------------------------------------

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

function RevealOnScroll({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ba-reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// BeforeAfterSlider
// ---------------------------------------------------------------------------

const DIVIDER_POSITION = 50;

type SliderProps = {
  beforeVideo?: string;
  afterVideo?: string;
  beforePoster: string;
  afterPoster: string;
  duringKeywords: string[];
  afterKeywords: string[];
};

function ComparisonMedia({
  videoSrc,
  poster,
  grayscale = false,
}: {
  videoSrc?: string;
  poster: string;
  grayscale?: boolean;
}) {
  if (videoSrc) {
    return (
      <video
        src={videoSrc}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover ${grayscale ? "grayscale" : ""}`}
      />
    );
  }

  return (
    <Image
      src={poster}
      alt=""
      fill
      aria-hidden
      className={`object-cover ${grayscale ? "grayscale" : ""}`}
      sizes="100vw"
    />
  );
}

function KeywordMarqueeRow({
  keywords,
  variant,
}: {
  keywords: string[];
  variant: "before" | "after";
}) {
  const pillClass =
    variant === "before"
      ? "border border-slate-200 bg-white text-slate-900"
      : "border border-white/15 bg-slate-900 text-white";

  const track = Array.from({ length: 4 }, () => keywords).flat();

  return (
    <div className="ba-marquee-track ba-marquee-track--before-after gap-2.5 sm:gap-3">
      {track.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-md px-3 py-2 text-[11px] font-semibold shadow-md sm:px-4 sm:text-xs ${pillClass}`}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

function BeforeAfterSlider({
  beforeVideo,
  afterVideo,
  beforePoster,
  afterPoster,
  duringKeywords,
  afterKeywords,
}: SliderProps) {
  const clipAfter = 100 - DIVIDER_POSITION;

  return (
    <div
      dir="ltr"
      className="ba-before-after relative min-h-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg sm:min-h-[440px] lg:min-h-[520px] xl:min-h-[580px]"
      role="img"
      aria-label="Before and after comparison"
    >
      <div className="absolute inset-0">
        <ComparisonMedia videoSrc={afterVideo} poster={afterPoster} />
      </div>

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${clipAfter}% 0 0)` }}>
        <ComparisonMedia videoSrc={beforeVideo} poster={beforePoster} grayscale />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-11 -translate-y-1/2 overflow-hidden sm:h-12">
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${clipAfter}% 0 0)` }}
        >
          <KeywordMarqueeRow keywords={duringKeywords} variant="before" />
        </div>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${DIVIDER_POSITION}%)` }}
        >
          <KeywordMarqueeRow keywords={afterKeywords} variant="after" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-30 -translate-x-1/2"
        style={{ left: `${DIVIDER_POSITION}%` }}
      >
        <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/90 shadow-sm" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// BeforeAfterSection
// ---------------------------------------------------------------------------

type SectionProps = {
  content: BeforeAfterContent & {
    title: string;
    subtitle: string;
    beforeItems: string[];
    afterItems: string[];
  };
};

export function BeforeAfterSection({ content }: SectionProps) {
  const beforePoster = content.beforeImage ?? "";
  const afterPoster = content.afterImage ?? "";

  return (
    <section className="ba-section overflow-hidden">
      <div className="ba-container">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="ba-section-title">{content.title}</h2>
            <p className="ba-section-subtitle mx-auto mt-4">{content.subtitle}</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="mt-8 sm:mt-10">
            <BeforeAfterSlider
              beforeVideo={content.beforeVideo}
              afterVideo={content.afterVideo}
              beforePoster={beforePoster}
              afterPoster={afterPoster}
              duringKeywords={content.beforeItems}
              afterKeywords={content.afterItems}
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Example usage
// ---------------------------------------------------------------------------

/*
export default function DemoPage() {
  return (
    <BeforeAfterSection
      content={{
        title: "Before & After",
        subtitle: "You will see the difference we bring to your operations",
        beforeImage: "/images/before.jpg",
        afterImage: "/images/after.jpg",
        beforeItems: [
          "Limited visibility",
          "Manual documentation",
          "Reactive follow-ups",
        ],
        afterItems: [
          "Clear visibility",
          "Automated validation",
          "Proactive delivery",
        ],
      }}
    />
  );
}
*/
