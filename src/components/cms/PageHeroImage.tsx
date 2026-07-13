import Image from "next/image";
import { isValidImageSrc } from "@/lib/cms/images";

type Props = {
  src?: string;
  alt: string;
  priority?: boolean;
  variant?: "portrait" | "product";
};

export function PageHeroImage({
  src,
  alt,
  priority = false,
  variant = "portrait",
}: Props) {
  if (!isValidImageSrc(src)) return null;

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
