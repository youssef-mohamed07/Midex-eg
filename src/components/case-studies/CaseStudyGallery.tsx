import Image from "next/image";

type Props = {
  title: string;
  images: string[];
  alt: string;
};

export function CaseStudyGallery({ title, images, alt }: Props) {
  if (images.length === 0) return null;

  const count = images.length;

  if (count === 1) {
    return (
      <section className="mx-section--tight border-y border-midex-line/70 bg-midex-surface/30">
        <div className="mx-container">
          <h2 className="font-display text-2xl font-bold text-midex-navy sm:text-3xl">{title}</h2>
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-midex-line bg-white shadow-sm sm:mt-8 sm:rounded-3xl">
            <Image
              src={images[0]}
              alt={`${alt} — 1`}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              sizes="100vw"
            />
          </div>
        </div>
      </section>
    );
  }

  if (count === 2) {
    return (
      <section className="mx-section--tight border-y border-midex-line/70 bg-midex-surface/30">
        <div className="mx-container">
          <h2 className="font-display text-2xl font-bold text-midex-navy sm:text-3xl">{title}</h2>
          <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
            {images.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-midex-line bg-white shadow-sm sm:rounded-3xl"
              >
                <Image
                  src={src}
                  alt={`${alt} — ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (count === 3) {
    return (
      <section className="mx-section--tight border-y border-midex-line/70 bg-midex-surface/30">
        <div className="mx-container">
          <h2 className="font-display text-2xl font-bold text-midex-navy sm:text-3xl">{title}</h2>
          <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {images.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className={`relative overflow-hidden rounded-2xl border border-midex-line bg-white shadow-sm sm:rounded-3xl ${
                  index === 0
                    ? "aspect-[16/10] sm:col-span-2 lg:col-span-1 lg:aspect-[4/3]"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={src}
                  alt={`${alt} — ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 4+ images: featured + flexible grid for the rest (no hard cap)
  const [featured, ...rest] = images;

  return (
    <section className="mx-section--tight border-y border-midex-line/70 bg-midex-surface/30">
      <div className="mx-container">
        <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
          <h2 className="font-display text-2xl font-bold text-midex-navy sm:text-3xl">{title}</h2>
          <p className="shrink-0 text-sm font-semibold tabular-nums text-midex-gray/60">
            {count}
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4 lg:grid-cols-12 lg:items-stretch lg:gap-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-midex-line bg-white shadow-sm sm:rounded-3xl lg:col-span-7 lg:aspect-auto lg:min-h-[380px]">
            <Image
              src={featured}
              alt={`${alt} — 1`}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-5 lg:grid-cols-1 lg:grid-rows-3">
            {rest.slice(0, 3).map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-midex-line bg-white shadow-sm sm:rounded-2xl lg:aspect-auto lg:min-h-[118px]"
              >
                <Image
                  src={src}
                  alt={`${alt} — ${index + 2}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 50vw, 35vw"
                />
              </div>
            ))}
          </div>
        </div>

        {rest.length > 3 ? (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {rest.slice(3).map((src, index) => (
              <div
                key={`${src}-extra-${index}`}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-midex-line bg-white shadow-sm sm:rounded-2xl"
              >
                <Image
                  src={src}
                  alt={`${alt} — ${index + 5}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
