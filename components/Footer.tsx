import { site } from "@/content/site";
import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-deep py-12 text-cream">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-5 text-center">
        <Logo className="h-14 w-14" />
        <p className="font-heading text-lg font-bold">{site.brand.name}</p>
        <p className="font-latin text-lg italic text-gold">
          «{site.brand.tagline}»
        </p>
        <p className="mt-2 text-sm text-cream/60">
          © {site.brand.year} — {site.brand.name} · {site.brand.city}
        </p>
      </div>
    </footer>
  );
}
