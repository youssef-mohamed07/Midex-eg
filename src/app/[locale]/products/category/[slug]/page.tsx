import { redirect } from "next/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function ProductCategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  redirect(`/${locale}/products?category=${encodeURIComponent(slug)}`);
}
