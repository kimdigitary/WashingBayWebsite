"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BookingModal from "@/components/BookingModal"; // Adjust path if needed

// --- REUSABLE ANIMATION COMPONENT ---
// This replaces the old <script> logic for scroll animations
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

// --- MAIN PAGE COMPONENT ---
export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-theme-black transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <div 
        className="relative h-[60vh] w-full bg-cover bg-center bg-fixed flex items-end"
        style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop')" 
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-black/40 to-black/70 dark:from-theme-black dark:via-black/60 dark:to-black/80"></div>
        
        <div className="relative z-10 p-8 md:p-16 max-w-4xl w-full mx-auto xl:mx-0">
          <Reveal>
            <span className="bg-theme-red text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider mb-4 inline-block">
              Since 2018
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-4 drop-shadow-lg">
              MORE THAN <br /> JUST A <span className="text-theme-red">WASH</span>
            </h1>
            <p className="text-gray-100 text-lg md:text-xl max-w-2xl border-l-4 border-theme-red pl-6 drop-shadow-md">
              We are Kampala's premier automotive spa, dedicated to the art of vehicle restoration and protection.
            </p>
          </Reveal>
        </div>
      </div>

      {/* 2. OUR STORY SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-theme-text mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 dark:text-theme-muted text-lg leading-relaxed mb-6">
              DBS Premier Car Wash began with a simple observation: car owners in Kampala lacked a place that treated vehicles with the respect they deserve. What started as a small, passion-driven operation has grown into the region's most advanced detailing studio.
            </p>
            <p className="text-gray-600 dark:text-theme-muted text-lg leading-relaxed mb-8">
              We don't believe in "quick and dirty." Every car that enters our bay undergoes a rigorous inspection and cleaning process using pH-neutral shampoos, grit-guard bucket systems, and the finest ceramic coatings available globally.
            </p>
            
            {/* Stats Row */}
            <div className="flex gap-8">
              <div>
                <h4 className="text-4xl font-bold text-theme-red font-display">5k+</h4>
                <p className="text-sm text-gray-500 dark:text-theme-muted uppercase tracking-wider">Happy Clients</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-theme-red font-display">7+</h4>
                <p className="text-sm text-gray-500 dark:text-theme-muted uppercase tracking-wider">Years Active</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-theme-red font-display">100%</h4>
                <p className="text-sm text-gray-500 dark:text-theme-muted uppercase tracking-wider">Satisfaction</p>
              </div>
            </div>
          </Reveal>

          {/* Image */}
          <Reveal delay={200} className="relative h-full min-h-[400px]">
            <div className="absolute inset-0 bg-theme-red/20 rounded-3xl transform -rotate-3 blur-sm"></div>
            <img 
              src="https://images.unsplash.com/photo-1552930294-6b595f4c2974?q=80&w=1000&auto=format&fit=crop" 
              alt="Detailing Process"
              className="relative rounded-3xl shadow-2xl border border-gray-200 dark:border-theme-accent w-full h-full object-cover"
            />
          </Reveal>
        </div>
      </div>

      {/* 3. CORE VALUES SECTION */}
      <div className="bg-gray-50 dark:bg-theme-surface border-y border-gray-200 dark:border-theme-accent py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-theme-text mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 dark:text-theme-muted max-w-2xl mx-auto">
              The principles that drive every detail we perform.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <Reveal className="group bg-white dark:bg-theme-black p-8 rounded-3xl border border-gray-200 dark:border-theme-accent hover:border-theme-red dark:hover:border-theme-red transition-all shadow-lg dark:shadow-none">
              <div className="w-14 h-14 bg-gray-100 dark:bg-theme-accent rounded-full flex items-center justify-center text-theme-red text-2xl mb-6 group-hover:bg-theme-red group-hover:text-white transition-colors">
                <i className="fas fa-medal"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-theme-text mb-3">Excellence</h3>
              <p className="text-gray-600 dark:text-theme-muted text-sm leading-relaxed">
                We settle for nothing less than perfection. If there is a swirl mark left, the job isn't done.
              </p>
            </Reveal>

            {/* Value 2 */}
            <Reveal delay={100} className="group bg-white dark:bg-theme-black p-8 rounded-3xl border border-gray-200 dark:border-theme-accent hover:border-theme-red dark:hover:border-theme-red transition-all shadow-lg dark:shadow-none">
              <div className="w-14 h-14 bg-gray-100 dark:bg-theme-accent rounded-full flex items-center justify-center text-theme-red text-2xl mb-6 group-hover:bg-theme-red group-hover:text-white transition-colors">
                <i className="fas fa-hand-holding-water"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-theme-text mb-3">Integrity</h3>
              <p className="text-gray-600 dark:text-theme-muted text-sm leading-relaxed">
                We only recommend services your car actually needs. Transparent pricing, no hidden fees.
              </p>
            </Reveal>

            {/* Value 3 */}
            <Reveal delay={200} className="group bg-white dark:bg-theme-black p-8 rounded-3xl border border-gray-200 dark:border-theme-accent hover:border-theme-red dark:hover:border-theme-red transition-all shadow-lg dark:shadow-none">
              <div className="w-14 h-14 bg-gray-100 dark:bg-theme-accent rounded-full flex items-center justify-center text-theme-red text-2xl mb-6 group-hover:bg-theme-red group-hover:text-white transition-colors">
                <i className="fas fa-leaf"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-theme-text mb-3">Eco-Conscious</h3>
              <p className="text-gray-600 dark:text-theme-muted text-sm leading-relaxed">
                We use biodegradable chemicals and water reclamation systems to protect our environment.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* 4. MEET THE EXPERTS */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-24">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-theme-text mb-4">
            Meet The Experts
          </h2>
          <p className="text-gray-600 dark:text-theme-muted">The hands behind the shine.</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { name: "David O.", role: "Founder & Lead Detailer", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" },
            { name: "Sarah K.", role: "Ceramic Specialist", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" },
            { name: "James M.", role: "Paint Correction Expert", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" },
            { name: "Brian T.", role: "Interior Specialist", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=800&auto=format&fit=crop" }
          ].map((member, index) => (
            <Reveal key={index} delay={index * 100} className="group relative overflow-hidden rounded-2xl h-80">
              <img 
                src={member.img} 
                alt={member.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h4 className="text-white font-bold text-lg">{member.name}</h4>
                <p className="text-theme-red text-xs uppercase font-bold tracking-wider">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* 5. CTA SECTION */}
      <div className="bg-theme-red py-20 text-center">
        <Reveal className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6">
            Experience the DBS Difference
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Your car deserves the best. Join thousands of satisfied clients in Kampala today.
          </p>
          <div className="inline-block">
             {/* Using the Custom Button style inside the modal trigger */}
             <div className="bg-white text-theme-red rounded-full font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl transform hover:-translate-y-1">
                <BookingModal /> 
                {/* Note: The BookingModal component usually renders its own button. 
                    If you want to style the button exactly like the About page design, 
                    you might need to pass a 'className' prop to BookingModal if it accepts it, 
                    or wrap it differently. Assuming default usage here. */}
             </div>
          </div>
        </Reveal>
      </div>

    </div>
  );
}