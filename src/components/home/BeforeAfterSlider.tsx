"use client";

import { useLocale } from "next-intl";
import { siteConfig } from "@/lib/seo/config";

type Props = {
  beforeLabel: string;
  afterLabel: string;
  beforeVideo: string;
  afterVideo: string;
};

function VideoSlot({ src, grayscale = false }: { src: string; grayscale?: boolean }) {
  return (
    <div className={`relative h-full w-full bg-white ${grayscale ? "bg-neutral-100" : ""}`}>
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover ${grayscale ? "grayscale" : ""}`}
      />
    </div>
  );
}

export function BeforeAfterSlider({
  beforeLabel,
  afterLabel,
  beforeVideo,
  afterVideo,
}: Props) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const badgeTone = isArabic ? "normal-case tracking-normal" : "uppercase tracking-wider";

  return (
    <div
      dir="ltr"
      className="mx-before-after relative min-h-[360px] overflow-hidden rounded-2xl border border-midex-line bg-midex-surface shadow-lg sm:min-h-[440px] lg:min-h-[520px] xl:min-h-[580px]"
      role="group"
      aria-label={`${beforeLabel} / ${afterLabel}`}
    >
      <div className="absolute inset-0 grid grid-cols-2">
        <VideoSlot src={beforeVideo} grayscale />
        <VideoSlot src={afterVideo} />
      </div>

      <span
        dir="auto"
        className={`absolute left-4 top-4 z-10 rounded bg-midex-navy/90 px-3 py-1.5 text-[11px] font-bold text-white sm:left-5 sm:top-5 sm:text-xs ${badgeTone}`}
      >
        {beforeLabel}
      </span>
      <span
        dir="auto"
        className={`absolute right-4 top-4 z-10 rounded border border-midex-line/80 bg-midex-surface px-3 py-1.5 text-[11px] font-bold text-midex-navy sm:right-5 sm:top-5 sm:text-xs ${badgeTone}`}
      >
        {afterLabel}
      </span>

      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 -translate-x-1/2">
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-midex-line/80" />
        <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm border border-midex-line/80 bg-white p-3 shadow-xl sm:h-[4.75rem] sm:w-[4.75rem] lg:h-20 lg:w-20 lg:p-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.brandIcon}
            alt={siteConfig.name}
            className="h-full w-full object-contain"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
