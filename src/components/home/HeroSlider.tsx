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
        <div className="absolute inset-0 bg-midex-navy/55" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-r from-midex-navy/85 via-midex-navy/50 to-midex-navy/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-midex-navy/75 via-transparent to-midex-navy/35"
          aria-hidden
        />
      </div>

      <div className="relative mx-container flex min-h-[min(100svh,860px)] items-center pb-16 pt-[6.5rem] sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
        <div className="w-full max-w-3xl text-start">
          <h1 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl lg:text-[3.5rem] xl:text-[3.85rem]">
            {heroCopy.slide1Title}
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/80 text-pretty sm:mt-6 sm:text-lg">
            {heroCopy.slide1Text}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              className="group mx-btn mx-btn-primary w-full justify-center border-white/10 bg-white text-midex-navy hover:bg-midex-mint hover:text-midex-navy sm:w-auto"
              href={{ pathname: "/", hash: "quote-form" }}
            >
              {heroCopy.requestQuote}
              <span className="mx-arrow">→</span>
            </Link>
            <Link
              className="mx-btn w-full justify-center border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/15 sm:w-auto"
              href="/solutions"
            >
              {heroCopy.seeSolutions}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
