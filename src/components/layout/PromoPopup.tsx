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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity">
      <div 
        className="fixed inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-black/60 transition-colors hover:bg-black/20 hover:text-black focus:outline-none focus:ring-2 focus:ring-brand-blue"
          aria-label="Close popup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
          <div className="relative h-48 w-full sm:h-64">
            <Image
              src={data.image}
              alt={data.headline || "Promotional Popup"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 32rem"
            />
            {/* Subtle gradient overlay to make text more readable if overlapping */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />
          </div>
        )}

        <div className="p-6 sm:p-8">
          {data.date && (
            <div className="mb-2 text-sm font-semibold tracking-wider text-blue-600 uppercase">
              {data.date}
            </div>
          )}
          {data.headline && (
            <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              {data.headline}
            </h2>
          )}
          {data.body && (
            <p className="mb-8 text-gray-600">
              {data.body}
            </p>
          )}
          
          {data.ctaUrl && data.ctaLabel && (
            <a
              href={data.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClose()}
              className="block w-full rounded-full bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {data.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
