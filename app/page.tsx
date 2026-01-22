import HomeHero from "@/components/HomeHero";
import AboutUs from "@/components/AboutUs";
import Concept from "@/components/Concept";
import Experience from "@/components/Experience";
import Retail from "@/components/Retail";
import Pilars from "@/components/Pilars";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="bg-bg-beige ">
        <HomeHero />
        <AboutUs />
        <Concept />
        <Experience />
        <Retail />
        <Pilars />
      </main>
      <Footer />
    </>
  );
}
