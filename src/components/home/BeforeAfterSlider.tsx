"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/seo/config";

type Props = {
  beforeVideo?: string;
  afterVideo?: string;
  beforePoster: string;
  afterPoster: string;
  duringKeywords: string[];
  afterKeywords: string[];
};

const DIVIDER_POSITION = 50;

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
      ? "border border-midex-line/80 bg-white text-midex-navy"
      : "border border-white/15 bg-midex-navy text-white";

  const track = Array.from({ length: 4 }, () => keywords).flat();

  return (
    <div className="mx-marquee-track mx-marquee-track--before-after gap-2.5 sm:gap-3">
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

export function BeforeAfterSlider({
  beforeVideo,
  afterVideo,
  beforePoster,
  afterPoster,
  duringKeywords,
  afterKeywords,
}: Props) {
  const clipAfter = 100 - DIVIDER_POSITION;

  return (
    <div
      dir="ltr"
      className="mx-before-after relative min-h-[320px] overflow-hidden rounded-2xl border border-midex-line bg-midex-surface shadow-lg sm:min-h-[440px] lg:min-h-[520px] xl:min-h-[580px]"
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
        <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm border border-midex-line/80 bg-white p-2.5 shadow-xl sm:h-[4.75rem] sm:w-[4.75rem] sm:p-3 lg:h-20 lg:w-20 lg:p-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.brandIcon}
            alt=""
            className="h-full w-full object-contain"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
