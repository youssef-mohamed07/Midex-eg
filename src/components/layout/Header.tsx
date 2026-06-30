"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  active,
}: {
  item: NavItem;
  overlay: boolean;
  active: boolean;
}) {
  const topLinkClass = `group/nav relative inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[13px] font-medium transition-colors no-underline ${
    overlay
      ? "text-white/90 hover:bg-white/10 hover:text-white"
      : "text-midex-navy hover:bg-midex-surface hover:text-midex-blue"
  } ${active ? (overlay ? "!text-white" : "!text-midex-blue") : ""}`;

  const underline = (
    <span
      className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 origin-start rounded-full bg-gradient-to-r from-midex-mint to-midex-blue transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
      }`}
    />
  );

  if (!item.children?.length) {
    return (
      <Link href={item.href} className={topLinkClass}>
        {item.label}
        {underline}
      </Link>
    );
  }

  return (
    <>
      <Link href={item.href} className={topLinkClass}>
        {item.label}
        <ChevronDown className="opacity-60 transition-transform duration-300 group-hover:rotate-180" />
        {underline}
      </Link>

      <ul className="midex-nav-dropdown absolute start-0 top-full z-50 min-w-[260px] max-w-[calc(100vw-2rem)] rounded-xl border border-midex-navy/5 bg-white p-2 shadow-xl">
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
              <ul className="midex-nav-flyout absolute start-full top-0 z-50 ms-1 min-w-[280px] max-w-[calc(100vw-2rem)] rounded-xl border border-midex-navy/5 bg-white p-2 shadow-xl">
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
  onNavigate,
}: {
  child: NavLink;
  openKeys: Set<string>;
  toggleKey: (key: string) => void;
  onNavigate: () => void;
}) {
  if (!child.children?.length) {
    return (
      <Link
        href={child.href}
        onClick={onNavigate}
        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-midex-gray no-underline transition-colors hover:bg-midex-surface hover:text-midex-navy"
      >
        {child.label}
      </Link>
    );
  }

  const isOpen = openKeys.has(child.href);

  return (
    <div className="overflow-hidden rounded-lg border border-midex-line/70 bg-white/90">
      <div className="flex items-stretch">
        <Link
          href={child.href}
          onClick={onNavigate}
          className="flex flex-1 items-center px-3 py-2.5 text-sm font-semibold text-midex-navy no-underline hover:text-midex-blue"
        >
          {child.label}
        </Link>
        <button
          type="button"
          className="flex w-10 shrink-0 items-center justify-center border-s border-midex-line/70 text-midex-navy/40 hover:bg-midex-surface"
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
        <ul className="border-t border-midex-line/70 px-1 pb-1.5 pt-1">
          {child.children.map((sub) => (
            <li key={sub.href}>
              <Link
                href={sub.href}
                onClick={onNavigate}
                className="block rounded-md px-3 py-2 text-[13px] leading-snug text-midex-gray no-underline transition-colors hover:bg-midex-surface hover:text-midex-navy"
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
  onNavigate,
}: {
  item: NavItem;
  openKeys: Set<string>;
  toggleKey: (key: string) => void;
  onNavigate: () => void;
}) {
  const isOpen = openKeys.has(item.href);

  if (!item.children?.length) {
    return (
      <li>
        <Link
          href={item.href}
          onClick={onNavigate}
          className="flex min-h-[48px] items-center rounded-xl px-4 py-3 font-display text-[15px] font-semibold text-midex-navy no-underline transition-colors hover:bg-midex-surface active:bg-midex-surface"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div className="overflow-hidden rounded-xl border border-midex-line/80 bg-midex-surface/40">
        <div className="flex items-stretch">
          <Link
            href={item.href}
            onClick={onNavigate}
            className="flex min-h-[48px] flex-1 items-center px-4 py-3 font-display text-[15px] font-semibold text-midex-navy no-underline transition-colors hover:text-midex-blue"
          >
            {item.label}
          </Link>
          <button
            type="button"
            className="flex w-11 shrink-0 items-center justify-center border-s border-midex-line/80 text-midex-navy/45 transition-colors hover:bg-white/80"
            aria-expanded={isOpen}
            aria-label={item.label}
            onClick={() => toggleKey(item.href)}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {isOpen && (
          <div className="space-y-1.5 border-t border-midex-line/80 bg-white/70 px-2 pb-2 pt-2">
            {item.children.map((child) => (
              <MobileNavNestedGroup
                key={child.href}
                child={child}
                openKeys={openKeys}
                toggleKey={toggleKey}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>
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
  const [headerVisible, setHeaderVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileKeys, setOpenMobileKeys] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTicking = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    const scrollThreshold = 8;
    const topOffset = 40;

    const updateScroll = () => {
      const y = window.scrollY;
      setScrolled(y > topOffset);

      if (menuOpen) {
        setHeaderVisible(true);
        lastScrollY.current = y;
        scrollTicking.current = false;
        return;
      }

      if (y <= topOffset) {
        setHeaderVisible(true);
      } else if (y > lastScrollY.current + scrollThreshold) {
        setHeaderVisible(false);
      } else if (y < lastScrollY.current - scrollThreshold) {
        setHeaderVisible(true);
      }

      lastScrollY.current = y;
      scrollTicking.current = false;
    };

    const onScroll = () => {
      if (scrollTicking.current) {
        return;
      }

      scrollTicking.current = true;
      requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setOpenMobileKeys(new Set());
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.insetInline = "0";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.dataset.scrollLock = String(scrollY);
    } else {
      const scrollY = Number(document.body.dataset.scrollLock ?? "0");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.insetInline = "";
      document.body.style.top = "";
      document.body.style.width = "";
      delete document.body.dataset.scrollLock;
      window.scrollTo(0, scrollY);
    }

    return () => {
      const scrollY = Number(document.body.dataset.scrollLock ?? "0");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.insetInline = "";
      document.body.style.top = "";
      document.body.style.width = "";
      delete document.body.dataset.scrollLock;
      if (scrollY) window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const overlay = !scrolled;

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
  ];

  const barClass = overlay
    ? "border-white/15 bg-white/[0.07] shadow-lg shadow-black/5 backdrop-blur-xl backdrop-saturate-150"
    : "border-midex-line/40 bg-white/70 shadow-md backdrop-blur-xl";

  return (
    <header
      className={`midex-header midex-header--overlay pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-3.5 lg:px-6 ${scrolled ? "is-scrolled" : ""} ${headerVisible ? "" : "is-hidden"}`}
      data-midex-header
    >
      <div
        className={`midex-header-bar pointer-events-auto relative z-[60] mx-auto max-w-6xl overflow-visible rounded-full border transition-all duration-300 ${barClass}`}
      >
        <div className="flex h-14 items-center justify-between gap-2 px-3 sm:gap-3 sm:px-5">
          <Link href="/" className="midex-header__brand shrink-0">
            <Image
              src="/images/brand/logo-white.png"
              alt="Midex"
              width={200}
              height={58}
              className="midex-header__logo midex-header__logo--light h-9 w-auto max-w-[150px] sm:h-10"
              priority
            />
            <Image
              src="/images/brand/logo-dark.png"
              alt="Midex"
              width={200}
              height={58}
              className="midex-header__logo midex-header__logo--dark h-9 w-auto max-w-[150px] sm:h-10"
              priority
            />
          </Link>

          <nav
            className="midex-header__nav hidden flex-1 items-center justify-center overflow-visible lg:flex"
            aria-label="Primary"
          >
            <ul className="midex-menu flex flex-wrap items-center justify-center gap-0.5 xl:gap-1">
              {navItems.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(`${item.href}/`));
                return (
                  <li key={item.href} className="group relative">
                    <DesktopNavItem item={item} overlay={overlay} active={active} />
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <LanguageSwitcher
              className={`hidden sm:flex [&_a]:!h-8 [&_a]:!w-8 [&_a]:!text-base ${overlay ? "[&_a:not([aria-current])]:border-white/25 [&_a[aria-current]]:border-midex-mint/80 [&_a[aria-current]]:bg-white/10" : ""}`}
            />
            <Link
              href="/contact"
              className={`group mx-btn hidden !rounded-full !px-4 !py-2 !text-xs sm:inline-flex ${
                overlay
                  ? "border border-white/20 bg-white/5 text-white hover:border-white/35 hover:bg-white/10"
                  : "mx-btn-primary !py-2 !text-xs"
              }`}
            >
              {t("contactUs")}
              <span className="mx-arrow">→</span>
            </Link>
            <button
              type="button"
              className={`inline-flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border lg:hidden ${
                overlay
                  ? "border-white/25 bg-white/5 text-white"
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

      {mounted &&
        menuOpen &&
        createPortal(
          <>
            <button
              type="button"
              className="midex-mobile-backdrop pointer-events-auto fixed inset-0 z-[45] bg-midex-navy-dark/55 backdrop-blur-[2px] lg:hidden"
              aria-label={t("close")}
              onClick={closeMenu}
            />

            <div className="midex-mobile-nav pointer-events-auto fixed inset-x-3 top-[calc(0.75rem+3.5rem+0.5rem)] z-[55] flex max-h-[min(calc(100dvh-5.5rem),640px)] flex-col overflow-hidden rounded-2xl border border-white/60 bg-white shadow-2xl shadow-midex-navy/20 sm:inset-x-5 lg:hidden">
              <nav
                aria-label="Mobile navigation"
                className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain"
              >
                <ul className="space-y-1.5 p-3">
                  {navItems.map((item) => (
                    <MobileNavItem
                      key={item.href}
                      item={item}
                      openKeys={openMobileKeys}
                      toggleKey={toggleMobileKey}
                      onNavigate={closeMenu}
                    />
                  ))}
                </ul>

                <div className="mt-auto space-y-4 border-t border-midex-line/80 bg-midex-surface/30 px-4 py-4">
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="group mx-btn mx-btn-primary w-full justify-center"
                  >
                    {t("contactUs")}
                    <span className="mx-arrow">→</span>
                  </Link>
                  <LanguageSwitcher className="justify-center" />
                </div>
              </nav>
            </div>
          </>,
          document.body,
        )}
    </header>
  );
}
