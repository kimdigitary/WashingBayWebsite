"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {Check, Info, Moon, Sun} from "lucide-react";
import Reveal from "@/app/about/reveal";
import {ExtraService, ServicePackage} from "@/types";

interface Props {
    washPackages: ServicePackage[];
    extraServices: ExtraService[];
}

export default function Pricing({washPackages, extraServices}: Props) {
    const router = useRouter();
    const [isNightMode, setIsNightMode] = useState(false);

    // Helper to format UGX currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-UG', {style: 'decimal'}).format(amount);
    };

    // --- NAVIGATION HANDLER ---
    const handleBooking = (packageId: number) => {
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
                            <Sun className="w-4 h-4"/> Day Menu
                        </button>
                        <button
                            onClick={() => setIsNightMode(true)}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${
                                isNightMode
                                    ? 'bg-theme-red text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'
                            }`}
                        >
                            <Moon className="w-4 h-4"/> Night Discount
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
                        const currentPrice = isNightMode ? plan.base_price_night : plan.base_price;

                        return (
                            <Reveal key={index}
                                    delay={0}
                                    className={`flex flex-col relative`}>

                                <div
                                    className={`
                    h-full rounded-3xl p-8 flex flex-col transition-all duration-300 relative overflow-hidden group
                    ${plan.is_premium
                                        ? 'bg-gray-900 text-white border-2 border-theme-red shadow-[0_0_50px_rgba(220,38,38,0.2)]'
                                        : plan.is_popular
                                            ? 'bg-white dark:bg-theme-surface border-2 border-theme-red shadow-xl transform md:-translate-y-2'
                                            : 'bg-white dark:bg-theme-surface border border-gray-200 dark:border-theme-accent hover:border-theme-red/50'
                                    }
                  `}
                                >
                                    {/* Badges */}
                                    {plan.is_popular && (
                                        <div className="absolute top-0 right-0 bg-theme-red text-white px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-widest">
                                            Best Value
                                        </div>
                                    )}
                                    {plan.is_premium && (
                                        <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-theme-red to-red-900 text-white py-1 text-center text-xs font-bold uppercase tracking-widest">
                                            Ultimate Care
                                        </div>
                                    )}

                                    {/* Header */}
                                    <h3 className={`font-bold uppercase tracking-widest text-sm mb-2 mt-4 ${plan.is_premium ? 'text-theme-red' : 'text-gray-500 dark:text-theme-muted'}`}>
                                        {plan.name}
                                    </h3>

                                    {/* Price */}
                                    <div className="flex flex-col mb-6">
                                        <div className="flex items-baseline">
                                            <span className="text-sm align-top mr-1">UGX</span>
                                            <span className={`text-3xl font-display font-bold ${plan.is_premium ? 'text-white' : 'text-gray-900 dark:text-theme-text'}`}>
                            {formatCurrency(currentPrice)}
                        </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                            <Info className="w-3 h-3"/>
                                            <span>Extra SUV: +{formatCurrency(plan.suv_surcharge)}</span>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className={`h-px w-full mb-6 ${plan.is_premium ? 'bg-gray-700' : 'bg-gray-100 dark:bg-theme-accent'}`}></div>

                                    {/* Features */}
                                    <ul className={`space-y-3 mb-8 text-sm flex-1 ${plan.is_premium ? 'text-gray-300' : 'text-gray-600 dark:text-theme-muted'}`}>
                                        {plan.features.map((feature, i) => (
                                            <li key={i}
                                                className="flex items-start">
                                                <Check className={`w-4 h-4 mr-3 shrink-0 mt-0.5 ${plan.is_premium ? 'text-theme-red' : 'text-theme-red'}`}/>
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
                            ${(plan.is_popular || plan.is_premium)
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
                                <div key={index}
                                     className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0">
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
