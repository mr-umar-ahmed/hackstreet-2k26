"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Medal, Zap } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const prizeTiers = [
  { 
    tier: "01", 
    name: "Master Operative", 
    reward: "₹50,000", 
    perks: ["Premium Internship", "Dev Toolkit", "Winner Trophy"], 
    icon: Trophy, 
    color: "from-yellow-500/20",
    accent: "text-yellow-500"
  },
  { 
    tier: "02", 
    name: "Lead Architect", 
    reward: "₹25,000", 
    perks: ["Hardware Vouchers", "Cyber Merch", "Silver Medal"], 
    icon: Award, 
    color: "from-gray-400/20",
    accent: "text-gray-300"
  },
  { 
    tier: "03", 
    name: "Innovation Specialist", 
    reward: "₹10,000", 
    perks: ["Domain Credits", "Cloud Credits", "Bronze Medal"], 
    icon: Medal, 
    color: "from-orange-800/20",
    accent: "text-orange-600"
  },
];

export default function Prizes() {
  return (
    <section className="py-24 relative z-10 overflow-hidden" id="prizes">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic"
          >
            Clearance <span className="text-[#00FFC2]">Rewards</span>
          </motion.h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Zap className="w-4 h-4 text-[#00FFC2] animate-pulse" />
            <p className="text-gray-500 font-mono tracking-[0.3em] text-[10px] uppercase">Secure the bounty</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {prizeTiers.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className={cn(
                "group relative p-8 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl border-2 border-white/10",
                "hover:border-[#00FFC2]/40 transition-all duration-500 flex flex-col items-center text-center",
                "shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              )}
            >
              {/* Dynamic Tier Gradient Overlay */}
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]", item.color)} />

              <span className="absolute top-8 right-10 font-black italic text-6xl opacity-5 group-hover:opacity-20 transition-opacity text-white pointer-events-none">
                {item.tier}
              </span>

              {/* Icon Container with specific Tier Accents */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-[#00FFC2]/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
                <item.icon className={cn("w-20 h-20 relative z-10 transition-all duration-500 group-hover:scale-110", item.accent)} />
              </div>

              <h3 className="text-2xl font-black mb-1 text-white relative z-10 tracking-tight uppercase italic">{item.name}</h3>
              <div className="h-0.5 w-12 bg-white/10 mb-4 group-hover:w-24 group-hover:bg-[#00FFC2]/50 transition-all duration-500" />
              
              <p className="text-5xl font-black text-[#00FFC2] mb-10 drop-shadow-[0_0_15px_rgba(0,255,194,0.3)] relative z-10">
                {item.reward}
              </p>
              
              <ul className="space-y-4 mt-auto w-full relative z-10">
                {item.perks.map((perk, pi) => (
                  <li key={pi} className="text-gray-300 text-[11px] font-mono flex items-center justify-center gap-3 border-y border-white/5 py-2 group-hover:border-white/10 transition-colors">
                    <span className="text-[#00FFC2] text-lg leading-none">›</span> {perk}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}