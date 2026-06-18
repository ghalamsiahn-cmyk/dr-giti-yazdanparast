import { site } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-[#FBBC04] fill-current" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function Testimonials() {
  const { testimonials } = site;

  return (
    <section id="testimonials" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-content px-6">

        {/* Header */}
        <Reveal>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-darktext text-center mb-3 leading-tight">
            نظرات واقعی مراجعان ما
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-base text-darktext/45 text-center mb-14 font-sans">
            تجربه‌ی مراجعانی که اعتماد کردند
          </p>
        </Reveal>

        {/* Review cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((review, i) => (
            <Reveal key={i} delay={0.08 * (i + 1)}>
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col gap-4">

                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, s) => (
                    <StarIcon key={s} />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-[14px] leading-relaxed text-darktext/70 font-sans flex-1">
                  {review.text}
                </p>

                {/* Footer: name + platform */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-[13px] font-heading font-bold text-primary">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-[13px] font-sans font-medium text-darktext/80">
                      {review.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-darktext/35 font-sans">
                    <GoogleIcon />
                    <span>{review.platform}</span>
                  </div>
                </div>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
