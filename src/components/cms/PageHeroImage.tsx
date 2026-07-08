import Image from "next/image";
import { isValidImageSrc } from "@/lib/cms/images";

type Props = {
  src?: string;
  alt: string;
  priority?: boolean;
};

export function PageHeroImage({ src, alt, priority = false }: Props) {
  if (!isValidImageSrc(src)) return null;

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
