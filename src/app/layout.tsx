// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GridScan } from "@/src/components/GridScan";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "HackStreet 2K26",
  description: "Code the Invisible. Shape the Future.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white selection:bg-[#00FFC2] selection:text-black antialiased`}>
        
        {/* Global Cyber Grid Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <GridScan
            linesColor="#1a1a1a"
            scanColor="#00FFC2"
            scanOpacity={0.3}
            lineThickness={1}
            gridScale={0.06}
            enablePost={true}
            bloomIntensity={1.5}
            bloomThreshold={0.1}
            noiseIntensity={0.05}
            scanDirection="pingpong"
            scanDuration={8}
            enableWebcam={false}
            enableGyro={true}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.88)_100%)]" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}