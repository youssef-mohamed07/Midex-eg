import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteContact } from "@/content/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  return (
    <footer className="midex-footer bg-midex-navy text-white">
      <div className="mx-container py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block shrink-0">
              <Image
                src="/images/brand/logo-white.png"
                alt="Midex"
                width={200}
                height={58}
                className="h-12 w-auto max-w-[200px] sm:h-14 lg:h-[58px]"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{t("tagline")}</p>
          </div>

          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-midex-mint">
              {t("services")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="text-white/75 transition-colors hover:text-midex-mint" href="/solutions">
                  {nav("allSolutions")}
                </Link>
              </li>
              <li>
                <Link className="text-white/75 transition-colors hover:text-midex-mint" href="/products">
                  {nav("products")}
                </Link>
              </li>
              <li>
                <Link className="text-white/75 transition-colors hover:text-midex-mint" href="/solutions/group/systems">
                  {nav("systems")}
                </Link>
              </li>
              <li>
                <Link className="text-white/75 transition-colors hover:text-midex-mint" href="/solutions/group/welding">
                  {nav("welding")}
                </Link>
              </li>
              <li>
                <Link className="text-white/75 transition-colors hover:text-midex-mint" href="/solutions/group/installations">
                  {nav("installations")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-midex-mint">
              {t("usefulLinks")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="text-white/75 transition-colors hover:text-midex-mint" href="/about-us">
                  {nav("aboutUs")}
                </Link>
              </li>
              <li>
                <Link className="text-white/75 transition-colors hover:text-midex-mint" href="/contact">
                  {nav("contactUs")}
                </Link>
              </li>
              <li>
                <Link className="text-white/75 transition-colors hover:text-midex-mint" href="/blog">
                  {nav("blog")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-midex-mint">
              {t("contactUs")}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{t("address")}</p>
            <p className="mt-3 text-sm">
              <a className="text-midex-mint hover:text-white" href={`mailto:${siteContact.email}`}>
                {siteContact.email}
              </a>
            </p>
            <p className="mt-2 text-sm text-white/70">
              {siteContact.phones.join(" / ")}
            </p>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Midex. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
