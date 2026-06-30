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
      className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-midex-line no-underline shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/45 hover:shadow-lg"
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
      <span className="absolute start-4 top-4 z-10 font-display text-3xl font-bold tabular-nums text-white/20">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-midex-mint">
          {meta}
        </p>
        <h3 className="mt-1 font-display text-lg font-bold leading-snug text-white sm:text-xl">
          {label}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">{description}</p>
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
      className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-midex-line no-underline shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/45 hover:shadow-lg"
    >
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        sizes="(max-width: 640px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-midex-navy/15" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-midex-navy/95 via-midex-navy/40 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
        <h3 className="font-display text-base font-bold leading-snug text-white sm:text-lg">
          {label}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/75">{excerpt}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-midex-mint sm:text-sm">
          {viewLabel}
          <span className="mx-arrow text-[10px]">→</span>
        </span>
      </div>
    </Link>
  );
}
