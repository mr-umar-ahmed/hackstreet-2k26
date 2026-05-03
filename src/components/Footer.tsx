// src/components/Footer.tsx
import React from 'react';

// Extracted internal component for the Matrix Rain
const MatrixRain = () => {
  // Generate an array of 40 columns dynamically to avoid massive HTML blocks
  const columns = Array.from({ length: 40 });
  
  return (
    <div className="matrix-container z-0 opacity-20 pointer-events-none">
      {/* We repeat the pattern 3 times to ensure it covers ultra-wide monitors */}
      {[1, 2, 3].map((patternIndex) => (
        <div key={`pattern-${patternIndex}`} className="matrix-pattern">
          {columns.map((_, colIndex) => (
            <div key={`col-${patternIndex}-${colIndex}`} className="matrix-column" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black py-16 text-center overflow-hidden">
      
      {/* The background animation layer */}
      <MatrixRain />
      
      {/* The foreground content (z-10 keeps it above the rain) */}
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-2xl font-black text-white mb-4 tracking-tighter">
          HackStreet <span className="text-[#00FFC2]">2K26</span>
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          Code the Invisible. Shape the Future. The ultimate 24-hour innovation marathon.
        </p>
        
        <div className="flex justify-center gap-6 text-sm text-gray-500 mb-12">
          <a href="#" className="hover:text-[#00FFC2] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#00FFC2] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#00FFC2] transition-colors">Code of Conduct</a>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-xs text-gray-600 font-mono flex flex-col md:flex-row justify-center items-center gap-2">
          <span>© {new Date().getFullYear()} HackStreet Initiative.</span>
          <span className="hidden md:inline">•</span>
          <span>All systems operational.</span>
        </div>
      </div>
      
      {/* Bottom fade gradient so it blends nicely */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </footer>
  );
}