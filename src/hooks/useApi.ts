import { useState, useCallback } from "react";
import { axiosClient } from "../api/axiosClient";
import type { AxiosError } from "axios";

export function useApi<T>() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);


    const request = useCallback(
        async (
            method: "get" | "post" | "put" | "delete",
            url: string,
            data?: unknown,
            params?: Record<string, unknown>
        ) => {
            setLoading(true);
            setError(null);
            try {
                const res = await axiosClient.request<T>({
                    method,
                    url,
                    data,
                    params,
                });
                return res.data;
            } catch (err) {
                // --- Xử lý riêng AxiosError ---
                if ((err as AxiosError)?.response) {
                    const axiosErr = err as AxiosError<{ statusCode: number; message: string }>;
                    const msg = axiosErr.response?.data?.message || axiosErr.message;
                    const e = new Error(msg);
                    setError(e);
                    throw e;
                }

                // --- fallback ---
                const e = err instanceof Error ? err : new Error("Unknown error");
                setError(e);
                throw e;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return { request, loading, error };
}
