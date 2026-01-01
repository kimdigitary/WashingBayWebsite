import axios, {AxiosInstance} from "axios";
import {env} from "@/env";

export async function nonAuthAxios(): Promise<AxiosInstance> {

    return axios.create({
        baseURL: `${env.BACKEND_API_URL}/api`,
        headers: {
            Accept: "application/json",
        },
    });
}
