"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  // State to toggle between Info and Form on Mobile
  const [mobileTab, setMobileTab] = useState<"info" | "form">("form");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  return (
    // MAIN CONTAINER: Fixed height (100vh - 80px header), no global scroll
    <div className="bg-white dark:bg-theme-black transition-colors duration-300 h-[calc(100vh-5rem)] mt-20 overflow-hidden flex flex-col lg:flex-row relative">
      
      {/* MOBILE TOGGLE (Visible only on lg:hidden) */}
      <div className="lg:hidden absolute top-4 left-0 right-0 z-50 px-6 flex justify-center">
        <div className="bg-gray-100 dark:bg-theme-accent p-1 rounded-full flex shadow-lg border border-gray-200 dark:border-white/10">
            <button 
                onClick={() => setMobileTab("info")}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${mobileTab === 'info' ? 'bg-white dark:bg-theme-surface text-theme-red shadow-md' : 'text-gray-500 dark:text-theme-muted'}`}
            >
                Info
            </button>
            <button 
                onClick={() => setMobileTab("form")}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${mobileTab === 'form' ? 'bg-white dark:bg-theme-surface text-theme-red shadow-md' : 'text-gray-500 dark:text-theme-muted'}`}
            >
                Message
            </button>
        </div>
      </div>

      {/* --- LEFT PANEL: CONTACT INFO --- */}
      {/* On Mobile: Hidden unless tab is 'info'. On Desktop: Always visible (w-1/2) */}
      <div className={`
        w-full lg:w-1/2 h-full p-8 lg:p-20 flex flex-col justify-center 
        bg-gray-50 dark:bg-theme-surface border-r border-gray-200 dark:border-theme-accent 
        relative transition-colors duration-300
        ${mobileTab === 'info' ? 'block animate-fade-in' : 'hidden lg:flex'}
      `}>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-theme-red/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 mt-12 lg:mt-0">
            <span className="text-theme-red font-bold tracking-widest uppercase text-xs mb-2 block">
                Contact Us
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black text-gray-900 dark:text-theme-text mb-6">
                GET IN <span className="text-theme-red">TOUCH</span>
            </h1>
            <p className="text-gray-600 dark:text-theme-muted text-lg mb-10 max-w-md leading-relaxed">
                Visit our flagship station or send us a message. We are ready to transform your vehicle.
            </p>

            {/* Info Cards */}
            <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-theme-black border border-gray-200 dark:border-theme-accent flex items-center justify-center text-theme-red text-xl shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                        <i className="fas fa-phone-alt"></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-theme-text text-lg">Call Us</h4>
                        <p className="text-gray-500 dark:text-theme-muted text-sm">(256) 700-123456</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-theme-black border border-gray-200 dark:border-theme-accent flex items-center justify-center text-theme-red text-xl shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                        <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-theme-text text-lg">Email Us</h4>
                        <p className="text-gray-500 dark:text-theme-muted text-sm">info@dbspremier.ug</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-theme-black border border-gray-200 dark:border-theme-accent flex items-center justify-center text-theme-red text-xl shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                        <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-theme-text text-lg">Visit Us</h4>
                        <p className="text-gray-500 dark:text-theme-muted text-sm">Acacia Avenue, Kololo</p>
                    </div>
                </div>
            </div>

            {/* Socials
            <div className="flex gap-4 mt-10">
                <a href="#" className="w-10 h-10 rounded-full border border-gray-300 dark:border-theme-accent flex items-center justify-center text-gray-500 dark:text-theme-muted hover:bg-theme-red hover:text-white hover:border-theme-red transition-all"><i className="fab fa-instagram"></i></a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-300 dark:border-theme-accent flex items-center justify-center text-gray-500 dark:text-theme-muted hover:bg-theme-red hover:text-white hover:border-theme-red transition-all"><i className="fab fa-twitter"></i></a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-300 dark:border-theme-accent flex items-center justify-center text-gray-500 dark:text-theme-muted hover:bg-theme-red hover:text-white hover:border-theme-red transition-all"><i className="fab fa-whatsapp"></i></a>
            </div> */}
          </div>
      </div>

      {/* --- RIGHT PANEL: FORM --- */}
      {/* On Mobile: Hidden unless tab is 'form'. On Desktop: Always visible (w-1/2) */}
      <div className={`
        w-full lg:w-1/2 h-full flex flex-col justify-center items-center relative transition-colors duration-300
        bg-white dark:bg-theme-black
        ${mobileTab === 'form' ? 'block animate-fade-in' : 'hidden lg:flex'}
      `}>
          
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>

          <div className="w-full max-w-md px-8 relative z-10 mt-12 lg:mt-0">
              <div className="bg-white/90 dark:bg-theme-surface/80 backdrop-blur-xl p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl">
                  
                  <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-theme-text mb-6">Send a Message</h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <input type="text" required className="w-full bg-gray-50 dark:bg-black/40 border border-gray-300 dark:border-theme-accent text-gray-900 dark:text-theme-text rounded-xl p-3 text-sm focus:border-theme-red focus:ring-1 focus:ring-theme-red outline-none transition-all" placeholder="First Name" />
                          </div>
                          <div>
                              <input type="text" required className="w-full bg-gray-50 dark:bg-black/40 border border-gray-300 dark:border-theme-accent text-gray-900 dark:text-theme-text rounded-xl p-3 text-sm focus:border-theme-red focus:ring-1 focus:ring-theme-red outline-none transition-all" placeholder="Last Name" />
                          </div>
                      </div>
                      
                      <div>
                          <input type="email" required className="w-full bg-gray-50 dark:bg-black/40 border border-gray-300 dark:border-theme-accent text-gray-900 dark:text-theme-text rounded-xl p-3 text-sm focus:border-theme-red focus:ring-1 focus:ring-theme-red outline-none transition-all" placeholder="Email Address" />
                      </div>
                      
                      <div>
                          <textarea rows={4} required className="w-full bg-gray-50 dark:bg-black/40 border border-gray-300 dark:border-theme-accent text-gray-900 dark:text-theme-text rounded-xl p-3 text-sm focus:border-theme-red focus:ring-1 focus:ring-theme-red outline-none transition-all resize-none" placeholder="Your Message..."></textarea>
                      </div>

                      <button 
                          type="submit" 
                          disabled={formStatus === 'submitting' || formStatus === 'success'}
                          className={`
                              w-full py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 text-sm uppercase tracking-wider
                              ${formStatus === 'success' ? 'bg-green-600 text-white' : 'bg-theme-red text-white hover:bg-theme-darkRed'}
                          `}
                      >
                          {formStatus === 'idle' && <>Send Message <i className="fas fa-paper-plane"></i></>}
                          {formStatus === 'submitting' && <><i className="fas fa-spinner fa-spin"></i> Sending...</>}
                          {formStatus === 'success' && <><i className="fas fa-check"></i> Sent!</>}
                      </button>
                  </form>
              </div>
          </div>
      </div>

    </div>
  );
}