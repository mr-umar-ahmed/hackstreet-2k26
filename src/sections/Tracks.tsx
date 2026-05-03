// src/sections/Tracks.tsx
"use client";
import { Brain, Globe, Shield, Wallet } from "lucide-react";
import ScrollReveal from "@/src/components/ScrollReveal";

const tracks = [
  { title: "AI & Neural Links", icon: Brain, desc: "Build scalable AI/ML solutions that redefine human-computer interaction." },
  { title: "Web3 & Decentralized", icon: Globe, desc: "Develop trustless protocols and blockchain-based utility tools." },
  { title: "Cyber Defense", icon: Shield, desc: "Engineer forensic tools and metadata extraction engines." },
  { title: "FinTech 2.0", icon: Wallet, desc: "Create modern, type-safe financial applications for the 2026 economy." },
];

export default function Tracks() {
  return (
    <section className="py-24 bg-black/50" id="tracks">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black mb-16 text-center italic">TARGET <span className="text-[#00FFC2]">VECTORS</span></h2>
        <div className="grid md:grid-cols-4 gap-6">
          {tracks.map((track, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-[#00FFC2]/20 hover:border-[#00FFC2] transition-all group backdrop-blur-md">
                <track.icon className="w-12 h-12 text-[#00FFC2] mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3 uppercase">{track.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{track.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}