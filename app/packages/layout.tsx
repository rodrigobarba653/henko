import type { Metadata } from "next";
import { translations } from "@/data/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  title: `${translations.en.metadata.title} | ${translations.en.packages.heading}`,
  description: translations.en.packages.body,
  alternates: {
    canonical: `${siteUrl}/packages/`,
  },
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
