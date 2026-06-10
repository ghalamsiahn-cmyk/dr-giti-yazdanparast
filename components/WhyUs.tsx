import { site } from "@/content/site";

export default function WhyUs() {
  const { whyUs } = site;

  return (
    <section id="why-us" className="bg-primary py-20 text-cream sm:py-28">
      <div className="mx-auto max-w-content px-5">
        <div className="mb-12 flex items-center gap-4">
          <span className="h-10 w-1.5 rounded-full bg-gold" />
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {whyUs.title}
          </h2>
        </div>

        {/* بلوک تأکید بر USP */}
        <div className="mb-10 rounded-2xl border border-gold/40 bg-deep/50 p-8 sm:p-10">
          <h3 className="mb-3 font-heading text-2xl font-bold text-gold">
            {whyUs.highlight.title}
          </h3>
          <p className="text-base leading-relaxed text-cream/85 sm:text-lg">
            {whyUs.highlight.text}
          </p>
        </div>

        {/* کارت‌های ارزش‌ها */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-soft/30 bg-deep/40 p-6 transition-colors hover:border-gold/50"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
                <span className="text-lg">✦</span>
              </div>
              <h3 className="mb-2 font-heading text-lg font-bold text-cream">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-cream/75">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
