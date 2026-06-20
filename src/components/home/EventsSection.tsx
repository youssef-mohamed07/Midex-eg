"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getLocalizedEvents } from "@/content/i18n";
import { type EventItem } from "@/content/site";
import { type Locale } from "@/i18n/routing";

function EventCard({
  event,
  className = "",
  large = false,
}: {
  event: EventItem;
  className?: string;
  large?: boolean;
}) {
  const t = useTranslations("home");

  return (
    <figure
      className={`group relative overflow-hidden rounded-2xl bg-midex-navy shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-midex-navy/20 ${className}`}
    >
      <div
        className={`relative w-full overflow-hidden ${
          large ? "aspect-[4/3] sm:aspect-auto sm:min-h-[420px]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={event.src}
          alt={event.title}
          fill
          sizes={
            large
              ? "(max-width: 640px) 100vw, 50vw"
              : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          }
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {event.featured && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-midex-blue px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-md">
            {t("eventsFeatured")}
          </span>
        )}

        <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-midex-navy/95 via-midex-navy/55 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
          {event.date && (
            <time className="text-xs font-semibold uppercase tracking-wider text-midex-mint">
              {event.date}
            </time>
          )}
          <h3
            className={`mt-1 font-display font-bold text-white ${
              large ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
            }`}
          >
            {event.title}
          </h3>
          {event.subtitle && (
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-white/80">
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

  return (
    <section className="mx-section bg-white">
      <div className="mx-container">
        <div className="mb-10 text-center lg:mb-12">
          <span className="mx-badge mb-4">Midex</span>
          <h2 className="mx-section-title text-midex-navy">{t("ourEvents")}</h2>
          <p className="mx-section-subtitle mx-auto mt-4 text-midex-gray/80">
            {t("eventsSubtitle")}
          </p>
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-midex-mint to-midex-blue" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {events.map((event, index) => (
            <EventCard
              key={event.src}
              event={event}
              large={index === 0}
              className={index === 0 ? "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
