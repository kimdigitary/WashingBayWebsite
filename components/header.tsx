"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook to check current active page

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true); 
  const [mounted, setMounted] = useState(false);
  
  // Get the current route
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: "fa-home" },
    { name: "About Us", href: "/about", icon: "fa-users" },
    { name: "Services", href: "/services", icon: "fa-spray-can" },
    { name: "Gallery", href: "/gallery", icon: "fa-images" },
    { name: "Locations", href: "/locations", icon: "fa-map-marker-alt" },
    { name: "Pricing", href: "/pricing", icon: "fa-tag" },
    { name: "FAQ", href: "/faq", icon: "fa-question-circle" },
    { name: "Blog", href: "/blog", icon: "fa-rss" },
    { name: "Contact", href: "/contact", icon: "fa-envelope" },
  ];

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && true);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newThemeState = !isDark;
    setIsDark(newThemeState);
    
    if (newThemeState) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) return null;

  return (
    <header className="h-20 bg-theme-surface/90 backdrop-blur-md border-b border-theme-accent flex items-center justify-between px-4 md:px-6 z-50 transition-colors duration-300 fixed top-0 w-full">
      {/* Logo */}
      <Link href="/" className="flex items-center cursor-pointer group shrink-0">
        <div className="text-theme-red text-2xl md:text-3xl mr-2 md:mr-3 transform group-hover:rotate-12 transition-transform duration-300">
          <i className="fas fa-shield-alt"></i>
        </div>
        <h1 className="font-display text-xl md:text-2xl font-extrabold tracking-tight text-theme-text">
          DBS <span className="text-theme-red">PREMIUM CAR WASH</span>
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex bg-theme-black/10 dark:bg-theme-black/50 p-1.5 rounded-full border border-theme-accent transition-colors duration-300">
        {navItems.map((link) => {
          // Check if link is active
          const isActive = link.href === "/" 
            ? pathname === "/" 
            : pathname.startsWith(link.href);

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? "bg-theme-red text-white shadow-lg"
                  : "text-theme-muted hover:text-theme-text"
              }`}
            >
              <i className={`fas ${link.icon}`}></i> {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Right Side Controls */}
      <div className="flex items-center gap-3 md:gap-6">
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-theme-accent bg-theme-surface text-theme-text hover:border-theme-red hover:text-theme-red transition-all flex items-center justify-center"
        >
          <i className={`fas ${isDark ? "fa-moon" : "fa-sun"} text-sm md:text-base`}></i>
        </button>

        {/* Status Indicator & Booking Button */}
        <div className="flex items-center gap-2">
          {/* Green Dot */}
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse block"></div>
          
          {/* Text */}
          <span className="text-xs text-theme-muted font-bold tracking-wider hidden xl:block">OPEN</span>
          
          {/* Desktop Booking Button - Links to /booking now */}
          <div className="hidden md:block">
             <Link 
               href="/booking" 
               className="bg-theme-red hover:bg-theme-darkRed text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full font-bold shadow-[0_4px_15px_rgba(220,38,38,0.3)] transition-all transform hover:-translate-y-0.5 text-xs md:text-sm flex items-center"
             >
               <i className="fas fa-calendar-check mr-2 animate-bounce"></i> Book Now
             </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          className="lg:hidden w-10 h-10 flex items-center justify-center text-theme-text border border-theme-accent rounded-lg bg-theme-surface hover:bg-theme-accent transition-colors"
        >
          <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-20 left-0 w-full bg-theme-surface border-b border-theme-accent flex flex-col p-4 shadow-2xl lg:hidden max-h-[calc(100vh-5rem)] overflow-y-auto transition-all duration-300 origin-top ${
          isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-theme-accent/20 rounded-lg border border-theme-accent/50">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span className="text-xs text-theme-text font-bold tracking-wider">BUSINESS OPEN</span>
        </div>

        {navItems.map((link) => {
          const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-4 border-b border-theme-accent text-left font-bold transition-colors flex items-center gap-3 ${
                  isActive ? 'text-theme-red bg-theme-accent/10' : 'text-theme-muted hover:text-theme-red'
              }`}
            >
              <i className={`fas ${link.icon} w-6 text-center`}></i> {link.name}
            </Link>
          );
        })}
        
        {/* Mobile Booking Button - Links to /booking */}
        <div className="mt-4 w-full">
            <Link 
              href="/booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full bg-theme-red text-white text-center py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-theme-darkRed transition-colors"
            >
              Book Appointment
            </Link>
        </div>
      </div>
    </header>
  );
}
