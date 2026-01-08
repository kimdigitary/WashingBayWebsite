"use client";

import React, {useState, useRef} from "react";
import dynamic from "next/dynamic";
import BookingModal from "@/components/BookingModal";
import type {MapHandle} from "./Map";
import {Location} from "@/app/locations/types";

// Dynamically import map with SSR disabled
const Map = dynamic(() => import("./Map"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 dark:bg-neutral-800 animate-pulse flex items-center justify-center text-gray-400">Loading
        Map...</div>
});

const Reveal = ({children, className = ""}: { children: React.ReactNode, className?: string }) => {
    return <div className={className}>{children}</div>;
};

interface Props {
    locationsData: Location[]
}

export default function Locations({locationsData}: Props) {
    const mapHandleRef = useRef<MapHandle>(null);
    const [locations, setLocations] = useState<Location[]>(locationsData);
    const [loadingLoc, setLoadingLoc] = useState(false);
    const [statusMsg, setStatusMsg] = useState("Sort by Distance");

    const handleSortByDistance = () => {
        if (!navigator.geolocation) return;
        setLoadingLoc(true);
        setStatusMsg("Locating...");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                const sorted = [...locations].map(loc => {
                    const R = 6371;
                    const dLat = (loc.coordinates.lat - userLat) * Math.PI / 180;
                    const dLon = (loc.coordinates.lng - userLng) * Math.PI / 180;
                    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(userLat * Math.PI / 180) * Math.cos(loc.coordinates.lat * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    return {...loc, distance: R * c};
                }).sort((a, b) => (a.distance || 0) - (b.distance || 0));

                setLocations(sorted);
                setLoadingLoc(false);
                setStatusMsg("Found Nearest");
                mapHandleRef.current?.flyTo(sorted[0].coordinates.lat, sorted[0].coordinates.lng);
                setTimeout(() => setStatusMsg("Sort by Distance"), 3000);
            },
            () => {
                setLoadingLoc(false);
                setStatusMsg("Sort by Distance");
            }
        );
    };

    return (
        <div className="bg-white dark:bg-neutral-950 min-h-screen pt-32 pb-8 px-6">
            <style jsx
                   global>{`
                .leaflet-popup-content-wrapper {
                    background: white;
                    border-radius: 8px;
                    padding: 0;
                }

                .dark .leaflet-popup-content-wrapper {
                    background: #171717;
                    color: white;
                }

                .leaflet-popup-tip {
                    display: none;
                }
            `}</style>

            <div className="max-w-7xl mx-auto">
                <Reveal className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold dark:text-white">Our Locations</h1>
                        <p className="text-gray-500">Premium service across Uganda.</p>
                    </div>
                    <button
                        onClick={handleSortByDistance}
                        disabled={loadingLoc}
                        className="bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
                    >
                        {loadingLoc ? "..." : statusMsg}
                    </button>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white dark:bg-neutral-900 rounded-3xl border border-gray-200 dark:border-neutral-800 overflow-hidden h-[650px] shadow-2xl">
                    <div className="lg:col-span-1 overflow-y-auto border-r border-gray-200 dark:border-neutral-800">
                        {locations.map((branch) => (
                            <div key={branch.id}
                                 className="p-6 border-b border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-all">
                                <div className="cursor-pointer"
                                     onClick={() => mapHandleRef.current?.flyTo(branch.coordinates.lat, branch.coordinates.lng)}>
                                    <h3 className="font-bold text-lg dark:text-white">{branch.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-neutral-400">{branch.address}</p>
                                    {/*{branch.distance && <span className="text-xs font-bold text-red-600">{branch.distance.toFixed(1)} km away</span>}*/}
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <BookingModal/>
                                    <a href={`https://www.google.com/maps?q=${branch.coordinates.lat},${branch.coordinates.lng}`}
                                       target="_blank"
                                       className="flex-1 text-center py-2 text-xs border rounded-lg dark:text-white">Directions</a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-2 relative">
                        <Map ref={mapHandleRef}
                             locations={locations}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
