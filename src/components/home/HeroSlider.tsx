"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { HeroCollage, HeroCollageImage as CollageItem } from "@/lib/cms/types";

function HeroCollageImage({ item, priority = false }: { item: CollageItem; priority?: boolean }) {
  if (!item.src) return null;

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl border border-midex-line/50 bg-midex-surface shadow-[0_8px_30px_rgba(9,61,94,0.08)] ${item.className}`}
    >
      <Image
        src={item.src}
        alt=""
        fill
        className="object-cover"
        sizes="180px"
        priority={priority}
      />
    </div>
  );
}

function HeroCollageColumn({
  items,
  side,
}: {
  items: readonly CollageItem[];
  side: "left" | "right";
}) {
  const align = side === "left" ? "items-end" : "items-start";

  return (
    <div className={`hidden flex-col gap-3 py-6 lg:flex ${align}`} aria-hidden>
      {items.filter((item) => item.src).map((item, index) => (
        <HeroCollageImage key={item.src} item={item} priority={index === 1} />
      ))}
    </div>
  );
}

export function HeroSlider({ collage }: { collage: HeroCollage }) {
  const t = useTranslations("hero");
  const th = useTranslations("home");

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 mx-hero-grid" aria-hidden />

      <div className="relative mx-container pb-10 pt-[5.25rem] sm:pb-14 sm:pt-28 lg:flex lg:min-h-[92svh] lg:flex-col lg:justify-center lg:pb-20 lg:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,34rem)_minmax(0,1fr)] lg:gap-8 xl:gap-12">
          <HeroCollageColumn items={collage.left} side="left" />

          <div className="mx-auto w-full max-w-2xl px-1 text-center sm:px-2 lg:max-w-none lg:px-4">
            <span className="mx-badge mx-auto border-midex-line bg-white text-midex-navy">
              {th("integratedEngineering")}
            </span>

            <h1 className="mt-4 font-display text-[1.75rem] font-bold leading-[1.12] tracking-tight text-midex-navy sm:mt-6 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              {t("slide1Title")}
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-midex-gray/80 sm:mt-6 sm:text-lg">
              {t("slide1Text")}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
              <Link className="group mx-btn mx-btn-primary w-full justify-center sm:w-auto" href="/contact">
                {t("requestQuote")}
                <span className="mx-arrow">→</span>
              </Link>
              <Link
                className="mx-btn w-full justify-center border border-midex-mint/35 bg-midex-mint/15 text-midex-navy hover:border-midex-mint/50 hover:bg-midex-mint/25 sm:w-auto"
                href="/solutions"
              >
                {t("seeSolutions")}
              </Link>
            </div>
          </div>

          <HeroCollageColumn items={collage.right} side="right" />
        </div>

        {collage.mobileImage && (
          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-midex-line/50 shadow-[0_8px_30px_rgba(9,61,94,0.08)] sm:mt-10 lg:hidden">
            <Image
              src={collage.mobileImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 640px"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
