import type { ReactNode } from "react";

export function PageCtaCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-midex-navy px-6 py-8 shadow-2xl shadow-midex-navy/30 mx-mesh-bg sm:rounded-3xl sm:px-10 sm:py-12 ${className}`}
    >
      <div className="mx-grid-overlay pointer-events-none absolute inset-0 opacity-35" aria-hidden />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -end-20 -top-20 h-72 w-72 rounded-full bg-midex-mint/10 blur-3xl" />
        <div className="absolute -bottom-24 start-1/4 h-64 w-64 rounded-full bg-midex-blue/15 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
