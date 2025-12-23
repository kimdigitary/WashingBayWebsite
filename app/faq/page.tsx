"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";

// --- REUSABLE ANIMATION COMPONENT ---
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

// --- FAQ DATA STRUCTURE ---
const faqData = [
  {
    category: "General",
    questions: [
      {
        q: "Do I need an appointment?",
        a: "We highly recommend booking an appointment for Full Detailing and Ceramic Coating packages to ensure we dedicate ample time to your vehicle. For our Express Wash service, walk-ins are welcome, though booking ahead minimizes your wait time."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept Cash, Visa, MasterCard, and Mobile Money (MTN/Airtel). Corporate clients can also arrange for monthly invoicing."
      },
      {
        q: "Are you open on public holidays?",
        a: "Yes, we operate 365 days a year. However, opening hours may vary slightly on major holidays like Christmas. Please check our Google Maps listing for live updates."
      }
    ]
  },
  {
    category: "Services & Technical",
    questions: [
      {
        q: "What is the difference between Wax and Ceramic Coating?",
        a: "Wax sits on top of the paint and provides gloss for 4-6 weeks. Ceramic Coating bonds chemically with the paint, creating a hard, sacrificial layer that lasts 2-5 years, offering superior scratch resistance and hydrophobic properties."
      },
      {
        q: "Is steam cleaning safe for my engine?",
        a: "Absolutely. We use low-pressure, high-temperature steam which is much safer than high-pressure water. It effectively melts grease and grime without forcing water into sensitive electrical components."
      },
      {
        q: "How long does a full detail take?",
        a: "A Deluxe Service typically takes 1.5 - 2 hours. A Signature Detail takes 4-6 hours. Ceramic Coating applications require 24 hours including cure time. We offer a comfortable lounge with Wi-Fi while you wait."
      }
    ]
  },
  {
    category: "Booking & Policy",
    questions: [
      {
        q: "What if it rains after my wash?",
        a: "We offer a 24-hour Rain Check guarantee for our Signature and Ceramic clients. If it rains within 24 hours of your service, bring it back for a free exterior rinse and dry."
      },
      {
        q: "Can you pick up my car?",
        a: "Yes, we offer a concierge pick-up and drop-off service within a 5km radius of our branches for Premium service bookings."
      }
    ]
  }
];

// --- ACCORDION ITEM COMPONENT ---
const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`bg-white dark:bg-theme-surface border border-gray-200 dark:border-theme-accent rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-theme-red dark:border-theme-red shadow-lg' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
      >
        <span className={`font-bold font-display text-lg transition-colors ${isOpen ? 'text-theme-red' : 'text-gray-900 dark:text-theme-text'}`}>
          {question}
        </span>
        <span className={`transform transition-transform duration-300 text-theme-red ${isOpen ? 'rotate-180' : ''}`}>
          <i className="fas fa-chevron-down"></i>
        </span>
      </button>
      
      <div 
        ref={contentRef}
        style={{ maxHeight: isOpen ? contentRef.current?.scrollHeight : 0 }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        <div className="px-6 pb-6 pt-0 text-gray-600 dark:text-theme-muted leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default function FAQPage() {
  return (
    <div className="bg-white dark:bg-theme-black transition-colors duration-300 min-h-screen">
      
      {/* 1. HEADER */}
      <div className="pt-32 pb-16 px-6 md:px-8 max-w-5xl mx-auto w-full text-center">
        <Reveal>
          <h1 className="text-4xl md:text-6xl font-display font-black text-gray-900 dark:text-theme-text mb-4">
            Frequently Asked <span className="text-theme-red">Questions</span>
          </h1>
          <p className="text-gray-600 dark:text-theme-muted text-lg max-w-2xl mx-auto">
            Everything you need to know about our premium detailing services, booking process, and care tips.
          </p>
        </Reveal>
      </div>

      {/* 2. FAQ LIST */}
      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-12">
        {faqData.map((section, index) => (
          <Reveal key={index} delay={index * 100}>
            <h3 className="text-xl font-bold font-display text-theme-red mb-6 border-b border-gray-200 dark:border-theme-accent pb-2">
              {section.category}
            </h3>
            <div className="space-y-4">
              {section.questions.map((item, idx) => (
                <AccordionItem key={idx} question={item.q} answer={item.a} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      {/* 3. CTA BOX */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <Reveal>
          <div className="p-8 md:p-12 rounded-3xl bg-gray-100 dark:bg-gradient-to-br dark:from-theme-surface dark:to-theme-black border border-gray-200 dark:border-theme-accent text-center shadow-2xl">
            <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-theme-text mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-theme-muted mb-8">
              Our expert team is ready to assist you with any specific queries.
            </p>
            <div className="inline-block">
                <Link 
                    href="/contact" 
                    className="bg-theme-red text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-theme-darkRed transition-all shadow-lg transform hover:-translate-y-1 inline-flex items-center gap-2"
                >
                    <i className="fas fa-envelope"></i> Contact Support
                </Link>
            </div>
          </div>
        </Reveal>
      </div>

    </div>
  );
}