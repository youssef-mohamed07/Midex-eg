import { getLocalizedTestimonials } from "@/content/i18n";
import { type Locale } from "@/i18n/routing";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";

export async function TestimonialsSection({
  title,
  locale,
}: {
  title: string;
  locale: Locale;
}) {
  const testimonials = getLocalizedTestimonials(locale);

  if (testimonials.length === 0) return null;

  return <TestimonialsSlider title={title} testimonials={testimonials} />;
}
