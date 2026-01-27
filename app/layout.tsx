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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gowunBatang.variable} ${montserrat.variable}`}>
      <body className={`${montserrat.className} bg-bg-beige`}>
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
