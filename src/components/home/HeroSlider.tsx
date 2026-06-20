"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { heroSlides } from "@/content/site";

export function HeroSlider() {
  const t = useTranslations("hero");
  const th = useTranslations("home");
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(
      () => setActive((i) => (i + 1) % heroSlides.length),
      7000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-midex-navy-dark">
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === active ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <div className="absolute inset-0 animate-ken-burns">
              <Image
                src={slide.image}
                alt=""
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-midex-navy/95 via-midex-navy/75 to-midex-navy/30" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 animate-float rounded-full bg-midex-mint/20 blur-3xl" />
      <div
        className="pointer-events-none absolute -right-20 bottom-20 h-96 w-96 animate-float rounded-full bg-midex-blue/15 blur-3xl"
        style={{ animationDelay: "-3s" }}
      />

      <div className="relative z-20 mx-container flex min-h-screen items-center pb-24 pt-[5.5rem] lg:pt-28">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`max-w-3xl ${index === active ? "block" : "hidden"}`}
          >
            <span className="mx-badge mb-6 animate-fade-in border-white/20 bg-white/10 text-white">
              {th("integratedEngineering")}
            </span>
            <h1 className="animate-fade-up font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t(slide.titleKey)}
            </h1>
            <p
              className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-white/85"
              style={{ animationDelay: "0.15s" }}
            >
              {t(slide.textKey)}
            </p>
            <div
              className="mt-10 flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link className="mx-btn mx-btn-primary" href={slide.btn1Href}>
                {t(slide.btn1Key)}
              </Link>
              <Link className="mx-btn mx-btn-outline" href={slide.btn2Href}>
                {t(slide.btn2Key)}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {heroSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`h-2 rounded-full transition-all duration-300 ${
                index === active
                  ? "w-8 bg-midex-mint"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
