import {z} from "zod";

export function capitalize(word: string) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatLocalForBackend(date: Date) {
    const pad = (n: number) => n.toString().padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    const offsetMinutesTotal = -date.getTimezoneOffset();

    const offsetHours = Math.floor(Math.abs(offsetMinutesTotal) / 60);
    const offsetMinutes = Math.abs(offsetMinutesTotal) % 60;

    const sign = offsetMinutesTotal >= 0 ? '+' : '-';

    const offsetPart = `${sign}${pad(offsetHours)}:${pad(offsetMinutes)}`;

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${offsetPart}`;
}

export function ucwords(str: string) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
}
export const isValidEmail = (email: string): boolean => {
    const emailSchema = z.email();
    const result = emailSchema.safeParse(email);
    return result.success;
};
