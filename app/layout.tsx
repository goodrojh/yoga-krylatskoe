import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Йога в Кунцево и Крылатском — ДЫШИ | йога для беременных, TRX, МФР",
  description:
    "Йога, йога для беременных, TRX и МФР у метро Молодёжная и Кунцевская. Зал на Рублёвском шоссе, 16/1. Разовое занятие 1400 ₽, абонементы от 1200 ₽ за занятие. Холотропное дыхание и вайвейшн.",
  keywords: [
    "йога Кунцево",
    "йога Крылатское",
    "йога Молодёжная",
    "йога для беременных Кунцево",
    "TRX Кунцево",
    "МФР",
    "холотропное дыхание Москва",
    "вайвейшн",
  ],
  openGraph: {
    title: "ДЫШИ — йога-студия в Кунцево",
    description: "Место, где Москва делает выдох. Йога, йога для беременных, TRX, МФР.",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e9",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: `${SITE.name} — ${SITE.descriptor}`,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address,
    addressLocality: SITE.city,
    addressCountry: "RU",
  },
  priceRange: "1200–7000 ₽",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${interTight.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
