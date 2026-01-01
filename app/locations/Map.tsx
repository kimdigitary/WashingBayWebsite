"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define the shape of the actions the parent can call
export interface MapHandle {
    flyTo: (lat: number, lng: number) => void;
}

interface Location {
    id: number;
    name: string;
    lat: number;
    lng: number;
    address: string;
    phone: string;
    distance?: number;
}

interface MapProps {
    locations: Location[];
}

const Map = forwardRef<MapHandle, MapProps>(({ locations }, ref) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const markersRef = useRef<L.Marker[]>([]);

    // This "exposes" the flyTo function to your page.tsx
    useImperativeHandle(ref, () => ({
        flyTo(lat, lng) {
            if (mapInstance.current) {
                mapInstance.current.flyTo([lat, lng], 14, { duration: 1.5 });

                // Optional: Open the popup for that marker
                const targetMarker = markersRef.current.find(m => {
                    const { lat: mLat, lng: mLng } = m.getLatLng();
                    return Math.abs(mLat - lat) < 0.0001 && Math.abs(mLng - lng) < 0.0001;
                });
                if (targetMarker) setTimeout(() => targetMarker.openPopup(), 1600);
            }
        }
    }));

    useEffect(() => {
        if (!mapRef.current || mapInstance.current) return;

        const map = L.map(mapRef.current).setView([0.3136, 32.5811], 12);
        mapInstance.current = map;

        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
            attribution: '© OSM © CARTO',
        }).addTo(map);

        return () => {
            map.remove();
            mapInstance.current = null;
        };
    }, []);

    useEffect(() => {
        if (!mapInstance.current) return;
        markersRef.current.forEach(m => m.remove());
        markersRef.current = [];

        locations.forEach((branch) => {
            const icon = L.divIcon({
                className: 'bg-transparent',
                html: `<div class="w-6 h-6 bg-red-600 rounded-full border-2 border-white"></div>`,
                iconSize: [24, 24]
            });

            const marker = L.marker([branch.lat, branch.lng], { icon })
                .addTo(mapInstance.current!)
                .bindPopup(`<b>${branch.name}</b>`);

            markersRef.current.push(marker);
        });
    }, [locations]);

    return <div ref={mapRef} className="w-full h-full" />;
});

Map.displayName = "Map";
export default Map;
