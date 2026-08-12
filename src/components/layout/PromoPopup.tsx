"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { PromoPopupData } from "@/lib/cms/types";

export function PromoPopup({ data }: { data?: PromoPopupData }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!data?.isActive) return;

    const hasSeenPopup = sessionStorage.getItem("promoPopupDismissed");
    if (!hasSeenPopup) {
      // Small delay before showing to ensure smooth page load
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [data]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        sessionStorage.setItem("promoPopupDismissed", "true");
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!data?.isActive || !isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("promoPopupDismissed", "true");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-midex-navy-dark/70 p-4 backdrop-blur-md animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl ring-1 ring-white/10 animate-popup-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-popup-title"
      >
        <button
          onClick={handleClose}
          className="absolute end-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-midex-navy-dark/40 text-white backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:bg-midex-navy-dark/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-midex-mint"
          aria-label="Close popup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {data.image && (
          <div className="relative h-52 w-full sm:h-64">
            <Image
              src={data.image}
              alt={data.headline || "Promotional Popup"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 32rem"
            />
            {/* Navy gradient blending the image into the content below */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-midex-navy-dark/80 via-midex-navy-dark/10 to-transparent"
              aria-hidden="true"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          {data.date && (
            <div className={data.image ? "relative z-10 -mt-12 mb-4 sm:-mt-14" : "mb-4"}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-midex-navy shadow-lg ring-1 ring-midex-navy/10 backdrop-blur sm:text-[13px]">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-midex-mint to-midex-mint-light"
                  aria-hidden="true"
                />
                {data.date}
              </span>
            </div>
          )}
          {data.headline && (
            <h2
              id="promo-popup-title"
              className="font-display text-2xl font-bold leading-snug tracking-tight text-midex-navy sm:text-[1.75rem]"
            >
              {data.headline}
            </h2>
          )}
          {data.body && (
            <p className="mt-3 text-[15px] leading-relaxed text-midex-gray sm:text-base">
              {data.body}
            </p>
          )}

          {data.ctaUrl && data.ctaLabel && (
            <a
              href={data.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClose()}
              className="group mx-btn mx-btn-primary mt-7 w-full"
            >
              {data.ctaLabel}
              <span className="mx-arrow" aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
