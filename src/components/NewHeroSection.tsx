'use client';

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

// Animated counter component
function AnimatedCounter({ end, duration = 1200, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 20);
    let timer: ReturnType<typeof setTimeout>;
    function update() {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        timer = setTimeout(update, 20);
      } else {
        setCount(end);
      }
    }
    update();
    return () => clearTimeout(timer);
  }, [end, duration]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

// Parallax headline effect
function useParallax(ref: React.RefObject<HTMLElement>, strength: number = 0.06) {
  useEffect(() => {
    const handle = () => {
      if (!ref.current) return;
      const y = window.scrollY;
      ref.current.style.transform = `translateY(${y * strength}px)`;
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, [ref, strength]);
}

export default function NewHeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  useParallax(headlineRef as React.RefObject<HTMLElement>, 0.06);

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause();
    }
  }, []);

  // Scroll to #showcase
  const handleScrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("showcase");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-black"
      tabIndex={-1}
      aria-label="Hero section"
    >
      {/* Cinematic background video */}
      <video
        ref={videoRef}
        src="/text-video.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        poster="/hero-poster.jpg"
        style={{ opacity: 0.80 }}
      />

      {/* Gradient overlay for warmth & depth */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 60% 40%,rgba(255,233,80,0.13),rgba(0,0,0,0.78)), 
            linear-gradient(120deg,rgba(255,255,255,0.07) 0%,rgba(0,0,0,0.29) 100%)`
        }}
      />

      {/* Main content: responsive position, left-aligned */}
      <div className="
        absolute z-40 flex flex-col items-start
        w-full max-w-full md:max-w-lg
        px-3 pl-4 md:pl-8
        bottom-28 md:bottom-10
        left-0 md:left-8
      ">
        {/* Brand block: logo left, text and badge right */}
        <div className="flex items-start mb-4 md:mb-6">
          <img
            src="/logo1.png"
            alt="Direct Japan Imports Logo"
            className="w-14 h-14 md:w-16 md:h-16 object-contain"
          />
          <div className="flex flex-col justify-center ml-3">
            <span className="text-xs md:text-lg font-extrabold tracking-widest uppercase text-white drop-shadow-lg">
              DIRECT JAPAN IMPORTS.
            </span>
            <span className="flex items-center gap-2 px-3 py-1 mt-1 rounded-full bg-gradient-to-r from-yellow-400/80 to-yellow-500/60 text-black font-bold text-xs uppercase shadow-md tracking-wide w-max">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" />
                <text x="10" y="14" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">VIP</text>
              </svg>
              Trusted Importer  •  Since 2012
            </span>
          </div>
        </div>
        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-2xl md:text-5xl font-extrabold text-white text-left leading-tight mb-2 md:mb-3 tracking-wide relative"
          style={{
            textShadow: "0 4px 32px rgba(0,0,0,0.41)",
            letterSpacing: "0.03em",
          }}
        >
          <span className="pr-2">Experience Japan's Best</span>
          <span className="text-yellow-400">Delivered.</span>
        </h1>
        {/* Subheadline */}
        <p className="text-xs md:text-lg text-neutral-300 text-left font-medium mb-4 md:mb-5" style={{
          textShadow: "0 1px 8px rgba(0,0,0,0.18)"
        }}>
          Premium Japan-surplus vehicles, inspected and imported with confidence.<br className="hidden md:inline" />
          <span className="text-yellow-300 font-semibold">Over 500 delighted owners.</span>
        </p>
        {/* CTA buttons side by side, smaller */}
        <div className="flex flex-row gap-2 md:gap-4 w-full justify-start mb-3 md:mb-4 flex-nowrap">
          <a
            href="#inventory"
            className="px-3 md:px-5 py-2 md:py-2.5 text-xs md:text-base font-bold rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black shadow border border-yellow-300/50 hover:scale-105 hover:shadow-lg transition transform whitespace-nowrap min-w-[90px] md:min-w-[120px] text-center"
          >
            Browse Inventory
          </a>
          <a
            href="#contact"
            className="group px-3 md:px-5 py-2 md:py-2.5 text-xs md:text-base font-bold rounded-full border-2 border-yellow-400/60 text-yellow-100 bg-black/40 shadow hover:bg-yellow-400/10 hover:scale-105 transition flex items-center gap-2 whitespace-nowrap min-w-[90px] md:min-w-[120px] text-center"
          >
            <span>Request VIP Call</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
        {/* Numbers/stats: slightly smaller */}
        <div className="flex flex-row gap-4 md:gap-8">
          <div className="flex flex-row items-center gap-1 min-w-[90px] md:min-w-[120px]">
            <span className="text-lg md:text-2xl text-yellow-400 font-extrabold tracking-tight">
              <AnimatedCounter end={6200} suffix="+" />
            </span>
            <span className="text-xs md:text-sm text-white/80 font-medium ml-1">Imported</span>
          </div>
          <div className="flex flex-row items-center gap-1 min-w-[90px] md:min-w-[120px] border-l border-white/20 pl-2 md:pl-4">
            <span className="text-lg md:text-2xl text-yellow-400 font-extrabold tracking-tight">
              <AnimatedCounter end={16} suffix="+" />
            </span>
            <span className="text-xs md:text-sm text-white/80 font-medium ml-1">Years</span>
          </div>
          <div className="flex flex-row items-center gap-1 min-w-[90px] md:min-w-[120px] border-l border-white/20 pl-2 md:pl-4">
            <span className="text-lg md:text-2xl text-yellow-400 font-extrabold tracking-tight">
              <AnimatedCounter end={98} suffix="%" />
            </span>
            <span className="text-xs md:text-sm text-white/80 font-medium ml-1">Satisfaction</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator: always at the bottom */}
      <a
        href="#showcase"
        onClick={handleScrollClick}
        className="absolute left-1/2 bottom-3 md:bottom-6 z-50 -translate-x-1/2 flex flex-col items-center cursor-pointer group"
        aria-label="Scroll to showcase"
      >
        <span className="text-white/70 text-xs uppercase tracking-wide mb-2 group-hover:text-yellow-300 transition">Scroll</span>
        <div className="flex flex-col items-center gap-2 h-8 w-4">
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-scroll-dot group-hover:bg-yellow-300" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-300/70" />
          <div className="w-1 h-1 rounded-full bg-yellow-200/60" />
        </div>
      </a>

      <style>{`
        @keyframes scrollDot {
          0% { opacity: 0.7; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(10px); }
          100% { opacity: 0.7; transform: translateY(0); }
        }
        .animate-scroll-dot {
          animation: scrollDot 1.4s infinite;
        }
      `}</style>
    </section>
  );
}