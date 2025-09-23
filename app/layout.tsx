import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ButtonToTop from "@/components/ButtonToTop";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Klupko Klupče - Handmade Proizvodi od Vune | Zrenjanin",
  description: "Klupko Klupče je brend koji se bavi handmade proizvodima od vune. Specijalizovani smo za ćebad za bebe, prekrivače za krevet, stoličarke, šal i kape, torbe i jastučnice. Koristimo antialergijsku vunicu Alize Pyffi i Alize Pyffi Fine. Zrenjanin.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  keywords: [
    "handmade proizvodi od vune",
    "ćebad za bebe",
    "prekrivači za krevet",
    "stoličarke",
    "šal i kape",
    "torbe od vune",
    "jastučnice",
    "vunica Alize Pyffi",
    "antialergijska vuna",
    "pletenje",
    "ručno pletenje",
    "Zrenjanin",
    "Klupko Klupče",
    "vuneni proizvodi",
    "bebi proizvodi",
    "domaći proizvodi"
  ],
  alternates: {
    canonical: "https://klupkoklupce.com/",
  },
  openGraph: {
    title: "Klupko Klupče - Handmade Proizvodi od Vune",
    description: "Specijalizovani za handmade proizvode od vune - ćebad, prekrivači, stoličarke, šal i kape, torbe i jastučnice. Antialergijska vunica Alize Pyffi.",
    type: "website",
    locale: "sr_RS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Klupko Klupče",
    "description": "Handmade proizvodi od vune - ćebad za bebe, prekrivači za krevet, stoličarke, šal i kape, torbe i jastučnice. Ručno pleteni proizvodi od antialergijske vunice Alize Pyffi.",
    "url": "https://klupkoklupce.com",
    "telephone": "+381637861086",
    "email": "klupkoklupce@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zrenjanin",
      "addressCountry": "RS"
    },
    "sameAs": [
      "https://www.facebook.com/share/1BHGdCDv2s/",
      "https://www.instagram.com/klupkoklupce"
    ],
    "foundingDate": "2025",
    "priceRange": "$$",
    "currenciesAccepted": "RSD",
    "paymentAccepted": "Cash, Bank Transfer",
    "areaServed": "Serbia",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Handmade Proizvodi od Vune",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Ćebad za bebe",
            "description": "Meki i topli ćebad pleteni od antialergijske vunice"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Prekrivači za krevet",
            "description": "Elegantni prekrivači ručno pleteni sa pažnjom prema kvalitetu"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Stoličarke",
            "description": "Funkcionalne i lepe stoličarke za zaštitu nameštaja"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Šal i kape",
            "description": "Modni dodaci koji zagrevaju tokom hladnih dana"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Torbe",
            "description": "Praktične i elegantne torbe pletene od kvalitetne vunice"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Jastučnice",
            "description": "Meke jastučnice koje dodaju udobnost i stil"
          }
        }
      ]
    }
  };

  return (
    <html lang="sr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-muted-foreground bg-muted  text-base md:text-xl`}
      >
        <Header />
        {children}
        <ButtonToTop />
        <Footer />
      </body>
    </html>
  );
}
