"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

type GalleryLabels = {
  title: string;
  previous: string;
  next: string;
  view: string;
};

type Props = {
  images: string[];
  alt: string;
  labels: GalleryLabels;
};

export function ProductGallery({ images, alt, labels }: Props) {
  const [active, setActive] = useState(0);
  const total = images.length;
  const current = images[active] ?? images[0];
  const hasMultiple = total > 1;

  const goTo = useCallback(
    (index: number) => {
      setActive((index + total) % total);
    },
    [total],
  );

  if (!current) return null;

  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-midex-gray/65">
        {labels.title}
      </p>

      <div className="overflow-hidden rounded-xl border border-midex-line bg-midex-surface/40 sm:rounded-2xl">
        <div className="relative flex aspect-card-tall max-h-56 items-center justify-center p-3 sm:aspect-square sm:max-h-none sm:p-8">
          <Image
            key={current}
            src={current}
            alt={`${alt} — ${active + 1}/${total}`}
            width={480}
            height={480}
            className="max-h-full max-w-full object-contain transition-opacity duration-300"
            priority={active === 0}
            sizes="(max-width: 1024px) 100vw, 360px"
          />

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                className="absolute start-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-midex-line bg-white/95 text-midex-navy shadow-sm transition hover:border-midex-mint/50 hover:text-midex-blue"
                aria-label={labels.previous}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                className="absolute end-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-midex-line bg-white/95 text-midex-navy shadow-sm transition hover:border-midex-mint/50 hover:text-midex-blue"
                aria-label={labels.next}
              >
                ›
              </button>
              <span className="absolute bottom-3 end-3 rounded-full bg-midex-navy/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                {active + 1}/{total}
              </span>
            </>
          )}
        </div>
      </div>

      {hasMultiple && (
        <div
          className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label={labels.title}
        >
          {images.map((src, index) => {
            const selected = index === active;

            return (
              <button
                key={`${src}-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={labels.view.replace("{number}", String(index + 1))}
                onClick={() => setActive(index)}
                className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border bg-white p-1 transition-all sm:h-[4.5rem] sm:w-[4.5rem] sm:rounded-xl sm:p-1.5 ${
                  selected
                    ? "border-midex-blue ring-2 ring-midex-blue/25"
                    : "border-midex-line hover:border-midex-mint/50"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-contain p-1"
                  sizes="72px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
