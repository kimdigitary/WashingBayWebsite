"use client";
import { useEffect, useState } from "react";

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 items-center">
      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`w-12 h-12 rounded-full bg-theme-red text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center justify-center hover:bg-theme-darkRed hover:-translate-y-1 transition-all duration-300 ${
          showScroll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"
        }`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/+256748151515"
        target="_blank"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-fade-in"
      >
        <i className="fab fa-whatsapp text-3xl"></i>
      </a>
    </div>
  );
}
