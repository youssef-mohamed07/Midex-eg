import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Props = {
  title: string;
  intro: string;
  items: string[];
};

export function SolutionChildOverviewSection({ title, intro, items }: Props) {
  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
            <h2 className="mx-section-title mt-4">{title}</h2>
            <p className="mx-section-subtitle mx-auto">{intro}</p>
          </div>
        </RevealOnScroll>

        <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 sm:gap-4">
          {items.map((item, index) => (
            <RevealOnScroll key={item} delay={index * 40}>
              <li className="flex items-start gap-3 rounded-xl border border-midex-navy/8 bg-white px-4 py-4 text-sm leading-relaxed text-midex-gray/85 shadow-sm sm:px-5 sm:py-5 sm:text-base">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-midex-mint" />
                {item}
              </li>
            </RevealOnScroll>
          ))}
        </ul>
      </div>
    </section>
  );
}
