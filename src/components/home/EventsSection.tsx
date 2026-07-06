"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { EventItem } from "@/lib/cms/types";

function EventMarqueeCard({ event }: { event: EventItem }) {
  const t = useTranslations("home");
  const isPoster = event.variant === "poster";

  if (!event.src) return null;

  return (
    <figure className="group relative w-[min(78vw,280px)] shrink-0 overflow-hidden rounded-xl border border-midex-line bg-midex-navy shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-midex-mint/40 hover:shadow-lg sm:w-[300px] sm:rounded-2xl lg:w-[320px]">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={event.src}
          alt={event.title}
          fill
          sizes="320px"
          className={`transition-transform duration-700 group-hover:scale-[1.04] ${
            isPoster
              ? "object-contain object-center p-3 sm:p-4"
              : "object-cover object-center"
          }`}
        />

        {event.featured && (
          <span className="absolute start-3 top-3 z-10 rounded-full bg-midex-blue px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-md sm:px-3 sm:py-1 sm:text-[11px]">
            {t("eventsFeatured")}
          </span>
        )}

        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midex-navy/95 via-midex-navy/70 to-transparent px-3 pb-3 pt-10 sm:px-4 sm:pb-4 sm:pt-12">
          {event.date && (
            <time className="text-[10px] font-semibold uppercase tracking-wider text-midex-mint sm:text-[11px]">
              {event.date}
            </time>
          )}
          <h3 className="mt-0.5 font-display text-sm font-bold leading-snug text-white sm:mt-1 sm:text-base">
            {event.title}
          </h3>
          {event.subtitle && (
            <p className="mt-0.5 line-clamp-1 text-[11px] leading-relaxed text-white/80 sm:text-xs">
              {event.subtitle}
            </p>
          )}
        </figcaption>
      </div>
    </figure>
  );
}

function EventsMarquee({
  events,
  direction,
}: {
  events: EventItem[];
  direction: "left" | "right";
}) {
  const track = [...events, ...events];

  return (
    <div className="mx-marquee-fade mx-marquee-fade--white">
      <div
        className={`mx-marquee-track mx-marquee-track--events gap-4 sm:gap-5 ${
          direction === "right" ? "mx-marquee-track--reverse" : ""
        }`}
      >
        {track.map((event, index) => (
          <EventMarqueeCard key={`${event.src}-${index}`} event={event} />
        ))}
      </div>
    </div>
  );
}

export function EventsSection({
  events,
  title,
  subtitle,
}: {
  events: EventItem[];
  title?: string;
  subtitle?: string;
}) {
  const t = useTranslations("home");
  const heading = title ?? t("ourEvents");
  const intro = subtitle ?? t("eventsSubtitle");

  if (events.length === 0) return null;

  const visibleEvents = events.filter((event) => event.src);
  if (visibleEvents.length === 0) return null;

  const midpoint = Math.ceil(visibleEvents.length / 2);
  const topRow = visibleEvents.slice(0, midpoint);
  const bottomRow = visibleEvents.slice(midpoint);

  return (
    <section className="mx-section overflow-hidden">
      <div className="mx-container">
        <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8 lg:mb-10">
          <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
          <h2 className="mx-section-title mt-4">{heading}</h2>
          <p className="mx-section-subtitle mx-auto mt-4">{intro}</p>
        </div>
      </div>

      <div className="w-full space-y-4 overflow-hidden sm:space-y-5" dir="ltr">
        <EventsMarquee events={topRow} direction="right" />
        <EventsMarquee events={bottomRow.length > 0 ? bottomRow : topRow} direction="left" />
      </div>
    </section>
  );
}
