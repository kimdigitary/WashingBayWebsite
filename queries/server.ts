'use server'
import {SearchParams} from "@/types";
import axios from "axios";
import {nonAuthAxios} from "@/actions/client-axios";

export async function fetchData<T>(
    endpoint: string,
    searchParams?: Promise<SearchParams>,
): Promise<T> {
    const params = searchParams ? await searchParams : undefined;
    try {
        const axiosClient = await nonAuthAxios();
        const {data} = await axiosClient.get<T>(endpoint, {params});
        return data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.error("Laravel error response:", err);
            console.error("Laravel error response:", err.response?.data);
            throw new Error(JSON.stringify(err.response?.data));
        }
        throw err;
    }
}
