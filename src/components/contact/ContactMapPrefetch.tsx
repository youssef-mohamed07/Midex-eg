"use client";

import { useEffect } from "react";

/** Starts fetching the Google Maps embed while the user reads the form above. */
export function ContactMapPrefetch({ embedUrl }: { embedUrl: string }) {
  useEffect(() => {
    if (!embedUrl) return;

    const existing = document.querySelector(`link[data-map-prefetch="${embedUrl}"]`);
    if (existing) return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = embedUrl;
    link.setAttribute("data-map-prefetch", embedUrl);
    document.head.appendChild(link);
  }, [embedUrl]);

  return null;
}
