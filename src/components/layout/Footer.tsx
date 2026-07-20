import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  FacebookIcon,
  LinkedInIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/layout/social-icons";
import { mapsHref, phoneTelHref } from "@/lib/cms/contact";
import type { LayoutShellData } from "@/lib/cms/layout";
import { pick } from "@/lib/cms/section-resolve";

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

export async function Footer({ shell }: { shell: LayoutShellData }) {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const ts = await getTranslations("socialFab");
  const { solutionGroupsNav: solutionGroups, siteContact, settings, chrome } = shell;
  const social = settings?.social ?? {};
  const siteName = settings?.name?.trim() || "Midex";

  const productsLabel = pick(chrome.products, nav("products"));
  const aboutLabel = pick(chrome.aboutUs, nav("aboutUs"));
  const contactLabel = pick(chrome.contactUs, nav("contactUs"));
  const blogLabel = pick(chrome.blog, nav("blog"));
  const allSolutionsLabel = pick(chrome.allSolutions, nav("allSolutions"));

  const serviceLinks: FooterLink[] = [
    { href: "/solutions", label: allSolutionsLabel },
    { href: "/products", label: productsLabel },
    ...solutionGroups.map((group) => ({
      href: group.href,
      label: group.label,
    })),
  ];

  const companyLinks: FooterLink[] = [
    { href: "/about-us", label: aboutLabel },
    { href: "/contact", label: contactLabel },
    { href: "/blog", label: blogLabel },
  ];

  const socialLinks = [
    social.linkedIn && {
      href: social.linkedIn,
      label: pick(chrome.socialLinkedIn, ts("linkedIn")),
      icon: <LinkedInIcon />,
    },
    social.facebook && {
      href: social.facebook,
      label: pick(chrome.socialFacebook, ts("facebook")),
      icon: <FacebookIcon />,
    },
    social.youtube && {
      href: social.youtube,
      label: pick(chrome.socialYoutube, ts("youtube")),
      icon: <YouTubeIcon />,
    },
    social.whatsApp && {
      href: social.whatsApp,
      label: pick(chrome.socialWhatsapp, ts("whatsapp")),
      icon: <WhatsAppIcon />,
    },
  ].filter(Boolean) as Array<{ href: string; label: string; icon: React.ReactNode }>;

  const address =
    siteContact.address?.trim() ||
    pick(chrome.footerAddressFallback, t("address"));
  const mapUrl = mapsHref(siteContact, address);
  const logoSrc = shell.logos.logoWhite;

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
                src={logoSrc}
                alt={siteName}
                width={200}
                height={58}
                className="h-9 w-auto max-w-[160px] sm:h-10"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-snug text-white/50">
              {pick(chrome.footerTagline, t("tagline"))}
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

          <FooterNav title={pick(chrome.footerServices, t("services"))} links={serviceLinks} />
          <FooterNav
            title={pick(chrome.footerUsefulLinks, t("usefulLinks"))}
            links={companyLinks}
          />

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-midex-mint/90">
              {pick(chrome.footerContactUs, t("contactUs"))}
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
          © {new Date().getFullYear()} {siteName}. {pick(chrome.footerRights, t("rights"))}
        </p>
      </div>
    </footer>
  );
}
