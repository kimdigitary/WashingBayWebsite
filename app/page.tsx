import Slider from "@/components/home/slider";
import Link from "next/link";
import Services from "@/app/_homepage/services";
import {Suspense} from "react";
import MyLoader from "@/components/global/my-loader";

export default function Home() {


    return (
        <>
            {/* HERO SLIDER */}
            <Slider/>

            {/* SERVICES SECTION */}
            <Suspense fallback={<MyLoader/>}>
                <Services/>
            </Suspense>

            <div className="bg-theme-surface py-24 border-t border-theme-accent">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 reveal">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                     className="w-6 h-6"
                                     alt="Google"/>
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
                            <div className="text-sm text-theme-muted">Based on 150+ <br/> reviews</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Review 1 */}
                        <div className="bg-theme-black border border-theme-accent p-8 rounded-2xl relative hover:border-theme-red transition-colors reveal">
                            <div className="absolute top-8 right-8 text-theme-accent opacity-20 text-4xl"><i className="fas fa-quote-right"></i></div>
                            <div className="flex text-yellow-400 mb-4 text-sm">
                                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                            </div>
                            <p className="text-theme-muted mb-6 leading-relaxed">"Absolutely incredible. The ceramic coating makes my Model S look better than
                                the day I bought it. The attention to detail is unmatched."</p>
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
            <div className="relative py-24 bg-fixed bg-cover bg-center"
                 style={{backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop')"}}>
                <div className="absolute inset-0 bg-black/80"></div>
                <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="reveal">
                        <span className="text-theme-red font-bold tracking-widest uppercase text-xs mb-2 block">Why Choose DBS Premier?</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">We Treat Your Car <br/> Like Our Own.</h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">We use the finest biodegradable chemicals and state-of-the-art equipment.</p>
                        <div className="space-y-4">
                            <div className="flex items-center text-gray-200">
                                <div className="w-10 h-10 rounded-full bg-theme-red/20 flex items-center justify-center text-theme-red mr-4">
                                    <i className="fas fa-certificate"></i></div>
                                <div>
                                    <h4 className="font-bold">Certified Professionals</h4>
                                    <p className="text-xs text-gray-400">Trained in advanced paint correction.</p>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-200">
                                <div className="w-10 h-10 rounded-full bg-theme-red/20 flex items-center justify-center text-theme-red mr-4">
                                    <i className="fas fa-leaf"></i></div>
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
                            <p className="text-gray-300 mb-8">Book your slot today and experience the DBS difference. Limited slots available daily for quality
                                control.</p>
                            {/*<button className="block w-full py-4 bg-theme-red text-white text-center rounded-xl font-bold uppercase tracking-widest hover:bg-theme-darkRed transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)]">*/}
                            {/*    Book Appointment Now*/}
                            {/*</button>*/}
                            <Link href="/booking"
                                  className="block">
                                <button className="block w-full hover:cursor-pointer py-4 bg-theme-red text-white text-center rounded-xl font-bold uppercase tracking-widest hover:bg-theme-darkRed transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                                    Book Appointment Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
