import { getTranslations } from "next-intl/server";
import { ContactMapEmbed } from "@/components/contact/ContactMapEmbed";
import type { SiteContact } from "@/lib/cms/types";

type Props = {
  siteContact: SiteContact;
};

export async function ContactMapSection({ siteContact }: Props) {
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");

  return (
    <section id="office-map" className="mx-section scroll-mt-28 bg-white">
      <div className="mx-container">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
          <h2 className="mx-section-title mt-4">{t("mapTitle")}</h2>
          <p className="mx-section-subtitle mx-auto">{t("mapSubtitle")}</p>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-midex-line bg-white shadow-md shadow-midex-navy/5">
          <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
            <ContactMapEmbed
              embedUrl={siteContact.mapsEmbedUrl}
              title={t("mapTitle")}
              loadingLabel={tc("loading")}
            />
          </div>

          <div className="flex flex-col gap-4 border-t border-midex-line/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="max-w-2xl text-sm leading-relaxed text-midex-gray/80 sm:text-base">
              <span className="block text-xs font-semibold uppercase tracking-wider text-midex-gray/55">
                {t("office")}
              </span>
              <span className="mt-1 block font-medium text-midex-navy">{siteContact.address}</span>
            </p>

            <a
              href={siteContact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-btn mx-btn-primary shrink-0 self-start sm:self-auto"
            >
              {t("getDirections")}
              <span className="mx-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
