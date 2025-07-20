'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Maria Santos",
    image: "/customer1.jpg",
    text: "TwoCoins made my first Japan surplus purchase easy and stress-free. The van was in excellent condition and the team was always responsive.",
    location: "Davao City",
  },
  {
    name: "John Tan",
    image: "/customer2.jpg",
    text: "I was impressed by the transparency and the quality checks. My truck arrived on time and exceeded my expectations. Highly recommended!",
    location: "Cotabato",
  },
  {
    name: "Aileen Garcia",
    image: "/customer3.jpg",
    text: "From inquiry to delivery, the process was smooth. The staff are knowledgeable and truly care about their customers.",
    location: "GenSan",
  },
  {
    name: "Ramon Cruz",
    image: "/customer4.jpg",
    text: "The best Japan surplus experience I’ve had. The team at TwoCoins is honest and professional.",
    location: "Tagum",
  },
  {
    name: "Liza Mendoza",
    image: "/customer5.jpg",
    text: "I love my new mini truck! The process was easy and the price was fair. Thank you, TwoCoins!",
    location: "Cagayan de Oro",
  },
  {
    name: "Mark Villanueva",
    image: "/customer6.jpg",
    text: "Excellent service and after-sales support. I recommend TwoCoins to anyone looking for quality surplus vehicles.",
    location: "Butuan",
  },
];

// --- Testimonial Card Component ---
function TestimonialCard({ t, isCenter }: { t: typeof testimonials[0]; isCenter: boolean }) {
  return (
    <div className={`
      relative bg-white/10 dark:bg-black/20 border border-white/20 shadow-2xl rounded-2xl backdrop-blur-lg p-6 flex flex-col items-center text-center 
      w-full h-full transition-all duration-500 ease-in-out
      ${isCenter ? 'opacity-100 scale-100' : 'opacity-60 scale-85'}
    `}>
      <div className="mb-2">
        <img src={t.image} alt={t.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-yellow-400 shadow-lg" />
      </div>
      <span className="absolute top-8 left-1/2 -translate-x-1/2 text-[4rem] md:text-[6rem] text-yellow-400/10 font-extrabold select-none pointer-events-none z-0">&ldquo;</span>
      <div className="pb-2 px-2 flex-1 flex flex-col">
        <p className="text-sm md:text-base text-dark-900 dark:text-white/90 mb-4 italic z-10 relative">"{t.text}"</p>
        <div className="mt-auto z-10 relative">
          <span className="block text-yellow-400 font-bold text-base">{t.name}</span>
          <span className="block text-xs text-slate-700 dark:text-white/60">{t.location}</span>
        </div>
      </div>
    </div>
  );
}

// --- Main Testimonials Section ---
const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [displayIndex, setDisplayIndex] = useState(1); 
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const isInitialRender = useRef(true);

  const slides = useMemo(() => [
    testimonials[testimonials.length - 1], 
    ...testimonials, 
    testimonials[0]
  ], []);

  const CARD_WIDTH_DESKTOP = 360;
  const CARD_GAP_DESKTOP = 32;

  // Blobs Parallax Effect
  const blobTL = useRef<HTMLDivElement>(null);
  const blobBR = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxBlobOffset = 60;
      if (blobTL.current) blobTL.current.style.transform = `translateY(${Math.min(scrollY * 0.06, maxBlobOffset)}px) scale(1.05)`;
      if (blobBR.current) blobBR.current.style.transform = `translateY(-${Math.min(scrollY * 0.04, maxBlobOffset)}px) scale(1.05)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Detect mobile screen size
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // After the very first render, set the ref to false
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  
  const handleNext = useCallback(() => {
    if (!transitionEnabled) setTransitionEnabled(true);
    setDisplayIndex((prev) => prev + 1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [transitionEnabled]);

  const handlePrev = useCallback(() => {
    if (!transitionEnabled) setTransitionEnabled(true);
    setDisplayIndex((prev) => prev - 1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [transitionEnabled]);

  const handleDotClick = (index: number) => {
    if (!transitionEnabled) setTransitionEnabled(true);
    setCurrentIndex(index);
    setDisplayIndex(index + 1);
  };
  
  const handleTransitionEnd = () => {
    if (displayIndex <= 0) {
      setTransitionEnabled(false);
      setDisplayIndex(slides.length - 2);
    } else if (displayIndex >= slides.length - 1) {
      setTransitionEnabled(false);
      setDisplayIndex(1);
    }
  };
  
  // Automatic sliding effect
  useEffect(() => {
    if (isHovered || isMobile) return;
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [isHovered, isMobile, handleNext]);
  
  const trackStyle = {
    transform: `translateX(calc(50% - ${CARD_WIDTH_DESKTOP / 2}px - ${displayIndex * (CARD_WIDTH_DESKTOP + CARD_GAP_DESKTOP)}px))`,
    transition: !isInitialRender.current && transitionEnabled ? 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
  };

  return (
    // THE FIX: Section itself is now the overflow container
    <section id="testimonials" className="relative scroll-mt-20 pt-20 pb-28 transition-colors duration-300 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div ref={blobTL} className="absolute top-0 left-0 w-[40vw] h-[40vw] max-w-full max-h-full bg-yellow-500/20 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
        <div ref={blobBR} className="absolute bottom-0 right-0 w-[40vw] h-[40vw] max-w-full max-h-full bg-primary-500/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Centered container for the text content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <div className="flex items-center gap-3 mb-4"><div className="w-2 h-10 rounded bg-yellow-400/80"></div><h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg text-dark-900 dark:text-white text-left">What Our <span className="text-yellow-400">Customers Say</span></h2></div>
          <p className="text-xl md:text-2xl font-light text-slate-700 dark:text-white/80 text-left">Real stories from real owners.</p>
        </div>
      </div>

      {/* Full-width container for the carousel itself */}
      <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="relative h-[480px] md:h-[520px]">
          {isMobile ? (
            <div className="w-full h-full flex items-center justify-center px-12 sm:px-16">
               <div className="w-full h-[420px] max-w-sm animate-fade-in" key={currentIndex}><TestimonialCard t={testimonials[currentIndex]} isCenter={true} /></div>
            </div>
          ) : (
            <div className="absolute top-0 left-0 h-full w-full flex items-center" style={trackStyle} onTransitionEnd={handleTransitionEnd}>
              {slides.map((t, index) => (
                <div key={`${t.name}-${index}`} className="flex-shrink-0 h-[450px]" style={{ width: `${CARD_WIDTH_DESKTOP}px`, marginRight: `${CARD_GAP_DESKTOP}px` }}>
                  <TestimonialCard t={t} isCenter={index === displayIndex} />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Controls can be positioned relative to this full-width container */}
        <button onClick={handlePrev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/60 dark:bg-black/30 hover:bg-yellow-400 text-dark-900 dark:text-white hover:text-black p-2 rounded-full z-20 shadow-lg transition-all backdrop-blur-sm border border-white/20" aria-label="Previous testimonial"><ChevronLeft className="w-6 h-6" /></button>
        <button onClick={handleNext} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/60 dark:bg-black/30 hover:bg-yellow-400 text-dark-900 dark:text-white hover:text-black p-2 rounded-full z-20 shadow-lg transition-all backdrop-blur-sm border border-white/20" aria-label="Next testimonial"><ChevronRight className="w-6 h-6" /></button>

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => handleDotClick(i)} aria-current={i === currentIndex ? "true" : undefined} className={`h-3 w-3 rounded-full transition-all duration-300 border-2 ${i === currentIndex ? "bg-yellow-400 border-yellow-500 scale-125" : "bg-white/50 border-white/60 hover:bg-yellow-300"}`} aria-label={`Go to testimonial ${i + 1}`}></button>
          ))}
        </div>
      </div>
      
      {/* Centered container for the bottom text */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center"><p className="text-lg md:text-xl font-bold text-yellow-400">Join hundreds of happy owners. <span className="text-dark-900 dark:text-white">Be the next success story with TwoCoins!</span></p></div>

      <style>{`
        @keyframes blob { 0%, 100% { transform: scale(1) translate(0, 0); } 33% { transform: scale(1.1, 0.9) translate(20px, -10px); } 66% { transform: scale(0.9, 1.1) translate(-10px, 20px); } }
        .animate-blob { animation: blob 12s infinite linear; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;