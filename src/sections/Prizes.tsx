// src/sections/Prizes.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo, useId } from "react";
import { Trophy, Medal, Star } from "lucide-react";

// Local utility for classes
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

/** --- TYPES & INTERFACES --- */
interface DebrisChunkData {
  id: string; 
  x: number;
  y: number;
  rot: number;
  path: string;
}

interface PrizeData {
  tier: string;
  amount: string;
  icon: React.ElementType;
  color: string;
  scale: string;
}

/** --- PHYSICS CONFIG --- */
const PHYSICS = {
  MAX_RANGE: 45,             
  DAMAGE_THRESHOLD: 2.5,     
  DAMAGE_INCREMENT: 0.08,    
  RECOVERY_RATE: 0.05,       
  RESPAWN_TIME_MS: 5000,     
  DEBRIS_DISAPPEAR_MS: 3000, 
  HEALING_DURATION_MS: 10000 
} as const;

const CHUNK_PATHS = [
  "M 0 0 L 20 5 L 15 25 L 5 20 Z",
  "M 5 0 L 25 10 L 15 30 L 0 25 Z",
  "M 10 5 L 30 0 L 25 25 L 5 30 Z",
  "M 0 10 L 20 0 L 30 20 L 10 30 Z",
];
const DEBRIS_THRESHOLDS = [0.3, 0.5, 0.7, 0.9];

/** --- PHYSICS HOOK --- */
const useBreakableCard = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [crackLevel, setCrackLevel] = useState(0);
  const [isBroken, setIsBroken] = useState(false);
  const [fallState, setFallState] = useState({ active: false, velocityX: 0, velocityY: 0, rotation: 0 });
  const [debrisChunks, setDebrisChunks] = useState<DebrisChunkData[]>([]);
  const [respawnProgress, setRespawnProgress] = useState(0);

  const lastPos = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef<number>(0);
  const shakeIntensity = useRef(0);
  const velocityRef = useRef({ x: 0, y: 0 });
  const isBrokenRef = useRef(false);

  const triggerBreak = useCallback(() => {
    if (isBrokenRef.current) return;
    isBrokenRef.current = true;
    setIsBroken(true);
    setIsDragging(false);
    setRespawnProgress(0); 
    const vx = velocityRef.current.x;
    setFallState({ active: true, velocityX: vx * 0.3, velocityY: 5, rotation: Math.max(-60, Math.min(60, vx)) });
  }, []);

  const spawnDebris = useCallback((level: number) => {
    setDebrisChunks(prev => {
      const newChunks: DebrisChunkData[] = [];
      DEBRIS_THRESHOLDS.forEach((threshold, i) => {
        if (level >= threshold && prev.length <= i) {
          newChunks.push({
            id: `${Date.now()}-${i}-${Math.random().toString(36).substring(2, 9)}`,
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            rot: Math.random() * 360,
            path: CHUNK_PATHS[Math.floor(Math.random() * CHUNK_PATHS.length)]
          });
        }
      });
      return newChunks.length > 0 ? [...prev, ...newChunks] : prev;
    });
  }, []);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (isBrokenRef.current) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    startPos.current = { x: clientX - position.x, y: clientY - position.y };
    lastPos.current = { x: clientX, y: clientY };
    lastTime.current = Date.now();
    shakeIntensity.current = 0;
  }, [position.x, position.y]);

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging || isBrokenRef.current) return;
    const now = Date.now();
    const dt = Math.max(1, now - lastTime.current);
    
    const vx = (clientX - lastPos.current.x) / dt;
    const vy = (clientY - lastPos.current.y) / dt;
    velocityRef.current = { x: vx * 100, y: vy * 100 };

    const newX = clientX - startPos.current.x;
    const newY = clientY - startPos.current.y;
    const clampedX = Math.max(-PHYSICS.MAX_RANGE, Math.min(PHYSICS.MAX_RANGE, newX));
    const clampedY = Math.max(-PHYSICS.MAX_RANGE, Math.min(PHYSICS.MAX_RANGE, newY));
    setPosition({ x: clampedX, y: clampedY });

    const isHorizontalImpact = (clampedX >= PHYSICS.MAX_RANGE && vx > 0 || clampedX <= -PHYSICS.MAX_RANGE && vx < 0) && Math.abs(vx) > 0.5;
    const isVerticalImpact = (clampedY >= PHYSICS.MAX_RANGE && vy > 0 || clampedY <= -PHYSICS.MAX_RANGE && vy < 0) && Math.abs(vy) > 0.5;

    if (isHorizontalImpact) shakeIntensity.current += PHYSICS.DAMAGE_INCREMENT * 1.5;
    else if (isVerticalImpact) shakeIntensity.current += PHYSICS.DAMAGE_INCREMENT * 0.5;
    else shakeIntensity.current = Math.max(0, shakeIntensity.current - PHYSICS.RECOVERY_RATE);

    setCrackLevel(prev => {
      const newLevel = Math.min(1, prev + shakeIntensity.current * 0.025);
      spawnDebris(newLevel);
      if (newLevel >= 1) setTimeout(() => triggerBreak(), 0);
      return newLevel;
    });

    lastPos.current = { x: clientX, y: clientY };
    lastTime.current = now;
  }, [isDragging, spawnDebris, triggerBreak]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
    shakeIntensity.current = 0; 
  }, [isDragging]);

  useEffect(() => {
    if (!isDragging && !isBroken && crackLevel > 0) {
      const interval = setInterval(() => {
        setCrackLevel(prev => {
          const healAmount = 50 / PHYSICS.HEALING_DURATION_MS;
          const newLevel = Math.max(0, prev - healAmount);
          if (newLevel <= 0) setDebrisChunks([]);
          return newLevel;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isDragging, isBroken, crackLevel]);

  useEffect(() => {
    if (isBroken) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setRespawnProgress(Math.min(100, (elapsed / PHYSICS.RESPAWN_TIME_MS) * 100));
        if (elapsed >= PHYSICS.RESPAWN_TIME_MS) {
          clearInterval(interval);
          setIsBroken(false);
          isBrokenRef.current = false;
          setCrackLevel(0);
          setPosition({ x: 0, y: 0 });
          setDebrisChunks([]);
          setFallState({ active: false, velocityX: 0, velocityY: 0, rotation: 0 });
          shakeIntensity.current = 0;
          velocityRef.current = { x: 0, y: 0 };
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isBroken]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      handleDragMove(clientX, clientY);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", handleDragEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  return { isDragging, position, crackLevel, isBroken, fallState, debrisChunks, handleDragStart, respawnProgress };
};

/** --- SUB-COMPONENTS --- */
const DebrisChunk = ({ x, y, rot, path }: DebrisChunkData) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), PHYSICS.DEBRIS_DISAPPEAR_MS);
    return () => clearTimeout(timer);
  }, []);
  
  if (!visible) return null;
  return (
    <svg className="absolute w-8 h-8 pointer-events-none z-30 overflow-visible" style={{ left: `${x}%`, top: `${y}%`, transform: `rotate(${rot}deg)`, animation: `debris-fall 0.8s cubic-bezier(0.55, 0, 1, 0.45) 0s forwards` }}>
      <path d={path} fill="rgba(0, 255, 194, 0.1)" stroke="rgba(0, 255, 194, 0.5)" strokeWidth="1.5" style={{ backdropFilter: 'blur(10px)' }} />
    </svg>
  );
};

const CrackLines = ({ level }: { level: number }) => {
  if (level < 0.1) return null;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
      <g stroke="#00FFC2" strokeWidth="1.5" fill="none" style={{ filter: 'drop-shadow(0 0 4px #00FFC2)' }}>
        {level >= 0.1 && <path d="M0 20 L15 25 L8 40 L20 50" vectorEffect="non-scaling-stroke" style={{ opacity: Math.min(1, level * 2) }} />}
        {level >= 0.5 && <path d="M50 100 L55 80 L45 70 L60 55" vectorEffect="non-scaling-stroke" style={{ opacity: Math.min(1, (level - 0.4) * 2) }} />}
        {level >= 0.9 && <path d="M20 0 L25 20 L40 25 L35 45 L50 50" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeDasharray="4 2" />}
      </g>
    </svg>
  );
};

const BreakablePrizeCard = ({ prize }: { prize: PrizeData }) => {
  const { isDragging, position, crackLevel, isBroken, fallState, debrisChunks, handleDragStart, respawnProgress } = useBreakableCard();
  const cardId = useId(); 
  
  const fallTransform = useMemo(() => {
    if (!fallState.active) return '';
    return `translate(${fallState.velocityX * 5}px, 120vh) rotate(${fallState.rotation + (fallState.velocityX > 0 ? 45 : -45)}deg)`;
  }, [fallState]);

  return (
    <div className={cn("relative w-full md:w-1/3 h-[450px] mx-auto", prize.scale)}>
      {/* Background "Deploying" State - Hidden until broken */}
      <div className={cn(
        "absolute inset-0 bg-black/40 border border-[#00FFC2]/20 rounded-2xl flex flex-col items-center justify-center z-0 transition-opacity duration-300",
        isBroken ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <span className="text-[#00FFC2]/50 font-black text-xl uppercase tracking-widest mb-2">Deploying</span>
        {isBroken && (
          <div className="w-24 h-2 border border-[#00FFC2]/30 bg-black relative overflow-hidden mt-2 rounded-full">
            <div className="absolute inset-0 bg-[#00FFC2] transition-all duration-75 ease-linear shadow-[0_0_10px_#00FFC2]" style={{ width: `${respawnProgress}%` }} />
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 z-50 overflow-visible" style={{ transform: isBroken ? fallTransform : `translate(${position.x}px, ${position.y}px) rotate(${position.x * 0.15}deg)` }}>
        {debrisChunks.map((chunk) => <DebrisChunk key={chunk.id} {...chunk} />)}
      </div>

      {/* Main Draggable Glass Card */}
      <div
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        className={cn(
          "relative z-10 p-8 text-center flex flex-col items-center justify-center glass-card cursor-grab active:cursor-grabbing select-none h-full overflow-hidden w-full",
          !isDragging && !isBroken && "hover:animate-[hover-wiggle_2s_ease-in-out_infinite]",
          isBroken && "pointer-events-none"
        )}
        style={{
          transform: isBroken ? fallTransform : `translate(${position.x}px, ${position.y}px) rotate(${position.x * 0.15}deg)`,
          transition: isDragging ? 'none' : isBroken ? 'transform 1.0s cubic-bezier(0.55, 0.085, 0.68, 0.53), opacity 1.0s ease-out' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          opacity: isBroken ? 0 : 1,
          maskImage: debrisChunks.length > 0 ? `url(#mask-${cardId})` : 'none',
          WebkitMaskImage: debrisChunks.length > 0 ? `url(#mask-${cardId})` : 'none',
        }}
      >
        <prize.icon className={`w-16 h-16 ${prize.color} mb-6 pointer-events-none`} />
        <h3 className="text-xl font-bold text-gray-300 mb-2 pointer-events-none">{prize.tier}</h3>
        <p className={`text-4xl font-black ${prize.color} mb-6 pointer-events-none drop-shadow-[0_0_10px_rgba(0,255,194,0.3)]`}>{prize.amount}</p>
        
        <ul className="text-gray-400 text-sm space-y-3 w-full border-t border-white/10 pt-6 pointer-events-none">
          <li>+ Vercel Pro 1-Year</li>
          <li>+ GitHub Copilot License</li>
          <li>+ Fast-track Interviews</li>
        </ul>

        {/* Damage Indicator */}
        <div className="absolute top-4 right-4 text-[10px] font-mono text-[#00FFC2]/50">
          {crackLevel > 0 ? `SYS_DMG: ${Math.round(crackLevel * 100)}%` : 'SYS_OK'}
        </div>

        <CrackLines level={crackLevel} />
      </div>

      <svg width="0" height="0" className="absolute">
        <defs>
          <mask id={`mask-${cardId}`} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect x="0" y="0" width="1" height="1" fill="white" />
            {debrisChunks.map((chunk) => (
              <g key={`hole-${chunk.id}`} transform={`translate(${chunk.x / 100}, ${chunk.y / 100}) rotate(${chunk.rot}) scale(0.003)`}>
                <path d={chunk.path} fill="black" />
              </g>
            ))}
          </mask>
        </defs>
      </svg>
    </div>
  );
};

/** --- MAIN PRIZES SECTION --- */
const prizesData: PrizeData[] = [
  { tier: "Runner Up", amount: "$2,000", icon: Medal, color: "text-gray-400", scale: "z-0" },
  { tier: "Grand Champion", amount: "$5,000", icon: Trophy, color: "text-[#00FFC2]", scale: "md:-translate-y-6 z-10" },
  { tier: "2nd Runner Up", amount: "$1,000", icon: Star, color: "text-amber-600", scale: "z-0" },
];

export default function Prizes() {
  return (
    <section className="py-24 relative overflow-hidden" id="prizes">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00FFC2]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Bounty <span className="text-[#00FFC2]">Pool</span></h2>
          <p className="text-gray-400">Drag to stress-test the prize modules. Warning: Highly fragile.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-6xl mx-auto mt-12 px-4">
          {prizesData.map((prize, index) => (
            <BreakablePrizeCard key={index} prize={prize} />
          ))}
        </div>
      </div>
    </section>
  );
}