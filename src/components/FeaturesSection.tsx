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
    <div ref={triggerRef} id="features" className="relative scroll-mt-20 ">
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
        {/* Radial gradient overlay */}
       <div
  className="absolute inset-0 pointer-events-none"
  style={{
    background:
      "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 100%)"
  }}
></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        <div ref={contentRef} className="relative w-full text-white p-4 md:p-8">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="lg:pr-8">
              <h2 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg text-white">
                The <span className="text-yellow-400">TwoCoins</span> Standard.
              </h2>
              <p className="text-xl md:text-2xl text-slate-200">
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
                      <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
                      <p className="text-slate-300">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;