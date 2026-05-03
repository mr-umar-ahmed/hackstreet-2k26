// src/sections/Timeline.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Code, Cpu, Trophy } from "lucide-react";

const scheduleData = [
  {
    id: 1,
    phase: "Phase 1: Initialization",
    time: "Day 1 • 09:00 AM",
    title: "Opening Ceremony & Briefing",
    icon: Terminal,
    desc: "Target acquisition. Problem statements are unlocked and the 24-hour countdown initiates. Form your squads and select your tech stack.",
  },
  {
    id: 2,
    phase: "Phase 2: Execution",
    time: "Day 1 • 12:00 PM",
    title: "Development Sprint Alpha",
    icon: Code,
    desc: "Architecture design and core logic implementation. Mentors will roam the floor to provide tactical technical support.",
  },
  {
    id: 3,
    phase: "Phase 3: Validation",
    time: "Day 1 • 08:00 PM",
    title: "AI Mentor Check-in",
    icon: Cpu,
    desc: "Mandatory code review. Pitch your current progress to the AI and human judging panel. Pivot or persevere.",
  },
  {
    id: 4,
    phase: "Phase 4: Termination",
    time: "Day 2 • 09:00 AM",
    title: "Final Deployment & Awards",
    icon: Trophy,
    desc: "Keyboards down. Push to production. Present your UI/UX and functionality to claim the HackStreet 2K26 championship.",
  },
];

export default function Timeline() {
  const [activeNode, setActiveNode] = useState(1);

  return (
    <section className="py-24 relative" id="timeline">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Event <span className="text-[#00FFC2]">Trajectory</span></h2>
          <p className="text-gray-400">Explore the phases of the 24-hour innovation marathon.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* Interactive Navigation Line */}
          <div className="w-full md:w-1/3 space-y-4 relative border-l border-white/10 pl-6 ml-4 md:ml-0">
            {scheduleData.map((item) => {
              const isActive = activeNode === item.id;
              return (
                <div 
                  key={item.id}
                  onClick={() => setActiveNode(item.id)}
                  className={`cursor-pointer group relative p-4 rounded-xl transition-all ${
                    isActive ? 'bg-white/5 border border-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  {/* Glowing Node on the line */}
                  <div className={`absolute -left-[33px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-colors ${
                    isActive ? 'bg-[#00FFC2] border-[#00FFC2] shadow-[0_0_10px_#00FFC2]' : 'bg-obsidian border-white/30 group-hover:border-[#00FFC2]'
                  }`} />
                  
                  <h4 className={`font-bold transition-colors ${isActive ? 'text-[#00FFC2]' : 'text-gray-300'}`}>
                    {item.phase}
                  </h4>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              );
            })}
          </div>

          {/* Dynamic Content Display */}
          <div className="w-full md:w-2/3 h-[300px]">
            <AnimatePresence mode="wait">
              {scheduleData.map((item) => (
                item.id === activeNode && (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-8 md:p-12 h-full flex flex-col justify-center"
                  >
                    <item.icon className="w-12 h-12 text-[#00FFC2] mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {item.desc}
                    </p>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}