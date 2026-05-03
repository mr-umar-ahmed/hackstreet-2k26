import Hero from "@/src/sections/Hero";
import About from "@/src/sections/About";
import Timeline from "@/src/sections/Timeline"; // Add this
import Prizes from "@/src/sections/Prizes";   // Add this
import FAQ from "@/src/sections/FAQ";
import Registration from "@/src/sections/Registration";
import Footer from "@/src/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-white selection:bg-[#00FFC2] selection:text-black">
      <Hero />
      <About />
      <Timeline /> {/* Added */}
      <Prizes />   {/* Added */}
      <FAQ />
      <Registration />
      <Footer />
    </main>
  );
}