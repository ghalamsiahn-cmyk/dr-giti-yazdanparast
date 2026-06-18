import { site } from "@/content/site";

export default function Partners() {
  // Duplicate for seamless loop
  const items = [...site.brands, ...site.brands];

  return (
    <section className="bg-white border-y border-gray-100 py-5 overflow-hidden">
      <div className="marquee-track relative">
        <div
          className="marquee-content flex items-center gap-0 whitespace-nowrap animate-marquee"
          style={{ direction: "ltr" }}
        >
          {items.map((brand, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-8"
            >
              <span className="text-[13px] font-sans font-medium text-darktext/60 tracking-wide">
                {brand}
              </span>
              <span className="text-gold text-lg leading-none select-none">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
