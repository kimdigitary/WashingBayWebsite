"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Import router for navigation
import { Check, Moon, Sun, Info } from "lucide-react"; 

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

// --- DATA CONFIGURATION (Added IDs for routing) ---
const washPackages = [
  {
    id: "silver", // Added ID
    name: "Silver Wash",
    priceDay: 20000,
    priceNight: 18000,
    suvSurcharge: 5000,
    features: [
      "Exterior Body Wash",
      "Tyre Cleaning & Shining",
      "Body Wash Shampoo",
      "360° High pressure power jet"
    ],
    isPopular: false,
    delay: 0
  },
  {
    id: "gold", // Added ID
    name: "Gold Wash",
    priceDay: 30000,
    priceNight: 27000,
    suvSurcharge: 5000,
    features: [
      "Everything in Silver",
      "Interior Cleaning & Vacuum",
      "Carpets Cleaning",
      "Car Interior Perfume"
    ],
    isPopular: true,
    delay: 100
  },
  {
    id: "platinum", // Added ID
    name: "Platinum Wash",
    priceDay: 150000,
    priceNight: 135000,
    suvSurcharge: 30000,
    features: [
      "Everything in Gold",
      "Engine Wash",
      "Renew Flash Lights",
      "Window Cleaning",
      "Detailed Exterior Cleaning"
    ],
    isPopular: false,
    delay: 200
  },
  {
    id: "premium", // Added ID
    name: "DBS Premium",
    priceDay: 350000,
    priceNight: 315000,
    suvSurcharge: 100000,
    features: [
      "Full Platinum Service",
      "Hand Wax (T-Cut)",
      "Car Body Polish",
      "Premium Interior Detail",
      "Express Tunnel Access"
    ],
    isPopular: false,
    isPremium: true,
    delay: 300
  }
];

const extraServices = [
  { name: "Renew Flash Lights", price: 50000 },
  { name: "Wheels Deep Cleaning", price: 50000 },
  { name: "Engine Wash", price: 60000 },
  { name: "Car Body Polish", price: 70000 },
  { name: "Hand Wax (T-Cut)", price: 100000 },
];

export default function PricingPage() {
  const router = useRouter();
  const [isNightMode, setIsNightMode] = useState(false);

  // Helper to format UGX currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', { style: 'decimal' }).format(amount);
  };

  // --- NAVIGATION HANDLER ---
  const handleBooking = (packageId: string) => {
    // Navigate to booking page with query parameters
    const mode = isNightMode ? 'night' : 'day';
    router.push(`/booking?package=${packageId}&mode=${mode}`);
  };

  return (
    <div className="bg-white dark:bg-theme-black transition-colors duration-300 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="pt-32 pb-12 px-6 md:px-8 max-w-7xl mx-auto w-full text-center">
        <Reveal>
          <h1 className="text-4xl md:text-6xl font-display font-black text-gray-900 dark:text-theme-text mb-4">
            Our <span className="text-theme-red">Pricing</span>
          </h1>
          <p className="text-gray-600 dark:text-theme-muted text-lg max-w-2xl mx-auto mb-8">
            Drive Clean, Drive Confident. Choose the package that suits your vehicle's needs.
          </p>

          {/* NIGHT MODE TOGGLE */}
          <div className="inline-flex items-center bg-gray-100 dark:bg-theme-surface p-1.5 rounded-full border border-gray-200 dark:border-theme-accent mb-8">
            <button
              onClick={() => setIsNightMode(false)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${
                !isNightMode 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'
              }`}
            >
              <Sun className="w-4 h-4" /> Day Menu
            </button>
            <button
              onClick={() => setIsNightMode(true)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${
                isNightMode 
                  ? 'bg-theme-red text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'
              }`}
            >
              <Moon className="w-4 h-4" /> Night Discount
            </button>
          </div>
          
          {isNightMode && (
            <div className="text-theme-red text-sm font-semibold animate-pulse">
              Night pricing active! Enjoy discounted rates.
            </div>
          )}

        </Reveal>
      </div>

      {/* 2. PRICING CARDS */}
      <div className="pb-16 px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
          
          {washPackages.map((plan, index) => {
            const currentPrice = isNightMode ? plan.priceNight : plan.priceDay;
            
            return (
              <Reveal key={index} delay={plan.delay} className={`flex flex-col relative`}>
                
                <div 
                  className={`
                    h-full rounded-3xl p-8 flex flex-col transition-all duration-300 relative overflow-hidden group
                    ${plan.isPremium 
                       ? 'bg-gray-900 text-white border-2 border-theme-red shadow-[0_0_50px_rgba(220,38,38,0.2)]' 
                       : plan.isPopular
                          ? 'bg-white dark:bg-theme-surface border-2 border-theme-red shadow-xl transform md:-translate-y-2'
                          : 'bg-white dark:bg-theme-surface border border-gray-200 dark:border-theme-accent hover:border-theme-red/50'
                    }
                  `}
                >
                   {/* Badges */}
                   {plan.isPopular && (
                    <div className="absolute top-0 right-0 bg-theme-red text-white px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-widest">
                      Best Value
                    </div>
                  )}
                  {plan.isPremium && (
                    <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-theme-red to-red-900 text-white py-1 text-center text-xs font-bold uppercase tracking-widest">
                      Ultimate Care
                    </div>
                  )}

                  {/* Header */}
                  <h3 className={`font-bold uppercase tracking-widest text-sm mb-2 mt-4 ${plan.isPremium ? 'text-theme-red' : 'text-gray-500 dark:text-theme-muted'}`}>
                    {plan.name}
                  </h3>
                  
                  {/* Price */}
                  <div className="flex flex-col mb-6">
                    <div className="flex items-baseline">
                        <span className="text-sm align-top mr-1">UGX</span>
                        <span className={`text-3xl font-display font-bold ${plan.isPremium ? 'text-white' : 'text-gray-900 dark:text-theme-text'}`}>
                            {formatCurrency(currentPrice)}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <Info className="w-3 h-3" />
                        <span>Extra SUV: +{formatCurrency(plan.suvSurcharge)}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`h-px w-full mb-6 ${plan.isPremium ? 'bg-gray-700' : 'bg-gray-100 dark:bg-theme-accent'}`}></div>

                  {/* Features */}
                  <ul className={`space-y-3 mb-8 text-sm flex-1 ${plan.isPremium ? 'text-gray-300' : 'text-gray-600 dark:text-theme-muted'}`}>
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className={`w-4 h-4 mr-3 shrink-0 mt-0.5 ${plan.isPremium ? 'text-theme-red' : 'text-theme-red'}`} /> 
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Action Button - REPLACED MODAL WITH DIRECT NAVIGATION */}
                  <div className="w-full mt-auto">
                      <button 
                          onClick={() => handleBooking(plan.id)}
                          className={`
                            w-full rounded-xl font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer text-center py-3.5
                            ${(plan.isPopular || plan.isPremium)
                                ? 'bg-theme-red text-white hover:bg-red-700 shadow-lg'
                                : 'border border-gray-200 dark:border-theme-accent text-gray-900 dark:text-theme-text hover:bg-gray-100 dark:hover:bg-theme-accent'
                            }
                          `}
                      >
                          Book Now
                      </button>
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* 3. EXTRA SERVICES SECTION */}
      <div className="pb-24 px-6 md:px-8 max-w-4xl mx-auto">
        <Reveal delay={400}>
            <div className="bg-gray-50 dark:bg-theme-surface rounded-3xl p-8 border border-gray-200 dark:border-theme-accent">
                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-theme-text mb-6 text-center">
                    Extra Premium Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                    {extraServices.map((service, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{service.name}</span>
                            <span className="text-theme-red font-bold">UGX {formatCurrency(service.price)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Reveal>
      </div>
      
    </div>
  );
}