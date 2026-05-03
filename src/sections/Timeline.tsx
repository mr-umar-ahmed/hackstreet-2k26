"use client";

import ScrollReveal from "@/src/components/ScrollReveal";
import { Terminal, Zap, Code2, Rocket } from "lucide-react";

const schedule = [
  { time: "09:00", title: "System Initialization", desc: "Check-in and team formation at the NIT Raichur Hub.", icon: Terminal },
  { time: "11:00", title: "The Big Bang", desc: "Hacking officially commences. Neural links established.", icon: Zap },
  { time: "20:00", title: "Mid-Night Sync", desc: "Progress check-in and high-caffeine refueling.", icon: Code2 },
  { time: "09:00", title: "Final Commit", desc: "Code freeze. Deployment to the judging grid begins.", icon: Rocket },
];

export default function Timeline() {
  return (
    <section className="py-24 relative overflow-hidden border-t border-white/5" id="timeline">
      <div className="container mx-auto px-6 max-w-4xl">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
            Mission <span className="text-[#00FFC2] drop-shadow-[0_0_10px_rgba(0,255,194,0.3)]">Log</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00FFC2]/50 via-[#00FFC2]/20 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12">
            {schedule.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`flex-1 w-full md:text-${i % 2 === 0 ? 'right' : 'left'}`}>
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-[#00FFC2]/30 transition-all group">
                      <span className="font-mono text-[#00FFC2] text-sm tracking-[0.2em]">{item.time}</span>
                      <h3 className="text-xl font-bold text-white mt-1 group-hover:text-[#00FFC2] transition-colors">{item.title}</h3>
                      <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Icon/Center Point */}
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black border-2 border-[#00FFC2] shadow-[0_0_15px_rgba(0,255,194,0.4)] shrink-0">
                    <item.icon className="w-5 h-5 text-[#00FFC2]" />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}