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
        // پالت رنگ برند (Brand Guide 2026)
        primary: "#5E3A6E", // بنفش اصلی
        deep: "#4A2C59", // بنفش تیره / پس‌زمینه تیره
        soft: "#8B6FA3", // بنفش روشن / تُن ثانویه
        gold: "#C9A45C", // طلایی / تأکید
        cream: "#F7F3EE", // پس‌زمینه روشن
        darktext: "#2E2433", // متن تیره
      },
      fontFamily: {
        // بدنه و تیتر و لاتین — متغیرهای تعریف‌شده در layout/globals
        sans: ["var(--font-vazirmatn)", "Tahoma", "sans-serif"],
        heading: ["Peyda", "var(--font-vazirmatn)", "Tahoma", "sans-serif"],
        latin: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
