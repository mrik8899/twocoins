'use client';

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Why Choose Us" },
  { href: "#inventory", label: "Our Inventory" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
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
        {/* Logo on the left */}
        <a href="#home" className="text-xl font-bold text-dark-900 dark:text-white">
          Two Coins Corporation
        </a>
        {/* Nav links and right controls on the right */}
        <div className="flex items-center gap-2">
          {/* Nav links: only show on desktop */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="px-4 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-yellow-400/20 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          {/* Theme toggle always visible */}
          <ThemeToggle />
          {/* Hamburger menu: only show on mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-md bg-white/80 dark:bg-dark-800/80 backdrop-blur-lg shadow border border-gray-300 dark:border-gray-700 hover:bg-yellow-100 dark:hover:bg-dark-700 transition"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div 
            className="fixed top-4 right-4 bottom-4 w-64 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border border-slate-300/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-lg" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
               <span className="font-bold text-slate-900 dark:text-white">Navigation</span>
               <button onClick={() => setMobileOpen(false)} className="p-2 -mr-2 rounded-md hover:bg-slate-200 dark:hover:bg-dark-700">
                 <X className="w-6 h-6 text-slate-900 dark:text-white" />
               </button>
            </div>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  onClick={() => setMobileOpen(false)} 
                  className="px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-yellow-400/20 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;