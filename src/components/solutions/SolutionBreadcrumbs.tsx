import { Link } from "@/i18n/navigation";

type Crumb = {
  label: string;
  href?: string;
};

export function SolutionBreadcrumbs({
  items,
  light = false,
}: {
  items: Crumb[];
  light?: boolean;
}) {
  const linkClass = light
    ? "font-medium text-midex-mint transition hover:text-white"
    : "font-medium text-midex-blue transition hover:text-midex-navy";
  const currentClass = light
    ? "font-medium text-white/75"
    : "font-medium text-midex-gray/70";
  const separatorClass = light ? "text-white/30" : "text-midex-gray/35";

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-2">
          {index > 0 && <span className={separatorClass}>/</span>}
          {item.href ? (
            <Link href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ) : (
            <span className={currentClass}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
