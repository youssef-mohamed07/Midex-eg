import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getLocale } from "next-intl/server";
import { CertificateGallery } from "@/components/about/CertificateGallery";
import { getCertificates } from "@/lib/cms";
import { isValidImageSrc } from "@/lib/cms/images";
import type { Locale } from "@/i18n/routing";

type Props = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  footnote?: string;
};

export async function CertificationsSection({ title, subtitle, eyebrow, footnote }: Props) {
  const t = await getTranslations("about");
  const locale = (await getLocale()) as Locale;
  const certificates = (await getCertificates(locale)).filter((cert) =>
    isValidImageSrc(cert.image),
  );

  if (certificates.length === 0) return null;

  return (
    <section className="mx-section overflow-hidden">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 lg:mb-12">
            <p className="mx-eyebrow mx-eyebrow--center">
              {eyebrow || t("certificationsEyebrow")}
            </p>
            <h2 className="mx-section-title mt-4">{title}</h2>
            {subtitle && <p className="mx-section-subtitle mx-auto mt-4">{subtitle}</p>}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <CertificateGallery certificates={certificates} />
        </RevealOnScroll>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-midex-gray/60 sm:mt-10 sm:text-sm">
          {footnote || t("certificationsFootnote")}
        </p>
      </div>
    </section>
  );
}
