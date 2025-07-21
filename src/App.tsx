// E:\twocoinswebapps\twocoinscorpwebapp\src\App.tsx
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import NewHeroSection from './components/NewHeroSection';
import ImageCarousel from './components/ImageCarousel';
import AboutUsSection from './components/AboutUsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FeaturesSection from './components/FeaturesSection';
import InventoryPage from './pages/InventoryPage';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';

import './components/LoadingScreen.css';

const LoadingScreen: React.FC = () => {
  const logoSizeClasses = "w-28 h-28 md:w-36 md:h-36";
  const landingBufferPx = 20;

  // Initial state for logoStaticY from '50%' to '30%'
  const [logoStaticY, setLogoStaticY] = useState('30%');

  const progressBarRef = useRef<HTMLDivElement>(null);
  const estimatedLogoHeight = window.innerWidth < 768 ? 112 : 144; // Approx values for calculation

  useEffect(() => {
    const calculateStaticPosition = () => {
      if (progressBarRef.current) {
        const progressBarRect = progressBarRef.current.getBoundingClientRect();
        // Calculate position based on the progress bar's top, logo height, and a buffer
        const logoTopPosition = progressBarRect.top - estimatedLogoHeight - landingBufferPx;
        setLogoStaticY(`${logoTopPosition}px`);
      }
    };

    calculateStaticPosition(); // Initial calculation
    // Recalculate if window resizes, and also a small timeout for initial render accuracy
    const initialCalcTimer = setTimeout(calculateStaticPosition, 100);
    window.addEventListener('resize', calculateStaticPosition);

    return () => {
        window.removeEventListener('resize', calculateStaticPosition);
        clearTimeout(initialCalcTimer);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white p-4 overflow-hidden loading-screen-gradient">

      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-yellow-500/10 filter blur-3xl animate-background-pulse-glow"></div>
      </div>

      <div
        className={`${logoSizeClasses} absolute logo-ring-container`}
        style={{
          left: '50%',
          top: logoStaticY,
          transform: 'translateX(-50%)',
          animationDelay: '0s' // First logo starts immediately
        }}
      >
        <div className="spinner-rings"></div>
        <img
          src="/logo1.png"
          alt="Two Coins Corporation Logo 1"
          className={`w-full h-full object-contain logo-flip`}
        />
      </div>

      <div
        className={`${logoSizeClasses} absolute logo-ring-container`}
        style={{
          left: '50%',
          top: logoStaticY,
          transform: 'translateX(-50%)',
          animationDelay: '0.3s' // Second logo slightly delayed for layered effect
        }}
      >
        <div className="spinner-rings"></div>
        <img
          src="/logo1.png"
          alt="Two Coins Corporation Logo 2"
          className={`w-full h-full object-contain logo-transparent`}
        />
      </div>

      <div ref={progressBarRef} className="w-64 rounded-full h-2.5 overflow-hidden relative z-10 mb-4 progress-bar-track-gradient">
        <div
          className="bg-yellow-500 h-2.5 rounded-full animate-progress-bar"
        ></div>
      </div>
      <p className="text-base md:text-xl font-extrabold text-center drop-shadow-lg relative z-10 animated-gradient-text">
        Preparing Your Journey to Japan's Best...
      </p>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const loadingDuration = 3000; // Duration for the progress bar animation

  useEffect(() => {
    // Set CSS variable for animation duration
    document.documentElement.style.setProperty('--loading-duration', `${loadingDuration}ms`);

    // Hide loading screen after duration + a small buffer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration + 500);

    return () => clearTimeout(timer);
  }, [loadingDuration]);

  // --- START: GLOBAL DEV TOOLS DETERRENTS ---
  useEffect(() => {
    // Disables right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disables specific keyboard shortcuts (F12, Ctrl/Cmd+Shift+I/J/C, Ctrl/Cmd+U/S)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 key
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Ctrl/Cmd + Shift + I (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
      }
      // Ctrl/Cmd + Shift + J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
        e.preventDefault();
      }
      // Ctrl/Cmd + U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key === 'U') {
        e.preventDefault();
      }
      // Ctrl/Cmd + S (Save Page)
      if ((e.ctrlKey || e.metaKey) && e.key === 'S') {
        e.preventDefault();
      }
      // Ctrl/Cmd + Shift + C (Inspect Element - sometimes used)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
      }
    };

    // Add the event listeners when the component mounts
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount
  // --- END: GLOBAL DEV TOOLS DETERRENTS ---

  // --- START: GLOBAL URL HIDING / SMOOTH SCROLL BEHAVIOR ---
  // This useEffect will listen for all clicks on the document.
  // If the click is on an anchor tag with an internal hash link,
  // it will prevent the default (URL change) and smoothly scroll.
  useEffect(() => {
    const handleGlobalAnchorClick = (e: MouseEvent) => {
      // Find the closest ancestor of the clicked element that is an anchor tag.
      // This handles cases where child elements inside the <a> are clicked (e.g., a span inside a link).
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      // Check if:
      // 1. An anchor tag was clicked (or a descendant of it).
      // 2. The anchor's href attribute exists and starts with '#' (indicating an internal section link).
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault(); // Prevent the default browser behavior (changing the URL hash).

        // Extract the section ID from the href (e.g., from "#contact" get "contact").
        const targetId = anchor.getAttribute('href')?.substring(1); 
        if (targetId) {
          // Find the target element by its ID.
          const el = document.getElementById(targetId);
          if (el) {
            // Smoothly scroll the target element into view.
            el.scrollIntoView({ behavior: 'smooth' });
            // IMPORTANT: No window.history.pushState() or window.location.hash = ... here.
            // This is the core part that ensures the URL in the address bar remains the base URL
            // (e.g., "https://twocoins.vercel.app/") and does not show "#contact" or "/contact".
          }
        }
      }
    };

    // Attach the global click listener to the entire document.
    document.addEventListener('click', handleGlobalAnchorClick);

    // Clean up the event listener when the App component unmounts to prevent memory leaks.
    return () => {
      document.removeEventListener('click', handleGlobalAnchorClick);
    };
  }, []); // An empty dependency array means this effect runs once after the initial render and cleans up on unmount.
  // --- END: GLOBAL URL HIDING / SMOOTH SCROLL BEHAVIOR ---

  return (
    <>
      {isLoading && <LoadingScreen />}

      <div
        className={`min-h-screen bg-white dark:bg-dark-800 text-slate-800 dark:text-slate-200 font-sans antialiased
                    transition-opacity duration-700 ease-out
                    ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Header isLoading={isLoading} />
        <main>
          <NewHeroSection />
          <ImageCarousel />
          <FeaturesSection />
          <InventoryPage />
          <AboutUsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </>
  );
}

export default App;