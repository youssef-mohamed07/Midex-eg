"use client";

import { startTransition, useEffect, useState } from "react";

const STORAGE_KEY = "midex-splash-seen";
const ANIMATION_DURATION_MS = 2_000;
const FADE_DURATION_MS = 350;

/** Survives React Strict Mode remounts in the same page load. */
let splashLocked = false;

function hasSeenSplash() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

function markSplashSeen() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // ignore
  }
}

function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (splashLocked || hasSeenSplash() || prefersReducedMotion()) {
      return;
    }

    splashLocked = true;
    startTransition(() => setVisible(true));

    const exitTimer = window.setTimeout(() => {
      startTransition(() => setExiting(true));
    }, ANIMATION_DURATION_MS);

    const doneTimer = window.setTimeout(() => {
      markSplashSeen();
      startTransition(() => {
        setVisible(false);
        setExiting(false);
      });
    }, ANIMATION_DURATION_MS + FADE_DURATION_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-300 ease-out ${
        exiting ? "opacity-0" : "opacity-100"
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
        className="h-full w-full object-contain"
      />
    </div>
  );
}
