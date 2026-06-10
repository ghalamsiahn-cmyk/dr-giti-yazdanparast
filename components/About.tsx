import { site } from "@/content/site";

export default function About() {
  const { about } = site;

  return (
    <section id="about" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5">
        <div className="mb-12 flex items-center gap-4">
          <span className="h-10 w-1.5 rounded-full bg-gold" />
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            {about.title}
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-5 md:items-start">
          {/* متن */}
          <div className="md:col-span-3">
            <p className="mb-6 font-latin text-2xl italic leading-relaxed text-primary sm:text-3xl">
              {about.lead}
            </p>
            <div className="space-y-5 text-base leading-loose text-darktext/85 sm:text-lg">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* عکس دکتر (placeholder تا زمانی که فایل واقعی اضافه شود) */}
          <div className="md:col-span-2">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-soft/30 bg-soft/15">
              {about.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={about.photo}
                  alt={site.brand.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center text-soft">
                  <span className="text-5xl">🖼️</span>
                  <span className="px-6 text-sm">
                    عکس دکتر این‌جا قرار می‌گیرد
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
