import { getTestimonials } from "@/lib/cms";
import type { Testimonial } from "@/lib/cms/types";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { type Locale } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export async function TestimonialsSection({
  title,
  subtitle,
  testimonials: testimonialsProp,
  locale: localeProp,
}: {
  title: string;
  subtitle: string;
  testimonials?: Testimonial[];
  locale?: Locale;
}) {
  const locale = localeProp ?? ((await getLocale()) as Locale);
  const testimonials = testimonialsProp ?? (await getTestimonials(locale));

  if (testimonials.length === 0) return null;

  return (
    <TestimonialsSlider
      title={title}
      subtitle={subtitle}
      testimonials={testimonials}
      locale={locale}
    />
  );
}
