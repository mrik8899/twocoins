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

  // CHANGED: Initial state for logoStaticY from '50%' to '30%'
  const [logoStaticY, setLogoStaticY] = useState('30%');

  const progressBarRef = useRef<HTMLDivElement>(null);
  const estimatedLogoHeight = window.innerWidth < 768 ? 112 : 144;

  useEffect(() => {
    const calculateStaticPosition = () => {
      if (progressBarRef.current) {
        const progressBarRect = progressBarRef.current.getBoundingClientRect();

        const logoTopPosition = progressBarRect.top - estimatedLogoHeight - landingBufferPx;
        setLogoStaticY(`${logoTopPosition}px`);
      }
    };

    calculateStaticPosition();
    const initialCalcTimer = setTimeout(calculateStaticPosition, 100);
    window.addEventListener('resize', calculateStaticPosition);

    return () => {
        window.removeEventListener('resize', calculateStaticPosition);
        clearTimeout(initialCalcTimer);
    };
  }, []);

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
          animationDelay: '0s'
        }}
      >
        {/* Spinner rings and images remain the same */}
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
          animationDelay: '0.3s'
        }}
      >
        {/* Spinner rings and images remain the same */}
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
  const loadingDuration = 3000;

  useEffect(() => {
    document.documentElement.style.setProperty('--loading-duration', `${loadingDuration}ms`);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration + 500);

    return () => clearTimeout(timer);
  }, [loadingDuration]);

  // --- START: ADDED CODE FOR DEV TOOLS DETERRENTS ---
  useEffect(() => {
    // Disables right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disables specific keyboard shortcuts
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
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount
  // --- END: ADDED CODE FOR DEV TOOLS DETERRENTS ---

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