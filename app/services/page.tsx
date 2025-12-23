"use client";

import React, { useEffect, useRef, useState } from "react";
import BookingModal from "@/components/BookingModal";
import Link from "next/link";

// --- REUSABLE ANIMATION COMPONENT ---
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- SERVICE DATA WITH SLUGS ---
const services = [
  {
    title: "Express Wash",
    slug: "express-wash", // <--- ADDED SLUG
    description: "A quick but thorough high-pressure rinse and hand wash to remove surface dirt and grime, finished with a tire dressing.",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1000&auto=format&fit=crop",
    popular: false
  },
  {
    title: "Premium Detail",
    slug: "premium-detail", // <--- ADDED SLUG
    description: "Our signature package. Deep cleaning for both interior and exterior surfaces, including spray wax application.",
    image: "https://images.unsplash.com/photo-1552930294-6b595f4c2974?q=80&w=1000&auto=format&fit=crop",
    popular: true
  },
  {
    title: "Ceramic Coating",
    slug: "ceramic-coating", // <--- ADDED SLUG (Matches your folder name)
    description: "The ultimate protection. A liquid polymer that bonds with vehicle paint for years of shine and hydrophobic properties.",
    image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=1000&auto=format&fit=crop",
    popular: false
  },
  {
    title: "Paint Correction",
    slug: "paint-correction", // <--- ADDED SLUG
    description: "Specialized machine polishing to remove swirl marks, scratches, and oxidation to restore showroom reflection.",
    image: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?q=80&w=1000&auto=format&fit=crop",
    popular: false
  },
  {
    title: "Interior Spa",
    slug: "interior-spa", // <--- ADDED SLUG
    description: "Deep steam cleaning and hot water extraction for carpets, seats, and tough stains to eliminate odors.",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1000&auto=format&fit=crop",
    popular: false
  },
  {
    title: "Engine Bay Detail",
    slug: "engine-bay-detail", // <--- ADDED SLUG
    description: "Safe degreasing and dressing of the engine compartment to remove grease and dust for a factory-fresh look.",
    image: "https://images.unsplash.com/photo-1517524008697-59297e2c6cf8?q=80&w=1000&auto=format&fit=crop",
    popular: false
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-white dark:bg-theme-black transition-colors duration-300">
      
      {/* 1. HERO HEADER */}
      <div className="pt-24 pb-12 md:pb-20 px-6 max-w-7xl mx-auto text-center">
        <Reveal>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gray-900 dark:text-theme-text">
                Our <span className="text-theme-red">Services</span>
            </h2>
            <p className="text-gray-600 dark:text-theme-muted mb-12 max-w-2xl text-lg md:text-xl mx-auto leading-relaxed">
                Professional grade detailing packages designed to restore, protect, and maintain your vehicle's value.
            </p>
        </Reveal>
      </div>

      {/* 2. SERVICES GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Reveal key={index} delay={index * 100} className="flex h-full">
              <div className="group relative bg-gray-50 dark:bg-theme-surface border border-gray-200 dark:border-theme-accent rounded-3xl hover:border-theme-red dark:hover:border-theme-red transition-all duration-300 flex flex-col overflow-hidden w-full shadow-lg dark:shadow-none hover:shadow-2xl hover:-translate-y-1">
                
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 z-20 bg-theme-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Popular
                  </div>
                )}

                {/* Image Area */}
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content Area */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-theme-text mb-3">
                      {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-theme-muted text-sm leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  {/* Read More Button - NOW LINKED CORRECTLY */}
                  <div className="mt-auto pt-4 border-t border-gray-200 dark:border-theme-accent">
                    <Link href={`/services/${service.slug}`} className="text-theme-red text-sm font-bold tracking-widest uppercase hover:text-gray-900 dark:hover:text-white transition-colors flex items-center group/btn">
                        Read More 
                        <i className="fas fa-arrow-right ml-2 transform group-hover/btn:translate-x-1 transition-transform"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* 3. PROCESS SECTION */}
      <div className="bg-gray-100 dark:bg-theme-surface border-y border-gray-200 dark:border-theme-accent py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
            <Reveal className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-theme-text mb-4">
                    The DBS Process
                </h2>
                <p className="text-gray-600 dark:text-theme-muted">How we ensure perfection every time.</p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {/* Connecting Line (Desktop Only) */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-300 dark:bg-theme-accent z-0"></div>

                {[
                    { icon: "fa-search", title: "1. Inspection", desc: "We identify scratches, stains, and paint issues before starting." },
                    { icon: "fa-hands-bubbles", title: "2. Restoration", desc: "Using premium compounds and steam to deep clean surfaces." },
                    { icon: "fa-shield-halved", title: "3. Protection", desc: "Sealing the finish with wax or ceramic for lasting shine." }
                ].map((step, i) => (
                    <Reveal key={i} delay={i * 200} className="relative z-10 text-center">
                        <div className="w-24 h-24 mx-auto bg-white dark:bg-theme-black border-4 border-gray-200 dark:border-theme-accent rounded-full flex items-center justify-center text-3xl text-theme-red mb-6 shadow-xl">
                            <i className={`fas ${step.icon}`}></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-theme-text mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-theme-muted px-4">{step.desc}</p>
                    </Reveal>
                ))}
            </div>
        </div>
      </div>

      {/* 4. FAQ TEASER */}
      <div className="py-24 max-w-4xl mx-auto px-6 text-center">
        <Reveal>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-theme-text mb-6">Not sure what you need?</h2>
            <p className="text-gray-600 dark:text-theme-muted mb-8">
                Our team can inspect your vehicle and recommend the perfect package for your needs and budget.
            </p>
            <Link href="/contact" className="inline-flex items-center text-theme-red font-bold hover:text-theme-dark-red transition-colors">
                Contact Support <i className="fas fa-arrow-right ml-2"></i>
            </Link>
        </Reveal>
      </div>

    </div>
  );
}