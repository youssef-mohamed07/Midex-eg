"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { HeroCollage } from "@/lib/cms/types";

const DEFAULT_HERO_POSTER = "/images/hero/slide-1.webp";

type HeroCopy = {
  slide1Title: string;
  slide1Text: string;
  requestQuote: string;
  seeSolutions: string;
};

type Props = {
  collage?: HeroCollage;
  heroCopy: HeroCopy;
  /** Local or remote hero background video. Omit when the file is not available. */
  videoSrc?: string;
  posterSrc?: string;
};

export function HeroSlider({
  collage,
  heroCopy,
  videoSrc,
  posterSrc,
}: Props) {
  const poster = posterSrc || collage?.mobileImage || DEFAULT_HERO_POSTER;
  const [videoFailed, setVideoFailed] = useState(false);
  const showVideo = Boolean(videoSrc) && !videoFailed;

  return (
    <section className="relative isolate min-h-[min(100svh,860px)] overflow-hidden bg-midex-navy">
      <div className="absolute inset-0 min-h-full">
        <Image
          src={poster}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          aria-hidden
        />
        {showVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            onError={() => setVideoFailed(true)}
          />
        ) : null}
        {/* Light overall tint so the video stays visible but readable */}
        <div className="absolute inset-0 bg-midex-navy/10" aria-hidden />
        {/* Dark gradient removed as there is no text to anchor anymore */}
        {/* Subtle bottom gradient to anchor the section */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-midex-navy/40 via-transparent to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative mx-container flex min-h-[min(100svh,860px)] items-center pb-16 pt-[6.5rem] sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
        {/* Text and buttons have been removed per user request */}
      </div>
    </section>
  );
}
