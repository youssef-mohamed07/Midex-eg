"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image?: string;
  product?: {
    slug: string;
    title: string;
  };
};

function QuoteIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.016 3.016 0 01-3.016 3.016c-1.734 0-3.016-1.282-3.034-2.988zM14.583 17.321c-1.03-1.094-1.583-2.321-1.583-4.31 0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.016 3.016 0 01-3.016 3.016c-1.734 0-3.016-1.282-3.034-2.988z" />
    </svg>
  );
}

function PersonAvatar({ name, image }: { name: string; image?: string }) {
  return (
    <div className="relative mx-auto shrink-0">
      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-midex-mint/50 to-midex-blue/40 blur-sm" />
      <div className="relative flex h-[3.75rem] w-[3.75rem] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-midex-navy to-midex-blue shadow-md ring-[3px] ring-white sm:h-16 sm:w-16">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" sizes="64px" />
        ) : (
          <svg
            className="h-7 w-7 text-white/95 sm:h-8 sm:w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.6}
              d="M12 12a4 4 0 100-8 4 4 0 000 8z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.6}
              d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6"
            />
          </svg>
        )}
        <span className="sr-only">{name}</span>
      </div>
    </div>
  );
}

function TestimonialCard({ item, locale }: { item: Testimonial; locale: string }) {
  const isRtl = locale === "ar";

  return (
    <figure
      dir={isRtl ? "rtl" : "auto"}
      className="group relative flex h-full w-[min(88vw,320px)] min-w-0 shrink-0 flex-col overflow-hidden rounded-2xl border border-midex-line/50 bg-white p-5 shadow-[0_10px_40px_rgba(14,26,50,0.07)] transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/40 hover:shadow-[0_16px_48px_rgba(14,26,50,0.12)] sm:w-[340px] sm:p-7 lg:w-[360px]"
    >
      <div
        className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-midex-mint via-midex-blue to-midex-mint"
        aria-hidden
      />
      <QuoteIcon className="absolute end-4 top-5 h-7 w-7 text-midex-mint/20 transition-colors duration-300 group-hover:text-midex-mint/35 sm:end-6 sm:top-6 sm:h-8 sm:w-8" />

      <PersonAvatar name={item.name} image={item.image} />

      <blockquote className="mt-5 flex min-h-[5.5rem] min-w-0 flex-1 break-words items-start text-center text-[13px] leading-relaxed text-midex-gray/85 sm:mt-6 sm:min-h-[6rem] sm:text-[15px] sm:leading-[1.7]">
        &ldquo;{item.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-5 rounded-xl border border-midex-line/60 bg-white px-4 py-3.5 text-center sm:mt-6 sm:px-5 sm:py-4">
        <p className="font-display text-base font-bold text-midex-navy">{item.name}</p>
        <p className="mt-1 text-xs text-midex-gray/70 sm:text-sm">{item.role}</p>
        {item.product?.slug && item.product.title ? (
          <Link
            href={`/products/${item.product.slug}`}
            className="mt-2 inline-block text-xs font-semibold text-midex-blue no-underline hover:underline"
            onClick={(event) => event.stopPropagation()}
          >
            {item.product.title}
          </Link>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function TestimonialsSlider({
  title,
  subtitle,
  testimonials,
  locale = "en",
}: {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
  locale?: string;
}) {
  if (testimonials.length === 0) return null;

  const track = [...testimonials, ...testimonials];

  return (
    <section className="mx-section overflow-x-hidden">
      <div className="mx-container">
        <div className="mb-6 text-center sm:mb-10 lg:mb-12">
          <h2 className="mx-section-title">{title}</h2>
          <p className="mx-section-subtitle mx-auto mt-4">{subtitle}</p>
        </div>

        <div className="mx-marquee-fade mx-marquee-fade--white" dir="ltr">
          <div className="mx-marquee-track mx-marquee-track--testimonials gap-4 sm:gap-5 lg:gap-6">
            {track.map((item, index) => (
              <div key={`${item.name}-${index}`} className="min-w-0 shrink-0">
                <TestimonialCard item={item} locale={locale} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
