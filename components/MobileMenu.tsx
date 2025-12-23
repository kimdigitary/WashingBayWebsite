"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="lg:hidden w-10 h-10 flex items-center justify-center text-theme-text border border-theme-accent rounded-lg bg-theme-surface">
            <i className="fas fa-bars text-xl"></i>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-theme-surface border-r-theme-accent w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 mt-10">
            {['Home', 'Services', 'Gallery', 'Locations', 'Pricing', 'Contact'].map((item) => (
                <Link 
                    key={item} 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="text-xl font-bold text-theme-text hover:text-theme-red transition-colors flex items-center gap-4"
                >
                    <i className={`fas fa-${item === 'Home' ? 'home' : 'circle'} w-6 text-center text-theme-muted`}></i> 
                    {item}
                </Link>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}