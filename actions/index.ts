import {ActionState, deleteEntity, saveEntity} from "@/mutations";

export const saveBooking = async (prev: ActionState, formData: FormData) =>
    await saveEntity(prev, formData, "bookings", "bookings");
