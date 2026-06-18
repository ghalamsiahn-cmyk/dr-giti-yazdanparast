import { site } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { ServiceVideo } from "@/components/ui/service-video";

const gradients = [
  "from-[#2E2433] to-[#4A2C59]",
  "from-[#3a1f50] to-[#1a0d2e]",
  "from-[#4A2C59] to-[#2E2433]",
];

export default function Services() {
  const { services } = site;

  return (
    <section id="services" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-content px-6">

        {/* Header */}
        <Reveal>
          <p className="text-[11px] tracking-[0.45em] uppercase text-gold font-medium mb-4 text-center">
            {services.label}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-darktext text-center mb-3 leading-tight">
            {services.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.13}>
          <p className="text-base text-darktext/50 text-center mb-14 font-sans">
            {services.tagline}
          </p>
        </Reveal>

        {/* Service cards grid — 3 equal columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {services.items.map((item, i) => {
            return (
              <Reveal
                key={item.title}
                delay={0.06 * (i + 1)}
                className="col-span-1"
              >
                <div
                  className={`relative group overflow-hidden rounded-2xl aspect-[4/3] cursor-default`}
                >
                  {/* Background: video > photo > gradient */}
                  {item.video ? (
                    <ServiceVideo src={item.video} startTime={item.videoStart} />
                  ) : item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} transition-transform duration-700 group-hover:scale-105`}
                    />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 group-hover:from-black/80 transition-all duration-300" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="font-heading font-bold text-cream text-xl sm:text-2xl tracking-wide mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-cream/60 font-sans leading-relaxed transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
