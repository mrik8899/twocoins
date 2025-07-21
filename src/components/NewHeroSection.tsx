'use client';

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

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
  
  // State to track if video is ready to play
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    // Pause video if prefers-reduced-motion is active
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause();
      // If motion is reduced, consider video "ready" immediately
      setIsVideoReady(true);
    }
  }, []);

  // Set contentLoaded after a delay (not tied to video loading)
  const [contentLoaded, setContentLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 100); // Small delay to allow initial render
    return () => clearTimeout(timer);
  }, []);

  // Handler for when the video can play through without buffering
  const handleVideoCanPlayThrough = () => {
    setIsVideoReady(true);
  };

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
      {/* Spinner/loading overlay for video */}
      {!isVideoReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          {/* Your actual spinner component or SVG */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-yellow-400"></div> 
        </div>
      )}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        poster="/hero-poster.jpg"
        preload="metadata"
        onCanPlayThrough={handleVideoCanPlayThrough} // Event to hide spinner
        style={{ visibility: isVideoReady ? 'visible' : 'hidden' }} // Hide video until ready
      >
        {/* Source for WebM (VP9) - more efficient */}
        <source src="/hero-video.webm" type="video/webm" />
        {/* Source for MP4 (H.264) - wider compatibility */}
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle Animated Blobs Background */}
      <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
        <div className="blob-1 absolute bg-yellow-400/10 rounded-full mix-blend-screen filter blur-3xl opacity-60 w-56 h-56 md:w-80 md:h-80 animate-blob-move-1" />
        <div className="blob-2 absolute bg-yellow-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-60 w-64 h-64 md:w-96 md:h-96 animate-blob-move-2" />
      </div>

      {/* Gradient overlay for warmth & depth */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 60% 40%,rgba(255,233,80,0.13),rgba(0,0,0,0.78)),
            linear-gradient(120deg,rgba(255,255,255,0.07) 0%,rgba(0,0,0,0.29) 100%)`
        }}
      />

      {/* Subtle Vignette Effect */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          boxShadow: 'inset 0px 0px 100px rgba(0,0,0,0.75)'
        }}
      />

      {/* Main content */}
      <div
        className={`
          absolute z-40 flex flex-col items-start
          w-full max-w-xs sm:max-w-md md:max-w-lg
          
          left-4
          bottom-4
          
          md:bottom-10 md:left-6
          md:p-0

          transition-all duration-1000 ease-out 
          ${contentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        {/* Brand block: logo left, text and badge right */}
        <div className="flex items-start mb-4 md:mb-6">
          <img
            src="/logo1.png"
            alt="Direct Japan Imports Logo"
            className="w-14 h-14 md:w-16 md:h-16 object-contain"
          />
          {/* TWEAK: Added mt-2 for mobile, md:mt-0 to reset on desktop */}
          <div className="flex flex-col justify-center ml-3 mt-2 md:mt-0">
            <span className="text-xs md:text-lg font-extrabold tracking-widest uppercase text-white drop-shadow-lg overflow-hidden text-ellipsis whitespace-nowrap">
              DIRECT JAPAN IMPORTS.
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full 
                      bg-gradient-to-r from-yellow-400/80 to-yellow-500/60 text-black 
                      font-bold text-[0.625rem] uppercase shadow-md tracking-wide w-max
                      min-w-0 flex-shrink-0 overflow-hidden
                      md:px-3 md:py-1 md:text-xs md:gap-2">
              <svg className="w-4 h-4 text-black md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" />
                <text x="10" y="14" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">VIP</text>
              </svg>
              Trusted Importer  •  Since 2012
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
          {/* Animated Gradient Text */}
          <span className="
            bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 
            text-transparent bg-clip-text bg-[length:200%_auto] animate-text-gradient
          ">Delivered.</span>
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
            className="px-3 md:px-5 py-2 md:py-2.5 text-xs md:text-base font-bold rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black shadow border border-yellow-300/50 
                           hover:scale-105 hover:shadow-lg transition-all transform ease-out duration-300
                           animate-button-glow
                           whitespace-nowrap min-w-[90px] md:min-w-[120px] text-center"
          >
            Browse Inventory
          </a>
          <a
            href="#contact"
            className="group px-3 md:px-5 py-2 md:py-2.5 text-xs md:text-base font-bold rounded-full border-2 border-yellow-400/60 text-yellow-100 bg-black/40 shadow hover:bg-yellow-400/10 
                           hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap min-w-[90px] md:min-w-[120px] text-center"
          >
            <span>Request VIP Call</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
        {/* Numbers/stats: stack vertically on mobile, row on desktop */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 w-full">
          <div key="imported-stats" className="flex flex-row items-center gap-1 w-full md:w-auto">
            <span className="text-lg md:text-2xl text-yellow-400 font-extrabold tracking-tight">
              <AnimatedCounter end={6200} suffix="+" />
            </span>
            <span className="text-xs md:text-sm text-white/80 font-medium ml-1">Imported</span>
          </div>
          <div key="years-stats" className="flex flex-row items-center gap-1 w-full md:w-auto md:border-l border-white/20 md:pl-4">
            <span className="text-lg md:text-2xl text-yellow-400 font-extrabold tracking-tight">
              <AnimatedCounter end={16} suffix="+" />
            </span>
            <span className="text-xs md:text-sm text-white/80 font-medium ml-1">Years</span>
          </div>
          <div key="satisfaction-stats" className="flex flex-row items-center gap-1 w-full md:w-auto md:border-l border-white/20 md:pl-4">
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
        <div className="flex flex-col items-center gap-2 h-8 w-4">
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-scroll-dot group-hover:bg-yellow-300" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-300/70" />
          <div className="w-1 h-1 rounded-full bg-yellow-200/60" />
        </div>
        {/* Chevron Down icon for scroll indicator */}
        <ChevronDown className="w-4 h-4 text-white/70 mt-1 animate-bounce-y group-hover:text-yellow-300 transition-colors" />
      </a>

      <style>{`
        /* Font smoothing for crisper text rendering */
        html, body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        @keyframes scrollDot {
          0% { opacity: 0.7; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(10px); }
          100% { opacity: 0.7; transform: translateY(0); }
        }
        .animate-scroll-dot {
          animation: scrollDot 1.4s infinite;
        }

        /* Animated Gradient Text Keyframes */
        @keyframes text-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-text-gradient {
          animation: text-gradient 3s ease-in-out infinite;
        }

        /* Blob Animation Keyframes */
        .blob-1 {
          top: 10%;
          left: 5%;
          animation: blob-move-1 15s ease-in-out infinite alternate;
        }
        .blob-2 {
          bottom: 20%;
          right: 15%;
          animation: blob-move-2 18s ease-in-out infinite alternate-reverse;
        }
        @keyframes blob-move-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-30px, 20px) scale(1.1);
          }
          66% {
            transform: translate(30px, -20px) scale(0.9);
          }
        }
        @keyframes blob-move-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(25px, -15px) scale(0.95);
          }
          66% {
            transform: translate(-25px, 15px) scale(1.05);
          }
        }

        /* Button Glow/Pulse Keyframes */
        @keyframes button-glow {
          0% { box-shadow: 0 0 0px rgba(255, 255, 0, 0.4); }
          50% { box-shadow: 0 0 10px rgba(255, 255, 0, 0.8); }
          100% { box-shadow: 0 0 0px rgba(255, 255, 0, 0.4); }
        }
        .animate-button-glow {
          animation: button-glow 2s ease-in-out infinite;
        }

        /* Vertical Bounce for Scroll Icon */
        @keyframes bounce-y {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(3px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-bounce-y {
          animation: bounce-y 1.5s infinite;
        }
      `}</style>
    </section>
  );
}