// src/app/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        
        {/* GLOBAL VIDEO BACKGROUND */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute min-w-full min-h-full object-cover opacity-40"
          >
            {/* Replace 'background-video.mp4' with your actual filename */}
            <source src="/background-video.mp4" type="video/mp4" />
          </video>

          {/* CRITICAL: Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        {/* MAIN APP CONTENT */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}