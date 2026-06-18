import { site } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";

export default function Stats() {
  return (
    <section className="bg-noir py-14">
      <div className="mx-auto max-w-content px-6">
        <div className="grid grid-cols-3 divide-x divide-x-reverse divide-white/8">
          {site.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="flex flex-col items-center py-4 px-4">
                <p className="font-heading font-bold text-gold text-4xl sm:text-5xl mb-2 leading-none">
                  {s.value}
                </p>
                <p className="text-[11px] tracking-[0.1em] text-cream/35 font-sans uppercase">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
