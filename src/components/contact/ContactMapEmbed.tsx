"use client";

import { useState } from "react";

type Props = {
  embedUrl: string;
  title: string;
  loadingLabel?: string;
};

export function ContactMapEmbed({ embedUrl, title, loadingLabel = "Loading…" }: Props) {
  const [loaded, setLoaded] = useState(false);

  if (!embedUrl) {
    return (
      <div className="absolute inset-0 bg-midex-surface" aria-hidden />
    );
  }

  return (
    <>
      {!loaded && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-midex-surface via-white to-midex-surface/80"
          aria-hidden
        >
          <div className="absolute inset-0 animate-pulse bg-midex-line/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-midex-gray/50">
              <svg
                className="h-10 w-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
                />
                <circle cx="12" cy="10" r="2.5" strokeWidth={1.5} />
              </svg>
              <span className="text-xs font-medium uppercase tracking-wider">{loadingLabel}</span>
            </div>
          </div>
        </div>
      )}

      <iframe
        title={title}
        src={embedUrl}
        className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </>
  );
}
