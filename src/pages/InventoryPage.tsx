'use client';

import { useState, useRef, useEffect } from 'react';
import { vehicleData } from '../data/vehicles';
import type { Vehicle } from '../types/vehicle';
import VehicleDetailModal from '../components/VehicleDetailModal';

const categories = ["All", "Mini Vans", "Trucks", "Heavy Equipment", "Japan Surplus"];

const InventoryPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredVehicles = vehicleData.filter(v =>
    activeCategory === "All" || v.category === activeCategory
  );

  // Parallax blobs
  const blobTL = useRef<HTMLDivElement>(null);
  const blobTR = useRef<HTMLDivElement>(null);
  const blobBL = useRef<HTMLDivElement>(null);
  const blobBR = useRef<HTMLDivElement>(null);
  const blobC = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (blobTL.current) blobTL.current.style.transform = `translateY(${scrollY * 0.06}px) scale(1.05)`;
      if (blobTR.current) blobTR.current.style.transform = `translateY(-${scrollY * 0.04}px) scale(1.05)`;
      if (blobBL.current) blobBL.current.style.transform = `translateY(-${scrollY * 0.03}px) scale(1.05)`;
      if (blobBR.current) blobBR.current.style.transform = `translateY(${scrollY * 0.05}px) scale(1.05)`;
      if (blobC.current) blobC.current.style.transform = `translateY(${scrollY * 0.02}px) scale(1.05)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="inventory"
      className="relative scroll-mt-20 pt-20 pb-16 min-h-screen transition-colors duration-300 overflow-hidden"
    >
      {/* Blobs at all corners and center, plus radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          ref={blobTL}
          className="absolute top-0 left-0 w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] bg-yellow-500/20 rounded-full filter blur-3xl opacity-40 animate-blob"
        ></div>
        <div
          ref={blobTR}
          className="absolute top-0 right-0 w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] bg-primary-500/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"
        ></div>
        <div
          ref={blobBL}
          className="absolute bottom-0 left-0 w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] bg-yellow-400/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"
        ></div>
        <div
          ref={blobBR}
          className="absolute bottom-0 right-0 w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] bg-primary-400/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-6000"
        ></div>
        <div
          ref={blobC}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-yellow-500/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-3000"
        ></div>
        {/* Center-to-edges (radial) gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 100%)"
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern heading/filter row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          {/* Left: Heading and intro */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-10 rounded bg-yellow-400/80 hidden md:block"></div>
              <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg text-white text-left">
                Our <span className="text-yellow-400">Inventory</span>
              </h2>
            </div>
            <p className="text-xl md:text-2xl font-light text-white/80 text-left">
              Find the perfect match for your needs from our quality selection.
            </p>
          </div>
          {/* Right: Category filter as glass card */}
          <div className="w-full md:w-auto">
            <div className="flex flex-wrap gap-2 bg-white/10 dark:bg-black/20 border border-white/20 rounded-2xl shadow-xl backdrop-blur-lg p-3 md:p-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors border
                    ${
                      activeCategory === category
                        ? 'bg-yellow-500 text-black shadow-lg border-yellow-400'
                        : 'bg-white/20 dark:bg-black/30 border-white/20 text-white hover:bg-yellow-400/30 hover:text-black'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modern, premium grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group bg-white/10 dark:bg-black/20 border border-white/20 shadow-2xl rounded-2xl backdrop-blur-lg flex flex-col transition hover:scale-105 hover:shadow-yellow-400/30 relative overflow-hidden"
            >
              {/* Image with hover zoom and animated border */}
              <div className="relative w-full h-48 md:h-56 rounded-t-2xl overflow-hidden">
                <img
                  src={vehicle.imageUrl}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Info panel */}
              <div className="flex-1 flex flex-col p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-yellow-400/80 text-black text-xs font-bold uppercase tracking-wider">
                    {vehicle.category}
                  </span>
                  {vehicle.status && (
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                      ${vehicle.status === "Available" ? "bg-green-500 text-white" :
                        vehicle.status === "Coming Soon" ? "bg-yellow-400 text-black" :
                        vehicle.status === "Sold" ? "bg-red-500 text-white" : "bg-gray-400 text-white"}
                    `}>
                      {vehicle.status}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{vehicle.name}</h3>
                <p className="text-sm text-white/80 mb-2">{vehicle.description}</p>
                <div className="flex-1"></div>
                <button
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="mt-2 px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition text-sm w-max shadow group-hover:scale-110"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVehicle && (
        <VehicleDetailModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}

      {/* Blob animation keyframes (if not already in your global CSS) */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: scale(1) translate(0, 0); }
          20% { transform: scale(1.1, 0.9) translate(20px, -10px); }
          40% { transform: scale(0.9, 1.1) translate(-10px, 20px); }
          60% { transform: scale(1.05, 0.95) translate(10px, 10px); }
          80% { transform: scale(0.95, 1.05) translate(-20px, -10px); }
        }
        .animate-blob { animation: blob 14s infinite linear; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
      `}</style>
    </section>
  );
};

export default InventoryPage;