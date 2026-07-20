"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
  /** Stagger delay between each word. */
  wordDelayMs?: number;
};

export function WordRevealText({ text, className = "", wordDelayMs = 90 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean), [text]);
  const [revealedText, setRevealedText] = useState<string | null>(null);
  const revealed = revealedText === text;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => setRevealedText(text);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [text]);

  return (
    <span
      ref={ref}
      className={`${className} ${revealed ? "mx-word-reveal" : ""}`.trim()}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span
          key={`${index}-${word}`}
          className="mx-word"
          style={revealed ? { animationDelay: `${index * wordDelayMs}ms` } : undefined}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
