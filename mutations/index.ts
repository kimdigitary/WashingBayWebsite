"use server";
import {updateTag} from "next/cache";
import {isAxiosError} from "axios";
import {env} from "@/env";
import {nonAuthAxios} from "@/actions/client-axios";

export type ActionState<T = unknown> = {
    success: boolean;
    message: string;
    data: T;
};

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

async function handleMutation<R = unknown>(
    prev: ActionState<R>,
    data: FormData,
    endpoint: string,
    tag: string,
    method: HttpMethod = "post",
): Promise<ActionState<R>> {
    try {
        const axiosClient = await nonAuthAxios();
        // Support PUT via _method override
        if (method === "put") {
            data.append("_method", method.toUpperCase());
        }

        const config =
            data instanceof FormData
                ? {headers: {"Content-Type": "multipart/form-data"}}
                : {};


        let res;

        if (method === "get" || method === "delete") {
            res = await axiosClient[method](endpoint, config);
        } else {
            res = await axiosClient.post(endpoint, data, config);
        }
        updateTag(tag);

        return {
            ...prev,
            success: true,
            message: "Operation successful.",
            data: res.data as R,
        };
    } catch (error: unknown) {
        if (env.ENV === "local") {
            console.error(error);
            console.log(data);
            if (isAxiosError(error)) {
                const err = {
                    message: error.response?.data?.message,
                    file: error.response?.data?.file,
                    line: error.response?.data?.line,
                    exception: error.response?.data?.exception,
                }
                console.error("Backend error:", err);
            } else {
                console.error("Backend error: Non-Axios error");
            }
        }

        // safe defaults
        let message = "Something went wrong.";
        let responseData: unknown = {};

        // axios error narrowing
        if (isAxiosError(error)) {
            message = error.response?.data?.message ?? message;
            responseData = error.response?.data as R;
        }
        return {
            ...prev,
            success: false,
            message,
            data: responseData as R,
        };
    }
}

async function handleDelete(
    prev: ActionState,
    ids: number[],
    endpoint: string,
    tag: string
): Promise<ActionState> {
    try {
        const axiosClient = await nonAuthAxios();
        const res = await axiosClient.delete(endpoint, {params: {ids}});
        updateTag(tag)
        return {
            ...prev,
            success: true,
            message: "Deleted successfully.",
            data: res.data,
        };
    } catch (error: unknown) {
        if (env.ENV === "local") {
            console.error(error);
            if (isAxiosError(error)) {
                const err = {
                    message: error.response?.data?.message,
                    file: error.response?.data?.file,
                    line: error.response?.data?.line,
                    exception: error.response?.data?.exception,
                }
                console.error("Backend error:", err);
            }
        }

        let message = "Something went wrong.";
        let responseData: unknown = {};

        if (isAxiosError(error)) {
            message = error.response?.data?.message ?? message;
            responseData = error.response?.data ?? {};
        }

        return {
            ...prev,
            success: false,
            message,
            data: responseData,
        };
    }
}

export async function saveEntity<R = unknown>(
    prev: ActionState<R>,
    formData: FormData,
    baseEndpoint: string,
    tag: string,
): Promise<ActionState<R>> {
    const id = formData.get("id");
    const endpoint = id ? `${baseEndpoint}/${id}` : baseEndpoint;
    const method: HttpMethod = id ? "put" : "post";
    return handleMutation<R>(prev, formData, endpoint, tag, method);
}

export async function deleteEntity(
    prev: ActionState,
    ids: number[],
    endpoint: string,
    tag: string
): Promise<ActionState> {
    return await handleDelete(prev, ids, endpoint, tag);
}
