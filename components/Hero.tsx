import { site } from "@/content/site";
import ShaderBackground from "@/components/ui/shader-background";
import { Logo } from "@/components/Logo";

export default function Hero() {
  const { hero } = site;

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[100svh] md:min-h-[90vh] flex items-center justify-center text-cream"
    >
      {/* ── بک‌گراند انیمیشن‌دار WebGL ── */}
      <ShaderBackground className="absolute inset-0 w-full h-full" />

      {/* ── لایه‌ی گرادیان برای خوانایی متن ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep/20 via-deep/40 to-deep/70 pointer-events-none" />

      {/* ── محتوا ── */}
      <div className="relative z-10 mx-auto max-w-content w-full px-5 py-24 flex flex-col items-center text-center gap-6">

        {/* لوگو در یک دایره‌ی سفید */}
        <div className="rounded-full bg-white shadow-2xl border-2 border-gold/50 overflow-hidden
                        w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52
                        flex items-center justify-center p-3
                        ring-4 ring-gold/20 ring-offset-2 ring-offset-transparent">
          <Logo className="w-full h-full object-contain" />
        </div>

        {/* شهر */}
        <span className="rounded-full border border-gold/40 bg-primary/30 backdrop-blur-sm
                         px-4 py-1 text-xs sm:text-sm font-medium text-gold">
          {site.brand.city}
        </span>

        {/* نام */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold leading-tight drop-shadow-lg">
          {hero.title}
        </h1>

        {/* USP */}
        <p className="text-lg sm:text-xl md:text-2xl text-cream/85">
          {hero.subtitle}
        </p>

        {/* شعار */}
        <p className="font-latin text-2xl sm:text-3xl italic text-gold drop-shadow">
          «{hero.tagline}»
        </p>

        {/* توضیح */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-cream/75">
          {hero.description}
        </p>

        {/* دکمه‌ی CTA */}
        <a
          href={hero.ctaHref}
          className="mt-2 inline-flex items-center gap-2 rounded-full
                     bg-gold px-8 py-3.5
                     text-base sm:text-lg font-bold text-deep
                     shadow-lg shadow-gold/30
                     transition-all hover:scale-105 hover:shadow-xl hover:shadow-gold/40"
        >
          {hero.ctaLabel}
          <span className="text-xl">←</span>
        </a>
      </div>

      {/* ── فلش اسکرول پایین ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cream/50 animate-bounce">
        <span className="text-xs">اسکرول</span>
        <span className="text-lg">↓</span>
      </div>
    </section>
  );
}
