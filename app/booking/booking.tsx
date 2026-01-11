"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  Calendar,
  Car,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  Info,
  Mail,
  MapPin, // Added MapPin icon
  Moon,
  Phone,
  Sun,
  User,
} from "lucide-react";
import { ExtraService, ServicePackage } from "@/types";
import Link from "next/link";

interface Props {
  packages: ServicePackage[];
  extras: ExtraService[];
  currency: string;
}

// --- MOCK LOCATIONS (You can replace this with props or API data) ---
const LOCATIONS = [
  { id: "main", name: "Main Branch - Kampala Rd" },
  { id: "nakasero", name: "Nakasero Branch" },
  { id: "kololo", name: "Kololo Airstrip Branch" },
];

// --- BOOKING FORM CONTENT ---
export default function Booking({ packages, extras, currency }: Props) {
  const searchParams = useSearchParams();

  // --- STATE ---
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptId, setReceiptId] = useState("");

  // Form State
  const [date, setDate] = useState("");
  const [location, setLocation] = useState(""); // NEW: Location State
  const [vehicleType, setVehicleType] = useState<"sedan" | "suv">("sedan");
  const [vehicleMake, setVehicleMake] = useState(""); // NEW: Vehicle Make
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState(""); // NEW: Number Plate

  const [selectedPkgId, setSelectedPkgId] = useState<number | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<ExtraService[]>([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "momo",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // --- INITIALIZATION EFFECT (The Link) ---
  useEffect(() => {
    // 1. Get Package from URL
    const pkgParam = searchParams.get("package");
    if (pkgParam) {
      const exists = packages.find((p) => p.id === Number(pkgParam));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (exists) setSelectedPkgId(Number(pkgParam));
    }

    // 2. Get Mode (Day/Night) to set default Time
    const modeParam = searchParams.get("mode");
    const now = new Date();

    if (modeParam === "night") {
      now.setHours(20, 0, 0, 0);
    } else {
      if (now.getHours() > 18 || now.getHours() < 6) {
        now.setHours(10, 0, 0, 0);
        now.setDate(now.getDate() + 1);
      }
    }

    const localIso = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);
    setDate(localIso);
  }, [searchParams]);

  // --- LOGIC: NIGHT MODE & PRICING ---
  const isNightRate = useMemo(() => {
    if (!date) return false;
    const hour = new Date(date).getHours();
    return hour >= 19 || hour < 6;
  }, [date]);

  const pkgPrice = (() => {
    if (!selectedPkgId) return 0;
    const pkg = packages.find((p) => p.id === Number(selectedPkgId));
    if (!pkg) return 0;
    return isNightRate ? pkg.base_price_night : pkg.base_price;
  })();

  const suvTotal = (() => {
    if (vehicleType !== "suv" || !selectedPkgId) return 0;
    const pkg = packages.find((p) => p.id === Number(selectedPkgId));
    return pkg ? pkg.suv_surcharge : 0;
  })();

  const extrasTotal = selectedExtras.reduce((acc, item) => {
    const extra = extras.find((e) => e.id === item.id);
    return acc + (extra ? extra.price : 0);
  }, 0);

  const grandTotal =
    Number(pkgPrice) + Number(suvTotal) + Number(extrasTotal);

  // --- HANDLERS ---
  const toggleExtra = (extraService: ExtraService) => {
    setSelectedExtras((prev) =>
      prev.includes(extraService)
        ? prev.filter((x) => x.id !== extraService.id)
        : [...prev, extraService]
    );
  };

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!location) {
        newErrors.location = "Please select a branch location";
        isValid = false;
      }
      if (!date) {
        newErrors.date = "Please select a date and time";
        isValid = false;
      }
      if (!vehicleMake.trim()) {
        newErrors.vehicleMake = "Vehicle Make is required";
        isValid = false;
      }
      if (!vehicleModel.trim()) {
        newErrors.vehicleModel = "Vehicle Model is required";
        isValid = false;
      }
      if (!vehiclePlate.trim()) {
        newErrors.vehiclePlate = "Number plate is required";
        isValid = false;
      }
    }

    if (currentStep === 2) {
      if (!selectedPkgId && selectedExtras.length === 0) {
        setToast({
          msg: "Please select at least a Package OR an Extra Service.",
          type: "error",
        });
        return false;
      }
    }

    if (currentStep === 3) {
      if (!customerDetails.name) {
        newErrors.name = "Full Name is required";
        isValid = false;
      }
      if (!customerDetails.phone.match(/^(0|256|\+256)[7][0-9]{8}$/)) {
        newErrors.phone = "Invalid UG Phone number";
        isValid = false;
      }
      if (
        customerDetails.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerDetails.email)
      ) {
        newErrors.email = "Invalid Email Address";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((prev) => prev + 1);
  };

  const handlePayment = async () => {
    if (!validateStep(3)) return;
    setIsProcessing(true);
    // Simulate API
    const payload = {
      location,
      date,
      vehicle: {
        type: vehicleType,
        make: vehicleMake,
        model: vehicleModel,
        plate: vehiclePlate,
      },
      selectedPkgId,
      selectedExtras,
      customerDetails,
      grandTotal,
      currency,
    };
    
    console.log("Submitting Payload:", payload);

    // Simulate Network Delay
    setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        setReceiptId("DBS-" + Math.floor(Math.random() * 10000));
    }, 1500);
  };

  // --- RENDER SUCCESS STATE ---
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex items-center justify-center p-4">
        {/* Hidden Printable Receipt */}
        <div className="hidden print:block fixed inset-0 bg-white p-10 z-[200]">
          <h1 className="text-3xl font-bold mb-2">DBS PREMIER CAR WASH</h1>
          <p>
            Receipt #{receiptId} | {new Date().toLocaleDateString()}
          </p>
          <p>Location: {LOCATIONS.find((l) => l.id === location)?.name}</p>
          <hr className="my-4" />
          <p>
            <strong>Customer:</strong> {customerDetails.name}
          </p>
          <p>
            <strong>Vehicle:</strong> {vehicleMake} {vehicleModel} ({vehiclePlate})
          </p>
          <hr className="my-4" />
          {selectedPkgId && (
            <p>Package: {packages.find((p) => p.id === selectedPkgId)?.name}</p>
          )}
          {selectedExtras.map((e) => (
            <p key={e.id}>+ {extras.find((x) => x.id === e.id)?.name}</p>
          ))}
          <hr className="my-4" />
          <h2 className="text-xl font-bold text-right">
            Total: {currency} {grandTotal.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100 dark:border-zinc-700">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-500 mb-8">
            Your slot for{" "}
            <span className="text-theme-red font-bold">
              {new Date(date).toLocaleString()}
            </span>{" "}
            has been reserved at{" "}
            <span className="font-bold text-gray-900 dark:text-white">
                {LOCATIONS.find((l) => l.id === location)?.name}
            </span>.
          </p>
          <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl mb-6 flex justify-between items-center">
            <span className="text-gray-500">Total Paid</span>
            <span className="text-xl font-bold text-theme-red">
              {currency} {grandTotal.toLocaleString()}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 border border-gray-200 dark:border-zinc-600 rounded-xl font-bold flex items-center justify-center gap-2 dark:text-white"
            >
              <Download className="w-4 h-4" /> Receipt
            </button>
            <Link
              href="/"
              className="flex-1 py-3 bg-theme-red text-white rounded-xl font-bold flex items-center justify-center"
            >
              Finish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-theme-black min-h-screen pt-24 pb-12 px-4 md:px-8">
      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: WIZARD STEPS */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-display font-black text-gray-900 dark:text-white mb-8">
            Book Your <span className="text-theme-red">Service</span>
          </h1>

          {/* STEP 1: VEHICLE & TIME */}
          <div
            className={`bg-gray-50 dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border transition-all duration-300 ${
              step === 1
                ? "border-theme-red shadow-lg ring-1 ring-theme-red/20"
                : "border-gray-200 dark:border-zinc-800"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                Location, Time & Vehicle
              </h3>
              {step > 1 && (
                <button
                  onClick={() => setStep(1)}
                  className="text-theme-red text-sm font-bold hover:underline"
                >
                  Edit
                </button>
              )}
            </div>

            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                
                {/* 1. Location Selector (NEW) */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Select Location
                  </label>
                  <div className="relative">
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={`w-full bg-white dark:bg-zinc-800 border rounded-xl p-4 pl-12 appearance-none focus:border-theme-red focus:ring-0 outline-none dark:text-white ${
                        errors.location
                          ? "border-red-500"
                          : "border-gray-200 dark:border-zinc-700"
                      }`}
                    >
                      <option value="">Select a Branch...</option>
                      {LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 rotate-90" />
                  </div>
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                  )}
                </div>

                {/* 2. Date Picker */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Appointment Time
                  </label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full bg-white dark:bg-zinc-800 border rounded-xl p-4 pl-12 focus:border-theme-red focus:ring-0 outline-none dark:text-white ${
                        errors.date
                          ? "border-red-500"
                          : "border-gray-200 dark:border-zinc-700"
                      }`}
                    />
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  {/* Night Rate Feedback */}
                  {isNightRate && (
                    <div className="mt-2 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-medium bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-lg">
                      <Moon className="w-4 h-4" /> Night rates active! Discount
                      applied.
                    </div>
                  )}
                  {date && !isNightRate && (
                    <div className="mt-2 flex items-center gap-2 text-orange-600 dark:text-orange-400 text-sm font-medium bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg">
                      <Sun className="w-4 h-4" /> Standard Day rates apply.
                    </div>
                  )}
                </div>

                {/* 3. Vehicle Type */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Vehicle Size
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setVehicleType("sedan")}
                      className={`p-3 rounded-xl border font-bold text-sm transition-all ${
                        vehicleType === "sedan"
                          ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black"
                          : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-500"
                      }`}
                    >
                      Sedan/Car
                    </button>
                    <button
                      onClick={() => setVehicleType("suv")}
                      className={`p-3 rounded-xl border font-bold text-sm transition-all ${
                        vehicleType === "suv"
                          ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black"
                          : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-500"
                      }`}
                    >
                      SUV/Van
                    </button>
                  </div>
                </div>

                {/* 4. Vehicle Details (Make & Model) */}
                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    {/* Make Input (NEW) */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Make
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={vehicleMake}
                                onChange={(e) => setVehicleMake(e.target.value)}
                                placeholder="e.g. Toyota"
                                className={`w-full bg-white dark:bg-zinc-800 border rounded-xl p-4 pl-4 focus:border-theme-red outline-none dark:text-white ${
                                errors.vehicleMake
                                    ? "border-red-500"
                                    : "border-gray-200 dark:border-zinc-700"
                                }`}
                            />
                        </div>
                    </div>

                    {/* Model Input */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Model
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={vehicleModel}
                                onChange={(e) => setVehicleModel(e.target.value)}
                                placeholder="e.g. Harrier"
                                className={`w-full bg-white dark:bg-zinc-800 border rounded-xl p-4 pl-4 focus:border-theme-red outline-none dark:text-white ${
                                errors.vehicleModel
                                    ? "border-red-500"
                                    : "border-gray-200 dark:border-zinc-700"
                                }`}
                            />
                        </div>
                    </div>
                </div>

                {/* 5. Number Plate (NEW) */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Number Plate
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={vehiclePlate}
                      onChange={(e) => setVehiclePlate(e.target.value.toUpperCase())}
                      placeholder="e.g. UBA 123A"
                      className={`w-full bg-white dark:bg-zinc-800 border rounded-xl p-4 pl-12 focus:border-theme-red outline-none dark:text-white uppercase font-mono ${
                        errors.vehiclePlate
                          ? "border-red-500"
                          : "border-gray-200 dark:border-zinc-700"
                      }`}
                    />
                    <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  {errors.vehiclePlate && (
                    <p className="text-red-500 text-xs mt-1">{errors.vehiclePlate}</p>
                  )}
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="bg-theme-red text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    Select Service <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: SERVICES */}
          <div
            className={`bg-gray-50 dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border transition-all duration-300 ${
              step === 2
                ? "border-theme-red shadow-lg ring-1 ring-theme-red/20"
                : "border-gray-200 dark:border-zinc-800"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Services
              </h3>
              {step > 2 && (
                <button
                  onClick={() => setStep(2)}
                  className="text-theme-red text-sm font-bold hover:underline"
                >
                  Edit
                </button>
              )}
            </div>

            {step === 2 && (
              <div className="animate-in fade-in space-y-8">
                {/* Packages */}
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                    Select a Package (Optional)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {packages.map((pkg) => {
                      const price = isNightRate
                        ? pkg.base_price_night
                        : pkg.base_price;
                      const active = selectedPkgId === pkg.id;

                      return (
                        <div
                          key={pkg.id}
                          onClick={() =>
                            setSelectedPkgId(active ? null : pkg.id)
                          }
                          className={`
                            relative cursor-pointer rounded-2xl p-5 border-2 transition-all
                            ${
                              active
                                ? "border-theme-red bg-white dark:bg-zinc-800 shadow-md"
                                : "border-transparent bg-white dark:bg-zinc-800 hover:border-gray-300 dark:hover:border-zinc-600"
                            }
                          `}
                        >
                          {pkg.is_popular && !active && (
                            <span className="absolute top-3 right-3 text-[10px] font-bold uppercase bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              Popular
                            </span>
                          )}
                          {active && (
                            <div className="absolute top-3 right-3 text-theme-red">
                              <Check className="w-5 h-5 bg-red-100 rounded-full p-1" />
                            </div>
                          )}

                          <h5
                            className={`font-bold ${
                              active
                                ? "text-theme-red"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {pkg.name}
                          </h5>
                          <p className="text-gray-500 text-xs mt-1 mb-3 line-clamp-1">
                            {pkg.features.join(", ")}
                          </p>
                          <div className="font-mono font-bold text-lg dark:text-gray-300">
                            {currency} {price.toLocaleString()}
                          </div>
                          {vehicleType === "suv" && (
                            <div className="text-[10px] text-gray-400 mt-1">
                              + {pkg.suv_surcharge} SUV Fee
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Extras */}
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                    Add Extra Services
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {extras.map((extra) => {
                      const active = selectedExtras.includes(extra);
                      return (
                        <div
                          key={extra.id}
                          onClick={() => toggleExtra(extra)}
                          className={`
                            flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
                            ${
                              active
                                ? "bg-theme-red/5 border-theme-red"
                                : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 hover:border-gray-300"
                            }
                          `}
                        >
                          <span
                            className={`text-sm font-medium ${
                              active
                                ? "text-theme-red font-bold"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {extra.name}
                          </span>
                          <span className="text-xs font-bold text-gray-900 dark:text-white">
                            {currency} {extra.price.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-zinc-800">
                  <button
                    onClick={() => setStep(1)}
                    className="text-gray-500 font-bold px-6 py-3"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-theme-red text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    Details & Pay <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* STEP 3: DETAILS */}
          <div
            className={`bg-gray-50 dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border transition-all duration-300 ${
              step === 3
                ? "border-theme-red shadow-lg ring-1 ring-theme-red/20"
                : "border-gray-200 dark:border-zinc-800"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-3 dark:text-white">
                <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-bold">
                  3
                </span>
                Customer Details
              </h3>
            </div>
            {step === 3 && (
              <div className="animate-in fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={customerDetails.name}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          name: e.target.value,
                        })
                      }
                      className={`w-full bg-white dark:bg-zinc-800 border rounded-xl p-3.5 pl-10 focus:border-theme-red outline-none dark:text-white ${
                        errors.name
                          ? "border-red-500"
                          : "border-gray-200 dark:border-zinc-700"
                      }`}
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="07..."
                      value={customerDetails.phone}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          phone: e.target.value,
                        })
                      }
                      className={`w-full bg-white dark:bg-zinc-800 border rounded-xl p-3.5 pl-10 focus:border-theme-red outline-none dark:text-white ${
                        errors.phone
                          ? "border-red-500"
                          : "border-gray-200 dark:border-zinc-700"
                      }`}
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* New Email Field */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      value={customerDetails.email}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          email: e.target.value,
                        })
                      }
                      className={`w-full bg-white dark:bg-zinc-800 border rounded-xl p-3.5 pl-10 focus:border-theme-red outline-none dark:text-white ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-200 dark:border-zinc-700"
                      }`}
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Payment Method
                  </label>
                  <div className="flex gap-4">
                    <div
                      onClick={() =>
                        setCustomerDetails({
                          ...customerDetails,
                          paymentMethod: "momo",
                        })
                      }
                      className={`flex-1 p-4 border rounded-xl cursor-pointer flex items-center gap-3 transition-all ${
                        customerDetails.paymentMethod === "momo"
                          ? "border-theme-red bg-white shadow-sm"
                          : "border-gray-200 bg-gray-100 opacity-60"
                      }`}
                    >
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-yellow-400"></div>
                        <div className="w-6 h-6 rounded-full bg-red-600"></div>
                      </div>
                      <span className="font-bold text-sm text-black">
                        Mobile Money
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        setCustomerDetails({
                          ...customerDetails,
                          paymentMethod: "cash",
                        })
                      }
                      className={`flex-1 p-4 border rounded-xl cursor-pointer flex items-center gap-3 transition-all ${
                        customerDetails.paymentMethod === "cash"
                          ? "border-theme-red bg-white shadow-sm"
                          : "border-gray-200 bg-gray-100 opacity-60"
                      }`}
                    >
                      <CreditCard className="text-gray-600" />
                      <span className="font-bold text-sm text-black">
                        Pay at Station
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 flex justify-between pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="text-gray-500 font-bold px-6 py-3"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: STICKY SUMMARY */}
        <div className="relative">
          <div className="sticky top-24 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white mb-6">
              Booking Summary
            </h3>
            
            {/* Location (NEW) */}
            <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                    <p className="font-bold text-sm dark:text-white">
                        {location ? LOCATIONS.find(l => l.id === location)?.name : "Select Location"}
                    </p>
                </div>
            </div>

            {/* Time Info */}
            <div className="flex items-start gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-zinc-800">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-bold text-sm dark:text-white">
                  {date ? new Date(date).toLocaleDateString() : "Select Date"}
                </p>
                <p className="text-xs text-gray-500">
                  {date
                    ? new Date(date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "--:--"}{" "}
                  {isNightRate ? "(Night)" : "(Day)"}
                </p>
              </div>
            </div>

            {/* Vehicle Info (Updated) */}
            {(vehicleMake || vehicleModel) && (
             <div className="flex items-start gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-zinc-800">
               <Car className="w-5 h-5 text-gray-400 mt-0.5" />
               <div>
                 <p className="font-bold text-sm dark:text-white">
                   {vehicleMake} {vehicleModel}
                 </p>
                 <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">
                    {vehiclePlate || "NO PLATE"}
                 </p>
               </div>
             </div>
            )}


            {/* Line Items */}
            <div className="space-y-3 mb-6">
              {selectedPkgId && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {packages.find((p) => p.id === selectedPkgId)?.name}
                  </span>
                  <span className="font-medium dark:text-white">
                    {currency} {pkgPrice.toLocaleString()}
                  </span>
                </div>
              )}
              {vehicleType === "suv" && suvTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    SUV Surcharge
                  </span>
                  <span className="font-medium dark:text-white">
                    {currency} {suvTotal.toLocaleString()}
                  </span>
                </div>
              )}
              {selectedExtras.map((extra) => (
                <div
                  key={extra.id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600 dark:text-gray-400">
                    + {extras.find((e) => e.id === extra.id)?.name}
                  </span>
                  <span className="font-medium dark:text-white">
                    {currency}{" "}
                    {extras.find((e) => e.id === extra.id)?.price || 0}
                  </span>
                </div>
              ))}

              {grandTotal === 0 && (
                <p className="text-sm text-gray-400 italic">
                  No services selected
                </p>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-end mb-6 pt-4 border-t border-gray-100 dark:border-zinc-800">
              <span className="text-gray-500 font-bold">Total</span>
              <span className="text-2xl font-black text-theme-red">
                {currency} {grandTotal.toLocaleString()}
              </span>
            </div>

            {/* Action Button */}
            <button
              onClick={handlePayment}
              disabled={step < 3 || isProcessing}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all
                 ${
                   step < 3
                     ? "bg-gray-200 dark:bg-zinc-800 text-gray-400 cursor-not-allowed"
                     : "bg-theme-red text-white hover:bg-red-700 shadow-lg hover:shadow-xl hover:-translate-y-1"
                 }
               `}
            >
              {isProcessing
                ? "Processing..."
                : customerDetails.paymentMethod === "momo"
                ? "Pay Now"
                : "Confirm Booking"}
            </button>

            <div className="mt-4 text-[10px] text-center text-gray-400 flex items-center justify-center gap-1">
              <Info className="w-3 h-3" /> Prices include VAT charge
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div
      className={`fixed top-24 right-6 z-[100] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transform transition-all animate-in slide-in-from-right-10 ${
        type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
      }`}
    >
      {type === "success" ? (
        <Check className="w-5 h-5" />
      ) : (
        <AlertCircle className="w-5 h-5" />
      )}
      <div>
        <h4 className="font-bold text-sm uppercase tracking-wider">
          {type === "success" ? "Success" : "Error"}
        </h4>
        <p className="text-sm opacity-90">{message}</p>
      </div>
    </div>
  );
};