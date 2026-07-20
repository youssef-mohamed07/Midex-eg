"use client";

import { startTransition, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "midex-splash-seen";
/** Full playthrough of /public/gif.gif (91 frames ≈ 3.03s). */
const GIF_DURATION_MS = 3_100;
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
  const finishStarted = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (splashLocked || hasSeenSplash() || prefersReducedMotion()) {
      return;
    }

    splashLocked = true;
    startTransition(() => setVisible(true));

    // Safety: never block the site if the GIF fails to load/decode.
    const safetyTimer = window.setTimeout(() => {
      finishSplash(0);
    }, GIF_DURATION_MS + 4_000);
    timers.current.push(safetyTimer);

    return () => {
      for (const id of timers.current) window.clearTimeout(id);
      timers.current = [];
    };
  }, []);

  function finishSplash(playMs = GIF_DURATION_MS) {
    if (finishStarted.current) return;
    finishStarted.current = true;

    const exitTimer = window.setTimeout(() => {
      startTransition(() => setExiting(true));
    }, playMs);
    timers.current.push(exitTimer);

    const doneTimer = window.setTimeout(() => {
      markSplashSeen();
      startTransition(() => {
        setVisible(false);
        setExiting(false);
      });
    }, playMs + FADE_DURATION_MS);
    timers.current.push(doneTimer);
  }

  if (!visible) return null;

  return (
    <div
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
        onLoad={() => finishSplash()}
        onError={() => finishSplash(0)}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
