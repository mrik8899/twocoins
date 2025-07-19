'use client';

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Star } from "lucide-react";

const carouselImages = [
  { src: "/product1.jpg", alt: "Featured Truck", caption: "Reliable Trucks for Heavy-Duty Work", category: "Trucks", featured: true },
  { src: "/product2.jpg", alt: "Featured Mini Van", caption: "Comfortable & Efficient Mini Vans", category: "Mini Vans" },
  { src: "/product3.jpg", alt: "Featured Equipment", caption: "Robust Heavy Equipment", category: "Heavy Equipment" },
  { src: "/product4.jpg", alt: "Quality Japan Surplus", caption: "High-Quality Japan Surplus Vehicles", category: "Japan Surplus" },
  { src: "/product5.jpg", alt: "Another Surplus Vehicle", caption: "Excellence in Every Import", category: "Japan Surplus" },
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Parallax blobs
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translateY(${scrollY * 0.08}px) scale(1.05)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translateY(-${scrollY * 0.06}px) scale(1.05)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  const goToSlide = (idx: number) => setCurrentIndex(idx);

  // Autoplay and progress bar
  useEffect(() => {
    if (autoplay) {
      intervalRef.current = setInterval(goToNext, AUTOPLAY_INTERVAL);
      let start = Date.now();
      setProgress(0);
      progressRef.current = setInterval(() => {
        setProgress(Math.min(100, ((Date.now() - start) / AUTOPLAY_INTERVAL) * 100));
      }, 50);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      setProgress(0);
    };
  }, [autoplay, currentIndex]);

  // Keyboard navigation for carousel and lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") setLightboxOpen(false);
        if (e.key === "ArrowLeft") goToPrevious();
        if (e.key === "ArrowRight") goToNext();
      } else {
        if (e.key === "ArrowLeft") goToPrevious();
        if (e.key === "ArrowRight") goToNext();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, currentIndex]);

  const current = carouselImages[currentIndex];

  return (
    <section id="showcase" className="py-24 px-4 relative min-h-[500px] transition-colors duration-300 overflow-hidden">
      {/* Blobs and radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          ref={blob1Ref}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-yellow-500/20 rounded-full filter blur-3xl opacity-40 animate-blob"
        ></div>
        <div
          ref={blob2Ref}
          className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-primary-500/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"
        ></div>
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.7) 100%)"
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg text-white">
            Our <span className="text-yellow-400">Showcase</span>
          </h2>
          <p className="text-xl md:text-2xl font-light text-white/80">
            A Glimpse of Our Quality Imports
          </p>
        </div>

        {/* Responsive flex: image and card stack on mobile, overlay on desktop */}
        <div className="flex flex-col md:block">
          <div
            className="
              relative w-full
              h-[40vh] min-h-[220px]
              md:h-[75vh] md:min-h-[500px] md:max-h-[900px]
              rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-lg bg-white/10 dark:bg-black/20 select-none
            "
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
            onFocus={() => setAutoplay(false)}
            onBlur={() => setAutoplay(true)}
            tabIndex={0}
            aria-label="Vehicle image carousel"
            aria-live="polite"
          >
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
                aria-hidden={index !== currentIndex}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover cursor-zoom-in"
                  loading={index === 0 ? "eager" : "lazy"}
                  onClick={() => setLightboxOpen(true)}
                />
                {/* Desktop: Glass card overlay at bottom */}
                <div className="hidden md:flex absolute left-0 right-0 bottom-0 bg-black/60 backdrop-blur-lg border-t border-white/20 px-6 md:px-10 py-4 flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <div className="flex items-center gap-2 mb-1 md:mb-0">
                    <span className="inline-block px-3 py-1 rounded-full bg-yellow-400/80 text-black text-xs font-bold uppercase tracking-wider">
                      {image.category}
                    </span>
                    {image.featured && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-400 text-black text-xs font-bold uppercase">
                        <Star className="w-4 h-4" /> Featured
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-2xl font-bold text-white">{image.alt}</h3>
                    <p className="text-white/90 text-sm md:text-lg">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Progress bar for autoplay */}
            <div className="absolute left-0 bottom-0 w-full h-1 bg-white/10 z-20">
              <div
                className="h-full bg-yellow-400 transition-all duration-200"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 dark:bg-black/30 hover:bg-yellow-400 text-white hover:text-black p-3 rounded-full z-20 shadow-lg transition-all backdrop-blur-lg border border-white/30"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 dark:bg-black/30 hover:bg-yellow-400 text-white hover:text-black p-3 rounded-full z-20 shadow-lg transition-all backdrop-blur-lg border border-white/30"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Autoplay Control */}
            <button
              onClick={() => setAutoplay((a) => !a)}
              className="absolute top-4 right-4 bg-white/20 dark:bg-black/30 hover:bg-yellow-400 text-white hover:text-black p-2 rounded-full z-20 shadow-md transition-all backdrop-blur-lg border border-white/30"
              aria-label={autoplay ? "Pause autoplay" : "Play autoplay"}
            >
              {autoplay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-current={index === currentIndex ? "true" : undefined}
                  className={`h-3 w-3 rounded-full transition-all duration-300 border-2 ${
                    index === currentIndex
                      ? "bg-yellow-400 border-yellow-500 scale-125"
                      : "bg-white/50 border-white/60 hover:bg-yellow-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
          {/* Mobile: Glass card below image */}
          <div className="md:hidden mt-4 max-w-full">
            <div className="bg-black/60 backdrop-blur-lg border border-white/20 rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block px-3 py-1 rounded-full bg-yellow-400/80 text-black text-xs font-bold uppercase tracking-wider">
                  {current.category}
                </span>
                {current.featured && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-400 text-black text-xs font-bold uppercase">
                    <Star className="w-4 h-4" /> Featured
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white">{current.alt}</h3>
              <p className="text-white/90 text-sm">{current.caption}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg"
          onClick={() => setLightboxOpen(false)}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
        >
          <button
            className="absolute top-6 right-6 text-white bg-black/60 rounded-full p-2 hover:bg-yellow-400 hover:text-black transition"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            tabIndex={0}
          >
            <svg width={28} height={28} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <img
            src={carouselImages[currentIndex].src}
            alt={carouselImages[currentIndex].alt}
            className="max-h-[90vh] max-w-[95vw] rounded-2xl shadow-2xl border-4 border-white/20"
            onClick={e => e.stopPropagation()}
          />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-lg font-bold bg-black/60 px-4 py-2 rounded-full">
            {carouselImages[currentIndex].alt}
          </div>
          {/* Navigation arrows in lightbox */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-yellow-400 text-white hover:text-black p-3 rounded-full shadow-lg transition-all"
            onClick={e => { e.stopPropagation(); setCurrentIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1)); }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-yellow-400 text-white hover:text-black p-3 rounded-full shadow-lg transition-all"
            onClick={e => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % carouselImages.length); }}
            aria-label="Next image"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      )}

      {/* Blob animation keyframes (if not already in your global CSS) */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.1, 0.9) translate(20px, -10px); }
          66% { transform: scale(0.9, 1.1) translate(-10px, 20px); }
        }
        .animate-blob { animation: blob 12s infinite linear; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default ImageCarousel;