import type { Metadata } from "next";
import { translations } from "@/data/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

const title = `${translations.en.metadata.title} | Packages`;
const description = "Explore Henko memberships and find the plan that fits your journey.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/packages`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/packages`,
    siteName: "Henko",
    images: [{ url: `${siteUrl}/images/hero.jpg`, width: 1200, height: 630, alt: translations.en.hero.imageAlt }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/images/hero.jpg`],
  },
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
