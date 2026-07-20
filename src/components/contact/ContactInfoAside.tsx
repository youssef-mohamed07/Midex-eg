import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import {
  FacebookIcon,
  LinkedInIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/layout/social-icons";
import { phoneTelHref } from "@/lib/cms/contact";
import { getSiteContact, getSiteSettings } from "@/lib/cms";
import type { SiteContact, SiteSettings } from "@/lib/cms/types";

function EmailIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l9 6 9-6M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8M3 8a2 2 0 012-2h14a2 2 0 012 2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h2.6a1 1 0 01.95.68l1.2 3.6a1 1 0 01-.27 1.05L8.1 10.9a13 13 0 005 5l1.57-1.58a1 1 0 011.05-.27l3.6 1.2a1 1 0 01.68.95V19a2 2 0 01-2 2A16 16 0 013 5z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" strokeWidth={1.8} />
    </svg>
  );
}

type ContactInfoAsideProps = {
  showOffice?: boolean;
  sticky?: boolean;
  siteContact?: SiteContact;
  settings?: SiteSettings | null;
  intro?: string;
};

export async function ContactInfoAside({
  showOffice = false,
  sticky = true,
  siteContact: siteContactProp,
  settings: settingsProp,
  intro,
}: ContactInfoAsideProps) {
  const tc = await getTranslations("contact");
  const ts = await getTranslations("socialFab");
  const [siteContact, settings] = siteContactProp
    ? [siteContactProp, settingsProp ?? null]
    : await Promise.all([getSiteContact(), getSiteSettings()]);
  const social = settings?.social ?? {};

  const socialLinks = [
    social.linkedIn && {
      href: social.linkedIn,
      label: ts("linkedIn"),
      icon: <LinkedInIcon className="h-5 w-5" />,
      external: true,
    },
    social.facebook && {
      href: social.facebook,
      label: ts("facebook"),
      icon: <FacebookIcon className="h-5 w-5" />,
      external: true,
    },
    social.youtube && {
      href: social.youtube,
      label: ts("youtube"),
      icon: <YouTubeIcon className="h-5 w-5" />,
      external: true,
    },
    social.whatsApp && {
      href: social.whatsApp,
      label: ts("whatsapp"),
      icon: <WhatsAppIcon className="h-5 w-5" />,
      external: true,
    },
    {
      href: `mailto:${siteContact.email}`,
      label: ts("email"),
      icon: <EmailIcon />,
      external: false,
    },
  ].filter(Boolean) as Array<{
    href: string;
    label: string;
    icon: ReactNode;
    external: boolean;
  }>;

  return (
    <aside
      className={`midex-contact-aside ${sticky ? "midex-contact-aside--sticky" : ""}`}
    >
      <div className="border-b border-midex-line/80 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-midex-blue">Midex</p>
        <h2 className="mt-1 font-display text-xl font-bold text-midex-navy">{tc("salesQuotes")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-midex-gray/70">{intro ?? tc("asideIntro")}</p>

        <ul className="mt-5 space-y-2.5">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 rounded-xl border border-midex-line/70 bg-midex-surface/40 px-4 py-3 text-sm font-medium text-midex-navy no-underline transition-colors hover:border-midex-mint/50 hover:bg-midex-mint/10 hover:text-midex-blue"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-midex-navy text-white transition-colors group-hover:bg-midex-blue">
                  {link.icon}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-5 p-6 sm:p-7">
        <a
          href={`mailto:${siteContact.email}`}
          className="group flex items-start gap-3 text-sm text-midex-gray/80 no-underline transition-colors hover:text-midex-blue"
        >
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-midex-mint/15 text-midex-blue">
            <EmailIcon />
          </span>
          <span>
            <span className="block text-xs font-semibold uppercase tracking-wider text-midex-gray/55">
              {tc("email")}
            </span>
            <span className="font-medium text-midex-navy group-hover:text-midex-blue">
              {siteContact.email}
            </span>
          </span>
        </a>

        <div className="flex items-start gap-3 text-sm text-midex-gray/80">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-midex-mint/15 text-midex-blue">
            <PhoneIcon />
          </span>
          <span>
            <span className="block text-xs font-semibold uppercase tracking-wider text-midex-gray/55">
              {tc("phone")}
            </span>
            <span className="font-medium text-midex-navy">
              {siteContact.phones.map((phone, index) => (
                <span key={phone}>
                  {index > 0 && " / "}
                  <a href={phoneTelHref(phone)} className="no-underline hover:text-midex-blue">
                    {phone}
                  </a>
                </span>
              ))}
            </span>
          </span>
        </div>

        {showOffice && (
          <div className="border-t border-midex-line/80 pt-5">
            <h3 className="font-display text-base font-bold text-midex-navy">{tc("office")}</h3>
            <a
              href="#office-map"
              className="group mt-3 flex items-start gap-3 text-sm leading-relaxed text-midex-gray/80 no-underline transition-colors hover:text-midex-blue"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-midex-mint/15 text-midex-blue">
                <PinIcon />
              </span>
              <span>
                <span className="font-medium text-midex-navy group-hover:text-midex-blue">
                  {siteContact.address}
                </span>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-midex-blue">
                  {tc("viewOnMap")} →
                </span>
              </span>
            </a>
          </div>
        )}
      </div>
    </aside>
  );
}
