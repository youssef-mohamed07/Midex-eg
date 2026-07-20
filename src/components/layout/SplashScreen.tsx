"use client";

import { useLayoutEffect, useState } from "react";
import {
  SPLASH_PENDING_CLASS,
  SPLASH_STORAGE_KEY,
} from "@/components/layout/splash-boot";

/** Full playthrough of /public/gif.gif (91 frames ≈ 3.03s). */
const GIF_DURATION_MS = 3_100;
const FADE_DURATION_MS = 350;

/** Module state survives Strict Mode remounts in the same page load. */
let finishStarted = false;
let exitTimers: number[] = [];

const splashHandlers: {
  onExit: () => void;
  onDone: () => void;
} = {
  onExit: () => undefined,
  onDone: () => undefined,
};

function markSplashSeen() {
  try {
    window.sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
  } catch {
    // ignore
  }
}

function clearSplashPending() {
  document.documentElement.classList.remove(SPLASH_PENDING_CLASS);
}

function finishSplash(playMs: number) {
  if (finishStarted) return;
  finishStarted = true;

  for (const id of exitTimers) window.clearTimeout(id);
  exitTimers = [];

  exitTimers.push(
    window.setTimeout(() => {
      // Reveal the site under the fade — don't keep the black html cover.
      clearSplashPending();
      splashHandlers.onExit();
    }, playMs),
  );

  exitTimers.push(
    window.setTimeout(() => {
      markSplashSeen();
      splashHandlers.onDone();
    }, playMs + FADE_DURATION_MS),
  );
}

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  splashHandlers.onExit = () => setExiting(true);
  splashHandlers.onDone = () => {
    setVisible(false);
    setExiting(false);
  };

  useLayoutEffect(() => {
    if (!document.documentElement.classList.contains(SPLASH_PENDING_CLASS)) {
      return;
    }

    // Show immediately (before paint) so the site never peeks through.
    setVisible(true);

    if (finishStarted) return;

    const safetyTimer = window.setTimeout(() => {
      finishSplash(0);
    }, GIF_DURATION_MS + 4_000);

    return () => {
      window.clearTimeout(safetyTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      data-midex-splash
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-300 ease-out ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- animated GIF needs native img */}
      <img
        src="/gif.gif"
        alt=""
        width={1920}
        height={1080}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        onLoad={() => finishSplash(GIF_DURATION_MS)}
        onError={() => finishSplash(0)}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
