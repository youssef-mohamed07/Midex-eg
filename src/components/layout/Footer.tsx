import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { mapsHref, phoneTelHref } from "@/lib/cms/contact";
import type { LayoutShellData } from "@/lib/cms/layout";

type FooterLink = { href: string; label: string };

function FooterNav({
  title,
  links,
}: {
  title: string;
  links: readonly FooterLink[];
}) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-midex-mint/90">
        {title}
      </h3>
      <ul className="mt-2.5 space-y-1.5">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-white/65 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export async function Footer({ shell }: { shell: LayoutShellData }) {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const ts = await getTranslations("socialFab");
  const { solutionGroupsNav: solutionGroups, siteContact, settings } = shell;
  const social = settings?.social ?? {};

  const serviceLinks: FooterLink[] = [
    { href: "/solutions", label: nav("allSolutions") },
    { href: "/products", label: nav("products") },
    ...solutionGroups.map((group) => ({
      href: group.href,
      label: group.label,
    })),
  ];

  const companyLinks: FooterLink[] = [
    { href: "/about-us", label: nav("aboutUs") },
    { href: "/contact", label: nav("contactUs") },
    { href: "/blog", label: nav("blog") },
  ];

  const socialLinks = [
    social.linkedIn && {
      href: social.linkedIn,
      label: ts("linkedIn"),
      icon: <LinkedInIcon />,
    },
    social.whatsApp && {
      href: social.whatsApp,
      label: ts("whatsapp"),
      icon: <WhatsAppIcon />,
    },
    social.twitter && {
      href: social.twitter,
      label: ts("twitter"),
      icon: <XIcon />,
    },
  ].filter(Boolean) as Array<{ href: string; label: string; icon: React.ReactNode }>;

  const address = siteContact.address?.trim() || t("address");
  const mapUrl = mapsHref(siteContact, address);

  return (
    <footer className="relative overflow-x-hidden bg-midex-navy-dark text-white">
      <div className="pointer-events-none absolute inset-0 mx-mesh-bg opacity-50" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -end-24 top-0 h-56 w-56 rounded-full bg-midex-blue/8 blur-3xl" />
      </div>

      <div className="relative mx-container py-10 lg:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block shrink-0">
              <Image
                src="/images/brand/logo-white.png"
                alt="Midex"
                width={200}
                height={58}
                className="h-9 w-auto max-w-[160px] sm:h-10"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-snug text-white/50">
              {t("tagline")}
            </p>
            {socialLinks.length > 0 && (
              <ul className="mt-4 flex flex-wrap items-center gap-2">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-colors hover:border-midex-mint/50 hover:bg-midex-mint/15 hover:text-midex-mint"
                    >
                      {link.icon}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <FooterNav title={t("services")} links={serviceLinks} />
          <FooterNav title={t("usefulLinks")} links={companyLinks} />

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-midex-mint/90">
              {t("contactUs")}
            </h3>
            <div className="mt-2.5 space-y-2 text-sm text-white/65">
              {mapUrl ? (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block leading-snug transition-colors hover:text-midex-mint"
                >
                  {address}
                </a>
              ) : (
                <p className="leading-snug">{address}</p>
              )}
              {siteContact.email && (
                <a
                  href={`mailto:${siteContact.email}`}
                  className="block text-midex-mint transition-colors hover:text-white"
                >
                  {siteContact.email}
                </a>
              )}
              <p className="flex flex-col gap-1">
                {siteContact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={phoneTelHref(phone)}
                    className="transition-colors hover:text-midex-mint"
                  >
                    {phone}
                  </a>
                ))}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-white/[0.08] pt-5 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Midex. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
