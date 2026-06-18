import { site } from "@/content/site";
import { VideoBackground } from "@/components/ui/video-bg";

export default function Hero() {
  const { hero } = site;

  // Split title at last space for controlled mobile line break:
  // "دکتر گیتی یزدان‌پرست" → "دکتر گیتی" / "یزدان‌پرست"
  const lastSpace = hero.title.lastIndexOf(" ");
  const titleLine1 = lastSpace !== -1 ? hero.title.slice(0, lastSpace) : hero.title;
  const titleLine2 = lastSpace !== -1 ? hero.title.slice(lastSpace + 1) : "";

  return (
    <section className="relative h-dvh w-full overflow-hidden">

      <VideoBackground
        src="/clinic.mp4"
        mobileSrc="/clinic-mobile.mp4"
        poster="/clinic-poster.jpg"
        mobilePoster="/clinic-poster-mobile.jpg"
        startSeconds={2}
        endSeconds={10}
      />

      {/* Fallback gradient — visible while poster/video loads */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(160deg, #2E2433 0%, #4A2C59 35%, #3a1f50 60%, #140D1C 100%)",
        }}
      />

      {/* Dark overlay for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(20,13,28,0.80) 0%, rgba(20,13,28,0.30) 55%, rgba(20,13,28,0.15) 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-14 z-10 px-8 sm:px-16 mx-auto max-w-content right-0 left-0">
        <div className="max-w-lg">

          <h1 className="text-cream mb-4">

            {/* ── Mobile: IranNastaliq, two clean lines, RTL right-aligned ── */}
            <span className="block sm:hidden">
              <span
                className="block font-hero"
                style={{
                  fontSize: "clamp(20px, 6vw, 28px)",
                  lineHeight: 1.9,
                  letterSpacing: 0,
                  wordSpacing: "normal",
                  fontKerning: "normal",
                  textRendering: "optimizeLegibility",
                }}
              >
                {titleLine1}
              </span>
              {titleLine2 && (
                <span
                  className="block font-hero"
                  style={{
                    fontSize: "clamp(20px, 6vw, 28px)",
                    lineHeight: 1.9,
                    letterSpacing: 0,
                    wordSpacing: "normal",
                    fontKerning: "normal",
                    textRendering: "optimizeLegibility",
                  }}
                >
                  {titleLine2}
                </span>
              )}
            </span>

            {/* ── Desktop: IranNastaliq, single line, RTL-start aligned ── */}
            <span
              className="hidden sm:block font-hero"
              style={{
                fontSize: "clamp(22px, 5.5vw, 72px)",
                lineHeight: 1.8,
                letterSpacing: 0,
                wordSpacing: "normal",
                fontKerning: "normal",
                textRendering: "optimizeLegibility",
                wordBreak: "keep-all",
              }}
            >
              {hero.title}
            </span>

          </h1>

          <p className="text-[15px] sm:text-[17px] text-cream/70 font-sans mb-2 leading-relaxed">
            {hero.subtitle}
          </p>
          <p className="text-[13px] text-cream/45 font-sans mb-8 tracking-wide">
            {hero.location}
          </p>
          <a
            href={hero.ctaHref}
            className="inline-block text-[14px] font-sans font-medium px-7 py-3.5 rounded-lg bg-gold text-darktext hover:bg-[#b8913f] transition-all duration-200 shadow-lg shadow-gold/20"
          >
            {hero.ctaLabel}
          </a>
        </div>
      </div>

      {/* WhatsApp quick link */}
      <a
        href={site.contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="واتس‌اپ"
        className="absolute left-6 bottom-14 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-cream hover:bg-white/20 transition-all duration-200"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L0 24l6.293-1.503A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.359-.213-3.733.892.933-3.617-.234-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
        </svg>
      </a>

      <div className="absolute bottom-0 inset-x-0 h-px bg-white/8" />
    </section>
  );
}
