// src/sections/About.tsx
"use client";

import ScrollReveal from "@/src/components/ScrollReveal";
import { Terminal, Cpu, Globe } from "lucide-react";

export default function About() {
  return (
    <section className="py-24 relative overflow-hidden border-t border-white/5" id="about">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#00FFC2]/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Overview */}
          <ScrollReveal>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00FFC2]/30 bg-[#00FFC2]/5 backdrop-blur-md">
                <Terminal className="w-4 h-4 text-[#00FFC2]" />
                <span className="text-xs font-mono tracking-widest text-[#00FFC2] uppercase">System Overview</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                24 Hours to <span className="text-[#00FFC2]">Redefine</span> Reality.
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed">
                HackStreet 2K26 is not just a hackathon; it is a proving ground. We are bringing together the most relentless developers, designers, and visionaries to build enterprise-grade solutions under intense pressure. No theoretical fluff—just pure, unadulterated execution.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Cpu className="w-8 h-8 text-[#00FFC2] mb-3" />
                  <h3 className="text-white font-bold text-lg mb-1">AI & Machine Learning</h3>
                  <p className="text-sm text-gray-500">Train, deploy, and disrupt with next-gen models.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Globe className="w-8 h-8 text-[#00FFC2] mb-3" />
                  <h3 className="text-white font-bold text-lg mb-1">Web3 & Decentralization</h3>
                  <p className="text-sm text-gray-500">Build trustless systems and smart contracts.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: The Code Window Component */}
          <ScrollReveal delay={0.2} className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00FFC2]/20 to-purple-500/20 rounded-2xl blur-lg opacity-50"></div>
            
            <div className="relative rounded-xl bg-[#0d1117] border border-white/10 p-2 shadow-2xl">
              <div className="relative flex text-center border-b border-white/5 pb-3">
                <div className="flex pl-3.5 pt-3 gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/50"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/50"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/50"></div>
                </div>
                <span className="absolute inset-x-0 top-2 text-xs font-mono text-gray-500">hackstreet.config.tsx</span>
              </div>
              
              <div className="mt-5 space-y-1.5 px-5 pb-10 overflow-x-auto text-sm">
                <p className="mt-4 font-mono font-normal tracking-wide text-gray-300">
                  <span className="text-gray-500">&lt;</span><span className="text-[#00FFC2]">Hackathon</span> <span className="text-purple-400">status</span><span className="text-gray-500">=</span><span className="text-yellow-300">INITIALIZING</span><span className="text-gray-500">&gt;</span>
                </p>
                
                <p className="ml-4 font-mono font-normal tracking-wide text-gray-300">
                  <span className="text-gray-500">&lt;</span><span className="text-[#00FFC2]">EventDetails</span><span className="text-gray-500">&gt;</span>
                </p>
                
                <p className="ml-8 font-mono font-normal tracking-wide text-gray-300">
                  <span className="text-gray-500">&lt;</span><span className="text-[#00FFC2]">Title</span><span className="text-gray-500">&gt;</span>
                  <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-[#00FFC2]/10"><span className="relative text-white">HackStreet 2K26</span></span>
                  <span className="text-gray-500">&lt;/</span><span className="text-[#00FFC2]">Title</span><span className="text-gray-500">&gt;</span>
                </p>

                <p className="ml-8 font-mono font-normal tracking-wide text-gray-300">
                  <span className="text-gray-500">&lt;</span><span className="text-[#00FFC2]">Duration</span><span className="text-gray-500">&gt;</span>
                  <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-[#00FFC2]/10"><span className="relative text-white">24 Hours</span></span>
                  <span className="text-gray-500">&lt;/</span><span className="text-[#00FFC2]">Duration</span><span className="text-gray-500">&gt;</span>
                </p>
                
                <p className="ml-4 font-mono font-normal tracking-wide text-gray-300">
                  <span className="text-gray-500">&lt;/</span><span className="text-[#00FFC2]">EventDetails</span><span className="text-gray-500">&gt;</span>
                </p>

                <p className="ml-4 font-mono font-normal tracking-wide text-gray-300 mt-2">
                  <span className="text-gray-500">&lt;</span><span className="text-[#00FFC2]">PrizePool</span> <span className="text-purple-400">total</span><span className="text-gray-500">=</span><span className="text-yellow-300">{`{$8000}`}</span><span className="text-gray-500">&gt;</span>
                </p>

                <p className="ml-8 font-mono font-normal tracking-wide text-gray-300">
                  <span className="text-gray-500">&lt;</span><span className="text-[#00FFC2]">Track</span> <span className="text-purple-400">name</span><span className="text-gray-500">=</span><span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-[#00FFC2]/10"><span className="relative text-white">AI / ML</span></span> <span className="text-gray-500">/&gt;</span>
                </p>
                <p className="ml-8 font-mono font-normal tracking-wide text-gray-300">
                  <span className="text-gray-500">&lt;</span><span className="text-[#00FFC2]">Track</span> <span className="text-purple-400">name</span><span className="text-gray-500">=</span><span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-[#00FFC2]/10"><span className="relative text-white">Web3</span></span> <span className="text-gray-500">/&gt;</span>
                </p>
                <p className="ml-8 font-mono font-normal tracking-wide text-gray-300">
                  <span className="text-gray-500">&lt;</span><span className="text-[#00FFC2]">Track</span> <span className="text-purple-400">name</span><span className="text-gray-500">=</span><span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-[#00FFC2]/10"><span className="relative text-white">SaaS</span></span> <span className="text-gray-500">/&gt;</span>
                </p>

                <p className="ml-4 font-mono font-normal tracking-wide text-gray-300">
                  <span className="text-gray-500">&lt;/</span><span className="text-[#00FFC2]">PrizePool</span><span className="text-gray-500">&gt;</span>
                </p>

                <p className="font-mono font-normal tracking-wide text-gray-300">
                  <span className="text-gray-500">&lt;/</span><span className="text-[#00FFC2]">Hackathon</span><span className="text-gray-500">&gt;</span>
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}