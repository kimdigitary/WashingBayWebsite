"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
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
    <>
      {/* HERO SLIDER */}
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

      {/* SERVICES SECTION */}
      <div className="bg-theme-black py-24 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-theme-red/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
         <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            <div className="text-center mb-16 reveal">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-theme-text mb-4">Precision Services</h2>
                <p className="text-theme-muted max-w-2xl mx-auto text-lg">Engineered for results. Choose a package tailored to your vehicle's needs.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Service 1 */}
                <div className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer reveal">
                    <img src="https://images.unsplash.com/photo-1552930294-6b595f4c2974?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Ceramic Coating" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <div className="w-12 h-1 bg-theme-red mb-4 transition-all duration-300 group-hover:w-24"></div>
                        <h3 className="text-2xl font-bold font-display text-white mb-2">Ceramic Coating</h3>
                        <p className="text-gray-300 text-sm mb-6 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">Nano-ceramic shield providing extreme hydrophobicity.</p>
                        <Link href="/services" className="inline-flex items-center text-white text-xs font-bold uppercase tracking-widest hover:text-theme-red transition-colors">
                            Explore <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                        </Link>
                    </div>
                </div>
                {/* Service 2 */}
                <div className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer reveal delay-100">
                    <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Paint Correction" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <div className="w-12 h-1 bg-theme-red mb-4 transition-all duration-300 group-hover:w-24"></div>
                        <h3 className="text-2xl font-bold font-display text-white mb-2">Paint Correction</h3>
                        <p className="text-gray-300 text-sm mb-6 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">Multi-stage machine polishing to permanently remove swirls.</p>
                        <Link href="/services" className="inline-flex items-center text-white text-xs font-bold uppercase tracking-widest hover:text-theme-red transition-colors">
                            Explore <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                        </Link>
                    </div>
                </div>
                 {/* Service 3 */}
                <div className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer reveal delay-200">
                    <img src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Interior Detail" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <div className="w-12 h-1 bg-theme-red mb-4 transition-all duration-300 group-hover:w-24"></div>
                        <h3 className="text-2xl font-bold font-display text-white mb-2">Interior Detail</h3>
                        <p className="text-gray-300 text-sm mb-6 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">Deep steam cleaning, leather conditioning.</p>
                        <Link href="/services" className="inline-flex items-center text-white text-xs font-bold uppercase tracking-widest hover:text-theme-red transition-colors">
                            Explore <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                        </Link>
                    </div>
                </div>
            </div>
         </div>
      </div>
      
      <div className="bg-theme-surface py-24 border-t border-theme-accent">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 reveal">
                  <div>
                      <div className="flex items-center gap-2 mb-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-6 h-6" alt="Google" />
                          <span className="text-theme-text font-bold">Google Reviews</span>
                      </div>
                      <h2 className="text-4xl font-display font-bold text-theme-text">Client Stories</h2>
                  </div>
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                      <div className="text-right">
                          <div className="text-2xl font-bold text-theme-text">4.9</div>
                          <div className="flex text-yellow-400 text-xs">
                              <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                          </div>
                      </div>
                      <div className="text-sm text-theme-muted">Based on 150+ <br /> reviews</div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Review 1 */}
                  <div className="bg-theme-black border border-theme-accent p-8 rounded-2xl relative hover:border-theme-red transition-colors reveal">
                      <div className="absolute top-8 right-8 text-theme-accent opacity-20 text-4xl"><i className="fas fa-quote-right"></i></div>
                      <div className="flex text-yellow-400 mb-4 text-sm">
                          <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                      </div>
                      <p className="text-theme-muted mb-6 leading-relaxed">"Absolutely incredible. The ceramic coating makes my Model S look better than the day I bought it. The attention to detail is unmatched."</p>
                      <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold mr-3">AM</div>
                          <div>
                              <h5 className="text-theme-text font-bold text-sm">Alex M.</h5>
                              <span className="text-theme-muted text-xs">Local Guide</span>
                          </div>
                      </div>
                  </div>
                  {/* You can copy the other 2 review blocks from your HTML here using the same structure */}
              </div>
          </div>
      </div>

      {/* CTA SECTION */}
      <div className="relative py-24 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-black/80"></div>
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="reveal">
                <span className="text-theme-red font-bold tracking-widest uppercase text-xs mb-2 block">Why Choose DBS Premier?</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">We Treat Your Car <br /> Like Our Own.</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">We use the finest biodegradable chemicals and state-of-the-art equipment.</p>
                <div className="space-y-4">
                        <div className="flex items-center text-gray-200">
                            <div className="w-10 h-10 rounded-full bg-theme-red/20 flex items-center justify-center text-theme-red mr-4"><i className="fas fa-certificate"></i></div>
                            <div>
                                <h4 className="font-bold">Certified Professionals</h4>
                                <p className="text-xs text-gray-400">Trained in advanced paint correction.</p>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-200">
                            <div className="w-10 h-10 rounded-full bg-theme-red/20 flex items-center justify-center text-theme-red mr-4"><i className="fas fa-leaf"></i></div>
                            <div>
                                <h4 className="font-bold">Eco-Friendly Products</h4>
                                <p className="text-xs text-gray-400">Safe for your car and the environment.</p>
                            </div>
                        </div>
                    </div>
             </div>
             <div className="reveal delay-200">
                <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
                   <h3 className="text-2xl font-bold text-white mb-4">Ready for a transformation?</h3>
                   <p className="text-gray-300 mb-8">Book your slot today and experience the DBS difference. Limited slots available daily for quality control.</p>
                   <button className="block w-full py-4 bg-theme-red text-white text-center rounded-xl font-bold uppercase tracking-widest hover:bg-theme-darkRed transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                       Book Appointment Now
                   </button>
                </div>
             </div>
          </div>
      </div>
    </>
  );
}