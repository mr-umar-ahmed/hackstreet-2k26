// src/sections/Venue.tsx
"use client";
import { MapPin, Wifi, Zap, Play } from "lucide-react";
import { useState } from "react";

export default function Venue() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="venue" className="py-24 relative overflow-hidden border-y border-white/5 bg-black/40">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT - INFO */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                OPERATIONAL <span className="text-[#00FFC2]">BASE</span>
              </h2>
              <p className="text-xl text-gray-400 font-light">
                Navodaya Institute of Technology, Raichur
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="mt-1 w-9 h-9 rounded-xl bg-[#00FFC2]/10 flex items-center justify-center border border-[#00FFC2]/30">
                  <MapPin className="w-5 h-5 text-[#00FFC2]" />
                </div>
                <div>
                  <p className="font-mono uppercase text-sm text-[#00FFC2]">Location</p>
                  <p className="text-white">Navodaya Institute of Technology, Raichur, Karnataka</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="mt-1 w-9 h-9 rounded-xl bg-[#00FFC2]/10 flex items-center justify-center border border-[#00FFC2]/30">
                  <Wifi className="w-5 h-5 text-[#00FFC2]" />
                </div>
                <div>
                  <p className="font-mono uppercase text-sm text-[#00FFC2]">Connectivity</p>
                  <p className="text-white">Gigabit Fiber • High-Speed WiFi • Dedicated LAN</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="mt-1 w-9 h-9 rounded-xl bg-[#00FFC2]/10 flex items-center justify-center border border-[#00FFC2]/30">
                  <Zap className="w-5 h-5 text-[#00FFC2]" />
                </div>
                <div>
                  <p className="font-mono uppercase text-sm text-[#00FFC2]">Power</p>
                  <p className="text-white">24/7 Power Backup • Surge Protection</p>
                </div>
              </div>
            </div>

            <a 
              href="#register" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#00FFC2] text-black font-bold uppercase rounded-2xl hover:bg-white transition-all group"
            >
              SECURE YOUR SPOT
              <span className="group-hover:translate-x-1 transition">→</span>
            </a>
          </div>

          {/* RIGHT - VIDEO PLAYER */}
          <div className="relative rounded-3xl overflow-hidden border border-[#00FFC2]/30 shadow-2xl aspect-video bg-black group">
            <video
              id="venueVideo"
              className="w-full h-full object-cover"
              poster="/images/venue-poster.jpg"   // Optional: Add a poster image
              loop
              muted
              playsInline
            >
              <source src="/videos/venue.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay Play Button */}
            <div 
              className={`absolute inset-0 flex items-center justify-center bg-black/60 transition-all duration-300 ${isPlaying ? 'opacity-0' : 'group-hover:opacity-90'}`}
              onClick={() => {
                const video = document.getElementById('venueVideo') as HTMLVideoElement;
                if (video) {
                  if (isPlaying) {
                    video.pause();
                  } else {
                    video.play();
                  }
                  setIsPlaying(!isPlaying);
                }
              }}
            >
              <div className="w-20 h-20 rounded-full border-4 border-[#00FFC2] flex items-center justify-center backdrop-blur-md hover:scale-110 transition-all cursor-pointer">
                <Play className="w-10 h-10 text-[#00FFC2] ml-1" />
              </div>
            </div>

            {/* Top Bar */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-4 py-1 rounded-full text-xs font-mono border border-[#00FFC2]/30 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00FFC2] rounded-full animate-pulse" />
              LIVE NODE FEED
            </div>

            {/* Scan Line Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FFC2]/10 to-transparent pointer-events-none animate-[scan_6s_linear_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
}