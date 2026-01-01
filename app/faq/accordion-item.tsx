'use client'
import React, { useRef, useState, useEffect } from "react";

export default function AccordionItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState<string | number>(0); // Store height in state
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Access ref only after the component has rendered/updated
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHeight(contentRef.current?.scrollHeight || "auto");
        } else {
            setHeight(0);
        }
    }, [isOpen]); // Recalculate whenever isOpen toggles

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
                style={{ maxHeight: height }} // Use the state value here
                className="transition-all duration-300 ease-in-out overflow-hidden"
            >
                <div className="px-6 pb-6 pt-0 text-gray-600 dark:text-theme-muted leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
};
