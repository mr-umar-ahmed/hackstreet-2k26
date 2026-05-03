// src/sections/FAQ.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Terminal, Database } from "lucide-react";
import ScrollReveal from "@/src/components/ScrollReveal";

const faqs = [
  {
    q: "Do I need a team to participate?",
    a: "You can fly solo or join a squad of up to 4 members. If you don't have a team, our AI Event Assistant can help match you with other developers during Phase 1."
  },
  {
    q: "Is there a registration fee?",
    a: "Negative. HackStreet 2K26 is entirely free for all accepted operatives. We cover the platform, APIs, and coffee."
  },
  {
    q: "Can I use existing code?",
    a: "All core functionality must be written during the 24-hour sprint. You may use open-source libraries, UI frameworks, and public APIs."
  },
  {
    q: "How will the projects be judged?",
    a: "Projects are evaluated on UI/UX Design (40%), Functionality (30%), Creativity (20%), and Completion (10%)."
  },
  {
    q: "Will there be provisions and rest areas?",
    a: "Affirmative. Meals, snacks, and highly caffeinated beverages will be supplied to keep your systems running at optimal capacity, along with designated sleep pods."
  },
  {
    q: "Who retains the Intellectual Property (IP)?",
    a: "You do. Your code is your property. We simply provide the battleground and the infrastructure for you to build it."
  }
];

export default function FAQ() {
  // Initialized to null so all boxes start closed for a perfectly clean grid
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden border-t border-white/5" id="faq">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00FFC2]/5 rounded-[100%] blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Header Section */}
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00FFC2]/30 bg-[#00FFC2]/5 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(0,255,194,0.1)]">
            <Database className="w-4 h-4 text-[#00FFC2]" />
            <span className="text-xs font-mono tracking-widest text-[#00FFC2] uppercase">Query Database</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">
            Intel & <span className="text-[#00FFC2]">Parameters</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Frequently asked questions regarding the hackathon protocol, rules of engagement, and logistics.
          </p>
        </ScrollReveal>

        {/* FAQ Grid Layout */}
        {/* 'items-start' is crucial here so closed boxes don't stretch to match open ones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div 
                  className={`relative flex flex-col rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-sm border ${
                    isOpen 
                      ? "border-[#00FFC2]/50 bg-[#00FFC2]/5 shadow-[0_0_30px_rgba(0,255,194,0.1)]" 
                      : "border-white/10 bg-white/[0.02] hover:border-[#00FFC2]/30 hover:bg-white/[0.04]"
                  }`}
                >
                  <button
                    suppressHydrationWarning
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-start justify-between p-6 text-left focus:outline-none group"
                  >
                    <div className="flex items-start gap-4 pr-4">
                      {/* Terminal prompt styling for numbers */}
                      <span className={`font-mono text-sm mt-1 transition-colors duration-300 ${isOpen ? 'text-[#00FFC2]' : 'text-[#00FFC2]/50'}`}>
                        [{String(index + 1).padStart(2, '0')}]
                      </span>
                      <span className={`font-bold text-lg leading-snug transition-colors duration-300 ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                        {faq.q}
                      </span>
                    </div>
                    
                    <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isOpen ? 'bg-[#00FFC2] text-black' : 'bg-white/5 text-gray-400 group-hover:text-[#00FFC2]'}`}>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }} // Custom spring-like easing
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="pl-11 pr-4 text-gray-400 leading-relaxed font-light text-sm md:text-base">
                            <div className="w-8 h-px bg-gradient-to-r from-[#00FFC2]/50 to-transparent mb-4" />
                            {faq.a}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}