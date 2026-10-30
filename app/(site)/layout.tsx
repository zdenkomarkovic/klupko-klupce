import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ButtonToTop from "@/components/ButtonToTop";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "../globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
});

const siteUrl = "https://slavijano.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Slavijano – poezija, proza i misli",
    template: "%s | Slavijano",
  },
  description:
    "Reči koje pišem samo su eho misli koje ne umeju da ćute. Poezija, proza i misli – lični arhiv autora Slavijano.",
  keywords: [
    "Slavijano",
    "poezija",
    "proza",
    "misli",
    "stihovi",
    "pesme",
    "srpska poezija",
    "blog",
  ],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Slavijano – poezija, proza i misli",
    description: "Reči koje pišem samo su eho misli koje ne umeju da ćute.",
    type: "website",
    locale: "sr_RS",
    siteName: "Slavijano",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Slavijano",
    url: siteUrl,
    email: "slavijano19@gmail.com",
    description:
      "Autor poezije, proze i misli. Reči koje pišem samo su eho misli koje ne umeju da ćute.",
    sameAs: [
      "https://www.facebook.com/share/19kDCwpnfS/",
      "https://www.instagram.com/slavijano_song_lyrics",
      "https://www.tiktok.com/@slavijano.song.lyrics",
      "https://youtube.com/@slavijano",
    ],
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
        className={`${playfair.variable} antialiased text-foreground bg-background text-base md:text-lg`}
      >
        <Header />
        {children}
        <ButtonToTop />
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
