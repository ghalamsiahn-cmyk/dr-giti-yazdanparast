import type { Metadata } from "next";
import { Vazirmatn, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
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
        className={`${vazirmatn.variable} ${cormorant.variable} bg-cream text-darktext font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
