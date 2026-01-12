import {fetchData} from "@/queries/server";
import {ApiResponse} from "@/types";
import {Service} from "@/app/services/types";
import Link from "next/link";

export default async function Services() {
    const {data: services} = await fetchData<ApiResponse<Service>>('services', undefined)
    return (
        <div className="bg-theme-black py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-theme-red/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                <div className="text-center mb-16 reveal">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-theme-text mb-4">Precision Services</h2>
                    <p className="text-theme-muted max-w-2xl mx-auto text-lg">Engineered for results. Choose a package tailored to your vehicle's needs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Service 1 */}
                    {
                        services.map(s => <div key={s.id}
                                               className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer reveal">
                            <img src={s.hero_image}
                                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                 alt="Ceramic Coating"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="w-12 h-1 bg-theme-red mb-4 transition-all duration-300 group-hover:w-24"></div>
                                <h3 className="text-2xl font-bold font-display text-white mb-2">{s.title}</h3>
                                <div
                                    className="text-gray-300 text-sm mb-6 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                                    dangerouslySetInnerHTML={{ __html: s.short_description }}
                                />
                                <Link href="/services"
                                      className="inline-flex items-center text-white text-xs font-bold uppercase tracking-widest hover:text-theme-red transition-colors">
                                    Explore <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                                </Link>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}
