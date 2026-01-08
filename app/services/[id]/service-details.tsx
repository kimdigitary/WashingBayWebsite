"use client";

import React from "react";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";
import {Service} from "@/app/services/types";
import Reveal from "@/app/about/reveal";

interface Props {
    services: Service[]
    slug: string
}

export default function ServiceDetails({services, slug}: Props) {
    const service = services.find(s => s.slug === slug);
    const currentIndex = services.findIndex(s => s.slug === slug);
    const prevService = services[currentIndex - 1] || null;
    const nextService = services[currentIndex + 1] || null;

    return (
        <div className="bg-white dark:bg-theme-black transition-colors duration-300">

            {/* 1. HERO SECTION */}
            <div
                className="relative h-[60vh] w-full bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9)), url('${service?.hero_image}')`
                }}
            >
                <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-4xl">
                    <Reveal>
                <span className="bg-theme-red text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider mb-4 inline-block">
                    {service?.badge}
                </span>
                        <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-4">
                            {service?.title}
                            {/*<span className="text-theme-red">COATING</span>*/}
                        </h1>
                        <p
                            className="text-gray-200 text-lg md:text-xl max-w-2xl border-l-4 border-theme-red pl-6"
                            dangerouslySetInnerHTML={{ __html: service?.short_description || '' }}
                        />
                    </Reveal>
                </div>
            </div>

            {/* 2. FLOATING STATS GRID (Glassmorphism) */}
            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {service?.stats.map((stat, i) => (
                        <Reveal key={i}
                                delay={i * 100}
                                className="bg-white/80 dark:bg-theme-black/50 backdrop-blur-md border border-gray-200 dark:border-theme-accent p-6 rounded-2xl text-center shadow-xl">
                            <div className="text-3xl font-display font-bold text-theme-red mb-1">{stat.value}</div>
                            <div className="text-xs uppercase tracking-widest text-gray-600 dark:text-theme-muted">{stat.label}</div>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* 3. DETAILS & BENEFITS */}
            <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <Reveal>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-theme-text mb-6">
                        Why Choose  {service?.title}?
                    </h2>
                    <p
                        className="text-gray-600 dark:text-theme-muted text-lg leading-relaxed mb-6"
                        dangerouslySetInnerHTML={{ __html: service?.description || '' }}
                    />

                    <ul className="space-y-4 text-gray-900 dark:text-theme-text mb-8">
                        {service?.benefits.map((item, i) => (
                            <li key={i}
                                className="flex items-center">
                                <i className="fas fa-check text-theme-red mr-3"></i> {item}
                            </li>
                        ))}
                    </ul>
                    <div className="inline-block">
                        <div className="bg-theme-red text-white px-8 py-3 rounded-xl font-bold hover:bg-theme-darkRed transition-colors shadow-lg cursor-pointer">
                            <BookingModal/>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={200}
                        className="relative h-full min-h-[400px]">
                    <div className="absolute inset-0 bg-theme-red/20 rounded-3xl transform rotate-3 blur-sm"></div>
                    <img
                        src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=1000&auto=format&fit=crop"
                        alt="Ceramic Coating Result"
                        className="relative rounded-3xl shadow-2xl border border-gray-200 dark:border-theme-accent w-full h-full object-cover"
                    />
                </Reveal>
            </div>

            {/* 4. PROCESS STEPS */}
            <div className="bg-gray-100 dark:bg-theme-surface border-y border-gray-200 dark:border-theme-accent py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <Reveal className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-theme-text mb-4">
                            The Application Process
                        </h2>
                        <p className="text-gray-600 dark:text-theme-muted">Perfection takes time. Here is our rigorous {service?.process_steps.length}-stage protocol.</p>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {service?.process_steps.map((step, i) => (
                            <Reveal key={i}
                                    delay={i * 100}
                                    className="text-center group">
                                <div className="w-16 h-16 bg-white dark:bg-theme-accent rounded-full flex items-center justify-center mx-auto mb-6 text-theme-red text-2xl border border-gray-200 dark:border-theme-accent group-hover:bg-theme-red group-hover:text-white transition-colors duration-300 shadow-lg">
                                    <i className={`fas ${step.icon}`}></i>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-theme-text mb-2">{step.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-theme-muted">{step.description}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. PRICING TABLE */}
            <section className="max-w-5xl mx-auto px-6 py-24">
                <Reveal className="text-center mb-10">
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-theme-text">Service Packages</h2>
                </Reveal>

                <Reveal className="bg-white dark:bg-theme-surface border border-gray-200 dark:border-theme-accent rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600 dark:text-theme-muted">
                            <thead className="bg-gray-100 dark:bg-theme-accent/50 text-gray-900 dark:text-theme-text font-bold uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Package</th>
                                <th className="px-6 py-4">Durability</th>
                                <th className="px-6 py-4">Includes</th>
                                <th className="px-6 py-4">Est. Price</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-theme-accent">
                            {
                                service?.pricing_plans.map(p => <tr key={p.name}
                                                                   className="hover:bg-gray-50 dark:hover:bg-theme-accent/30 transition-colors">
                                    <td className="px-6 py-5 font-bold text-gray-900 dark:text-theme-text text-base">{p.name}</td>
                                    <td className="px-6 py-5">{p.durability}</td>
                                    <td className="px-6 py-5">{p.features}</td>
                                    <td className="px-6 py-5 text-theme-red font-bold">{p.price}</td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="inline-block bg-white dark:bg-theme-black border border-gray-300 dark:border-theme-accent text-gray-900 dark:text-theme-text px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wide hover:bg-theme-red hover:text-white dark:hover:bg-theme-red dark:hover:text-white transition-all cursor-pointer">
                                            <BookingModal/>
                                        </div>
                                    </td>
                                </tr>)
                            }
                            </tbody>
                        </table>
                    </div>
                </Reveal>
            </section>

            {/* 6. BOTTOM NAV (DYNAMIC) */}
            <section className="max-w-7xl mx-auto px-6 pb-20 pt-10 border-t border-gray-200 dark:border-theme-accent/30">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* PREVIOUS BUTTON */}
                    {prevService ? (
                        <Link href={`/services/${service?.slug}`}
                              className="group flex items-center gap-4 w-full md:w-auto p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-theme-accent/30 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-theme-accent flex items-center justify-center text-gray-500 dark:text-theme-muted group-hover:text-white group-hover:bg-theme-red transition-all">
                                <i className="fas fa-arrow-left"></i>
                            </div>
                            <div className="text-left">
                                <span className="block text-xs text-gray-500 dark:text-theme-muted uppercase tracking-widest mb-1">Previous</span>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-theme-text group-hover:text-theme-red transition-colors">{service?.title}</h4>
                            </div>
                        </Link>
                    ) : <div className="w-full md:w-auto"></div>}

                    <Link href="/services"
                          className="hidden md:flex w-10 h-10 items-center justify-center text-gray-400 dark:text-theme-muted hover:text-theme-red transition-colors">
                        <i className="fas fa-th-large text-xl"></i>
                    </Link>

                    {/* NEXT BUTTON */}
                    {nextService ? (
                        <Link href={`/services/${nextService.slug}`}
                              className="group flex items-center gap-4 w-full md:w-auto flex-row-reverse p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-theme-accent/30 transition-colors text-right">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-theme-accent flex items-center justify-center text-gray-500 dark:text-theme-muted group-hover:text-white group-hover:bg-theme-red transition-all">
                                <i className="fas fa-arrow-right"></i>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs text-gray-500 dark:text-theme-muted uppercase tracking-widest mb-1">Next</span>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-theme-text group-hover:text-theme-red transition-colors">{nextService.title}</h4>
                            </div>
                        </Link>
                    ) : <div className="w-full md:w-auto"></div>}

                </div>
            </section>

        </div>
    );
}
