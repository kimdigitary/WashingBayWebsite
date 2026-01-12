import {ActionState, saveEntity} from "@/mutations";
import {BookingResponse} from "@/types";

// export const saveBooking = async (prev: ActionState, formData: FormData) =>
//     await saveEntity<BookingResponse>(prev, formData, "bookings", "bookings");

export const saveBooking = async (
    prev: ActionState<BookingResponse>,
    formData: FormData
): Promise<ActionState<BookingResponse>> => {
    return await saveEntity<BookingResponse>(prev, formData, "bookings", "bookings");
};

export const saveContact = async (prev: ActionState, formData: FormData) =>
    await saveEntity(prev, formData, "contact", "contact");
