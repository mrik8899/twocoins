'use client';

import { useRef, useEffect } from "react";
import { Building2, Users, Handshake, Gem, Search, Wrench, PackageCheck, Quote } from "lucide-react";

const values = [
  { icon: Building2, title: "Mission", desc: "Delivering the best Japan surplus vehicles and equipment nationwide, ensuring value, reliability, and satisfaction for every client." },
  { icon: Users, title: "Expertise", desc: "Years of trusted experience in importing, logistics, and wholesale distribution. Our specialists guide you from selection to delivery." },
  { icon: Handshake, title: "Commitment", desc: "We build lasting relationships through competitive pricing, transparency, and world-class service—your satisfaction is our top priority." },
  { icon: Gem, title: "Values", desc: "Honesty, integrity, and a client-first approach guide every decision we make, ensuring a trustworthy and transparent partnership." },
];

const steps = [
  { icon: Search, title: "Direct Sourcing", desc: "We personally select top-grade units directly from our trusted network in Japan." },
  { icon: Wrench, title: "Rigorous Inspection", desc: "Each vehicle undergoes a comprehensive mechanical and cosmetic inspection in our facility." },
  { icon: PackageCheck, title: "Client Delivery", desc: "We ensure a smooth, transparent, and timely delivery process, right to your doorstep." },
];

export default function AboutUsSection() {
  // Parallax effect for blobs only
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translateY(${scrollY * 0.10}px) scale(1.05)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translateY(-${scrollY * 0.08}px) scale(1.05)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="about"
      className="relative scroll-mt-32 pt-32 pb-16 min-h-screen transition-colors duration-300 overflow-hidden"
    >
      {/* Responsive background image: portrait for mobile, landscape for desktop */}
      <picture>
        <source
          media="(max-width: 767px)"
          srcSet="/about-us-image-mobile.jpg"
        />
        <img
          src="/about-us-image.jpg"
          alt="Two Coins Corporation team or storefront"
          className="absolute inset-0 w-full h-full z-0 object-contain md:object-cover object-center"
          style={{ filter: "brightness(0.85)" }}
        />
      </picture>
      {/* Consistent solid overlay for text readability */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-white/60 dark:bg-black/60"></div>
      </div>
      {/* Blobs for accent */}
      <div
        ref={blob1Ref}
        className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-yellow-500/20 rounded-full filter blur-3xl opacity-40 animate-blob z-0"
      ></div>
      <div
        ref={blob2Ref}
        className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-primary-500/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000 z-0"
      ></div>
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg text-dark-900 dark:text-white text-left">
            The <span className="text-yellow-400">TwoCoins</span> Story.
          </h2>
          <p className="text-xl md:text-2xl font-light text-slate-700 dark:text-white/90 text-left mb-6">
            Trusted Partner for Japan Surplus Mini Vans, Trucks, and Equipment.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <Quote className="w-8 h-8 text-yellow-400 animate-pulse" />
            <span className="italic text-lg md:text-xl text-slate-700 dark:text-white/80">
              “We’re not just selling vehicles; we’re empowering businesses and families across the nation.”
            </span>
          </div>
          <div className="mt-2 text-sm text-slate-600 dark:text-white/60">
            — TwoCoins Marketing Corp. DVO, Davao City
          </div>
        </div>

        {/* Timeline/process as a vertical stepper (modern, rich, animated) */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 mt-20">
          <h3 className="text-3xl font-bold mb-12 text-dark-900 dark:text-white text-left">Our 3-Step Quality Guarantee</h3>
          <div className="relative flex flex-col gap-16">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-yellow-400/30 rounded-full z-0 hidden md:block"></div>
            {steps.map((step, i) => (
              <div key={i} className="relative flex items-start gap-6 group animate-fade-in" style={{ animationDelay: `${i * 0.2 + 0.3}s` }}>
                {/* Step number and icon */}
                <div className="flex flex-col items-center z-10">
                  <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center text-black font-bold border-4 border-white dark:border-dark-800 text-lg mb-2 shadow-lg group-hover:scale-110 transition">
                    {i + 1}
                  </div>
                  <step.icon className="w-8 h-8 text-yellow-400" />
                  {/* Accent dot between steps */}
                  {i < steps.length - 1 && (
                    <div className="w-3 h-3 rounded-full bg-yellow-400/70 my-2 hidden md:block"></div>
                  )}
                </div>
                {/* Step content */}
                <div className="bg-white/10 dark:bg-black/20 rounded-2xl p-6 border border-white/20 shadow-xl backdrop-blur-lg w-full">
                  <h4 className="text-xl font-semibold mb-2 text-dark-900 dark:text-white">{step.title}</h4>
                  <p className="text-base text-slate-700 dark:text-white">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values cards */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 mt-20">
          {values.map((card, i) => (
            <div
              key={i}
              className={`relative bg-white/10 dark:bg-black/20 rounded-2xl p-8 border border-white/20 shadow-2xl backdrop-blur-lg flex flex-col items-center text-center transition duration-300 hover:scale-105 hover:shadow-2xl group`}
            >
              <div className="bg-yellow-300/20 p-4 rounded-full mb-5 transition group-hover:bg-yellow-300/30 z-10">
                <card.icon className="w-14 h-14 text-yellow-400 group-hover:text-yellow-400 transition" aria-label={card.title + " icon"} />
              </div>
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-3 transition-colors z-10">{card.title}</h3>
              <p className="text-slate-700 dark:text-white transition-colors z-10">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA: No glass card, bold, left-aligned, yellow highlight */}
        <div className="relative z-10 mt-20 max-w-4xl mx-auto px-2">
          <div className="py-8">
            <h4 className="text-2xl md:text-3xl font-extrabold text-dark-900 dark:text-white mb-2">
              Based in Davao City, <span className="text-yellow-400 font-extrabold">TwoCoins Marketing Corp. DVO</span>
            </h4>
            <p className="text-lg md:text-xl text-slate-700 dark:text-white/90 leading-relaxed">
              Supplies quality mini dump trucks, Elf trucks, vans, and equipment—each rigorously inspected for excellence.<br />
              <span className="block mt-2 text-yellow-400 font-bold">Discover the difference of working with a team dedicated to your success. Contact us today to start your journey!</span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.1, 0.9) translate(20px, -10px); }
          66% { transform: scale(0.9, 1.1) translate(-10px, 20px); }
        }
        .animate-blob { animation: blob 12s infinite linear; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fadeInUp 1s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </section>
  );
}