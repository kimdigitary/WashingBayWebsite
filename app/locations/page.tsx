"use client";

import React, { useEffect, useState, useRef } from "react";
import BookingModal from "@/components/BookingModal";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L from "leaflet"; // Import Leaflet core

// --- TYPES ---
interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  distance?: number;
}

// --- DATA ---
const initialLocations: Location[] = [
  { id: 1, name: "Kololo Flagship", lat: 0.3326, lng: 32.5896, address: "Acacia Avenue, Next to Golf Course", phone: "+256 700 123456" },
  { id: 2, name: "Village Mall Bugolobi", lat: 0.3160, lng: 32.6174, address: "Luthuli Avenue, Basement Parking", phone: "+256 700 987654" },
  { id: 3, name: "Naalya Metroplex", lat: 0.3689, lng: 32.6394, address: "Northern Bypass, Naalya", phone: "+256 750 333222" },
  { id: 4, name: "Entebbe Victoria Mall", lat: 0.0594, lng: 32.4637, address: "Berkeley Rd, Entebbe", phone: "+256 700 555888" },
  { id: 5, name: "Ntinda Centre", lat: 0.3476, lng: 32.6116, address: "Kimera Road, Ntinda", phone: "+256 700 444111" },
  { id: 6, name: "Industrial Area", lat: 0.3190, lng: 32.5977, address: "6th Street, Industrial Area", phone: "+256 700 777999" }
];

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

export default function LocationsPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [statusMsg, setStatusMsg] = useState("Sort by Distance");

  // --- INITIALIZE MAP ---
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // 1. Init Map centered on Kampala
    const map = L.map(mapRef.current).setView([0.3136, 32.5811], 12);
    mapInstance.current = map;

    // 2. Determine Theme for Tiles
    const isDark = document.documentElement.classList.contains("dark");
    const tileUrl = isDark 
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

    tileLayerRef.current = L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // 3. Listen for Theme Changes (optional observer could go here)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === "class" && tileLayerRef.current) {
                const isDarkNow = document.documentElement.classList.contains("dark");
                const newUrl = isDarkNow 
                    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
                    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
                tileLayerRef.current.setUrl(newUrl);
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true });

    return () => {
        map.remove();
        mapInstance.current = null;
        observer.disconnect();
    };
  }, []);

  // --- RENDER MARKERS WHEN LOCATIONS CHANGE ---
  useEffect(() => {
    if (!mapInstance.current) return;
    const map = mapInstance.current;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    locations.forEach((branch) => {
        // Custom Pulse Icon
        const icon = L.divIcon({
            className: 'bg-transparent',
            html: `<div class="w-6 h-6 bg-theme-red rounded-full border-2 border-white shadow-[0_0_10px_#DC2626] hover:scale-125 transition-transform"></div>`,
            iconSize: [24, 24]
        });

        // Popup HTML
        const popupContent = `
            <div class="relative font-sans text-gray-900 dark:text-gray-100">
                <div class="h-16 bg-gray-900 border-b border-red-900/30 relative overflow-hidden rounded-t-lg">
                    <div class="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=300')] bg-cover bg-center"></div>
                    <div class="absolute bottom-2 left-4 text-white font-bold tracking-wide text-sm">${branch.name}</div>
                </div>
                <div class="p-3 bg-white dark:bg-neutral-900 rounded-b-lg">
                    <p class="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-start gap-2">
                        <i class="fas fa-map-pin mt-0.5 text-red-600"></i> ${branch.address}
                    </p>
                    <div class="flex gap-2">
                         <a href="https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}" target="_blank" class="flex-1 bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 text-xs font-bold py-1.5 rounded text-center transition-colors">Directions</a>
                    </div>
                </div>
            </div>`;

        const marker = L.marker([branch.lat, branch.lng], { icon }).addTo(map).bindPopup(popupContent);
        markersRef.current.push(marker);
    });
  }, [locations]);

  // --- MAP CONTROLS ---
  const flyToLocation = (lat: number, lng: number) => {
    if (mapInstance.current) {
        mapInstance.current.flyTo([lat, lng], 14, { duration: 1.5 });
        // Find marker and open popup after delay
        const targetMarker = markersRef.current.find(m => {
            const { lat: mLat, lng: mLng } = m.getLatLng();
            return Math.abs(mLat - lat) < 0.0001 && Math.abs(mLng - lng) < 0.0001;
        });
        if (targetMarker) {
            setTimeout(() => targetMarker.openPopup(), 1600);
        }
    }
  };

  // --- GEOLOCATION LOGIC ---
  const handleSortByDistance = () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
    }

    setLoadingLoc(true);
    setStatusMsg("Locating...");

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            const sorted = [...locations].map(loc => {
                const dist = calculateDistance(userLat, userLng, loc.lat, loc.lng);
                return { ...loc, distance: dist };
            }).sort((a, b) => (a.distance || 0) - (b.distance || 0));

            setLocations(sorted);
            setLoadingLoc(false);
            setStatusMsg("Found Nearest");
            
            // Fly to nearest
            if(sorted.length > 0) flyToLocation(sorted[0].lat, sorted[0].lng);

            setTimeout(() => setStatusMsg("Sort by Distance"), 3000);
        },
        () => {
            setLoadingLoc(false);
            setStatusMsg("Location Error");
            alert("Could not retrieve location. Please enable permissions.");
            setTimeout(() => setStatusMsg("Sort by Distance"), 3000);
        }
    );
  };

  // Haversine Formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg: number) => deg * (Math.PI / 180);

  return (
    <div className="bg-white dark:bg-theme-black transition-colors duration-300 min-h-screen">
      
      {/* GLOBAL STYLE OVERRIDES FOR LEAFLET POPUP */}
      <style jsx global>{`
        .leaflet-popup-content-wrapper { background: transparent; box-shadow: none; padding: 0; border: none; }
        .leaflet-popup-content { margin: 0; width: 220px !important; }
        .leaflet-popup-tip { background: #DC2626; }
        .leaflet-container a.leaflet-popup-close-button { color: white; top: 4px; right: 4px; drop-shadow: 0 1px 2px rgba(0,0,0,0.5); }
      `}</style>

      {/* 1. HEADER */}
      <div className="pt-32 pb-8 px-6 md:px-8 max-w-7xl mx-auto w-full">
         <Reveal className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
            <div>
                <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-theme-text mb-2">
                    Our Locations
                </h1>
                <p className="text-gray-600 dark:text-theme-muted">Find a premium station in Uganda near you.</p>
            </div>
            <button 
                onClick={handleSortByDistance}
                disabled={loadingLoc}
                className="bg-gray-100 dark:bg-theme-accent hover:bg-gray-200 dark:hover:bg-theme-surface border border-gray-300 dark:border-theme-accent text-gray-900 dark:text-theme-text px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all group hover:border-theme-red"
            >
                {loadingLoc ? (
                    <i className="fas fa-spinner fa-spin text-theme-red"></i>
                ) : (
                    <i className={`fas ${statusMsg === 'Found Nearest' ? 'fa-check' : 'fa-location-crosshairs'} text-theme-red group-hover:animate-ping`}></i>
                )}
                {statusMsg}
            </button>
         </Reveal>

         {/* 2. MAIN CONTENT GRID */}
         <Reveal delay={100} className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white dark:bg-theme-surface rounded-3xl border border-gray-200 dark:border-theme-accent overflow-hidden relative h-[650px] shadow-2xl">
            
            {/* Sidebar List */}
            <div className="lg:col-span-1 border-r border-gray-200 dark:border-theme-accent overflow-y-auto custom-scrollbar">
                {locations.map((branch, index) => (
                    <div 
                        key={branch.id}
                        className="p-6 border-b border-gray-100 dark:border-theme-accent hover:bg-gray-50 dark:hover:bg-theme-accent/30 transition-all flex flex-col gap-4 group"
                    >
                        <div 
                            className="flex justify-between items-start cursor-pointer"
                            onClick={() => flyToLocation(branch.lat, branch.lng)}
                        >
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-theme-text text-lg font-display group-hover:text-theme-red transition-colors">
                                    {branch.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-theme-muted mt-1 leading-snug">
                                    {branch.address}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-theme-muted mt-2 font-mono flex items-center">
                                    <i className="fas fa-phone-alt mr-2 text-theme-red"></i> {branch.phone}
                                </p>
                            </div>
                            <div className="text-right flex flex-col items-end pl-2">
                                {branch.distance && (
                                    <span className="inline-block bg-theme-red/10 text-theme-red text-xs font-bold px-2 py-1 rounded border border-theme-red/20 mb-2 whitespace-nowrap">
                                        <i className="fas fa-location-arrow text-[10px] mr-1"></i>
                                        {branch.distance.toFixed(1)} km
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 mt-1">
                            <div className="flex-1 bg-theme-red/10 hover:bg-theme-red hover:text-white border border-theme-red/30 text-theme-red py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer">
                                <i className="fas fa-calendar-plus"></i> 
                                {/* Pass location name to modal */}
                                <div className="w-full h-full flex items-center justify-center">
                                     <BookingModal />
                                </div>
                            </div>
                            <a 
                                href={`https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`}
                                target="_blank"
                                className="flex-1 bg-gray-100 dark:bg-theme-accent hover:bg-gray-200 dark:hover:bg-theme-black border border-gray-300 dark:border-theme-accent text-gray-600 dark:text-theme-muted hover:text-gray-900 dark:hover:text-theme-text py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-location-arrow"></i> Directions
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Map Area */}
            <div className="lg:col-span-2 relative h-full bg-gray-200 dark:bg-theme-black">
                <div id="map" ref={mapRef} className="w-full h-full z-10" />
            </div>
         </Reveal>
      </div>

    </div>
  );
}