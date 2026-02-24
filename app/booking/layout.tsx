import type { Metadata } from "next";
import { translations } from "@/data/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  title: `${translations.en.metadata.title} | Booking`,
  description: "Book classes and reserve your spot at Henko.",
  alternates: {
    canonical: `${siteUrl}/booking/`,
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
