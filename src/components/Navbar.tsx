"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Tracks", href: "#tracks" },
  { name: "Timeline", href: "#timeline" },
  { name: "Prizes", href: "#prizes" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b",
        isScrolled 
          ? "bg-black/60 backdrop-blur-xl border-white/10 py-4" 
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Branding */}
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Terminal className="text-[#00FFC2] w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="font-black italic tracking-tighter text-xl">
            HACK<span className="text-[#00FFC2]">STREET</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-400 hover:text-[#00FFC2] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#register"
            className="px-5 py-2 bg-[#00FFC2] text-black text-[10px] font-black uppercase rounded-lg hover:bg-white transition-colors"
          >
            Register_Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#00FFC2]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-black/95 border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-mono uppercase text-gray-400"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}