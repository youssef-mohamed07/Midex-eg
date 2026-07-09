import Image from "next/image";
import { Link } from "@/i18n/navigation";

export function SolutionGroupCard({
  href,
  image,
  label,
  description,
  meta,
  index,
}: {
  href: string;
  image: string;
  label: string;
  description: string;
  meta: string;
  index: number;
}) {
  return (
    <Link
      href={href}
      className="group relative block aspect-card overflow-hidden rounded-xl border border-midex-line no-underline shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/45 hover:shadow-lg sm:rounded-2xl"
    >
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        sizes="(max-width: 640px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-midex-navy/20" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-midex-navy/95 via-midex-navy/50 to-midex-navy/10"
        aria-hidden
      />
      <span className="absolute start-3 top-3 z-10 font-display text-2xl font-bold tabular-nums text-white/20 sm:start-4 sm:top-4 sm:text-3xl">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-midex-mint sm:text-[11px]">
          {meta}
        </p>
        <h3 className="mt-0.5 font-display text-base font-bold leading-snug text-white sm:mt-1 sm:text-xl">
          {label}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/75 sm:mt-2 sm:text-sm">{description}</p>
      </div>
    </Link>
  );
}

export function SolutionServiceCard({
  href,
  image,
  label,
  excerpt,
  viewLabel,
}: {
  href: string;
  image: string;
  label: string;
  excerpt: string;
  viewLabel: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block aspect-card overflow-hidden rounded-xl border border-midex-line no-underline shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/45 hover:shadow-lg sm:rounded-2xl"
    >
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-midex-navy/15" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-midex-navy/95 via-midex-navy/40 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-5">
        <h3 className="font-display text-sm font-bold leading-snug text-white sm:text-lg">
          {label}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/75 sm:mt-1.5 sm:text-sm">{excerpt}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-midex-mint sm:mt-3 sm:text-sm">
          {viewLabel}
          <span className="mx-arrow text-[10px]">→</span>
        </span>
      </div>
    </Link>
  );
}
