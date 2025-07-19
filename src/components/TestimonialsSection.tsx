'use client';

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
];

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-20 pt-20 pb-16 min-h-[60vh] transition-colors duration-300 overflow-hidden"
    >
      {/* Blobs and vertical gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-yellow-500/20 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-primary-500/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/60"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading style matches Features/About Us */}
        <div className="mb-14 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-10 rounded bg-yellow-400/80"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg text-white text-left">
              What Our <span className="text-yellow-400">Customers Say</span>
            </h2>
          </div>
          <p className="text-xl md:text-2xl font-light text-white/80 text-left">
            Real stories from real owners.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-white/10 dark:bg-black/20 border border-white/20 shadow-2xl rounded-2xl backdrop-blur-lg p-8 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-yellow-400/30 animate-fade-in"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Floating avatar */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
                />
              </div>
              {/* Large quote mark as background accent */}
              <span className="absolute top-8 left-1/2 -translate-x-1/2 text-[6rem] text-yellow-400/10 font-extrabold select-none pointer-events-none z-0">
                &ldquo;
              </span>
              <div className="pt-14 pb-2 px-2 flex-1 flex flex-col">
                <p className="text-lg text-white/90 mb-4 italic z-10 relative">"{t.text}"</p>
                <div className="mt-auto z-10 relative">
                  <span className="block text-yellow-400 font-bold text-base">{t.name}</span>
                  <span className="block text-xs text-white/60">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blob animation keyframes (if not already in your global CSS) */}
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
};

export default TestimonialsSection;