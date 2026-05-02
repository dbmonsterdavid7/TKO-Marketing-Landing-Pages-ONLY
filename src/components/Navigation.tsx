import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const hostname = window.location.hostname;
  const isWellness = location.pathname === '/wellness' || hostname.startsWith('wellness.');
  const isContractors = location.pathname === '/contractors' || location.pathname === '/';

  if (isWellness || isContractors) return null;
  
  const accentColor = '#a60724';
  const accentShadow = 'rgba(166,7,36,0.5)';
  const accentShadowHover = 'rgba(166,7,36,0.6)';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? isWellness 
          ? "bg-white/80 backdrop-blur-md border-b border-zinc-200"
          : "bg-zinc-950/80 backdrop-blur-md border-b border-white/5" 
        : "bg-transparent border-b border-transparent"
    }`}>
      <nav className={`flex items-center justify-between px-6 mx-auto max-w-7xl transition-all duration-300 ${
        isScrolled ? "py-3 md:py-4" : "py-3 md:py-6"
      }`}>
        <Link to="/" className={`flex items-center transition-all duration-300 ${!isScrolled ? "-ml-2 md:ml-0" : ""}`}>
          <img 
            src={isWellness ? "https://lh3.googleusercontent.com/d/1kNEzv5Lz7FlO3Tuis681zBBDHbMkp9CT" : "https://lh3.googleusercontent.com/d/1sho8dWDi-MCebAi3XaxFl6Lrh0VK8ZPj"} 
            alt="Takeover Marketing Logo" 
            className={`object-contain transition-all duration-300 ${
              isScrolled ? "h-10 md:h-12 w-auto" : "h-12 md:h-16 w-auto"
            }`} 
            referrerPolicy="no-referrer" 
          />
        </Link>
        
        <div className={`flex items-center gap-4 md:gap-8 font-medium ${isWellness ? "text-zinc-600" : "text-zinc-400"}`}>
        <Link to="/#features" className={`text-xs md:text-sm hover:text-${isWellness ? "zinc-900" : "white"} transition-colors`}>Features</Link>
        <Link to="/#testimonials" className={`hidden md:block text-sm hover:text-${isWellness ? "zinc-900" : "white"} transition-colors`}>Testimonials</Link>
      </div>
    </nav>
  </header>
  );
}
