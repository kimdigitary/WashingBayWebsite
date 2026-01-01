'use client'
import React, {useEffect} from "react";

export default function Toast({message, type, onClose}: { message: string, type: 'success' | 'error', onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-24 right-6 z-[100] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transform transition-all animate-slide-in ${
            type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
            <i className={`fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-xl`}></i>
            <div>
                <h4 className="font-bold text-sm uppercase tracking-wider">{type === 'success' ? 'Success' : 'Error'}</h4>
                <p className="text-sm opacity-90">{message}</p>
            </div>
            <button onClick={onClose}
                    className="ml-4 hover:opacity-75"><i className="fas fa-times"></i></button>
        </div>
    );
};
