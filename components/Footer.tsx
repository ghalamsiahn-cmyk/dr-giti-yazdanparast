import { site } from "@/content/site";
import { Logo } from "./Logo";

export default function Footer() {
  const navLinks = [
    { label: "خانه", href: "#" },
    { label: "درباره", href: "#about" },
    { label: "خدمات", href: "#services" },
    { label: "نظرات", href: "#testimonials" },
    { label: "تماس", href: "#contact" },
  ];

  return (
    <footer className="bg-darktext text-cream">

      {/* Main footer body */}
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Logo className="h-10 w-10 opacity-90" light />
              <p className="font-heading font-bold text-[15px] text-cream leading-tight">
                {site.brand.name}
              </p>
            </div>
            <p className="text-sm text-cream/45 font-sans leading-relaxed max-w-[240px]">
              {site.brand.usp}
            </p>
            <p className="mt-4 text-[12px] font-display italic text-gold/60">
              «{site.brand.tagline}»
            </p>
          </div>

          {/* Nav links column */}
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase text-cream/30 font-medium mb-6">
              صفحات
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] font-sans text-cream/55 hover:text-cream transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase text-cream/30 font-medium mb-6">
              تماس
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="text-[13px] font-sans text-cream/55 hover:text-cream transition-colors duration-200 flex items-center gap-2"
                  dir="ltr"
                >
                  <span className="text-gold">📞</span>
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-sans text-cream/55 hover:text-cream transition-colors duration-200 flex items-center gap-2"
                  dir="ltr"
                >
                  <span className="text-gold">📷</span>
                  {site.contact.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-sans text-cream/55 hover:text-cream transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="text-gold">💬</span>
                  واتس‌اپ
                </a>
              </li>
              <li className="flex items-center gap-2 text-[13px] font-sans text-cream/40">
                <span className="text-gold">📍</span>
                {site.contact.address}
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="mx-auto max-w-content px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-6 text-[11px] text-cream/25 font-sans">
            <a href="#" className="hover:text-cream/50 transition-colors">حریم خصوصی</a>
            <a href="#" className="hover:text-cream/50 transition-colors">قوانین و مقررات</a>
          </div>
          <p className="text-[11px] text-cream/25 font-sans text-center">
            © {site.brand.year} {site.brand.name} · {site.brand.city}
          </p>
          <div className="flex items-center gap-3">
            <a href={site.contact.instagramHref} target="_blank" rel="noopener noreferrer" aria-label="اینستاگرام"
              className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-cream/40 hover:text-cream/80 hover:border-white/40 transition-all duration-200">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2.25" y="2.25" width="19.5" height="19.5" rx="5" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="واتس‌اپ"
              className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-cream/40 hover:text-cream/80 hover:border-white/40 transition-all duration-200">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L0 24l6.293-1.503A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.359-.213-3.733.892.933-3.617-.234-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
