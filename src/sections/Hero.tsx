// src/sections/Hero.tsx
"use client";

import Link from "next/link";
import { Terminal, Code2, Cpu, Zap } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/src/components/ScrollReveal"; 

// Extracted and themed Shutter Text Component
const SlicedText = ({ text, className = "", sliceColor = "text-[#00FFC2]" }: { text: string, className?: string, sliceColor?: string }) => {
  const characters = text.split("");
  return (
    <span className={`inline-flex flex-wrap justify-center ${className}`}>
      {characters.map((char, i) => (
        <span key={i} className="relative inline-block overflow-hidden group px-[0.05em]">
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: i * 0.04 + 0.3, duration: 0.8 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>

          <motion.span
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, delay: i * 0.04, ease: "easeInOut" }}
            className={`absolute inset-0 z-10 pointer-events-none ${sliceColor}`}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>

          <motion.span
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "-100%", opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, delay: i * 0.04 + 0.1, ease: "easeInOut" }}
            className={`absolute inset-0 z-10 pointer-events-none text-white`}
            style={{ clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>

          <motion.span
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, delay: i * 0.04 + 0.2, ease: "easeInOut" }}
            className={`absolute inset-0 z-10 pointer-events-none ${sliceColor}`}
            style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 overflow-hidden" id="hero">
      
      <div className="relative z-10 w-full max-w-6xl text-center flex flex-col items-center justify-center flex-1 mt-10">
        
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00FFC2]/30 bg-[#00FFC2]/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(0,255,194,0.15)]">
            <Terminal className="w-4 h-4 text-[#00FFC2]" />
            <p className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#00FFC2] uppercase">
              HackStreet 2K26 • 24H Innovation
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="
            font-heading font-black tracking-tighter
            text-[clamp(2.8rem,8vw,6.5rem)]
            leading-[1.05]
            mb-6 px-4
            flex flex-col items-center justify-center
          ">
            <SlicedText text="THINK. CODE." className="text-white" sliceColor="text-[#00FFC2]" />
            <SlicedText text="DISRUPT." className="text-[#00FFC2] drop-shadow-[0_0_20px_rgba(0,255,194,0.4)]" sliceColor="text-white" />
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="
            text-gray-400 font-light mx-auto
            text-sm sm:text-base md:text-xl
            max-w-xl md:max-w-3xl
            mb-8 sm:mb-10
            leading-relaxed px-4
          ">
            Join the ultimate 24-hour innovation marathon. From pushing the limits of 
            <span className="text-white font-medium"> AI & Web3</span> to building 
            <span className="text-white font-medium"> next-generation SaaS</span> ecosystems. 
            Where sleek aesthetics meet flawless functionality.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="hidden md:flex items-center justify-center gap-8 mb-12 opacity-60">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#00FFC2]/50" />
            <div className="flex gap-6 text-xs font-mono text-[#00FFC2] tracking-widest">
               <span className="flex items-center gap-2"><Cpu className="w-4 h-4" /> AI/ML</span>
               <span className="flex items-center gap-2"><Code2 className="w-4 h-4" /> WEB3</span>
               <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> SAAS</span>
            </div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#00FFC2]/50" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center w-full sm:w-auto">
            
            <Link href="#register" className="cyber-button type--cyber">
              <div className="cyber-button__line"></div>
              <div className="cyber-button__line"></div>
              <span className="cyber-button__text flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                INITIALIZE
              </span>
              <div className="cyber-button__drow1"></div>
              <div className="cyber-button__drow2"></div>
            </Link>

            <Link href="#timeline" className="cyber-button type--cyber">
              <div className="cyber-button__line"></div>
              <div className="cyber-button__line"></div>
              <span className="cyber-button__text flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                ACCESS INTEL
              </span>
              <div className="cyber-button__drow1"></div>
              <div className="cyber-button__drow2"></div>
            </Link>
            
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}