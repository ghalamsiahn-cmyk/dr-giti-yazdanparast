# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # اجرای dev server روی http://localhost:3000
npm run build    # ساخت production (TypeScript check + static generation)
npm run start    # اجرای production build
npm run lint     # بررسی ESLint
```

> No test suite is configured. `npm run build` is the main correctness check — it catches all TypeScript errors.

## Architecture

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v3 · deployed on Vercel.

**RTL/Farsi:** `<html lang="fa" dir="rtl">` is set in `app/layout.tsx`. All UI text is Persian. Never remove `dir="rtl"`.

### Content layer — single source of truth

**`content/site.ts`** is the only file that needs editing for content changes (text, phone, Instagram, doctor photo path). It exports a single typed `site` object consumed by all components. No component should hardcode Persian strings — pull from `site` instead.

Brand voice constraint (enforced in content): never use «تضمینی», «۱۰۰٪», «معجزه», «فرصت طلایی», «حذف کامل/قطعی».

### Component structure

```
app/
  layout.tsx   — fonts (Vazirmatn + Cormorant Garamond via next/font/google),
                 RTL metadata, global CSS variables
  globals.css  — Tailwind directives + @font-face for Peyda Bold (CDN jsdelivr)
  page.tsx     — section assembly only (Navbar → Hero → About → WhyUs → Contact → Footer)

components/
  Logo.tsx     — renders /public/logo.png with SVG monogram fallback (uses client state)
  Navbar.tsx   — sticky, backdrop-blur, mobile hamburger (client component)
  Hero.tsx     — full-viewport section; hosts ShaderBackground
  About.tsx    — doctor bio + photo slot (about.photo in site.ts)
  WhyUs.tsx    — USP highlight card + 5 brand-value cards
  Contact.tsx  — WhatsApp / Instagram / phone CTA buttons (no backend)
  Footer.tsx   — logo + tagline + copyright

components/ui/
  shader-background.tsx  — WebGL canvas animation (client component). Brand colors:
                           bgColor1 #2E2433→#4A2C59 gradient, lineColor #C9A45C (gold).
                           Accepts className prop; default is absolute inset-0.
```

### Styling conventions

Brand palette is defined in `tailwind.config.ts` as custom colors: `primary` (#5E3A6E), `deep` (#4A2C59), `soft` (#8B6FA3), `gold` (#C9A45C), `cream` (#F7F3EE), `darktext` (#2E2433). Ratio rule: 60% cream/white · 30% purple · 10% gold.

Three font families:
- `font-sans` / `font-vazirmatn` → Vazirmatn (body, CSS var `--font-vazirmatn`)
- `font-heading` / `Peyda` → Peyda Bold (headings, loaded via `@font-face` in globals.css)
- `font-latin` / `font-cormorant` → Cormorant Garamond (Latin accent, CSS var `--font-cormorant`)

### Adding a new section

1. Add the section's data object to `content/site.ts`.
2. Create `components/YourSection.tsx` — import `site` from `@/content/site`, style with brand colors.
3. Add a nav link to `site.nav` array.
4. Import and place the component in `app/page.tsx`.

### Assets

- `public/logo.png` — brand logo (1024×1024). `Logo.tsx` loads it with an `<img>` tag; on error falls back to SVG monogram.
- Doctor photo: place in `public/` and set `site.about.photo` (e.g. `"/doctor.jpg"`).

### WebGL shader notes

`ShaderBackground` (in `components/ui/`) is a `"use client"` component. It initialises a WebGL context, compiles two GLSL shaders defined as module-level constants (`VS_SOURCE`, `FS_SOURCE`), and runs a `requestAnimationFrame` loop. The cleanup function cancels the animation frame and removes the resize listener. If WebGL is unavailable it warns and exits silently — the CSS gradient overlay on `Hero.tsx` acts as visual fallback.
