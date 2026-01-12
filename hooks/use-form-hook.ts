"use client"
import {startTransition, useActionState, useEffect, useRef} from "react";
import {formatLocalForBackend} from "@/utils/utils";
import {ActionState} from "@/mutations";
import {useCustomToast} from "@/components/ui/custom-toast";

export function useFormAction<T extends object, R>(
    actionFn: (prev: ActionState<R>, formData: FormData) => Promise<ActionState<R>>,
    onSuccess?: (state: ActionState<R>) => void
) {
    const initialState: ActionState<R> = {
        success: false,
        message: "",
        data: undefined as unknown as R
    };
    const {toast} = useCustomToast()

    const [state, action, isPending] = useActionState(actionFn, initialState);
    const lastProcessedState = useRef<ActionState<R> | null>(null);

    function onSubmit(data: T) {
        lastProcessedState.current = null;

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
            if ((key === "image" || key === "file") && !(value instanceof File)) return;
            formData.append(key, serializeValue(value));
        });

        startTransition(() => {
            action(formData);
        });
    }

    useEffect(() => {
        if (state !== lastProcessedState.current && !isPending && state.message) {
            if (state.success) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                if (state.data?.message) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    toast('Success', state.data?.message, 'success')
                } else {
                    toast('Success', state.message, 'success')
                }
                onSuccess?.(state);
            } else if (state.message) {
                toast('Error', state.message, 'error')
            }
            lastProcessedState.current = state;
        }
    }, [state, isPending, onSuccess]);

    return {state, isPending, onSubmit};
}

export function useDeleteAction<R = unknown>(
    actionFn: (prev: ActionState<R>, ids: number[]) => Promise<ActionState<R>>,
    onSuccess?: (state: ActionState<R>) => void
) {
    const initialState: ActionState<R> = {
        success: false,
        message: "",
        data: undefined as R
    };

    const {toast} = useCustomToast();
    const [state, action, isPending] = useActionState(actionFn, initialState);

    // Ref to track the state we have already processed to prevent duplicate toasts
    const lastProcessedState = useRef<ActionState<R> | null>(null);

    function onDeleteAction(ids: number[]) {
        // Reset the ref when a new action starts
        lastProcessedState.current = null;
        startTransition(() => action(ids));
    }

    useEffect(() => {
        // Only trigger effects if the state is new, we aren't loading, and there's a message
        if (state !== lastProcessedState.current && !isPending && state.message) {
            if (state.success) {
                toast('Success', state.message, 'success')
                onSuccess?.(state);
            } else {
                toast('Error', state.message, 'error')
            }
            // Mark this specific state object as processed
            lastProcessedState.current = state;
        }
    }, [state, isPending, onSuccess, toast]);

    return {state, isPending, onDeleteAction};
}

export function useServerAction<T, R = unknown>(
    actionFn: (prev: ActionState<R>, arg: T) => Promise<ActionState<R>>,
    onSuccess?: (state: ActionState<R>) => void
) {
    const initialState: ActionState<R> = {
        success: false,
        message: "",
        data: undefined as R
    };

    const {toast} = useCustomToast();
    const [state, action, isPending] = useActionState(actionFn, initialState);
    const lastProcessedState = useRef<ActionState<R> | null>(null);

    function onAction(arg: T) {
        lastProcessedState.current = null;
        startTransition(() => action(arg));
    }

    useEffect(() => {
        if (state !== lastProcessedState.current && !isPending && state.message) {
            if (state.success) {
                toast('Success', state.message, 'success')
                onSuccess?.(state);
            } else {
                toast('Error', state.message, 'error')
            }
            lastProcessedState.current = state;
        }
    }, [state, isPending, onSuccess, toast]);

    return {state, isPending, onAction};
}

function serializeValue(value: unknown): string | Blob {
    if (value instanceof Date) {
        return formatLocalForBackend(value);
    }

    if (value instanceof File || value instanceof Blob) {
        return value;
    }

    if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
        return JSON.stringify(convertForJson(value));
    }

    return String(value);
}

function convertForJson(value: unknown): unknown {
    if (value instanceof Date) {
        return formatLocalForBackend(value);
    }

    if (Array.isArray(value)) {
        return value.map(item => convertForJson(item));
    }

    if (typeof value === "object" && value !== null) {
        const result: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(value)) {
            result[k] = convertForJson(v);
        }
        return result;
    }

    return value;
}
