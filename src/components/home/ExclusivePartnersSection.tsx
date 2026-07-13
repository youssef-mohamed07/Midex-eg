import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getExclusivePartners } from "@/lib/cms";
import { isValidImageSrc } from "@/lib/cms/images";
import type { Partner } from "@/lib/cms/types";

type Props = {
  title: string;
  partners?: Partner[];
};

/** Fallback product/category paths when CMS href is empty. */
const EXCLUSIVE_HREF_BY_NAME: Record<string, string> = {
  truvia: "/products/category/piping-and-fitting",
  "sing-tao": "/products",
  singtao: "/products",
  eternalwater: "/products",
  eternal: "/products",
};

function partnerHref(partner: Partner): string {
  if (partner.href?.trim()) return partner.href.trim();
  const key = partner.name.trim().toLowerCase().replace(/\s+/g, "-");
  return EXCLUSIVE_HREF_BY_NAME[key] ?? "/products";
}

export async function ExclusivePartnersSection({ title, partners: partnersProp }: Props) {
  const exclusivePartners = (partnersProp ?? (await getExclusivePartners())).filter(
    (p) => isValidImageSrc(p.image),
  );

  if (exclusivePartners.length === 0) return null;

  return (
    <section className="mx-section--tight">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-6 max-w-xl text-center sm:mb-10">
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-midex-navy sm:text-[1.75rem]">
              {title}
            </h2>
          </div>
        </RevealOnScroll>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {exclusivePartners.map((partner, index) => (
            <RevealOnScroll key={partner.name} delay={index * 70}>
              <Link
                href={partnerHref(partner)}
                className="group flex h-20 items-center justify-center rounded-2xl border border-transparent px-4 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-midex-mint/40 hover:bg-white hover:shadow-md sm:h-24 sm:px-5"
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={180}
                  height={80}
                  className="max-h-12 w-auto max-w-full object-contain opacity-90 transition-opacity group-hover:opacity-100 sm:max-h-14"
                />
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
