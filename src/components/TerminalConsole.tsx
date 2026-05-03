"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

const COMMANDS: Record<string, string> = {
  help: "AVAILABLE_VECTORS: [status, prizes, tracks, clear, exit]",
  status: "NODE_LOCATION: RAICHUR_INDIA | UPTIME: 99.9% | ENCRYPTION: AES_256",
  prizes: "01: MASTER_OPERATIVE (₹50k) | 02: LEAD_ARCHITECT (₹25k) | 03: INNOVATION (₹10k)",
  tracks: "AI_NEURAL | WEB3_DECENTRAL | CYBER_DEFENSE | FINTECH_2.0",
  whoami: "GUEST_OPERATIVE_v2.0.26",
};

export default function TerminalConsole() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(["LOGIN_SUCCESSFUL", "TYPE 'help' TO BEGIN_MISSION"]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    
    if (cmd === "clear") {
      setHistory([]);
    } else if (COMMANDS[cmd]) {
      setHistory([...history, `> ${cmd}`, COMMANDS[cmd]]);
    } else if (cmd !== "") {
      setHistory([...history, `> ${cmd}`, "ERR: UNKNOWN_VECTOR"]);
    }
    
    setInput("");
  };

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-black/80 backdrop-blur-2xl border-2 border-[#00FFC2]/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,255,194,0.15)]">
          {/* Terminal Header */}
          <div className="bg-[#00FFC2]/10 px-6 py-3 border-b border-[#00FFC2]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[10px] font-mono text-[#00FFC2]/70 uppercase tracking-widest">HACKSTREET_OPERATIONAL_CONSOLE_v1.0</span>
            </div>
            <ShieldCheck className="w-4 h-4 text-[#00FFC2]/50" />
          </div>

          {/* Terminal Content */}
          <div 
            ref={scrollRef}
            className="h-80 overflow-y-auto p-8 font-mono text-sm space-y-3 custom-scrollbar scroll-smooth"
          >
            {history.map((line, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className={line.startsWith(">") ? "text-[#00FFC2]" : "text-gray-400"}
              >
                {line}
              </motion.div>
            ))}
            
            {/* Input Line */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
              <span className="text-[#00FFC2] font-black">❯</span>
              <input 
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full caret-[#00FFC2]"
                spellCheck="false"
                autoComplete="off"
              />
            </form>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="mt-6 flex justify-between px-4">
          <div className="flex gap-8">
            <Metric label="MEM" value="128GB_ECC" />
            <Metric label="THRT" value="LOW_LATENCY" />
          </div>
          <div className="flex items-center gap-2 text-[#00FFC2]/40 italic font-mono text-[10px]">
            <Zap className="w-3 h-3" />
            SECURE_DATA_TRANSMISSION_ACTIVE
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 font-mono text-[10px]">
      <span className="text-gray-600 uppercase">{label}:</span>
      <span className="text-[#00FFC2]">{value}</span>
    </div>
  );
}