"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BookingModal from "@/components/BookingModal"; 

// --- 1. BLOG DATA FOR NAVIGATION ---
// We define the posts here so this page knows what comes Next/Prev
const blogPosts = [
  {
    slug: "theartofpaint",
    title: "The Art of Paint Correction",
  },
  {
    slug: "5-winter-care-tips", // Make sure you create this folder later!
    title: "5 Winter Care Tips",
  },
  // Add more posts here as you write them
];

// --- REVEAL ANIMATION COMPONENT ---
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

export default function TheArtOfPaintPost() {
  // --- NAVIGATION LOGIC ---
  const currentSlug = "theartofpaint";
  const currentIndex = blogPosts.findIndex(post => post.slug === currentSlug);
  const prevPost = blogPosts[currentIndex - 1] || null;
  const nextPost = blogPosts[currentIndex + 1] || null;

  return (
    <div className="bg-white dark:bg-theme-black transition-colors duration-300 min-h-screen">
      
      {/* HERO HEADER IMAGE */}
      <div className="h-[50vh] relative w-full overflow-hidden">
        <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop" 
            alt="Paint Correction"
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-6 text-center">
            <Reveal className="max-w-4xl">
                <span className="bg-theme-red text-white text-xs font-bold px-3 py-1 rounded mb-4 inline-block tracking-wider uppercase">
                    Maintenance
                </span>
                <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6 drop-shadow-lg">
                    The Art of Paint Correction
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300 font-medium">
                    <span className="flex items-center"><i className="far fa-user mr-2"></i> By Alex D.</span>
                    <span className="flex items-center"><i className="far fa-calendar mr-2"></i> Dec 18, 2025</span>
                    <span className="flex items-center"><i className="far fa-clock mr-2"></i> 8 Min Read</span>
                </div>
            </Reveal>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN: ARTICLE CONTENT */}
        <article className="lg:col-span-2 flex flex-col h-full">
            <Reveal delay={100} className="flex-1">
                {/* Introduction */}
                <p className="text-xl leading-relaxed text-gray-900 dark:text-theme-text font-medium mb-8">
                    Is your car losing its shine? Does the paint look dull even after a wash? You might be a victim of swirl marks. In this guide, we dive deep into the world of Paint Correction.
                </p>
                
                {/* Content Body */}
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-theme-muted">
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-theme-text mb-4 mt-8 font-display">
                        What causes swirl marks?
                    </h3>
                    <p className="mb-6 leading-relaxed">
                        Swirl marks are essentially microscopic scratches in the clear coat of your vehicle's paint. They are usually caused by improper washing techniques, automatic car washes with dirty brushes, or using dirty towels to dry the car. In Uganda, dust is a major factor.
                    </p>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-theme-text mb-4 mt-8 font-display">
                        The Correction Process
                    </h3>
                    <p className="mb-4 leading-relaxed">
                        At DBS Premier, we don't just wax over the scratches. We remove them.
                    </p>

                    {/* Steps List */}
                    <ul className="list-none space-y-4 mb-8 pl-0">
                        <li className="flex items-start">
                            <span className="bg-theme-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1 shrink-0">1</span>
                            <span><strong>Cutting:</strong> Using a heavy compound and a microfiber pad to level the clear coat.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="bg-theme-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1 shrink-0">2</span>
                            <span><strong>Polishing:</strong> Refining the finish to remove the haze left by the cutting stage.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="bg-theme-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1 shrink-0">3</span>
                            <span><strong>Finishing:</strong> Jeweling the paint to maximum gloss.</span>
                        </li>
                    </ul>

                    {/* Blockquote */}
                    <blockquote className="border-l-4 border-theme-red pl-6 italic text-gray-800 dark:text-gray-200 text-lg my-10 bg-gray-50 dark:bg-theme-surface p-6 rounded-r-xl border-y border-r border-gray-200 dark:border-theme-accent">
                        "Paint correction is surgery for your car. We aren't covering up the problem; we are fixing it permanently."
                    </blockquote>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-theme-text mb-4 mt-8 font-display">
                        Is it worth it?
                    </h3>
                    <p className="leading-relaxed">
                        Absolutely. Not only does it restore the showroom look, but when paired with a Ceramic Coating, it increases the resale value of your vehicle significantly.
                    </p>
                </div>
            </Reveal>

            {/* --- NEW: PREV/NEXT BUTTONS --- */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-theme-accent">
                <div className="flex justify-between items-center w-full">
                    {/* Previous Button */}
                    <div className="w-1/2 pr-4">
                        {prevPost ? (
                            <Link href={`/blog/${prevPost.slug}`} className="group flex flex-col items-start text-left">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 group-hover:text-theme-red transition-colors">
                                    <i className="fas fa-arrow-left mr-2"></i> Previous
                                </span>
                                <span className="text-sm font-bold text-gray-900 dark:text-theme-text group-hover:underline line-clamp-1">
                                    {prevPost.title}
                                </span>
                            </Link>
                        ) : (
                            <div className="opacity-0 pointer-events-none">Placeholder</div>
                        )}
                    </div>

                    {/* Divider Line */}
                    <div className="h-10 w-px bg-gray-200 dark:bg-theme-accent mx-2"></div>

                    {/* Next Button */}
                    <div className="w-1/2 pl-4 flex flex-col items-end text-right">
                        {nextPost ? (
                            <Link href={`/blog/${nextPost.slug}`} className="group flex flex-col items-end">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 group-hover:text-theme-red transition-colors">
                                    Next <i className="fas fa-arrow-right ml-2"></i>
                                </span>
                                <span className="text-sm font-bold text-gray-900 dark:text-theme-text group-hover:underline line-clamp-1">
                                    {nextPost.title}
                                </span>
                            </Link>
                        ) : (
                            <span className="text-xs text-gray-400 italic">No newer posts</span>
                        )}
                    </div>
                </div>
            </div>

        </article>

        {/* RIGHT COLUMN: SIDEBAR */}
        <aside className="space-y-8">
            <Reveal delay={200}>
                {/* About Box */}
                <div className="bg-gray-50 dark:bg-theme-surface p-8 rounded-2xl border border-gray-200 dark:border-theme-accent shadow-sm">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-theme-text mb-4 font-display">
                        About DBS Premier
                    </h4>
                    <p className="text-gray-600 dark:text-theme-muted text-sm mb-6 leading-relaxed">
                        We are Kampala's leading auto detailing studio, specializing in ceramic coatings and paint restoration.
                    </p>
                    <div className="w-full bg-theme-red text-white py-3 rounded-xl font-bold text-center hover:bg-theme-darkRed transition-colors cursor-pointer shadow-lg">
                        <BookingModal />
                    </div>
                </div>

                {/* Related Posts Sidebar */}
                <div className="bg-white dark:bg-theme-surface p-8 rounded-2xl border border-gray-200 dark:border-theme-accent shadow-sm">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-theme-text mb-6 font-display border-b border-gray-200 dark:border-theme-accent pb-4">
                        Related Posts
                    </h4>
                    <ul className="space-y-6">
                        <li>
                            <Link href="/blog" className="flex gap-4 group">
                                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 relative">
                                    <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Winter Tips" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h5 className="font-bold text-gray-900 dark:text-theme-text text-sm group-hover:text-theme-red transition-colors leading-snug mb-1">
                                        5 Winter Tips
                                    </h5>
                                    <span className="text-xs text-gray-500 dark:text-theme-muted">Dec 10, 2025</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </Reveal>
        </aside>
      </div>
    </div>
  );
}