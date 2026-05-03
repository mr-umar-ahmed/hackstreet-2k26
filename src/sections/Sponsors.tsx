"use client";

import React from "react";

const SPONSORS = [
  "MICROSOFT", "GOOGLE_CLOUD", "VERCEL", "GSAP_SYSTEMS", 
  "AWS_NODE", "INTEL", "NVIDIA", "GITHUB"
];

export default function Sponsors() {
  return (
    <section className="py-12 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
      <div className="flex flex-col gap-8">
        <p className="text-center text-[10px] font-mono tracking-[0.5em] text-gray-500 uppercase">
          Supported_By_Top_Tier_Infrastructure
        </p>
        
        <div className="flex w-max animate-footer-scroll-marquee grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {[...SPONSORS, ...SPONSORS].map((sponsor, i) => (
            <div 
              key={i} 
              className="px-12 text-2xl md:text-4xl font-black italic tracking-tighter text-white/50 hover:text-[#00FFC2] cursor-default"
            >
              {sponsor}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}