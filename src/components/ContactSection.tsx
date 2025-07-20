'use client';

import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  Globe,
} from "lucide-react";
import { useRef, useEffect } from "react";

const ContactSection = () => {
  // Blobs for parallax effect
  const blobTL = useRef<HTMLDivElement>(null);
  const blobBR = useRef<HTMLDivElement>(null);

  // Parallax for the blobs (mobile-friendly, smaller on mobile)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxBlobOffset = 40; // Limit parallax movement for subtlety
      if (blobTL.current) blobTL.current.style.transform = `translateY(${Math.min(scrollY * 0.04, maxBlobOffset)}px) scale(1.05)`;
      if (blobBR.current) blobBR.current.style.transform = `translateY(-${Math.min(scrollY * 0.03, maxBlobOffset)}px) scale(1.05)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 pt-20 pb-16 min-h-screen transition-colors duration-300 overflow-hidden"
    >
      {/* Responsive Background Image */}
      <picture>
        <source
          media="(max-width: 767px)" // For screens up to 767px wide (mobile)
          srcSet="/contact-us-mobile.jpg"
        />
        <img
          src="/contact-us-desktop.jpg" // Default image for desktop and larger screens
          alt="Two Coins Corporation Contact Us Background"
          className="contact-background-image absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: "brightness(0.7)" }} // Adjust brightness for text readability
        />
      </picture>

      {/* Full-section overlay for text readability */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50"></div>
      </div>

      {/* Blobs for accent */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          ref={blobTL}
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] max-w-[160px] max-h-[160px] md:max-w-[400px] md:max-h-[400px] bg-yellow-500/20 rounded-full filter blur-3xl opacity-40 animate-blob"
        ></div>
        <div
          ref={blobBR}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] max-w-[160px] max-h-[160px] md:max-w-[400px] md:max-h-[400px] bg-primary-500/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg text-dark-900 dark:text-white">
            Let's <span className="text-yellow-400">Connect</span>
          </h2>
          <p className="text-xl md:text-2xl font-light text-slate-700 dark:text-white/80 max-w-3xl mx-auto">
            Your journey to premium Japanese vehicles starts with a conversation. We're ready to exceed your expectations.
          </p>
        </div>

        {/* Primary Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Call Us Card */}
          <a
            href="tel:+639392136599"
            className="group rounded-2xl p-8 border border-white/30 shadow-2xl bg-white/30 dark:bg-black/10 backdrop-blur-md hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-yellow-400/20 p-4 rounded-full mb-4 group-hover:bg-yellow-400/30 transition-colors">
                <Phone className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-yellow-400 mb-2">Call Us Now</h3>
              <p className="text-dark-900 dark:text-white font-semibold">+63 939 213 6599</p>
              <p className="text-sm text-slate-700 dark:text-gray-200 mt-1">Available Mon-Sat</p>
            </div>
          </a>

          {/* Email Us Card */}
          <a
            href="mailto:info@twocoinsvehicles.com"
            className="group rounded-2xl p-8 border border-white/30 shadow-2xl bg-white/30 dark:bg-black/10 backdrop-blur-md hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-yellow-400/20 p-4 rounded-full mb-4 group-hover:bg-yellow-400/30 transition-colors">
                <Mail className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-yellow-400 mb-2">Email Us</h3>
              <p className="text-dark-900 dark:text-white font-semibold break-all">info@twocoinsvehicles.com</p>
              <p className="text-sm text-slate-700 dark:text-gray-200 mt-1">24/7 Response</p>
            </div>
          </a>

          {/* Live Chat Card */}
          <a
            href="https://www.facebook.com/TwoCoins.corp.dvo"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl p-8 border border-white/30 shadow-2xl bg-white/30 dark:bg-black/10 backdrop-blur-md hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-yellow-400/20 p-4 rounded-full mb-4 group-hover:bg-yellow-400/30 transition-colors">
                <MessageSquare className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-yellow-400 mb-2">Live Chat</h3>
              <p className="text-dark-900 dark:text-white font-semibold">Facebook Messenger</p>
              <p className="text-sm text-slate-700 dark:text-gray-200 mt-1">Quick responses</p>
            </div>
          </a>
        </div>

        {/* Additional Info and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Office Address Card */}
            <div className="rounded-2xl p-6 border border-white/30 shadow-2xl bg-white/30 dark:bg-black/10 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-400/20 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-black dark:text-yellow-400">Visit Our Office</h3>
              </div>
              <a
                href="https://maps.google.com/?q=Two Coins Corporation, Davao City, Philippines" // Consider updating this to a more precise Google Maps link
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-900 dark:text-white hover:underline block"
              >
                Astorga Sta. Cruz<br />
                Davao Del Sur, Philippines
              </a>
            </div>

            {/* Business Hours Card */}
            <div className="rounded-2xl p-6 border border-white/30 shadow-2xl bg-white/30 dark:bg-black/10 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-400/20 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-black dark:text-yellow-400">Business Hours</h3>
              </div>
              <div className="text-dark-900 dark:text-white space-y-1">
                <p><span className="font-semibold">Mon-Fri:</span> 8:00 AM - 6:00 PM</p>
                <p><span className="font-semibold">Saturday:</span> 9:00 AM - 4:00 PM</p>
                <p><span className="font-semibold">Sunday:</span> Closed</p>
              </div>
            </div>

            {/* Service Areas Card */}
            <div className="rounded-2xl p-6 border border-white/30 shadow-2xl bg-white/30 dark:bg-black/10 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-400/20 p-3 rounded-full">
                  <Globe className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-black dark:text-yellow-400">Service Areas</h3>
              </div>
              <div className="text-dark-900 dark:text-white space-y-1">
                <p>• Philippines (Nationwide)</p>
                <p>• Direct Japan Imports</p>
                <p>• International Shipping</p>
              </div>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/30 bg-white/30 dark:bg-black/10 backdrop-blur-md h-full min-h-[400px]">
              <div className="w-full h-full relative">
                {/* Dark overlay for the map in dark mode */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 pointer-events-none z-10"></div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.7995025420473!2d125.46104547475694!3d6.917437693082141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f9a7c78e9d78dd%3A0xdbf6fd34402a77aa!2sTwo%20Coins%20Corporation!5e3!3m2!1sen!2s!4v1753004472620!5m2!1sen!2s" // Consider updating this to an actual Google Maps embed URL
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px', filter: 'contrast(0.9) brightness(0.9)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map of Two Coins Corporation"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="rounded-2xl p-8 border border-white/30 shadow-2xl bg-white/30 dark:bg-black/10 backdrop-blur-md max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-black dark:text-yellow-400 mb-4">
              Ready to Import Your Dream Vehicle?
            </h3>
            <p className="text-dark-900 dark:text-white mb-6">
              Contact us today for personalized assistance and competitive quotes on premium Japanese vehicles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+639392136599"
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a
                href="https://www.facebook.com/TwoCoins.corp.dvo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 text-dark-900 dark:text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95 border border-white/30"
              >
                <MessageSquare className="w-5 h-5" />
                Chat on Messenger
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Styles for responsive object-position and blob animations */}
      <style>{`
        /* Default object-position for desktop (or when no specific media query matches) */
        .contact-background-image {
          object-position: center; /* Ensures desktop image is centered by default */
        }
        /* Override object-position for mobile screens */
        @media (max-width: 767px) {
          .contact-background-image {
            object-position: 75% center; /* Adjust focus for mobile image */
          }
        }

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

export default ContactSection;