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
        <p className="text-xs font-semibold uppercase tracking-wider text-midex-mint">{eyebrow}</p>
      )}
      <h1
        className={`font-display text-4xl font-bold tracking-tight text-white sm:text-5xl ${
          eyebrow ? "mt-2" : ""
        }`}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">{subtitle}</p>
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
      <div className="pointer-events-none absolute -left-20 top-32 h-64 w-64 rounded-full bg-midex-mint/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-midex-blue/10 blur-3xl" />

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
