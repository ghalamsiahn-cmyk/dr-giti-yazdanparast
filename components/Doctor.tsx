import { site } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";

export default function Doctor() {
  const { doctor } = site;

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-content px-6">

        <Reveal>
          <p className="text-[11px] tracking-[0.45em] uppercase text-gold font-medium mb-4 text-center">
            {doctor.sectionTitle}
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-8">

          {/* Doctor photo — right in RTL (first in DOM) */}
          <Reveal delay={0.1}>
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Photo */}
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
                {doctor.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-deep via-primary to-soft flex flex-col items-center justify-end pb-12">
                    <svg
                      className="w-20 h-20 text-cream/20 mb-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.8"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span className="text-cream/30 text-sm font-sans">عکس دکتر</span>
                  </div>
                )}
              </div>

              {/* Decorative gold bar */}
              <div className="absolute -bottom-4 right-8 left-8 h-1 bg-gradient-to-l from-gold via-gold/60 to-transparent rounded-full" />
            </div>
          </Reveal>

          {/* Bio — left in RTL (second in DOM) */}
          <div>
            <Reveal delay={0.08}>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-darktext leading-tight mb-2">
                {doctor.name}
              </h2>
            </Reveal>
            <Reveal delay={0.13}>
              <p className="text-base text-gold font-sans font-medium mb-8">
                {doctor.title}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-base sm:text-lg leading-[1.95] text-darktext/65 font-sans mb-10">
                {doctor.bio}
              </p>
            </Reveal>

            {/* Credentials list */}
            <div className="space-y-3">
              {doctor.credentials.map((cred, i) => (
                <Reveal key={i} delay={0.1 * (i + 1)}>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-[14px] text-darktext/70 font-sans">{cred}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <a
                href="#contact"
                className="inline-block mt-10 text-[13px] font-sans font-medium px-7 py-3.5 rounded-lg bg-primary text-cream hover:bg-deep transition-all duration-200"
              >
                رزرو نوبت مشاوره
              </a>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
