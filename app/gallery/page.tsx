"use client";

import React, { useEffect, useRef, useState } from "react";
import BookingModal from "@/components/BookingModal";

// --- REUSABLE ANIMATION COMPONENT ---
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transform transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>
      {children}
    </div>
  );
};

// --- DATA: GALLERY ITEMS ---
// Note: We use CSS filters to simulate "Before" images using the same URL for perfect alignment in this demo.
// In a real app, you would have two distinct image URLs (e.g., beforeUrl and afterUrl).
const galleryItems = [
  {
    id: 1,
    category: "exterior",
    title: "Off-Road Mud Removal",
    desc: "Deep exterior wash and detail.",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800&auto=format&fit=crop",
    filterStyle: "grayscale(80%) brightness(0.7) sepia(0.2)" // Simulating dirty look
  },
  {
    id: 2,
    category: "interior",
    title: "Luxury Leather Restoration",
    desc: "Deep cleaning and conditioning.",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop",
    filterStyle: "brightness(0.6) contrast(1.2)"
  },
  {
    id: 3,
    category: "ceramic",
    title: "Paint Correction",
    desc: "Swirl mark removal and gloss enhancement.",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop",
    filterStyle: "grayscale(100%) blur(1px)"
  },
  {
    id: 4,
    category: "exterior",
    title: "Showroom Shine",
    desc: "Full exterior detailing package.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800&auto=format&fit=crop",
    filterStyle: "contrast(0.8) sepia(0.4)"
  }
];

// --- COMPONENT: COMPARE SLIDER ---
const CompareSlider = ({ item }: { item: typeof galleryItems[0] }) => {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-gray-200 dark:border-theme-accent shadow-2xl group select-none">
      
      {/* 1. AFTER IMAGE (Background) */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url('${item.image}')` }}
      />

      {/* 2. BEFORE IMAGE (Clipped Overlay) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden border-r-2 border-white/80"
        style={{ width: `${position}%` }}
      >
        {/* We use the same image but apply CSS filters to simulate the "Before" state */}
        <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ 
                backgroundImage: `url('${item.image}')`,
                // This forces the inner image to be full width of container, ensuring alignment
                width: `${100 * (100 / position)}%`, 
                maxWidth: 'none',
                filter: item.filterStyle 
            }}
        />
      </div>

      {/* 3. LABELS */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20 pointer-events-none z-10">
        BEFORE
      </div>
      <div className="absolute top-4 right-4 bg-theme-red/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg pointer-events-none z-10">
        AFTER
      </div>

      {/* 4. SLIDER INPUT (Invisible Interactive Layer) */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
      />

      {/* 5. VISUAL HANDLE */}
      <div 
        className="absolute top-0 bottom-0 pointer-events-none z-20 flex items-center justify-center w-0"
        style={{ left: `${position}%` }}
      >
        <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-theme-red text-xs">
            <i className="fas fa-arrows-alt-h"></i>
        </div>
      </div>

      {/* 6. CONTENT FOOTER */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-12 pointer-events-none z-10">
        <h3 className="text-white font-bold text-lg">{item.title}</h3>
        <p className="text-gray-300 text-sm">{item.desc}</p>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
export default function GalleryPage() {
  const [filter, setFilter] = useState("all");

  const filteredItems = filter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="bg-white dark:bg-theme-black transition-colors duration-300 min-h-screen">
      
      {/* 1. HEADER */}
      <div className="pt-32 pb-8 px-6 md:px-8 max-w-7xl mx-auto w-full text-center">
        <Reveal>
            <span className="text-theme-red font-bold tracking-widest uppercase text-xs mb-2 block">
                Our Transformations
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black text-gray-900 dark:text-theme-text mb-4">
                Before & <span className="text-theme-red">After</span>
            </h1>
            <p className="text-gray-600 dark:text-theme-muted text-lg max-w-2xl mx-auto">
                Drag the sliders to see the DBS Premier difference.
            </p>
        </Reveal>
      </div>

      {/* 2. STICKY FILTER BAR */}
      <div className="sticky top-20 z-40 py-4 bg-white/80 dark:bg-theme-black/80 backdrop-blur-md border-b border-gray-200 dark:border-theme-accent mb-12">
        <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto px-6">
            {[
                { id: 'all', label: 'All Projects' },
                { id: 'exterior', label: 'Exterior' },
                { id: 'interior', label: 'Interior' },
                { id: 'ceramic', label: 'Ceramic' }
            ].map((btn) => (
                <button
                    key={btn.id}
                    onClick={() => setFilter(btn.id)}
                    className={`
                        px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all
                        ${filter === btn.id 
                            ? 'bg-theme-red text-white border border-theme-red shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
                            : 'bg-transparent text-gray-500 dark:text-theme-muted border border-gray-300 dark:border-theme-accent hover:border-theme-red hover:text-theme-red'
                        }
                    `}
                >
                    {btn.label}
                </button>
            ))}
        </div>
      </div>

      {/* 3. GALLERY GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item) => (
                <Reveal key={item.id}>
                    <CompareSlider item={item} />
                </Reveal>
            ))}
        </div>
        
        {/* Empty State */}
        {filteredItems.length === 0 && (
            <div className="text-center py-20 text-gray-500 dark:text-theme-muted">
                No projects found in this category.
            </div>
        )}
      </div>

      {/* 4. CTA SECTION */}
      <div className="bg-gray-100 dark:bg-theme-surface border-t border-gray-200 dark:border-theme-accent py-20">
         <Reveal className="text-center max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-theme-text mb-6">
                Ready for your transformation?
            </h2>
            <div className="inline-block bg-theme-red text-white rounded-full font-bold uppercase tracking-widest hover:bg-theme-darkRed transition-all shadow-xl">
                 <div className="px-8 py-4 cursor-pointer">
                    <BookingModal />
                 </div>
            </div>
         </Reveal>
      </div>

    </div>
  );
}