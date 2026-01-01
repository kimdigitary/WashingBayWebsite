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
    name: "Silver",
    price: "20,000",
    suvSurcharge: "5,000", // +5k for SUV
    features: ["Exterior Body Wash", "Tire Dressing", "Window Cleaning", "Basic Mat Wash"],
    isPopular: false,
    delay: 0
  },
  {
    name: "Gold",
    price: "40,000",
    suvSurcharge: "5,000", // +5k for SUV
    features: ["Everything in Silver", "Interior Vacuum", "Dashboard Polish", "Door Jamb Cleaning"],
    isPopular: true, // Triggers special styling
    delay: 100
  },
  {
    name: "Platinum",
    price: "150,000",
    suvSurcharge: "20,000", // +20k for SUV
    features: ["Deep Interior Shampoo", "Engine Steam Wash", "Light Buffing", "Leather Conditioning"],
    isPopular: false,
    delay: 200
  },
  {
    name: "Premium",
    price: "250,000",
    suvSurcharge: null, // No surcharge mentioned
    features: ["Full Detailing", "Clay Bar Treatment", "Ceramic Spray Wax", "Headlight Restoration", "Odor Removal"],
    isPopular: false,
    delay: 300
  }
];

export default function PricingPage() {
  return (
    <div className="bg-white dark:bg-theme-black transition-colors duration-300 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="pt-32 pb-12 px-6 md:px-8 max-w-7xl mx-auto w-full text-center">
        <Reveal>
          <h1 className="text-4xl md:text-6xl font-display font-black text-gray-900 dark:text-theme-text mb-4">
            Transparent <span className="text-theme-red">Pricing</span>
          </h1>
          <p className="text-gray-600 dark:text-theme-muted text-lg max-w-2xl mx-auto">
            Professional care for your vehicle. Choose the package that suits your needs.
          </p>
        </Reveal>
      </div>

      {/* 2. PRICING CARDS */}
      <div className="pb-16 px-6 md:px-8">
        {/* Changed grid to support 4 columns on large screens (xl:grid-cols-4) and 2 on medium (md:grid-cols-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto items-start">
          
          {pricingPlans.map((plan, index) => (
            <Reveal key={index} delay={plan.delay} className={`flex flex-col relative h-full ${plan.isPopular ? 'z-10' : 'z-0'}`}>
              
              <div 
                className={`
                  rounded-3xl p-8 flex flex-col h-full transition-all duration-300
                  ${plan.isPopular 
                    ? 'bg-gray-50 dark:bg-gradient-to-b dark:from-theme-surface dark:to-theme-black border-2 border-theme-red shadow-[0_0_40px_rgba(220,38,38,0.15)] transform md:-translate-y-4' 
                    : 'bg-white dark:bg-theme-surface border border-gray-200 dark:border-theme-accent hover:border-theme-red/50 dark:hover:border-theme-red/50'
                  }
                `}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-theme-red text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg whitespace-nowrap">
                    Best Value
                  </div>
                )}

                {/* Header */}
                <h3 className={`font-bold uppercase tracking-widest text-xs mb-4 ${plan.isPopular ? 'text-theme-red' : 'text-gray-500 dark:text-theme-muted'}`}>
                  {plan.name}
                </h3>
                
                {/* Price */}
                <div className="mb-2">
                  <div className="flex items-baseline">
                    <span className="text-sm text-gray-500 dark:text-theme-muted mr-1">UGX</span>
                    <span className="text-4xl font-display font-bold text-gray-900 dark:text-theme-text">{plan.price}</span>
                  </div>
                  {/* SUV Price Subtitle */}
                  {plan.suvSurcharge ? (
                     <div className="text-sm font-medium text-theme-red mt-1">
                       + UGX {plan.suvSurcharge} for SUV
                     </div>
                  ) : (
                    <div className="text-sm font-medium text-gray-400 dark:text-theme-muted mt-1 opacity-0 select-none">
                      Fixed Price
                    </div>
                  )}
                </div>

                <div className="w-full h-px bg-gray-100 dark:bg-white/10 my-6"></div>

                {/* Features */}
                <ul className="space-y-4 mb-8 text-sm text-gray-600 dark:text-theme-muted flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <i className="fas fa-check text-theme-red mr-3 mt-1"></i> 
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <div className="w-full mt-auto">
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

        {/* 3. DISCLAIMER SECTION */}
        <Reveal delay={400}>
          <div className="max-w-7xl mx-auto mt-12 p-6 rounded-2xl bg-gray-50 dark:bg-theme-surface border border-gray-200 dark:border-theme-accent flex items-start gap-4">
            <i className="fas fa-info-circle text-theme-red text-xl mt-1"></i>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-theme-text mb-1">Vehicle Sizing Policy</h4>
              <p className="text-sm text-gray-600 dark:text-theme-muted">
                Please note: Any vehicle with a height exceeding <span className="font-bold text-gray-900 dark:text-white">160cm</span> is classified as an <span className="font-bold text-gray-900 dark:text-white">SUV</span> and will be charged the SUV rate indicated above.
              </p>
            </div>
          </div>
        </Reveal>

      </div>
      
    </div>
  );
}
