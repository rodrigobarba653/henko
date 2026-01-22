import type { Metadata } from "next";
import { Gowun_Batang, Montserrat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
// import SmoothScroll from "@/components/SmoothScroll";

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

export const metadata: Metadata = {
  title: "Henko | The Art of Living Better, Longer",
  description: "Where ancient wisdom meets cutting-edge biohacking. Optimize your path to longevity with our wellness programs.",
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
        {/* <SmoothScroll /> */}
        <Nav />
        {children}
      </body>
    </html>
  );
}
