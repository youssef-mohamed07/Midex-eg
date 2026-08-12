"use client";

import { useEffect, useState } from "react";
import type { PromoPopupData } from "@/lib/cms/types";

export function PromoPopup({ data }: { data?: PromoPopupData }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!data?.isActive) return;

    // Open quickly so changes are immediately visible
    const timer = setTimeout(() => setIsOpen(true), 300);
    return () => clearTimeout(timer);
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

  const imageUrl = data.image || "/images/hero/slide-1.webp";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-midex-navy-dark/70 p-4 backdrop-blur-md animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-white/10 animate-popup-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-popup-title"
      >
        <button
          onClick={handleClose}
          className="absolute end-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-midex-navy/70 text-white backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:bg-midex-navy focus:outline-none focus-visible:outline-2 focus-visible:outline-midex-mint"
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

        <div 
          className="relative shrink-0 bg-midex-surface/50 w-full"
          style={{ minHeight: "clamp(300px, 45vh, 450px)" }}
        >
          <img
            src={imageUrl}
            alt={data.headline || "Promotional Popup"}
            className="absolute inset-0 h-full w-full object-contain p-4"
          />
        </div>

        <div className="flex flex-col overflow-y-auto p-6 sm:p-8">
          {data.date && (
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-midex-navy shadow-md ring-1 ring-midex-navy/5 sm:text-[13px]">
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
              className="font-display text-2xl font-bold leading-snug tracking-tight text-midex-navy sm:text-3xl"
            >
              {data.headline}
            </h2>
          )}
          {data.body && (
            <p className="mt-4 text-[15px] leading-relaxed text-midex-gray sm:text-base">
              {data.body}
            </p>
          )}

          {data.ctaUrl && data.ctaLabel && (
            <div className="mt-8">
              <a
                href={data.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleClose()}
                className="group mx-btn mx-btn-primary w-full sm:w-auto"
              >
                {data.ctaLabel}
                <span className="mx-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
