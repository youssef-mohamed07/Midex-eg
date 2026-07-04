"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";

export type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
  contactLabel: string;
  contactHref?: string;
};

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
        open
          ? "rotate-45 border-midex-mint/50 bg-midex-mint/15 text-midex-navy"
          : "border-midex-line bg-white text-midex-navy group-hover:border-midex-mint/40"
      }`}
      aria-hidden
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeWidth={2} d="M12 6v12M6 12h12" />
      </svg>
    </span>
  );
}

export function FaqAccordion({ items, contactLabel, contactHref = "/contact" }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3 sm:space-y-4">
      {items.map((item, index) => {
        const open = openIndex === index;
        const step = String(index + 1).padStart(2, "0");

        return (
          <div
            key={item.question}
            className={`group overflow-hidden rounded-xl border transition-all duration-300 sm:rounded-2xl ${
              open
                ? "border-midex-mint/45 bg-white shadow-lg shadow-midex-navy/5"
                : "border-midex-line/70 bg-white/90 hover:border-midex-mint/30 hover:shadow-md"
            }`}
          >
            <button
              type="button"
              className="flex w-full items-start gap-3 px-4 py-4 text-start sm:gap-4 sm:px-5 sm:py-5"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span
                className={`mt-0.5 font-display text-xs font-bold tabular-nums transition-colors duration-300 sm:text-sm ${
                  open ? "text-midex-blue" : "text-midex-gray/45"
                }`}
              >
                {step}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block font-display text-[15px] font-bold leading-snug transition-colors duration-300 sm:text-lg ${
                    open ? "text-midex-navy" : "text-midex-navy/90"
                  }`}
                >
                  {item.question}
                </span>
              </span>
              <PlusIcon open={open} />
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-midex-line/60 px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
                  <p className="max-w-2xl text-[13px] leading-relaxed text-midex-gray/80 sm:text-[15px] sm:leading-[1.7]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="pt-2 sm:pt-4">
        <Link
          href={contactHref}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-midex-blue no-underline transition-colors hover:text-midex-navy"
        >
          {contactLabel}
          <span className="mx-arrow transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
