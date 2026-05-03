"use client";

import ScrollReveal from "@/src/components/ScrollReveal";
import { Trophy, Award, Medal } from "lucide-react";

const prizeTiers = [
  { tier: "01", name: "Master Operative", reward: "₹50,000", perks: ["Premium Internship", "Dev Toolkit", "Winner Trophy"], icon: Trophy, color: "from-yellow-500/20" },
  { tier: "02", name: "Lead Architect", reward: "₹25,000", perks: ["Hardware Vouchers", "Cyber Merch", "Silver Medal"], icon: Award, color: "from-gray-400/20" },
  { tier: "03", name: "Innovation Specialist", reward: "₹10,000", perks: ["Domain Credits", "Cloud Credits", "Bronze Medal"], icon: Medal, color: "from-orange-800/20" },
];

export default function Prizes() {
  return (
    <section className="py-24 relative overflow-hidden" id="prizes">
      <div className="container mx-auto px-6 max-w-6xl">
        <ScrollReveal className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
            Clearance <span className="text-[#00FFC2]">Rewards</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {prizeTiers.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${item.color} to-black border-2 border-white/10 hover:border-[#00FFC2]/50 transition-all group h-full flex flex-col items-center text-center`}>
                <span className="absolute top-6 left-8 font-mono text-4xl opacity-10 group-hover:opacity-30 transition-opacity">
                  {item.tier}
                </span>
                <item.icon className="w-16 h-16 text-[#00FFC2] mb-6 drop-shadow-[0_0_10px_#00FFC2]" />
                <h3 className="text-2xl font-black mb-2 text-white">{item.name}</h3>
                <p className="text-4xl font-mono text-[#00FFC2] mb-8">{item.reward}</p>
                
                <ul className="space-y-3 mt-auto w-full">
                  {item.perks.map((perk, pi) => (
                    <li key={pi} className="text-gray-400 text-sm font-mono flex items-center justify-center gap-2">
                      <div className="w-1 h-1 bg-[#00FFC2] rounded-full" /> {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}