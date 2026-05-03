import Navbar from "@/src/components/Navbar";
import Hero from "@/src/sections/Hero";
import Sponsors from "@/src/sections/Sponsors";
import TerminalConsole from "@/src/components/TerminalConsole"; // Standout Feature
import About from "@/src/sections/About";
import Tracks from "@/src/sections/Tracks";   
import Timeline from "@/src/sections/Timeline"; 
import Prizes from "@/src/sections/Prizes";
import Venue from "@/src/sections/Venue";     
import FAQ from "@/src/sections/FAQ";
import Registration from "@/src/sections/Registration";
import Footer from "@/src/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-transparent overflow-x-hidden">
      <Navbar />
      
      {/* 
          Z-10 wrapper ensures these sections scroll over the 
          fixed background video and the curtain-reveal footer.
      */}
      <div className="relative z-10 w-full bg-transparent">
        <Hero />
        <Sponsors />
        
        {/* INTERACTIVE CONSOLE: Proves your technical depth early on */}
        <TerminalConsole />
        
        <About />
        <Tracks />
        <Timeline />
        <Prizes />
        <Venue />
        <FAQ />
        <Registration />
      </div>

      <Footer />
    </main>
  );
}