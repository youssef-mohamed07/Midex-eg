import type { ReactNode } from "react";

type PageHeroProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  badge?: string | false;
  eyebrow?: ReactNode;
  breadcrumbs?: ReactNode;
  children?: ReactNode;
  media?: ReactNode;
  compact?: boolean;
};

function HeroBody({
  badge,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  badge: string | false;
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div>
      {badge !== false && (
        <span className="mx-badge mb-4 border-white/20 bg-white/10 text-white">{badge}</span>
      )}
      {eyebrow && (
        <span className="mx-eyebrow mx-eyebrow--light mb-4">{eyebrow}</span>
      )}
      <h1 className="font-display text-3xl font-bold leading-[1.07] tracking-tight text-white break-words sm:text-4xl sm:text-5xl lg:text-[3.25rem]">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{subtitle}</p>
      )}
      {children}
    </div>
  );
}

export function PageHero({
  title,
  subtitle,
  badge = false,
  eyebrow,
  breadcrumbs,
  children,
  media,
  compact = false,
}: PageHeroProps) {
  const body = (
    <HeroBody badge={badge} eyebrow={eyebrow} title={title} subtitle={subtitle}>
      {children}
    </HeroBody>
  );

  return (
    <section
      className={`midex-page-hero mx-mesh-bg ${compact ? "midex-page-hero--compact" : ""}`}
    >
      <div className="mx-grid-overlay pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute -start-20 top-32 h-64 w-64 rounded-full bg-midex-mint/15 blur-3xl" />
        <div className="pointer-events-none absolute -end-20 bottom-0 h-72 w-72 rounded-full bg-midex-blue/10 blur-3xl" />
      </div>

      <div className="relative mx-container">
        {breadcrumbs}

        {media ? (
          <div
            className={`grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 ${
              breadcrumbs ? "mt-4" : ""
            }`}
          >
            {body}
            <div className="w-full lg:max-w-[340px] lg:justify-self-end">{media}</div>
          </div>
        ) : (
          <div className={breadcrumbs ? "mt-4" : undefined}>{body}</div>
        )}
      </div>
    </section>
  );
}
