import { useState, useCallback } from "react";
import { axiosClient } from "../api/axiosClient";
import type { AxiosError } from "axios";
import {useToast} from "@/hooks/useToast.ts";

export function useApi<T>() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const {showToastError} = useToast();

    // --- Hàm xử lý lỗi chung ---
    const handleGeneralError = useCallback((err: Error) => {
        if (err.message.toLowerCase().includes("network error")) {
            showToastError("Mạng không ổn định, vui lòng thử lại.");
            return;
        }
        if (err.message.toLowerCase().includes("timeout")) {
            showToastError("Kết nối quá hạn, thử lại sau.");
            return;
        }
        if (err.message === "Unknown error") {
            showToastError(err.message || "Đã có lỗi xảy ra");
            return;
        }
    }, [showToastError]);

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
                handleGeneralError(e);
                throw e;
            } finally {
                setLoading(false);
            }
        },
        [handleGeneralError]
    );

    return { request, loading, error };
}
