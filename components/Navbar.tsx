"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Logo } from "./Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-soft/20 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-content items-center justify-between px-5 py-3">
        <a href="#hero" className="flex items-center gap-2.5" aria-label={site.brand.name}>
          {/* لوگو با پس‌زمینه‌ی سفید گرد در navbar */}
          <div className="h-10 w-10 rounded-full overflow-hidden border border-gold/30 bg-white flex items-center justify-center shadow-sm flex-shrink-0">
            <Logo className="h-9 w-9 object-contain" />
          </div>
          <span className="font-heading text-sm font-bold text-primary sm:text-base leading-tight">
            {site.brand.name}
          </span>
        </a>

        {/* منوی دسکتاپ */}
        <ul className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-darktext/80 transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* دکمه‌ی منوی موبایل */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-primary md:hidden"
          aria-label="باز و بسته کردن منو"
          aria-expanded={open}
        >
          <span className="text-2xl leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* منوی موبایل */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-soft/20 bg-cream px-5 py-3 md:hidden">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-darktext/80 transition-colors hover:bg-soft/10 hover:text-gold"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
