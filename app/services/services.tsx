import Link from "next/link";
import Reveal from "@/app/services/reveal";
import {fetchData} from "@/queries/server";
import {Service} from "@/app/services/types";
import {ApiResponse, PageProps} from "@/types";

interface Props {
    props: PageProps
}

export default async function Services({props}: Props) {
    const searchParams = props.searchParams
    const {data} = await fetchData<ApiResponse<Service>>('services', searchParams)
    return (
        <div className="bg-white dark:bg-theme-black transition-colors duration-300">

            {/* 1. HERO HEADER */}
            <div className="pt-24 pb-12 md:pb-20 px-6 max-w-7xl mx-auto text-center">
                <Reveal>
                    <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gray-900 dark:text-theme-text">
                        Our <span className="text-theme-red">Services</span>
                    </h2>
                    <p className="text-gray-600 dark:text-theme-muted mb-12 max-w-2xl text-lg md:text-xl mx-auto leading-relaxed">
                        Professional grade detailing packages designed to restore, protect, and maintain your vehicle's value.
                    </p>
                </Reveal>
            </div>

            {/* 2. SERVICES GRID */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((service, index) => (
                        <Reveal key={index}
                                delay={index * 100}
                                className="flex h-full">
                            <div className="group relative bg-gray-50 dark:bg-theme-surface border border-gray-200 dark:border-theme-accent rounded-3xl hover:border-theme-red dark:hover:border-theme-red transition-all duration-300 flex flex-col overflow-hidden w-full shadow-lg dark:shadow-none hover:shadow-2xl hover:-translate-y-1">

                                {/* Popular Badge */}
                                {/*{service.popular && (*/}
                                {/*    <div className="absolute top-4 right-4 z-20 bg-theme-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">*/}
                                {/*        Popular*/}
                                {/*    </div>*/}
                                {/*)}*/}

                                {/* Image Area */}
                                <div className="h-56 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                                    <img
                                        src={service.hero_image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                {/* Content Area */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-theme-text mb-3">
                                        {service.title}
                                    </h3>

                                    <p
                                        className="text-gray-600 dark:text-theme-muted text-sm leading-relaxed mb-6 flex-1"
                                        dangerouslySetInnerHTML={{ __html: service.description }}
                                    >
                                    </p>

                                    {/* Read More Button - NOW LINKED CORRECTLY */}
                                    <div className="mt-auto pt-4 border-t border-gray-200 dark:border-theme-accent">
                                        <Link href={`/services/${service.slug}`}
                                              className="text-theme-red text-sm font-bold tracking-widest uppercase hover:text-gray-900 dark:hover:text-white transition-colors flex items-center group/btn">
                                            Read More
                                            <i className="fas fa-arrow-right ml-2 transform group-hover/btn:translate-x-1 transition-transform"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* 3. PROCESS SECTION */}
            <div className="bg-gray-100 dark:bg-theme-surface border-y border-gray-200 dark:border-theme-accent py-24 transition-colors">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <Reveal className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-theme-text mb-4">
                            The DBS Process
                        </h2>
                        <p className="text-gray-600 dark:text-theme-muted">How we ensure perfection every time.</p>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop Only) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-300 dark:bg-theme-accent z-0"></div>

                        {[
                            {icon: "fa-search", title: "1. Inspection", desc: "We identify scratches, stains, and paint issues before starting."},
                            {icon: "fa-hands-bubbles", title: "2. Restoration", desc: "Using premium compounds and steam to deep clean surfaces."},
                            {icon: "fa-shield-halved", title: "3. Protection", desc: "Sealing the finish with wax or ceramic for lasting shine."}
                        ].map((step, i) => (
                            <Reveal key={i}
                                    delay={i * 200}
                                    className="relative z-10 text-center">
                                <div className="w-24 h-24 mx-auto bg-white dark:bg-theme-black border-4 border-gray-200 dark:border-theme-accent rounded-full flex items-center justify-center text-3xl text-theme-red mb-6 shadow-xl">
                                    <i className={`fas ${step.icon}`}></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-theme-text mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-theme-muted px-4">{step.desc}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. FAQ TEASER */}
            <div className="py-24 max-w-4xl mx-auto px-6 text-center">
                <Reveal>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-theme-text mb-6">Not sure what you need?</h2>
                    <p className="text-gray-600 dark:text-theme-muted mb-8">
                        Our team can inspect your vehicle and recommend the perfect package for your needs and budget.
                    </p>
                    <Link href="/contact"
                          className="inline-flex items-center text-theme-red font-bold hover:text-theme-dark-red transition-colors">
                        Contact Support <i className="fas fa-arrow-right ml-2"></i>
                    </Link>
                </Reveal>
            </div>

        </div>
    );
}
