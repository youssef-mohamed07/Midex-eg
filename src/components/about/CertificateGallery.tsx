"use client";

import Image from "next/image";
import type { Certificate } from "@/lib/cms/types";

function displayTitle(cert: Certificate): string {
  return cert.title?.trim() || cert.alt?.trim() || cert.slug;
}

export function CertificateGallery({ certificates }: { certificates: Certificate[] }) {
  const items = certificates.slice(0, 6);

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
      {items.map((cert, index) => {
        const title = displayTitle(cert);
        const description = cert.description?.trim();

        return (
          <figure
            key={cert.slug}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-midex-line/55 bg-midex-navy shadow-[0_16px_40px_rgba(14,26,50,0.12)] transition-all duration-500 hover:-translate-y-1.5 hover:border-midex-mint/50 hover:shadow-[0_28px_64px_rgba(14,26,50,0.22)]"
          >
            <div
              className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-midex-mint via-midex-blue to-midex-mint"
              aria-hidden
            />

            <Image
              src={cert.image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-midex-navy/92 via-midex-navy/35 to-transparent transition-all duration-500 group-hover:from-midex-navy/98 group-hover:via-midex-navy/70"
              aria-hidden
            />

            <figcaption className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
              <span
                className="mb-3 block h-0.5 w-0 rounded-full bg-midex-mint transition-all duration-500 group-hover:w-10"
                aria-hidden
              />
              <p className="font-display text-lg font-bold leading-snug text-white sm:text-xl">{title}</p>
              {description && (
                <p className="mt-0 max-h-0 overflow-hidden text-sm leading-relaxed text-white/82 opacity-0 transition-all duration-500 group-hover:mt-2.5 group-hover:max-h-32 group-hover:opacity-100">
                  {description}
                </p>
              )}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
