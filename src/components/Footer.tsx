"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Shield, Cpu, Zap } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Register GSAP Plugin safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STYLES = `
.cinematic-footer-wrapper {
  --pill-bg-1: rgba(0, 255, 194, 0.05);
  --pill-bg-2: rgba(0, 255, 194, 0.02);
  --pill-border: rgba(0, 255, 194, 0.2);
  --pill-border-hover: rgba(0, 255, 194, 0.6);
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 30s linear infinite;
}

.footer-matrix-grid {
  background-size: 50px 50px;
  background-image: 
    linear-gradient(to right, rgba(0, 255, 194, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 255, 194, 0.03) 1px, transparent 1px);
  mask-image: radial-gradient(circle at center, black, transparent 80%);
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(12px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  border-color: var(--pill-border-hover);
  background: rgba(0, 255, 194, 0.08);
  box-shadow: 0 0 20px rgba(0, 255, 194, 0.1);
}

.footer-giant-bg-text {
  font-size: 22vw;
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 1px rgba(0, 255, 194, 0.05);
}
`;

interface MagneticButtonProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  href?: string;
}

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);
    
    useEffect(() => {
      const element = localRef.current;
      if (!element) return;
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(element, { x: x * 0.3, y: y * 0.3, scale: 1.05, duration: 0.4 });
      };
      
      const handleMouseLeave = () => {
        gsap.to(element, { x: 0, y: 0, scale: 1, ease: "elastic.out(1, 0.3)", duration: 1.2 });
      };
      
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
      
      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
          }
        }}
        className={cn("cursor-pointer focus:outline-none", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>SYSTEMS_OPERATIONAL</span> <span className="text-[#00FFC2]">✦</span>
    <span>NEURAL_GRID_ACTIVE</span> <span className="text-[#00FFC2]">✦</span>
    <span>THINK_CODE_DISRUPT</span> <span className="text-[#00FFC2]">✦</span>
    <span>NIT_RAICHUR_NODE</span> <span className="text-[#00FFC2]">✦</span>
  </div>
);

export default function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(giantTextRef.current, { y: 100, opacity: 0 }, {
        y: 0, opacity: 1, scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 90%",
          end: "bottom bottom",
          scrub: 1,
        }
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        ref={wrapperRef}
        className="relative h-[80vh] md:h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-[80vh] md:h-screen w-full flex-col justify-between overflow-hidden bg-black text-white cinematic-footer-wrapper border-t border-white/5">
          <div className="footer-matrix-grid absolute inset-0 z-0 pointer-events-none opacity-40" />

          <div ref={giantTextRef} className="footer-giant-bg-text absolute -bottom-[2vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none tracking-tighter uppercase italic">
            HACKSTREET
          </div>

          <div className="absolute top-20 left-0 w-full overflow-hidden border-y border-[#00FFC2]/10 bg-black/80 backdrop-blur-md py-4 z-10 -rotate-1 scale-105">
            <div className="flex w-max animate-footer-scroll-marquee text-[10px] md:text-xs font-mono tracking-[0.4em] text-[#00FFC2] uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-center italic uppercase">
              Ready to <span className="text-[#00FFC2]">Deploy?</span>
            </h2>

            <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton as="a" href="#register" className="footer-glass-pill px-10 py-5 rounded-2xl text-white font-bold text-sm md:text-base flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#00FFC2]" />
                  INITIALIZE_ACCESS
                </MagneticButton>
                
                <MagneticButton as="a" href="#about" className="footer-glass-pill px-10 py-5 rounded-2xl text-white font-bold text-sm md:text-base flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#00FFC2]" />
                  PROTOCOL_INTEL
                </MagneticButton>
              </div>

              <div className="flex flex-wrap justify-center gap-6 mt-4">
                {["Privacy_Policy", "Terms_of_Service", "Code_of_Conduct"].map((link) => (
                  <a key={link} href="#" className="text-[10px] font-mono text-gray-500 hover:text-[#00FFC2] transition-colors tracking-widest uppercase">
                    {link.replace(/_/g, " ")}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-20 w-full pb-10 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-gray-600 text-[10px] font-mono tracking-[0.2em] uppercase order-2 md:order-1">
              © {new Date().getFullYear()} HACKSTREET_INITIATIVE. ALL_SYSTEMS_GO.
            </div>

            <div className="footer-glass-pill px-6 py-3 rounded-xl flex items-center gap-3 order-1 md:order-2 border-[#00FFC2]/10 bg-[#00FFC2]/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FFC2] animate-pulse" />
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Node: Raichur_India</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <span className="text-[10px] font-mono text-[#00FFC2] font-black uppercase">Uptime: 99.9%</span>
            </div>

            <MagneticButton
              as="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-gray-500 hover:text-[#00FFC2] order-3 group"
            >
              <Cpu className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}