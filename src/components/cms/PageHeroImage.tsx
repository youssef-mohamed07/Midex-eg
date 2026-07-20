import Image from "next/image";
import { isValidImageSrc } from "@/lib/cms/images";

const HERO_LOGO = "/images/brand/logo-white.png";

type Props = {
  src?: string;
  alt: string;
  priority?: boolean;
  variant?: "portrait" | "product";
};

function HeroLogoFallback({ priority = false }: { priority?: boolean }) {
  return (
    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl shadow-black/25">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(122,201,199,0.22),transparent_60%)]"
        aria-hidden
      />
      <Image
        src={HERO_LOGO}
        alt="MIDEX"
        width={280}
        height={80}
        priority={priority}
        decoding="async"
        className="relative h-10 w-auto max-w-[11rem] opacity-95 sm:h-12 sm:max-w-[13rem] lg:h-14 lg:max-w-[15rem]"
      />
    </div>
  );
}

export function PageHeroImage({
  src,
  alt,
  priority = true,
  variant = "portrait",
}: Props) {
  if (!isValidImageSrc(src)) {
    return <HeroLogoFallback priority={priority} />;
  }

  if (variant === "product") {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/15 bg-white shadow-2xl shadow-black/25">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(222,242,238,0.55),transparent_68%)]"
          aria-hidden
        />
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain p-6 sm:p-8"
          sizes="(max-width: 1024px) 360px, 380px"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="340px"
        priority={priority}
      />
    </div>
  );
}
