import React from "react";
import Link from "next/link";
import Reveal from "@/app/about/reveal";
import {fetchData} from "@/queries/server";
import {FaqT} from "@/app/faq/types";
import AccordionItem from "@/app/faq/accordion-item";

export default async function Faqs() {
    const faqs = await fetchData<FaqT[]>('faqs',undefined)
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
                {faqs.map((section, index) => (
                    <Reveal key={index} delay={index * 100}>
                        <h3 className="text-xl font-bold font-display text-theme-red mb-6 border-b border-gray-200 dark:border-theme-accent pb-2">
                            {section.category}
                        </h3>
                        <div className="space-y-4">
                            {section.questions.map((item, idx) => (
                                <AccordionItem key={idx} question={item.question} answer={item.answer} />
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
