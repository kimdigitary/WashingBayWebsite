import {ActionState, saveEntity} from "@/mutations";

export const saveBooking = async (prev: ActionState, formData: FormData) =>
    await saveEntity(prev, formData, "bookings", "bookings");

export const saveContact = async (prev: ActionState, formData: FormData) =>
    await saveEntity(prev, formData, "contact", "contact");
