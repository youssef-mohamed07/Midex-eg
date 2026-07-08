import type { ReactNode } from "react";

type PageHeroProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  eyebrow?: ReactNode;
  breadcrumbs?: ReactNode;
  children?: ReactNode;
  media?: ReactNode;
  /** CTAs or actions — shown in a right column on large screens when set. */
  actions?: ReactNode;
  compact?: boolean;
  /** On small screens, show media above the copy instead of below. */
  mediaFirstOnMobile?: boolean;
  /** Hide the media column below this breakpoint (e.g. solutions hero). */
  hideMediaBelow?: "lg" | "md";
};

function HeroBody({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="mx-eyebrow mx-eyebrow--light mb-5 sm:mb-6">{eyebrow}</p>
      )}
      <h1 className="font-display text-3xl font-bold leading-[1.07] tracking-tight text-white break-words text-balance sm:text-4xl sm:text-5xl lg:text-[3.15rem]">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/78 text-pretty sm:mt-5 sm:text-lg">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  breadcrumbs,
  children,
  media,
  actions,
  compact = false,
  mediaFirstOnMobile = false,
  hideMediaBelow,
}: PageHeroProps) {
  const body = (
    <HeroBody eyebrow={eyebrow} title={title} subtitle={subtitle}>
      {children}
    </HeroBody>
  );

  const actionsColumn = actions ? (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:min-w-[220px] lg:flex-col lg:items-stretch xl:min-w-[240px]">
      {actions}
    </div>
  ) : null;

  return (
    <section
      className={`midex-page-hero mx-mesh-bg ${compact ? "midex-page-hero--compact" : ""}`}
    >
      <div className="mx-grid-overlay pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute -start-24 top-24 h-72 w-72 rounded-full bg-midex-mint/8 blur-3xl" />
        <div className="pointer-events-none absolute -end-24 bottom-0 h-80 w-80 rounded-full bg-midex-blue/12 blur-3xl" />
        <div className="pointer-events-none absolute start-1/2 top-0 h-px w-[min(72rem,90%)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative mx-container">
        {breadcrumbs}

        {media ? (
          <div
            className={`grid items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-14 ${
              breadcrumbs ? "mt-4" : ""
            }`}
          >
            <div
              className={
                hideMediaBelow
                  ? undefined
                  : mediaFirstOnMobile
                    ? "order-2 lg:order-1"
                    : undefined
              }
            >
              {body}
            </div>
            <div
              className={`flex w-full shrink-0 flex-col gap-6 lg:max-w-[380px] lg:justify-self-end ${
                hideMediaBelow === "lg"
                  ? "hidden lg:flex"
                  : hideMediaBelow === "md"
                    ? "hidden md:flex"
                    : mediaFirstOnMobile
                      ? "order-1 lg:order-2"
                      : ""
              }`}
            >
              {media}
              {actionsColumn}
            </div>
          </div>
        ) : actions ? (
          <div
            className={`grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 xl:gap-16 ${
              breadcrumbs ? "mt-4" : ""
            }`}
          >
            {body}
            <div className="lg:justify-self-end lg:pb-1">{actionsColumn}</div>
          </div>
        ) : (
          <div className={breadcrumbs ? "mt-4" : undefined}>{body}</div>
        )}
      </div>
    </section>
  );
}
