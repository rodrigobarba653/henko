import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "main-green": "#595438",
        "main-beige": "#F9E5C7",
        "bg-beige": "#EBE6E0",
        "oxide": "#804A2E",
      },
      fontFamily: {
        heading: ["var(--font-gowun-batang)", "serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
