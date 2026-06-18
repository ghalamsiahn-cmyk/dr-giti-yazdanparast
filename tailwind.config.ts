import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5E3A6E",
        deep:    "#4A2C59",
        soft:    "#8B6FA3",
        gold:    "#C9A45C",
        cream:   "#F7F3EE",
        darktext:"#2E2433",
        noir:    "#140D1C",
      },
      fontFamily: {
        sans:    ["var(--font-vazirmatn)", "Tahoma", "sans-serif"],
        heading: ["Peyda", "var(--font-vazirmatn)", "Tahoma", "sans-serif"],
        latin:   ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        hero:    ["IranNastaliq", "var(--font-lalezar)", "var(--font-vazirmatn)", "Tahoma", "sans-serif"],
        morabba: ["Morabba", "var(--font-vazirmatn)", "Tahoma", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "hero-fade": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "line-draw": {
          "0%":   { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
      },
      animation: {
        marquee:     "marquee 28s linear infinite",
        "hero-fade": "hero-fade 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "line-draw": "line-draw 0.8s cubic-bezier(0.16,1,0.3,1) both",
        blink:       "blink 0.8s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
