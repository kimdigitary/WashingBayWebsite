"use client";

import React, {useState} from "react";
import {ContactT} from "@/types";
import Form from "@/app/contact/form";

interface Props{
    contact: ContactT
}
export default function Contact({contact}: Props) {
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
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${mobileTab === 'info' ? 'bg-white dark:bg-theme-surface text-theme-red shadow-md' : 'text-gray-500 dark:text-theme-muted'}`}>
                        Info
                    </button>
                    <button
                        onClick={() => setMobileTab("form")}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${mobileTab === 'form' ? 'bg-white dark:bg-theme-surface text-theme-red shadow-md' : 'text-gray-500 dark:text-theme-muted'}`}>
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
                                <p className="text-gray-500 dark:text-theme-muted text-sm">{contact.contact_details.booking_phone}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-theme-black border border-gray-200 dark:border-theme-accent flex items-center justify-center text-theme-red text-xl shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-theme-text text-lg">Email Us</h4>
                                <p className="text-gray-500 dark:text-theme-muted text-sm">{contact.contact_details.support_email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-theme-black border border-gray-200 dark:border-theme-accent flex items-center justify-center text-theme-red text-xl shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-theme-text text-lg">Visit Us</h4>
                                <p className="text-gray-500 dark:text-theme-muted text-sm">{contact.contact_details.office_address}</p>
                            </div>
                        </div>
                    </div>
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

                       <Form/>
                    </div>
                </div>
            </div>

        </div>
    );
}
