// src/sections/Sponsors.tsx
"use client";

import { motion } from "framer-motion";
import { Hexagon, Triangle, Circle, Square } from "lucide-react";

const sponsors = [
  { name: "TechNova", tier: "Platinum", icon: Hexagon, color: "text-[#00FFC2]" },
  { name: "AeroSpace", tier: "Platinum", icon: Triangle, color: "text-purple-400" },
  { name: "Quantum", tier: "Gold", icon: Circle, color: "text-amber-400" },
  { name: "Nexus", tier: "Gold", icon: Square, color: "text-blue-400" },
];

export default function Sponsors() {
  return (
    <section className="py-20 relative border-t border-white/5 bg-black/50" id="sponsors">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <p className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-8">
          Powered By Industry Leaders
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card p-6 flex flex-col items-center justify-center group hover:bg-white/10 transition-colors cursor-pointer"
            >
              <sponsor.icon className={`w-12 h-12 mb-4 ${sponsor.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
              <h4 className="text-lg font-bold text-gray-300">{sponsor.name}</h4>
              <span className="text-xs text-gray-500 mt-1">{sponsor.tier} Sponsor</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}