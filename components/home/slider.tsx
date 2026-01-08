'use client'
import {useEffect, useState} from "react";

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop",
            badge: "Red Edition",
            title: "DETAIL \n PERFECTION",
            desc: "Experience the deepest black and the brightest shine. Precision car care for the obsessed."
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1552930294-6b595f4c2974?q=80&w=2071&auto=format&fit=crop",
            badge: "Protection",
            title: "CERAMIC \n SHIELD",
            desc: "9H Hardness protection that lasts for years, not weeks."
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070&auto=format&fit=crop",
            badge: "Restoration",
            title: "INTERIOR \n REVIVAL",
            desc: "Steam cleaning and leather conditioning for a factory-fresh feel."
        }
    ];

    // Auto-slide logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    // Reveal Animation Logic
    useEffect(() => {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, []);
    return (
        <div id="hero-slider" className="w-full h-[calc(100vh-5rem)] md:h-screen relative overflow-hidden group">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}
                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url('${slide.image}')` }}
                >
                    <div className="absolute bottom-10 right-6 md:right-16 z-20 hidden md:flex gap-4">
                        <div className="glass-panel p-6 rounded-2xl w-48 text-center reveal delay-100 transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="text-theme-red text-3xl mb-2"><i className="fas fa-car"></i></div>
                            <h3 className="text-3xl font-display font-bold text-white">15k+</h3>
                            <p className="text-xs uppercase tracking-widest text-gray-300">Cars Detailed</p>
                        </div>
                        <div className="glass-panel p-6 rounded-2xl w-48 text-center reveal delay-200 transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="text-theme-red text-3xl mb-2"><i className="fas fa-star"></i></div>
                            <h3 className="text-3xl font-display font-bold text-white">4.9/5</h3>
                            <p className="text-xs uppercase tracking-widest text-gray-300">Google Rating</p>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-theme-black via-transparent to-transparent"></div>
                    <div className={`absolute bottom-32 left-6 md:left-16 max-w-3xl pr-6 transition-all duration-1000 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <span className="bg-theme-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">{slide.badge}</span>
                        <h1 className="text-5xl md:text-8xl font-display font-black text-white leading-none mb-6 whitespace-pre-line">{slide.title}</h1>
                        <p className="text-gray-300 text-lg md:text-2xl font-light border-l-4 border-theme-red pl-6 max-w-xl leading-relaxed">{slide.desc}</p>
                    </div>
                </div>
            ))}

            {/* Slider Controls */}
            <button
                onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-white hover:bg-theme-red hover:border-theme-red transition-all flex items-center justify-center hover:scale-110"
                aria-label="Previous slide"
            >
                <i className="fas fa-arrow-left"></i>
            </button>

            <button
                onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-white hover:bg-theme-red hover:border-theme-red transition-all flex items-center justify-center hover:scale-110"
                aria-label="Next slide"
            >
                <i className="fas fa-arrow-right"></i>
            </button>
        </div>
    )
}
