import { create } from "zustand";

interface BookingStore {
    date: string;
}

export const useDialogStore = create<BookingStore>((set) => ({
    open: false,
    onOpenChange: (open: boolean) => set({ open }),
}));
