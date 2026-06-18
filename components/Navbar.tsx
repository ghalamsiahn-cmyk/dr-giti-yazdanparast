"use client";

import { useState, useEffect } from "react";
import { site } from "@/content/site";
import { Logo } from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white ${
        scrolled ? "shadow-sm" : "border-b border-gray-100"
      }`}
    >
      <nav className="mx-auto max-w-content px-6 h-[72px] flex items-center justify-between">

        {/* Logo + name */}
        <a href="#" className="flex items-center gap-3 shrink-0">
          <Logo className="h-9 w-9" />
          <span className="text-[13px] font-heading font-bold text-primary tracking-wide leading-tight hidden sm:block">
            {site.brand.name}
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-sans text-darktext/65 hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-[13px] font-sans font-medium px-5 py-2.5 rounded-lg bg-primary text-cream hover:bg-deep transition-all duration-200"
          >
            رزرو نوبت
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="منو"
          className="md:hidden flex flex-col gap-[5px] p-2 text-darktext"
        >
          <span
            className={`block h-0.5 w-5 bg-current transition-transform duration-300 origin-center ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition-transform duration-300 origin-center ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden px-6 py-5 flex flex-col gap-4 border-t border-gray-100 bg-white shadow-lg">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-[14px] font-sans text-darktext/70 hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="text-[14px] font-sans font-medium text-cream bg-primary px-4 py-3 rounded-lg text-center"
          >
            رزرو نوبت
          </a>
        </div>
      )}
    </header>
  );
}
