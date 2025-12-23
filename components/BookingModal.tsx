"use client";
import { Button } from "@/components/ui/button"; // The @ alias usually works if tsconfig is set up, otherwise use "../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BookingModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-theme-red hover:bg-theme-darkRed text-white rounded-full font-bold px-6 py-2.5 shadow-[0_4px_15px_rgba(220,38,38,0.3)] hover:-translate-y-0.5 transition-all">
          <i className="fas fa-calendar-check mr-2"></i> Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-theme-surface border-theme-red text-theme-text sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-bold text-theme-red">Book Service</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-theme-muted uppercase">Service Package</Label>
            <Select>
              <SelectTrigger className="bg-theme-black border-theme-accent text-white h-12"><SelectValue placeholder="Select a package" /></SelectTrigger>
              <SelectContent className="bg-theme-surface border-theme-accent text-white"><SelectItem value="express">Express Wash</SelectItem><SelectItem value="ceramic">Ceramic Coating</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-theme-muted uppercase">Name</Label>
            <Input className="bg-theme-black border-theme-accent text-white h-12" placeholder="John Doe" />
          </div>
        </div>
        <div className="flex gap-3">
            <Button className="w-full bg-theme-red hover:bg-theme-darkRed">Confirm Booking</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}