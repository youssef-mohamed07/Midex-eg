"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getLocalizedEvents } from "@/content/i18n";
import { type EventItem } from "@/content/site";
import { type Locale } from "@/i18n/routing";

function EventCard({
  event,
  className = "",
  featured = false,
}: {
  event: EventItem;
  className?: string;
  featured?: boolean;
}) {
  const t = useTranslations("home");
  const isPoster = event.variant === "poster";

  return (
    <figure
      className={`group relative overflow-hidden rounded-2xl border border-midex-line bg-midex-navy shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-midex-mint/40 hover:shadow-lg ${className}`}
    >
      <div
        className={`relative w-full overflow-hidden ${
          featured ? "aspect-[16/10] sm:aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={event.src}
          alt={event.title}
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 58vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
          }
          className={`transition-transform duration-700 group-hover:scale-[1.03] ${
            isPoster
              ? "object-contain object-center p-3 sm:p-4"
              : "object-cover object-center"
          }`}
        />

        {event.featured && (
          <span className="absolute start-3 top-3 z-10 rounded-full bg-midex-blue px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-md">
            {t("eventsFeatured")}
          </span>
        )}

        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midex-navy/95 via-midex-navy/70 to-transparent px-4 pb-4 pt-10 sm:px-5 sm:pb-5 sm:pt-12">
          {event.date && (
            <time className="text-[11px] font-semibold uppercase tracking-wider text-midex-mint">
              {event.date}
            </time>
          )}
          <h3
            className={`mt-1 font-display font-bold leading-snug text-white ${
              featured ? "text-lg sm:text-xl lg:text-2xl" : "text-sm sm:text-base"
            }`}
          >
            {event.title}
          </h3>
          {event.subtitle && (
            <p
              className={`mt-1 leading-relaxed text-white/80 ${
                featured ? "line-clamp-2 text-sm" : "line-clamp-1 text-xs sm:text-sm"
              }`}
            >
              {event.subtitle}
            </p>
          )}
        </figcaption>
      </div>
    </figure>
  );
}

export function EventsSection() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;
  const events = getLocalizedEvents(locale);

  if (events.length === 0) return null;

  const [featured, ...rest] = events;
  const sideEvents = rest.slice(0, 4);
  const bottomEvents = rest.slice(4);

  return (
    <section className="mx-section bg-white">
      <div className="mx-container">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="mx-eyebrow">Midex</span>
            <h2 className="mx-section-title mt-4">{t("ourEvents")}</h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-midex-gray/75 lg:text-end">
            {t("eventsSubtitle")}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <EventCard event={featured} featured className="lg:col-span-7" />

          {sideEvents.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5">
              {sideEvents.map((event) => (
                <EventCard key={event.src} event={event} />
              ))}
            </div>
          )}
        </div>

        {bottomEvents.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bottomEvents.map((event) => (
              <EventCard key={event.src} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
