"use client";

import React, { useEffect, useRef, useState } from "react";
import BookingModal from "@/components/BookingModal";

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

// --- PRICING DATA CONFIGURATION ---
const pricingPlans = [
  {
    name: "Express",
    price: "$29",
    unit: "/ wash",
    features: ["Exterior Hand Wash", "Tire Dressing", "Window Cleaning"],
    isPopular: false,
    delay: 0
  },
  {
    name: "Deluxe",
    price: "$59",
    unit: "/ service",
    features: ["Everything in Express", "Interior Vacuum", "Spray Wax", "Dash & Console Wipe"],
    isPopular: true, // Triggers special styling
    delay: 100
  },
  {
    name: "Signature",
    price: "$149",
    unit: "/ full detail",
    features: ["Deep Interior Shampoo", "Clay Bar & Polish", "Engine Bay Clean", "Leather Conditioning"],
    isPopular: false,
    delay: 200
  }
];

export default function PricingPage() {
  return (
    <div className="bg-white dark:bg-theme-black transition-colors duration-300 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="pt-32 pb-16 px-6 md:px-8 max-w-7xl mx-auto w-full text-center">
        <Reveal>
          <h1 className="text-4xl md:text-6xl font-display font-black text-gray-900 dark:text-theme-text mb-4">
            Transparent <span className="text-theme-red">Pricing</span>
          </h1>
          <p className="text-gray-600 dark:text-theme-muted text-lg max-w-2xl mx-auto">
            No hidden fees. Just pure shine. Choose the package that suits your vehicle's needs.
          </p>
        </Reveal>
      </div>

      {/* 2. PRICING CARDS */}
      <div className="pb-24 px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          
          {pricingPlans.map((plan, index) => (
            <Reveal key={index} delay={plan.delay} className={`flex flex-col relative ${plan.isPopular ? 'z-10' : 'z-0'}`}>
              
              <div 
                className={`
                  rounded-3xl p-10 flex flex-col transition-all duration-300
                  ${plan.isPopular 
                    ? 'bg-gray-50 dark:bg-gradient-to-b dark:from-theme-surface dark:to-theme-black border-2 border-theme-red shadow-[0_0_40px_rgba(220,38,38,0.15)] transform md:-translate-y-4' 
                    : 'bg-white dark:bg-theme-surface border border-gray-200 dark:border-theme-accent hover:border-theme-red/50 dark:hover:border-theme-red/50'
                  }
                `}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-theme-red text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                    Most Popular
                  </div>
                )}

                {/* Header */}
                <h3 className={`font-bold uppercase tracking-widest text-xs mb-6 ${plan.isPopular ? 'text-theme-red' : 'text-gray-500 dark:text-theme-muted'}`}>
                  {plan.name}
                </h3>
                
                {/* Price */}
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-display font-bold text-gray-900 dark:text-theme-text">{plan.price}</span>
                  <span className="text-gray-500 dark:text-theme-muted ml-2 text-lg">{plan.unit}</span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8 text-gray-600 dark:text-theme-muted flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <i className="fas fa-check text-theme-red mr-3"></i> {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <div className="w-full">
                    {/* We wrap the BookingModal to style the trigger button exactly like the design.
                       If plan is popular => Red Background. If not => Bordered.
                    */}
                    <div className={`
                        w-full rounded-xl font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer text-center py-4
                        ${plan.isPopular
                            ? 'bg-theme-red text-white hover:bg-theme-darkRed shadow-lg'
                            : 'border border-gray-200 dark:border-theme-accent text-gray-900 dark:text-theme-text hover:bg-gray-100 dark:hover:bg-theme-accent'
                        }
                    `}>
                        <BookingModal />
                    </div>
                </div>

              </div>
            </Reveal>
          ))}

        </div>
      </div>
      
    </div>
  );
}