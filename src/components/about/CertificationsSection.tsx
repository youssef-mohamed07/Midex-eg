import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getLocale } from "next-intl/server";
import { getCertificates } from "@/lib/cms";
import type { Locale } from "@/i18n/routing";

export async function CertificationsSection() {
  const t = await getTranslations("about");
  const locale = (await getLocale()) as Locale;
  const certificates = await getCertificates(locale);

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <h2 className="mx-section-title">{t("certificationsTitle")}</h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
          {certificates.map((cert, index) => (
            <figure
              key={cert.slug}
              className="group overflow-hidden rounded-xl border border-midex-line/50 bg-white p-2 shadow-sm sm:rounded-2xl sm:p-2.5"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-midex-surface/40">
                <Image
                  src={cert.image}
                  alt={cert.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 50vw, 16vw"
                  priority={index < 3}
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
