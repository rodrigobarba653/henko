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
  title: "Henko",
  description: "A Next.js project with GSAP and Tailwind CSS",
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
