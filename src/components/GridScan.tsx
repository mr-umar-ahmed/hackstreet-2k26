// src/components/ui/GridScan.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface GridScanProps {
  linesColor?: string;
  scanColor?: string;
  scanOpacity?: number;
  lineThickness?: number;
  gridScale?: number;
  enablePost?: boolean;
  bloomIntensity?: number;
  bloomThreshold?: number;
  noiseIntensity?: number;
  scanDirection?: "pingpong" | "forward" | "backward";
  scanDuration?: number;
  enableWebcam?: boolean;
  enableGyro?: boolean;
}

export function GridScan({
  linesColor = "#2a2a2a",
  scanColor = "#00FFC2",
  scanOpacity = 0.5,
  scanDuration = 4,
  lineThickness = 1,
}: GridScanProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${linesColor} ${lineThickness}px, transparent ${lineThickness}px), 
            linear-gradient(to bottom, ${linesColor} ${lineThickness}px, transparent ${lineThickness}px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.8
        }}
      />
      
      {/* Animated Scanner Line */}
      <motion.div
        animate={{ y: ["-100%", "200%"] }}
        transition={{ 
          duration: scanDuration, 
          repeat: Infinity, 
          ease: "linear", 
          repeatType: "mirror" 
        }}
        className="absolute top-0 left-0 w-full h-40"
        style={{
          background: `linear-gradient(to bottom, transparent, ${scanColor})`,
          opacity: scanOpacity,
          borderBottom: `2px solid ${scanColor}`,
          boxShadow: `0 10px 40px ${scanColor}`
        }}
      />
    </div>
  );
}