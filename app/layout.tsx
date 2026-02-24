import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { LanguageProvider } from "@/contexts/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollSmootherSetup from "@/components/ScrollSmootherSetup";
import { translations } from "@/data/i18n";

const editorsNote = localFont({
  src: "../public/fonts/editorNotesFont/WOFF2/Editor'sNote-Regular.woff2",
  variable: "--font-editors-note",
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
  title: {
    default: translations.en.metadata.title,
    template: "%s",
  },
  description: translations.en.metadata.description,
  keywords: translations.en.metadata.keywords,
  authors: [{ name: "Henko", url: siteUrl }],
  creator: "Henko",
  themeColor: "#595438",
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
    telephone: "+525535663796",
    email: "hola@henkowellnessclub.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Galileo 8 - Piso 2",
      addressLocality: "Polanco",
      addressRegion: "CDMX",
      postalCode: "11550",
      addressCountry: "MX",
    },
    sameAs: [
      "https://www.instagram.com/henkowellnessclub",
      "https://www.tiktok.com/@henkowellnessclub",
    ],
    offers: {
      "@type": "Offer",
      description: "Wellness programs including biohacking, fitness, and spa services",
    },
  };

  const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-52MCSD82');`;

  return (
    <html lang="en" className={`${editorsNote.variable} ${montserrat.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
      </head>
      <body className={`${montserrat.className} bg-bg-beige`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-52MCSD82"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageProvider>
          {/* Fixed elements outside smooth-wrapper */}
          <Nav />
          <WhatsAppButton />
          
          {/* ScrollSmoother wrapper and content */}
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <ScrollSmootherSetup />
              {children}
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
