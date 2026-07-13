"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ANIMATION_DURATION_MS = 2_000;
const FADE_DURATION_MS = 400;

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(
      () => setExiting(true),
      ANIMATION_DURATION_MS,
    );
    const removeTimer = window.setTimeout(
      () => {
        document.body.style.overflow = previousOverflow;
        setVisible(false);
      },
      ANIMATION_DURATION_MS + FADE_DURATION_MS,
    );

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-[400ms] ease-out ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <Image
        src="/gif.gif"
        alt=""
        fill
        preload
        unoptimized
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
