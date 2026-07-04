"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Service = {
  title: string;
  excerpt: string;
  image: string;
};

function useRevealOnScroll<T extends HTMLElement>(side?: "left" | "right") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => el.classList.add("is-visible");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px 4% 0px" },
    );

    observer.observe(el);

    const checkInitial = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.04) {
        reveal();
        observer.unobserve(el);
      }
    };

    checkInitial();
    requestAnimationFrame(checkInitial);

    return () => observer.disconnect();
  }, []);

  const baseClass =
    side === "left"
      ? "mx-timeline-item mx-timeline-item--left"
      : side === "right"
        ? "mx-timeline-item mx-timeline-item--right"
        : "mx-reveal";

  return { ref, className: baseClass };
}

function TimelineDot({ side }: { side: "left" | "right" }) {
  const { ref, className } = useRevealOnScroll<HTMLSpanElement>(side);

  return (
    <span
      className="absolute top-1/2 z-10 hidden lg:left-1/2 lg:block lg:-translate-x-1/2 lg:-translate-y-1/2"
      aria-hidden
    >
      <span
        ref={ref}
        className={`${className} mx-timeline-dot block h-4 w-4 rounded-full border-[3px] border-white bg-midex-mint shadow-md ring-4 ring-midex-mint/25`}
      />
    </span>
  );
}

function MobileDot({ side }: { side: "left" | "right" }) {
  const { ref, className } = useRevealOnScroll<HTMLSpanElement>(side);

  return (
    <span
      ref={ref}
      className={`${className} mx-timeline-dot absolute top-6 block h-2.5 w-2.5 rounded-full border-2 border-white bg-midex-mint shadow-sm ring-2 ring-midex-mint/20 -start-[1.35rem] sm:top-8 sm:h-3 sm:w-3 sm:ring-4 sm:-start-[1.65rem] lg:hidden`}
      aria-hidden
    />
  );
}

function TimelineStepNumber({ step, side }: { step: string; side: "left" | "right" }) {
  const { ref, className } = useRevealOnScroll<HTMLDivElement>(side);

  return (
    <div
      ref={ref}
      className={`${className} flex items-center ${
        side === "left"
          ? "mb-3 justify-end pe-2 sm:mb-0 sm:pe-0 lg:col-start-2 lg:mb-0 lg:justify-start lg:ps-12"
          : "mb-3 justify-start ps-2 sm:mb-0 sm:ps-0 lg:col-start-1 lg:mb-0 lg:justify-end lg:pe-12"
      }`}
      aria-hidden
    >
      <span className="font-display text-6xl font-bold tabular-nums leading-none text-midex-navy/[0.08] sm:text-7xl lg:text-8xl xl:text-9xl">
        {step}
      </span>
    </div>
  );
}

function ServiceCard({
  service,
  side,
}: {
  service: Service;
  side: "left" | "right";
}) {
  const { ref, className } = useRevealOnScroll<HTMLDivElement>(side);

  return (
    <article
      className={`mx-service-card w-full lg:max-w-lg ${
        side === "left"
          ? "lg:col-start-1 lg:justify-self-end lg:pe-12"
          : "lg:col-start-2 lg:justify-self-start lg:ps-12"
      }`}
    >
      <div ref={ref} className={`${className} w-full`}>
        <figure className="mx-card group relative aspect-card w-full overflow-hidden sm:aspect-[16/10]">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
        </div>

        <div
          className="absolute inset-0 bg-gradient-to-t from-midex-navy via-midex-navy/55 to-midex-navy/15 transition-opacity duration-500 group-hover:via-midex-navy/65"
          aria-hidden
        />

        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(132, 206, 205, 0.22), transparent 70%)",
          }}
          aria-hidden
        />

        <figcaption
          className={`absolute inset-x-0 bottom-0 flex flex-col px-4 pb-4 pt-12 sm:px-6 sm:pb-6 sm:pt-20 ${
            side === "left" ? "lg:items-end lg:text-end" : "lg:items-start lg:text-start"
          }`}
        >
          <h3 className="font-display text-lg font-bold leading-snug text-white sm:text-2xl">
            {service.title}
          </h3>
          <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-white/75 sm:mt-2 sm:text-[15px]">
            {service.excerpt}
          </p>
        </figcaption>
      </figure>
      </div>
    </article>
  );
}

export function ServicesTimeline({ services }: { services: Service[] }) {
  return (
    <div className="relative mx-auto max-w-4xl">
      <div
        className="absolute bottom-0 top-0 hidden w-px bg-gradient-to-b from-midex-mint/50 via-midex-blue to-midex-mint/50 lg:left-1/2 lg:block lg:-translate-x-px"
        aria-hidden
      />

      <ol className="relative space-y-6 border-s-2 border-midex-line ps-6 sm:space-y-8 sm:ps-8 lg:space-y-0 lg:border-0 lg:ps-0">
        {services.map((service, index) => {
          const side: "left" | "right" = index % 2 === 0 ? "left" : "right";
          const step = String(index + 1).padStart(2, "0");

          return (
            <li
              key={service.title}
              className="relative lg:grid lg:grid-cols-2 lg:items-center lg:py-10"
            >
              <MobileDot side={side} />
              <TimelineDot side={side} />

              {side === "right" && <TimelineStepNumber step={step} side={side} />}

              <ServiceCard service={service} side={side} />

              {side === "left" && <TimelineStepNumber step={step} side={side} />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
