// src/app/page.tsx
import Hero from "@/src/sections/Hero";
import About from "@/src/sections/About";
import Prizes from "@/src/sections/Prizes";
import FAQ from "@/src/sections/FAQ";
import Registration from "@/src/sections/Registration";
import Footer from "@/src/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-white selection:bg-[#00FFC2] selection:text-black">
      <Hero />
      <About />
      <Prizes />
      <FAQ />
      <Registration />
      <Footer />
    </main>
  );
}