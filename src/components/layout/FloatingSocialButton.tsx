"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/seo/config";

type SocialLink = {
  id: string;
  href: string;
  label: string;
  external: boolean;
  icon: React.ReactNode;
};

export type FloatingSocialProps = {
  social: { linkedIn?: string; twitter?: string; whatsApp?: string };
  email: string;
  labels?: {
    open?: string;
    close?: string;
    linkedIn?: string;
    whatsapp?: string;
    email?: string;
    twitter?: string;
  };
};

function pickLabel(cms: string | undefined, fallback: string): string {
  const value = cms?.trim();
  return value || fallback;
}

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l9 6 9-6M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8M3 8a2 2 0 012-2h14a2 2 0 012 2" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
      icon: <LinkedInIcon />,
    });
  }

  if (social.whatsApp) {
    links.push({
      id: "whatsapp",
      href: social.whatsApp,
      label: pickLabel(labels.whatsapp, t("whatsapp")),
      external: true,
      icon: <WhatsAppIcon />,
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

  if (social.twitter) {
    links.push({
      id: "twitter",
      href: social.twitter,
      label: pickLabel(labels.twitter, t("twitter")),
      external: true,
      icon: <XIcon />,
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
