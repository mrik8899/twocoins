'use client';

import { useRef, useLayoutEffect } from 'react';
import { ShieldCheck, Truck, LayoutGrid, MessageSquare } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Truck,
    title: 'Elite Japan Sourcing',
    description: 'We go beyond a simple search. Our teams on the ground in Japan hand-select only top-tier units, leveraging exclusive networks to secure vehicles others can\'t.',
  },
  {
    icon: ShieldCheck,
    title: 'The Certification Standard',
    description: 'Every vehicle undergoes a rigorous 120-point mechanical and structural inspection. We don\'t just check boxes; we set the standard for quality assurance.',
  },
  {
    icon: LayoutGrid,
    title: 'Curated & Diverse Fleet',
    description: 'Our inventory isn\'t just large, it\'s intelligently curated. From specialized heavy equipment to versatile commercial fleets, we have the right asset for your exact needs.',
  },
  {
    icon: MessageSquare,
    title: 'A True Partnership',
    description: 'We believe in proactive, transparent communication. Consider us an extension of your team, providing expert guidance and dedicated support at every stage.',
  },
];

const FeaturesSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const pin = gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: sectionRef.current,
          scrub: true,
        },
      });

      videoElement.onloadedmetadata = () => {
        gsap.to(videoElement, {
          currentTime: videoElement.duration,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      };

      gsap.utils.toArray('.feature-card').forEach((card: any) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              scroller: window,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      return () => {
        pin.kill();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray('.feature-card').forEach((card: any) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={triggerRef} id="features" className="relative scroll-mt-20">
      <section ref={sectionRef} className="relative w-full overflow-hidden flex items-start min-h-[600px]">
        <video
          ref={videoRef}
          src="/features-video.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          muted
          loop
          autoPlay
        ></video>
        {/* Blobs only, no gradient overlay */}
        <div className="pointer-events-none absolute inset-0 z-0 w-full max-w-full">
          <div
            className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-full max-h-full bg-yellow-500/20 rounded-full filter blur-3xl opacity-40 animate-blob"
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] max-w-full max-h-full bg-primary-500/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"
          ></div>
        </div>
        <div ref={contentRef} className="relative w-full p-4 md:p-8">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="lg:pr-8">
              <h2 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg text-dark-900 dark:text-white text-left">
                The <span className="text-yellow-400">TwoCoins</span> Standard.
              </h2>
              <p className="text-xl md:text-2xl font-light text-slate-700 dark:text-white/80 text-left">
                It’s more than a promise. It’s the core of our operation—a foundation built on unparalleled quality, transparency, and a commitment to your success.
              </p>
            </div>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card bg-white/10 dark:bg-black/20 p-6 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-lg"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 bg-yellow-400/20 p-3 rounded-full">
                      <feature.icon className="w-8 h-8 text-yellow-300" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-1">{feature.title}</h3>
                      <p className="text-slate-700 dark:text-slate-300">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
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
    </div>
  );
};

export default FeaturesSection;