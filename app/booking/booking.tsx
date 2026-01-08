'use client'
import React, {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import Toast from "@/app/booking/toast";
import Reveal from "@/app/booking/reveal";
import {ServicePackage} from "@/types";

interface Props{
    packages:ServicePackage[]
}
export default function Booking({packages}:Props) {
    const searchParams = useSearchParams()

    // --- STATE ---
    const [step, setStep] = useState(1);
    const [toast, setToast] = useState<{msg: string, type: 'success'|'error'} | null>(null);

    const [formData, setFormData] = useState({
        vehicleType: "Sedan / Coupe",
        vehicleModel: "",
        packageId: "deluxe",
        name: "",
        phone: "",
        date: "",
        paymentMethod: "momo" // 'momo' or 'cash'
    });

    const [errors, setErrors] = useState<{[key:string]: string}>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [receiptId, setReceiptId] = useState("");

    useEffect(() => {
        const pkg = searchParams.get("package");
        if (pkg && packages.find(p => p.id === pkg.toLowerCase())) {
            setFormData(prev => ({ ...prev, packageId: pkg.toLowerCase() }));
        }
    }, [searchParams]);

    const selectedPackage = packages.find(p => p.id === formData.packageId) || packages[1];

    // --- VALIDATION LOGIC ---
    const validateStep = (currentStep: number) => {
        const newErrors: {[key:string]: string} = {};
        let isValid = true;

        if (currentStep === 1) {
            if (!formData.vehicleModel.trim()) {
                newErrors.vehicleModel = "Vehicle model is required";
                isValid = false;
            } else if (formData.vehicleModel.length < 2) {
                newErrors.vehicleModel = "Model name is too short";
                isValid = false;
            }
        }

        if (currentStep === 3) {
            if (!formData.name.trim()) {
                newErrors.name = "Full name is required";
                isValid = false;
            }

            // Ugandan Phone Regex: Matches 07... or +256...
            const phoneRegex = /^(0|256|\+256)[7][0-9]{8}$/;
            if (!formData.phone.match(phoneRegex)) {
                newErrors.phone = "Enter a valid UG phone (e.g. 0772123456)";
                isValid = false;
            }

            if (!formData.date) {
                newErrors.date = "Please select a date and time";
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
            setErrors({});
        } else {
            setToast({ msg: "Please fix the errors before proceeding.", type: "error" });
        }
    };

    const handlePayment = async () => {
        if (!validateStep(3)) return;

        setIsProcessing(true);

        // SIMULATE MOBILE MONEY API CALL
        try {
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Generate random receipt ID
            const rId = "DBS-" + Math.floor(100000 + Math.random() * 900000);
            setReceiptId(rId);
            setIsSuccess(true);
            setToast({ msg: "Payment confirmed successfully!", type: "success" });
        } catch (error) {
            setToast({ msg: "Payment failed. Please try again.", type: "error" });
        } finally {
            setIsProcessing(false);
        }
    };

    // --- RECEIPT DOWNLOAD LOGIC ---
    const downloadReceipt = () => {
        window.print();
    };

    if (isSuccess) {
        return (
            <div className="bg-gray-50 dark:bg-theme-black min-h-screen flex items-center justify-center p-4 pt-20">
                {/* PRINTABLE RECEIPT AREA (Only visible during print) */}
                <div id="printable-receipt" className="hidden print:block fixed inset-0 bg-white p-10 z-[200]">
                    <div className="text-center border-b-2 border-black pb-4 mb-4">
                        <h1 className="text-4xl font-bold">DBS PREMIER</h1>
                        <p>Kampala, Uganda | +256 700 123456</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="font-bold">Receipt #:</p>
                            <p>{receiptId}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">Date:</p>
                            <p>{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <table className="w-full text-left mb-6">
                        <thead><tr className="border-b"><th className="py-2">Item</th><th className="py-2 text-right">Cost</th></tr></thead>
                        <tbody>
                        <tr>
                            <td className="py-2">{selectedPackage.name} ({formData.vehicleType})</td>
                            <td className="py-2 text-right">{selectedPackage.price.toLocaleString()} UGX</td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr className="border-t border-black font-bold text-xl">
                            <td className="py-4">Total Paid (Mobile Money)</td>
                            <td className="py-4 text-right">{selectedPackage.price.toLocaleString()} UGX</td>
                        </tr>
                        </tfoot>
                    </table>
                    <p className="text-center italic mt-10">Thank you for choosing DBS Premier!</p>
                </div>

                {/* SCREEN SUCCESS VIEW */}
                <div className="bg-white dark:bg-theme-surface p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-theme-accent text-center max-w-lg w-full shadow-2xl print:hidden">
                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <i className="fas fa-check text-5xl text-green-600 dark:text-green-400"></i>
                    </div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-theme-text mb-2">Booking Confirmed!</h2>
                    <p className="text-gray-500 dark:text-theme-muted mb-6">
                        Your payment of <span className="font-bold text-theme-red">{selectedPackage.price.toLocaleString()} UGX</span> was successful.
                    </p>

                    <div className="bg-gray-100 dark:bg-black/40 p-4 rounded-xl mb-8 text-left text-sm">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Receipt ID:</span>
                            <span className="font-mono font-bold">{receiptId}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Date:</span>
                            <span className="font-mono font-bold">{new Date(formData.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Time:</span>
                            <span className="font-mono font-bold">{new Date(formData.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={downloadReceipt} className="flex-1 py-3 border border-gray-300 dark:border-theme-accent rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-theme-accent transition-colors">
                            <i className="fas fa-download mr-2"></i> Receipt
                        </button>
                        <Link href="/" className="flex-1 py-3 bg-theme-red text-white rounded-xl font-bold hover:bg-theme-darkRed transition-colors flex items-center justify-center">
                            Finish
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-theme-black transition-colors duration-300 min-h-screen pt-20">

            {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

            <div className="pt-10 pb-24 px-6 md:px-8 max-w-7xl mx-auto w-full">
                <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-theme-text mb-8 text-center">
                    Secure Your <span className="text-theme-red">Slot</span>
                </h1>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* LEFT COLUMN: WIZARD */}
                    <div className="flex-1 space-y-6">

                        {/* STEP 1: VEHICLE */}
                        <Reveal className={`bg-gray-50 dark:bg-theme-surface border ${step === 1 ? 'border-theme-red ring-1 ring-theme-red shadow-lg' : 'border-gray-200 dark:border-theme-accent'} p-8 rounded-3xl transition-all`}>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 text-sm transition-colors ${step >= 1 ? 'bg-theme-red text-white' : 'bg-gray-300 dark:bg-theme-accent text-gray-500'}`}>1</div>
                                    <h3 className="text-xl font-bold font-display text-gray-900 dark:text-theme-text">Vehicle Details</h3>
                                </div>
                                {step > 1 && <i className="fas fa-check-circle text-green-500 text-xl"></i>}
                            </div>

                            {step === 1 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-theme-muted uppercase tracking-wider mb-2">Vehicle Type</label>
                                        <select
                                            value={formData.vehicleType}
                                            onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                                            className="w-full bg-white dark:bg-theme-black border border-gray-300 dark:border-theme-accent text-gray-900 dark:text-theme-text rounded-xl p-3.5 focus:border-theme-red focus:outline-none transition-all"
                                        >
                                            <option>Sedan / Coupe</option>
                                            <option>SUV / Truck</option>
                                            <option>Van / Bus</option>
                                            <option>Motorcycle</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-theme-muted uppercase tracking-wider mb-2">Make & Model <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Toyota Prado"
                                            value={formData.vehicleModel}
                                            onChange={(e) => setFormData({...formData, vehicleModel: e.target.value})}
                                            className={`w-full bg-white dark:bg-theme-black border text-gray-900 dark:text-theme-text rounded-xl p-3.5 focus:outline-none transition-all ${errors.vehicleModel ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-theme-accent focus:border-theme-red'}`}
                                        />
                                        {errors.vehicleModel && <p className="text-red-500 text-xs mt-1">{errors.vehicleModel}</p>}
                                    </div>
                                    <div className="md:col-span-2 flex justify-end">
                                        <button onClick={handleNext} className="px-8 py-3 bg-theme-red text-white rounded-xl font-bold hover:bg-theme-darkRed transition-colors shadow-lg">Next Step <i className="fas fa-arrow-right ml-2"></i></button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-theme-muted pl-12">
                                    <span>{formData.vehicleType} - {formData.vehicleModel}</span>
                                    <button onClick={() => setStep(1)} className="text-theme-red font-bold text-xs uppercase hover:underline">Edit</button>
                                </div>
                            )}
                        </Reveal>

                        {/* STEP 2: PACKAGE */}
                        <Reveal className={`bg-gray-50 dark:bg-theme-surface border ${step === 2 ? 'border-theme-red ring-1 ring-theme-red shadow-lg' : 'border-gray-200 dark:border-theme-accent'} p-8 rounded-3xl transition-all ${step < 2 ? 'opacity-50' : 'opacity-100'}`}>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 text-sm transition-colors ${step >= 2 ? 'bg-theme-red text-white' : 'bg-gray-300 dark:bg-theme-accent text-gray-500'}`}>2</div>
                                    <h3 className="text-xl font-bold font-display text-gray-900 dark:text-theme-text">Select Package</h3>
                                </div>
                                {step > 2 && <i className="fas fa-check-circle text-green-500 text-xl"></i>}
                            </div>

                            {step === 2 ? (
                                <div className="grid grid-cols-1 gap-4 animate-fade-in">
                                    {packages.map((pkg) => (
                                        <label
                                            key={pkg.id}
                                            className={`cursor-pointer border p-4 rounded-xl flex items-center justify-between transition-all ${
                                                formData.packageId === pkg.id
                                                    ? 'border-theme-red bg-theme-red/5 ring-1 ring-theme-red'
                                                    : 'border-gray-200 dark:border-theme-accent bg-white dark:bg-theme-black hover:border-theme-red/50'
                                            }`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.packageId === pkg.id ? 'border-theme-red' : 'border-gray-400'}`}>
                                                    {formData.packageId === pkg.id && <div className="w-3 h-3 rounded-full bg-theme-red"></div>}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-bold text-gray-900 dark:text-theme-text flex items-center gap-2">
                                                        {pkg.name}
                                                        {pkg.recommended && <span className="text-[10px] bg-theme-red text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Popular</span>}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-theme-muted">{pkg.desc}</div>
                                                </div>
                                            </div>
                                            <div className="font-bold text-gray-900 dark:text-theme-text">{pkg.price.toLocaleString()} UGX</div>
                                        </label>
                                    ))}
                                    <div className="mt-4 flex justify-end gap-3">
                                        <button onClick={() => setStep(1)} className="px-6 py-3 border border-gray-300 dark:border-theme-accent rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-theme-accent text-sm">Back</button>
                                        <button onClick={handleNext} className="px-8 py-3 bg-theme-red text-white rounded-xl font-bold hover:bg-theme-darkRed transition-colors shadow-lg">Next Step <i className="fas fa-arrow-right ml-2"></i></button>
                                    </div>
                                </div>
                            ) : step > 2 && (
                                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-theme-muted pl-12">
                                    <span>{selectedPackage.name}</span>
                                    <button onClick={() => setStep(2)} className="text-theme-red font-bold text-xs uppercase hover:underline">Edit</button>
                                </div>
                            )}
                        </Reveal>

                        {/* STEP 3: PAYMENT & CONTACT */}
                        <Reveal className={`bg-gray-50 dark:bg-theme-surface border ${step === 3 ? 'border-theme-red ring-1 ring-theme-red shadow-lg' : 'border-gray-200 dark:border-theme-accent'} p-8 rounded-3xl transition-all ${step < 3 ? 'opacity-50' : 'opacity-100'}`}>
                            <div className="flex items-center mb-6">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 text-sm transition-colors ${step >= 3 ? 'bg-theme-red text-white' : 'bg-gray-300 dark:bg-theme-accent text-gray-500'}`}>3</div>
                                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-theme-text">Payment & Details</h3>
                            </div>

                            {step === 3 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                                    {/* Contact Form */}
                                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 dark:text-theme-muted uppercase tracking-wider mb-2">Full Name <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className={`w-full bg-white dark:bg-theme-black border text-gray-900 dark:text-theme-text rounded-xl p-3.5 focus:outline-none transition-all ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-theme-accent focus:border-theme-red'}`}
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 dark:text-theme-muted uppercase tracking-wider mb-2">Phone (Mobile Money) <span className="text-red-500">*</span></label>
                                            <input
                                                type="tel"
                                                placeholder="077..."
                                                value={formData.phone}
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                className={`w-full bg-white dark:bg-theme-black border text-gray-900 dark:text-theme-text rounded-xl p-3.5 focus:outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-theme-accent focus:border-theme-red'}`}
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-gray-500 dark:text-theme-muted uppercase tracking-wider mb-2">Appointment Date <span className="text-red-500">*</span></label>
                                            <input
                                                type="datetime-local"
                                                value={formData.date}
                                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                                className={`w-full bg-white dark:bg-theme-black border text-gray-900 dark:text-theme-text rounded-xl p-3.5 focus:outline-none transition-all scheme-light dark:scheme-dark ${errors.date ? 'border-red-500' : 'border-gray-300 dark:border-theme-accent focus:border-theme-red'}`}
                                            />
                                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                                        </div>
                                    </div>

                                    {/* Payment Method */}
                                    <div className="md:col-span-2 border-t border-gray-200 dark:border-theme-accent pt-6 mt-2">
                                        <h4 className="font-bold text-gray-900 dark:text-theme-text mb-4">Payment Method</h4>
                                        <div className="flex gap-4">
                                            <label className={`flex-1 border p-4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${formData.paymentMethod === 'momo' ? 'border-theme-red bg-theme-red/5 ring-1 ring-theme-red' : 'border-gray-200 dark:border-theme-accent hover:border-theme-red/50'}`}>
                                                <input type="radio" name="payment" className="hidden" checked={formData.paymentMethod === 'momo'} onChange={() => setFormData({...formData, paymentMethod: 'momo'})} />
                                                <div className="flex gap-2">
                                                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-xs">MTN</div>
                                                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center font-bold text-xs text-white">Airtel</div>
                                                </div>
                                                <span className="text-sm font-bold text-gray-900 dark:text-theme-text">Mobile Money</span>
                                            </label>
                                            <label className={`flex-1 border p-4 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${formData.paymentMethod === 'cash' ? 'border-theme-red bg-theme-red/5 ring-1 ring-theme-red' : 'border-gray-200 dark:border-theme-accent hover:border-theme-red/50'}`}>
                                                <input type="radio" name="payment" className="hidden" checked={formData.paymentMethod === 'cash'} onChange={() => setFormData({...formData, paymentMethod: 'cash'})} />
                                                <i className="fas fa-money-bill-wave text-2xl text-green-500"></i>
                                                <span className="text-sm font-bold text-gray-900 dark:text-theme-text">Pay at Station</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Reveal>

                    </div>

                    {/* RIGHT COLUMN: SUMMARY & PAY BUTTON */}
                    <div className="lg:w-1/3">
                        <Reveal className="sticky top-24">
                            <div className="bg-white dark:bg-theme-surface border border-gray-200 dark:border-theme-accent p-8 rounded-3xl shadow-2xl">
                                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-theme-text mb-6">Booking Summary</h3>

                                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-theme-accent">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-theme-muted">Service</span>
                                        <span className="text-gray-900 dark:text-theme-text font-bold">{selectedPackage.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-theme-muted">Vehicle</span>
                                        <span className="text-gray-900 dark:text-theme-text">{formData.vehicleModel || "Not entered"}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-theme-muted">Tax (18%)</span>
                                        <span className="text-gray-900 dark:text-theme-text">Included</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-8">
                                    <span className="text-gray-500 dark:text-theme-muted">Total</span>
                                    <span className="text-3xl font-display font-bold text-theme-red">{selectedPackage.price.toLocaleString()} UGX</span>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={step < 3 || isProcessing}
                                    className={`
                                w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg transform flex items-center justify-center gap-2
                                ${step < 3
                                        ? 'bg-gray-300 dark:bg-theme-accent text-gray-500 dark:text-theme-muted cursor-not-allowed'
                                        : 'bg-theme-red text-white hover:bg-theme-darkRed hover:-translate-y-1'
                                    }
                            `}
                                >
                                    {isProcessing ? (
                                        <><i className="fas fa-spinner fa-spin"></i> Processing...</>
                                    ) : formData.paymentMethod === 'momo' ? (
                                        "Pay Now"
                                    ) : (
                                        "Confirm Booking"
                                    )}
                                </button>

                                <p className="text-xs text-center text-gray-500 dark:text-theme-muted mt-4 flex items-center justify-center gap-2">
                                    <i className="fas fa-lock"></i> Secure 256-bit SSL Encrypted
                                </p>
                            </div>
                        </Reveal>
                    </div>

                </div>
            </div>

        </div>
    );
}
