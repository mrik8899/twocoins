'use client';

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

type NavLink = { href: string; label: string };
const navLinks: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Why Choose Us" },
  { href: "#inventory", label: "Our Inventory" }, // Corrected label from '#inventory' to 'Our Inventory'
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
];

const MobileMenu = ({
  navLinks,
  onClose,
}: {
  navLinks: NavLink[];
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-[9999] md:hidden w-full max-w-full overflow-x-hidden" onClick={onClose}>
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[9999]"></div>
    <div 
      className="fixed inset-0 flex flex-col bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl border-none p-6 shadow-2xl z-[10000] w-full max-w-full overflow-x-hidden"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-8 w-full">
        <span className="font-bold text-dark-900 dark:text-white">Navigation</span>
        <button onClick={onClose} className="p-2 -mr-2 rounded-md hover:bg-yellow-400/20 dark:hover:bg-yellow-400/20 transition">
          <X className="w-6 h-6 text-dark-900 dark:text-white" />
        </button>
      </div>
      <nav className="flex flex-col space-y-2 w-full">
        {navLinks.map((link: NavLink) => (
          <a
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="px-3 py-2 rounded-lg text-base font-medium text-dark-900 dark:text-white hover:bg-yellow-400/20 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors w-full"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  </div>
);

// Define the props type for the Header component
interface HeaderProps {
  isLoading: boolean; 
}

const Header = ({ isLoading }: HeaderProps) => { 
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Effect to ensure mobile menu is closed if loading state changes
  useEffect(() => {
    if (isLoading && mobileOpen) {
      setMobileOpen(false);
    }
  }, [isLoading, mobileOpen]);


  return (
    <header 
      className={`
        fixed top-0 left-0 w-full z-50 py-3 px-4 sm:px-6 
        transition-all duration-300 ease-in-out
        ${isScrolled
          ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-lg border-b border-slate-300/60 dark:border-slate-700/50 shadow-md'
          : 'bg-transparent border-b border-transparent'
        }
      `}
    >
      <style>{`html { scroll-behavior: smooth; }`}</style>
      <div className="flex items-center justify-between w-full">
        <a href="#home" className="text-xl font-bold text-dark-900 dark:text-white">
          Two Coins Corporation
        </a>
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link: NavLink) => (
              <a 
                key={link.label} 
                href={link.href} 
                className={`
                  px-4 py-2 rounded-lg text-base font-medium transition-colors
                  ${isScrolled
                    ? "text-dark-900 dark:text-slate-300 hover:bg-yellow-400/20 hover:text-yellow-600 dark:hover:text-yellow-400"
                    : "text-black dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400"
                  }
                `}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
          <div className="md:hidden">
            <button
              onClick={() => !isLoading && setMobileOpen(true)}
              disabled={isLoading}
              className={`p-2 rounded-md shadow border transition mr-2
                         ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                         
                         /* The glassmorphism styles are applied consistently */
                         bg-white/80 dark:bg-dark-900/80 backdrop-blur-lg 
                         border-gray-300 dark:border-gray-700 
                         
                         hover:bg-yellow-100 dark:hover:bg-dark-700`} 
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu rendered in a portal */}
      {mobileOpen && !isLoading && typeof window !== "undefined" && 
        createPortal(
          <MobileMenu navLinks={navLinks} onClose={() => setMobileOpen(false)} />,
          document.body
        )
      }
    </header>
  );
};

export default Header;