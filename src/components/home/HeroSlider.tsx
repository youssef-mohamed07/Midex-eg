"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { HeroCollage, HeroCollageImage as CollageItem } from "@/lib/cms/types";

const TILES_PER_SIDE = 3;

const PHOTO_FALLBACKS = [
  "/images/events/event-1755506209.jpg",
  "/images/events/event-1755506225.jpg",
  "/images/events/event-1755506266.jpg",
  "/images/events/event-1756814991.jpg",
  "/images/events/event-1755506276.jpg",
  "/images/events/event-1755506196.jpg",
  "/images/events/event-1755759833.jpg",
  "/images/events/event-1756820572.png",
  "/images/products/product-1724113383.jpg",
];

const SLIDE_FALLBACKS = [
  "/images/hero/slide-1.png",
  "/images/hero/slide-2.png",
  "/images/hero/slide-3.png",
];

const TILE_OFFSETS = {
  left: ["me-6 xl:me-10", "me-16 xl:me-24", "me-4 xl:me-8"],
  right: ["ms-6 xl:ms-10", "ms-16 xl:ms-24", "ms-4 xl:ms-8"],
} as const;

const TILE_SIZES = [
  "h-[7.5rem] w-[7.5rem] sm:h-[8.25rem] sm:w-[8.25rem] xl:h-[9rem] xl:w-[9rem]",
  "h-[8.75rem] w-[8.75rem] sm:h-[9.75rem] sm:w-[9.75rem] xl:h-[11rem] xl:w-[11rem]",
  "h-[7.5rem] w-[7.5rem] sm:h-[8.25rem] sm:w-[8.25rem] xl:h-[9rem] xl:w-[9rem]",
] as const;

function dedupeCollageItems(items: CollageItem[]): CollageItem[] {
  const unique: CollageItem[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    if (!item.src || seen.has(item.src)) continue;
    seen.add(item.src);
    unique.push(item);
  }

  return unique;
}

function isSlideImage(src: string) {
  return src.includes("/hero/slide-");
}

function buildCollagePool(collage: HeroCollage): CollageItem[] {
  const cmsItems = dedupeCollageItems([...collage.left, ...collage.right]);
  const cmsPhotos = cmsItems.filter((item) => !isSlideImage(item.src));
  const photoPool = dedupeCollageItems([
    ...cmsPhotos,
    ...PHOTO_FALLBACKS.map((src) => ({ src, className: "" })),
  ]);

  if (photoPool.length >= TILES_PER_SIDE * 2) {
    return photoPool;
  }

  return dedupeCollageItems([
    ...photoPool,
    ...cmsItems.filter((item) => isSlideImage(item.src)),
    ...SLIDE_FALLBACKS.map((src) => ({ src, className: "" })),
  ]);
}

function buildSideItems(pool: CollageItem[], side: "left" | "right"): CollageItem[] {
  const primary = side === "left" ? 0 : 1;
  const preferred = pool.filter((_, index) => index % 2 === primary);
  const fallback = pool.filter((_, index) => index % 2 !== primary);
  const merged = dedupeCollageItems([...preferred, ...fallback, ...pool]);

  return merged.slice(0, TILES_PER_SIDE);
}

function HeroCollageTile({
  item,
  sizeClass,
  offsetClass,
  priority = false,
}: {
  item: CollageItem;
  sizeClass: string;
  offsetClass: string;
  priority?: boolean;
}) {
  const layoutClass = item.className?.trim() ? item.className : sizeClass;

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl border border-white/80 bg-midex-surface shadow-[0_16px_40px_rgba(14,26,50,0.14)] ${layoutClass} ${offsetClass}`}
      aria-hidden
    >
      <Image
        src={item.src}
        alt=""
        fill
        quality={90}
        className="object-cover"
        sizes="(max-width: 1280px) 176px, 220px"
        priority={priority}
      />
    </div>
  );
}

function HeroCollageColumn({
  items,
  side,
}: {
  items: CollageItem[];
  side: "left" | "right";
}) {
  if (items.length === 0) return <div className="hidden lg:block" aria-hidden />;

  const offsets = TILE_OFFSETS[side];

  return (
    <div
      className={`hidden flex-col justify-center gap-7 py-4 lg:flex xl:gap-8 ${
        side === "left" ? "items-end" : "items-start"
      }`}
    >
      {items.map((item, index) => (
        <HeroCollageTile
          key={`${side}-${index}-${item.src}`}
          item={item}
          sizeClass={TILE_SIZES[index] ?? TILE_SIZES[1]}
          offsetClass={offsets[index] ?? offsets[1]}
          priority={index === 1}
        />
      ))}
    </div>
  );
}

function HeroCopy({
  className = "",
  copy,
}: {
  className?: string;
  copy: {
    slide1Title: string;
    slide1Text: string;
    requestQuote: string;
    viewProducts: string;
    viewProductsHref: string;
    seeSolutions: string;
  };
}) {
  return (
    <div className={`mx-hero-content mx-hero-content--mosaic ${className}`}>
      <h1 className="mx-hero-title">{copy.slide1Title}</h1>

      <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-midex-gray/80 sm:mt-6 sm:text-lg">
        {copy.slide1Text}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
        <Link className="group mx-btn mx-btn-primary w-full justify-center sm:w-auto" href="/contact">
          {copy.requestQuote}
          <span className="mx-arrow">→</span>
        </Link>
        <Link
          className="mx-btn w-full justify-center border border-midex-mint/35 bg-midex-mint/15 text-midex-navy hover:border-midex-mint/50 hover:bg-midex-mint/25 sm:w-auto"
          href={copy.viewProductsHref || "/products"}
        >
          {copy.viewProducts}
        </Link>
      </div>
    </div>
  );
}

export function HeroSlider({
  collage,
  heroCopy,
}: {
  collage: HeroCollage;
  heroCopy: {
    slide1Title: string;
    slide1Text: string;
    requestQuote: string;
    viewProducts: string;
    viewProductsHref: string;
    seeSolutions: string;
  };
}) {
  const pool = buildCollagePool(collage);
  const leftItems = buildSideItems(pool, "left");
  const rightItems = buildSideItems(pool, "right");

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 mx-hero-grid" aria-hidden />

      <div className="relative mx-container pb-10 pt-[5.25rem] sm:pb-12 sm:pt-28 lg:pb-16 lg:pt-[7.5rem]">
        <div className="mx-auto hidden w-full max-w-[1280px] lg:grid lg:grid-cols-[minmax(0,280px)_minmax(360px,1fr)_minmax(0,280px)] lg:items-center lg:gap-8 xl:grid-cols-[minmax(0,300px)_minmax(400px,720px)_minmax(0,300px)] xl:gap-12">
          <HeroCollageColumn items={leftItems} side="left" />
          <HeroCopy copy={heroCopy} />
          <HeroCollageColumn items={rightItems} side="right" />
        </div>

        <div className="lg:hidden">
          <HeroCopy copy={heroCopy} />

          {collage.mobileImage && (
            <div className="relative mx-auto mt-8 aspect-[4/3] max-w-md overflow-hidden rounded-xl border border-midex-line/40 bg-midex-surface sm:mt-10">
              <Image
                src={collage.mobileImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 448px"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
