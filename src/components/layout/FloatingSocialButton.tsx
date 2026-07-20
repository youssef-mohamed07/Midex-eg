"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  FacebookIcon,
  LinkedInIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/layout/social-icons";
import { siteConfig } from "@/lib/seo/config";

type SocialLink = {
  id: string;
  href: string;
  label: string;
  external: boolean;
  icon: React.ReactNode;
};

export type FloatingSocialProps = {
  social: {
    linkedIn?: string;
    facebook?: string;
    youtube?: string;
    whatsApp?: string;
  };
  email: string;
  labels?: {
    open?: string;
    close?: string;
    linkedIn?: string;
    facebook?: string;
    youtube?: string;
    whatsapp?: string;
    email?: string;
  };
};

function pickLabel(cms: string | undefined, fallback: string): string {
  const value = cms?.trim();
  return value || fallback;
}

function EmailIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l9 6 9-6M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8M3 8a2 2 0 012-2h14a2 2 0 012 2" />
    </svg>
  );
}

function getSocialLinks(
  t: (key: string) => string,
  { social, email, labels = {} }: FloatingSocialProps,
): SocialLink[] {
  const links: SocialLink[] = [];

  if (social.linkedIn) {
    links.push({
      id: "linkedin",
      href: social.linkedIn,
      label: pickLabel(labels.linkedIn, t("linkedIn")),
      external: true,
      icon: <LinkedInIcon className="h-5 w-5" />,
    });
  }

  if (social.facebook) {
    links.push({
      id: "facebook",
      href: social.facebook,
      label: pickLabel(labels.facebook, t("facebook")),
      external: true,
      icon: <FacebookIcon className="h-5 w-5" />,
    });
  }

  if (social.youtube) {
    links.push({
      id: "youtube",
      href: social.youtube,
      label: pickLabel(labels.youtube, t("youtube")),
      external: true,
      icon: <YouTubeIcon className="h-5 w-5" />,
    });
  }

  if (social.whatsApp) {
    links.push({
      id: "whatsapp",
      href: social.whatsApp,
      label: pickLabel(labels.whatsapp, t("whatsapp")),
      external: true,
      icon: <WhatsAppIcon className="h-5 w-5" />,
    });
  }

  if (email) {
    links.push({
      id: "email",
      href: `mailto:${email}`,
      label: pickLabel(labels.email, t("email")),
      external: false,
      icon: <EmailIcon />,
    });
  }

  return links;
}

export function FloatingSocialButton({
  social,
  email,
  labels = {},
}: FloatingSocialProps) {
  const t = useTranslations("socialFab");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const links = getSocialLinks(t, { social, email, labels });

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  if (links.length === 0) return null;

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed bottom-4 end-4 z-40 flex flex-col items-end gap-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:bottom-6 sm:end-6"
    >
      <div
        className={`flex flex-col items-end gap-2.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
        aria-hidden={!open}
      >
        {links.map((link, index) => (
          <a
            key={link.id}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            aria-label={link.label}
            tabIndex={open ? 0 : -1}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-midex-navy/8 bg-white text-midex-navy shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-midex-mint/50 hover:text-midex-blue hover:shadow-xl motion-reduce:transition-none"
            style={{ transitionDelay: open ? `${index * 45}ms` : "0ms" }}
            onClick={() => setOpen(false)}
          >
            {link.icon}
          </a>
        ))}
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-label={
          open ? pickLabel(labels.close, t("close")) : pickLabel(labels.open, t("open"))
        }
        onClick={() => setOpen((value) => !value)}
        className={`pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full border bg-midex-navy shadow-xl shadow-midex-navy/35 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-midex-mint motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
          open
            ? "border-midex-mint/70 ring-2 ring-midex-mint/40"
            : "border-midex-mint/35 hover:border-midex-mint/60"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteConfig.brandIcon}
          alt=""
          className={`h-9 w-9 transition-transform duration-300 motion-reduce:transition-none ${
            open ? "scale-95" : "scale-100"
          }`}
        />
      </button>
    </div>
  );
}
