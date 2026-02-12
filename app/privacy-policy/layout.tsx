import type { Metadata } from "next";
import { translations } from "@/data/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  title: `${translations.en.metadata.title} | ${translations.en.footer.privacyPolicy}`,
  description: "Henko Privacy Policy and Aviso de Privacidad. How we collect, use and protect your personal data.",
  alternates: {
    canonical: `${siteUrl}/privacy-policy/`,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
