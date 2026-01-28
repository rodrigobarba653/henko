import type { Metadata } from "next";
import { Gowun_Batang, Montserrat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { BookingModalProvider } from "@/contexts/BookingModalContext";
import BookingModal from "@/components/BookingModal";
import ScrollSmootherSetup from "@/components/ScrollSmootherSetup";
import { translations } from "@/data/i18n";

const gowunBatang = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-gowun-batang",
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// Metadata uses English as default (static at build time)
// For dynamic metadata based on language, consider using next-intl or similar
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"; // Update with your actual domain

export const metadata: Metadata = {
  title: translations.en.metadata.title,
  description: translations.en.metadata.description,
  icons: {
    icon: [
      { url: "/images/favicon.svg", type: "image/svg+xml" },
      { url: "/images/favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    apple: [
      { url: "/images/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: translations.en.metadata.title,
    description: translations.en.metadata.description,
    url: siteUrl,
    siteName: "Henko",
    images: [
      {
        url: `${siteUrl}/images/hero.jpg`,
        width: 1200,
        height: 630,
        alt: translations.en.hero.imageAlt,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: translations.en.metadata.title,
    description: translations.en.metadata.description,
    images: [`${siteUrl}/images/hero.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  
  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "Henko",
    description: translations.en.metadata.description,
    url: siteUrl,
    logo: `${siteUrl}/images/logo.svg`,
    image: `${siteUrl}/images/hero.jpg`,
    address: {
      "@type": "PostalAddress",
      // Add your actual address here when available
    },
    sameAs: [
      // Add your social media URLs here when available
    ],
    offers: {
      "@type": "Offer",
      description: "Wellness programs including biohacking, fitness, and spa services",
    },
  };

  return (
    <html lang="en" className={`${gowunBatang.variable} ${montserrat.variable}`}>
      <body className={`${montserrat.className} bg-bg-beige`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageProvider>
          <BookingModalProvider>
            {/* Fixed elements outside smooth-wrapper */}
            <Nav />
            <BookingModal />
            
            {/* ScrollSmoother wrapper and content */}
            <div id="smooth-wrapper">
              <div id="smooth-content">
                <ScrollSmootherSetup />
                {children}
              </div>
            </div>
          </BookingModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
