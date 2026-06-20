"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  getLocalizedProductCategories,
  getLocalizedSolutionGroups,
} from "@/content/i18n";
import { type Locale } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

type NavItem = {
  label: string;
  href: string;
  children?: NavLink[];
};

function ChevronDown({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ChevronRight({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function DesktopNavItem({
  item,
  overlay,
}: {
  item: NavItem;
  overlay: boolean;
}) {
  const topLinkClass = `inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors no-underline ${
    overlay
      ? "text-white hover:bg-white/10 hover:text-midex-mint"
      : "text-midex-navy hover:bg-midex-surface hover:text-midex-blue"
  }`;

  if (!item.children?.length) {
    return (
      <Link href={item.href} className={topLinkClass}>
        {item.label}
      </Link>
    );
  }

  return (
    <>
      <Link href={item.href} className={topLinkClass}>
        {item.label}
        <ChevronDown className="opacity-60" />
      </Link>

      <ul className="midex-nav-dropdown absolute left-0 top-full z-50 min-w-[260px] rounded-xl border border-midex-navy/5 bg-white p-2 shadow-xl">
        {item.children.map((child) => {
          const hasFlyout = Boolean(child.children?.length);
          const rowClass =
            "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm text-midex-gray no-underline transition-colors hover:bg-midex-surface hover:text-midex-navy";

          return hasFlyout ? (
            <li key={child.href} className="midex-nav-sub relative">
              <Link href={child.href} className={rowClass}>
                <span>{child.label}</span>
                <ChevronRight className="midex-nav-arrow h-4 w-4 shrink-0 text-midex-blue" />
              </Link>
              <ul className="midex-nav-flyout absolute left-full top-0 z-50 ml-1 min-w-[280px] rounded-xl border border-midex-navy/5 bg-white p-2 shadow-xl">
                {child.children!.map((sub) => (
                  <li key={sub.href}>
                    <Link
                      href={sub.href}
                      className="block rounded-md px-3 py-2 text-sm text-midex-gray no-underline transition-colors hover:bg-midex-surface hover:text-midex-navy"
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={child.href}>
              <Link href={child.href} className={rowClass}>
                <span>{child.label}</span>
                <ChevronRight className="midex-nav-arrow h-4 w-4 shrink-0 text-midex-navy/25" />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function MobileNavNestedGroup({
  child,
  openKeys,
  toggleKey,
}: {
  child: NavLink;
  openKeys: Set<string>;
  toggleKey: (key: string) => void;
}) {
  if (!child.children?.length) {
    return (
      <Link
        href={child.href}
        className="block rounded-lg px-3 py-2.5 text-[15px] font-semibold text-midex-navy no-underline transition-colors hover:bg-white"
      >
        {child.label}
      </Link>
    );
  }

  const isOpen = openKeys.has(child.href);

  return (
    <div className="overflow-hidden rounded-lg border border-midex-navy/6 bg-white/80">
      <div className="flex items-stretch">
        <Link
          href={child.href}
          className="flex flex-1 items-center px-3 py-2.5 text-sm font-semibold text-midex-navy no-underline hover:text-midex-blue"
        >
          {child.label}
        </Link>
        <button
          type="button"
          className="flex w-10 shrink-0 items-center justify-center border-l border-midex-navy/8 text-midex-navy/40 hover:bg-midex-surface"
          aria-expanded={isOpen}
          aria-label={child.label}
          onClick={() => toggleKey(child.href)}
        >
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen && (
        <ul className="border-t border-midex-navy/6 px-1 pb-2 pt-1">
          {child.children.map((sub) => (
            <li key={sub.href}>
              <Link
                href={sub.href}
                className="block rounded-md px-3 py-2 text-[14px] leading-snug text-midex-gray no-underline transition-colors hover:bg-midex-surface hover:text-midex-navy"
              >
                {sub.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MobileNavItem({
  item,
  openKeys,
  toggleKey,
}: {
  item: NavItem;
  openKeys: Set<string>;
  toggleKey: (key: string) => void;
}) {
  const isOpen = openKeys.has(item.href);

  if (!item.children?.length) {
    return (
      <li className="border-b border-midex-navy/8">
        <Link
          href={item.href}
          className="flex min-h-[52px] items-center px-5 py-3 font-display text-base font-semibold text-midex-navy no-underline transition-colors hover:bg-midex-surface/80"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-midex-navy/8">
      <button
        type="button"
        className="flex min-h-[52px] w-full items-center justify-between gap-3 px-5 py-3 text-left font-display text-base font-semibold text-midex-navy transition-colors hover:bg-midex-surface/80"
        aria-expanded={isOpen}
        onClick={() => toggleKey(item.href)}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-midex-navy/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="space-y-2 border-t border-midex-navy/6 bg-midex-surface/50 px-3 pb-4 pt-2">
          {item.children.map((child) => (
            <MobileNavNestedGroup
              key={child.href}
              child={child}
              openKeys={openKeys}
              toggleKey={toggleKey}
            />
          ))}
        </div>
      )}
    </li>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const productCategories = getLocalizedProductCategories(locale);
  const solutionGroups = getLocalizedSolutionGroups(locale);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileKeys, setOpenMobileKeys] = useState<Set<string>>(new Set());

  const toggleMobileKey = (key: string) => {
    setOpenMobileKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
        return next;
      }

      // Only one top-level section open at a time (Products / Solutions)
      const isTopLevel = navItems.some(
        (item) => item.href === key && item.children?.length,
      );
      if (isTopLevel) {
        navItems.forEach((item) => {
          if (item.children?.length && item.href !== key) {
            next.delete(item.href);
          }
        });
      }

      next.add(key);
      return next;
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenMobileKeys(new Set());
  }, [pathname]);

  const overlay = !scrolled;
  const headerClass = [
    "midex-header fixed inset-x-0 top-0 z-50 overflow-visible border-b transition-all duration-300 midex-header--overlay",
    scrolled ? "is-scrolled" : "",
    overlay
      ? "border-transparent bg-transparent shadow-none"
      : "border-midex-mint/30 bg-white/95 shadow-sm backdrop-blur-md",
  ]
    .filter(Boolean)
    .join(" ");

  const productChildren = Object.entries(productCategories).map(
    ([slug, cat]) => ({
      label: cat.label,
      href: `/products/category/${slug}`,
    }),
  );

  const solutionChildren: NavLink[] = [
    { label: t("allSolutions"), href: "/solutions" },
    ...solutionGroups.map((group) => ({
      label: group.menuLabel ?? group.label,
      href: `/solutions/group/${group.slug}`,
      children: group.children.map((child) => ({
        label: child.label,
        href: `/solutions/group/${group.slug}/${child.slug}`,
      })),
    })),
  ];

  const navItems: NavItem[] = [
    { label: t("products"), href: "/products", children: productChildren },
    { label: t("solutions"), href: "/solutions", children: solutionChildren },
    { label: t("blog"), href: "/blog" },
    { label: t("aboutUs"), href: "/about-us" },
    { label: t("contactUs"), href: "/contact" },
  ];

  return (
    <header className={headerClass} data-midex-header>
      <div className="mx-container overflow-visible">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="midex-header__brand shrink-0">
            <Image
              src="/images/brand/logo-white.png"
              alt="Midex"
              width={200}
              height={58}
              className="midex-header__logo midex-header__logo--light h-12 w-auto max-w-[200px] sm:h-14 lg:h-[58px]"
              priority
            />
            <Image
              src="/images/brand/logo-dark.png"
              alt="Midex"
              width={200}
              height={58}
              className="midex-header__logo midex-header__logo--dark h-12 w-auto max-w-[200px] sm:h-14 lg:h-[58px]"
              priority
            />
          </Link>

          <nav
            className="midex-header__nav hidden flex-1 items-center justify-center overflow-visible md:flex"
            aria-label="Primary"
          >
            <ul className="midex-menu flex flex-wrap items-center justify-center gap-1 xl:gap-2">
              {navItems.map((item) => (
                <li key={item.href} className="group relative">
                  <DesktopNavItem item={item} overlay={overlay} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher
              className={`hidden sm:flex ${overlay ? "[&_a:not([aria-current])]:border-white/30 [&_a[aria-current]]:border-midex-mint" : ""}`}
            />
            <Link
              href="/contact"
              className="mx-btn mx-btn-primary hidden !px-5 !py-2.5 !text-sm sm:inline-flex"
            >
              {t("contactUs")}
            </Link>
            <button
              type="button"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border md:hidden ${
                overlay
                  ? "border-white/30 text-white"
                  : "border-midex-navy/10 text-midex-navy"
              }`}
              aria-expanded={menuOpen}
              aria-label={t("menu")}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="midex-mobile-nav fixed inset-x-0 top-[72px] z-40 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-midex-navy/10 bg-white shadow-xl md:hidden">
          <nav aria-label="Mobile navigation">
            <ul>
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.href}
                  item={item}
                  openKeys={openMobileKeys}
                  toggleKey={toggleMobileKey}
                />
              ))}
            </ul>
            <div className="mx-container space-y-4 border-t border-midex-navy/8 px-5 py-5">
              <Link href="/contact" className="mx-btn mx-btn-primary w-full justify-center">
                {t("contactUs")}
              </Link>
              <LanguageSwitcher className="justify-center" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
