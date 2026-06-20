import { redirect } from "next/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function ProductCategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  redirect(`${prefix}/products?category=${encodeURIComponent(slug)}`);
}
