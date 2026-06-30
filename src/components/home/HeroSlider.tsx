"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { heroSlides } from "@/content/site";

const SLIDE_DURATION = 7000;

export function HeroSlider() {
  const t = useTranslations("hero");
  const th = useTranslations("home");
  const [active, setActive] = useState(0);
  const slide = heroSlides[active];

  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const timer = setInterval(
      () => setActive((index) => (index + 1) % heroSlides.length),
      SLIDE_DURATION,
    );

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] overflow-x-hidden bg-midex-navy-dark">
      <div className="absolute inset-0 overflow-hidden">
        {heroSlides.map((item, index) => (
          <div
            key={item.image}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-in-out ${
              index === active ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 animate-ken-burns">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-midex-navy-dark/95 via-midex-navy/78 to-midex-navy/20 [dir=rtl]:bg-gradient-to-l" />
            <div className="absolute inset-0 bg-gradient-to-t from-midex-navy-dark/55 via-transparent to-midex-navy/15" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -start-20 top-24 h-72 w-72 animate-float rounded-full bg-midex-mint/15 blur-3xl" />
        <div
          className="absolute -end-16 bottom-24 h-96 w-96 animate-float rounded-full bg-midex-blue/10 blur-3xl"
          style={{ animationDelay: "-3s" }}
        />
      </div>

      <div className="relative z-20 mx-container flex min-h-[100svh] items-center pb-20 pt-[4.75rem] sm:pb-24 sm:pt-[5.5rem] lg:pb-28 lg:pt-28">
        <div key={active} className="max-w-2xl">
          <span className="mx-badge mb-5 animate-fade-in border-white/20 bg-white/10 text-white sm:mb-6">
            {th("integratedEngineering")}
          </span>
          <h1 className="animate-fade-up font-display text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            {t(slide.titleKey)}
          </h1>
          <p
            className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-white/85 sm:text-lg"
            style={{ animationDelay: "0.12s" }}
          >
            {t(slide.textKey)}
          </p>
          <div
            className="mt-9 flex flex-wrap gap-3 animate-fade-up sm:mt-10 sm:gap-4"
            style={{ animationDelay: "0.24s" }}
          >
            <Link className="group mx-btn mx-btn-mint" href={slide.btn1Href}>
              {t(slide.btn1Key)}
              <span className="mx-arrow">→</span>
            </Link>
            <Link className="mx-btn mx-btn-outline" href={slide.btn2Href}>
              {t(slide.btn2Key)}
            </Link>
          </div>
        </div>
      </div>

      {heroSlides.length > 1 && (
        <div className="absolute inset-x-0 bottom-8 z-30 flex justify-center gap-2 sm:bottom-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Slide ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === active
                  ? "w-8 bg-midex-mint"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
