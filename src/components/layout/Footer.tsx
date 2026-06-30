import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteContact } from "@/content/site";

const serviceLinks = [
  { href: "/solutions", key: "allSolutions" as const },
  { href: "/products", key: "products" as const },
  { href: "/solutions/group/systems", key: "systems" as const },
  { href: "/solutions/group/welding", key: "welding" as const },
  { href: "/solutions/group/installations", key: "installations" as const },
] as const;

const companyLinks = [
  { href: "/about-us", key: "aboutUs" as const },
  { href: "/contact", key: "contactUs" as const },
  { href: "/blog", key: "blog" as const },
] as const;

function FooterNav({
  title,
  links,
  nav,
}: {
  title: string;
  links: readonly { href: string; key: (typeof serviceLinks)[number]["key"] | (typeof companyLinks)[number]["key"] }[];
  nav: (key: string) => string;
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
              {nav(item.key)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

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
                className="h-9 w-auto max-w-[160px]"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-snug text-white/50">
              {t("tagline")}
            </p>
          </div>

          <FooterNav title={t("services")} links={serviceLinks} nav={nav} />
          <FooterNav title={t("usefulLinks")} links={companyLinks} nav={nav} />

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-midex-mint/90">
              {t("contactUs")}
            </h3>
            <div className="mt-2.5 space-y-2 text-sm text-white/65">
              <p className="leading-snug">{t("address")}</p>
              <a
                href={`mailto:${siteContact.email}`}
                className="block text-midex-mint transition-colors hover:text-white"
              >
                {siteContact.email}
              </a>
              <p className="flex flex-col gap-1 sm:block">
                {siteContact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
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
