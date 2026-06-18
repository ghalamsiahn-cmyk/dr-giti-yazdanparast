import type { Metadata } from "next";
import { Vazirmatn, Cormorant_Garamond, Playfair_Display, Lalezar } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const lalezar = Lalezar({
  subsets: ["arabic", "latin"],
  weight: "400",
  variable: "--font-lalezar",
  display: "swap",
});

export const metadata: Metadata = {
  title: "دکتر گیتی یزدانپرست | لیزر و زیبایی با حضور مستقیم پزشک",
  description:
    "دکتر گیتی یزدانپرست — لیزر و زیبایی با حضور مستقیم پزشک در یزد. مشاوره‌ی صادقانه و احترام به زیبایی طبیعی. نتیجه‌ای که می‌بینی، اعتمادی که می‌ماند.",
  keywords: [
    "دکتر گیتی یزدانپرست",
    "لیزر",
    "زیبایی",
    "یزد",
    "لیزر موهای زائد",
    "مشاوره زیبایی",
  ],
  openGraph: {
    title: "دکتر گیتی یزدانپرست | لیزر و زیبایی با حضور مستقیم پزشک",
    description:
      "لیزر و زیبایی با حضور مستقیم پزشک در یزد. نتیجه‌ای که می‌بینی، اعتمادی که می‌ماند.",
    locale: "fa_IR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.variable} ${cormorant.variable} ${playfair.variable} ${lalezar.variable} bg-cream text-darktext font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
