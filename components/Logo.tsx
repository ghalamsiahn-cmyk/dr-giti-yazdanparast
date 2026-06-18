/**
 * لوگوی برند — از /public/logo.png بارگذاری می‌شود.
 * اگر فایل وجود نداشت، به مونوگرام SVG fallback می‌کند.
 */
"use client";

import { useState } from "react";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export function Logo({ className = "h-10 w-10", light = false }: LogoProps) {
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/logo.png"
        alt="لوگوی دکتر گیتی یزدانپرست"
        className={`${className} object-contain`}
        style={light ? { filter: "brightness(0) invert(1)" } : undefined}
        onError={() => setFailed(true)}
      />
    );
  }

  /* ── Fallback SVG (مونوگرام G) ── */
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="لوگوی دکتر گیتی یزدانپرست"
    >
      <circle
        cx="50" cy="50" r="48"
        fill={light ? "rgba(255,255,255,0.15)" : "#5E3A6E"}
      />
      <circle
        cx="50" cy="50" r="48"
        fill="none" stroke="#C9A45C" strokeWidth="2"
      />
      <text
        x="50" y="50"
        textAnchor="middle" dominantBaseline="central"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="52" fontWeight="600"
        fill="#F7F3EE"
      >
        G
      </text>
      <path
        d="M34 64 Q50 74 66 64"
        fill="none" stroke="#C9A45C"
        strokeWidth="2.5" strokeLinecap="round"
      />
    </svg>
  );
}
