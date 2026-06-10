import { site } from "@/content/site";

export default function Contact() {
  const { contact } = site;

  const buttons = [
    {
      label: "تماس تلفنی",
      value: contact.phone,
      href: contact.phoneHref,
      icon: "📞",
      className: "bg-primary text-cream hover:bg-deep",
    },
    {
      label: "واتس‌اپ",
      value: "گفت‌وگو در واتس‌اپ",
      href: contact.whatsappHref,
      icon: "💬",
      className: "bg-gold text-deep hover:brightness-95",
    },
    {
      label: "اینستاگرام",
      value: contact.instagramHandle,
      href: contact.instagramHref,
      icon: "📷",
      className: "bg-soft text-deep hover:brightness-95",
    },
  ];

  return (
    <section id="contact" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5">
        <div className="mb-4 flex items-center gap-4">
          <span className="h-10 w-1.5 rounded-full bg-gold" />
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            {contact.title}
          </h2>
        </div>
        <p className="mb-10 text-base text-darktext/80 sm:text-lg">
          {contact.description}
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {buttons.map((b) => (
            <a
              key={b.label}
              href={b.href}
              target={b.href.startsWith("http") ? "_blank" : undefined}
              rel={b.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`flex flex-col items-center gap-2 rounded-2xl px-6 py-7 text-center shadow-sm transition ${b.className}`}
            >
              <span className="text-3xl">{b.icon}</span>
              <span className="font-heading text-base font-bold">{b.label}</span>
              <span className="text-sm opacity-90" dir="ltr">
                {b.value}
              </span>
            </a>
          ))}
        </div>

        {/* آدرس و بیو */}
        <div className="mt-10 flex flex-col gap-2 rounded-2xl border border-soft/30 bg-white/60 p-6 text-darktext/80">
          <p className="flex items-center gap-2 text-base">
            <span>📍</span>
            <span>{contact.address}</span>
          </p>
          <p className="text-sm text-darktext/60">{contact.instagramBio}</p>
        </div>
      </div>
    </section>
  );
}
