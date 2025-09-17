import { useState, useCallback } from "react";
import { axiosClient } from "../api/axiosClient";
import type { AxiosError } from "axios";
import {useToast} from "@/hooks/useToast.ts";

type ApiError = {
    message: string;
    statusCode: number;
};


export function useApi<T>() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);
    const {showToastError} = useToast();

    // --- Hàm xử lý lỗi chung ---
    const handleGeneralError = useCallback(
        (err: ApiError) => {
            const statusCode = err.statusCode;

            switch (statusCode) {
                case 400:
                    showToastError("Yêu cầu không hợp lệ (400).");
                    break;

                case 401:
                    showToastError("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn (401).");
                    break;

                case 403:
                    showToastError("Bạn không có quyền truy cập (403).");
                    break;

                case 404:
                    showToastError("Không tìm thấy tài nguyên (404).");
                    break;

                case 408:
                    showToastError("Kết nối quá hạn, thử lại sau (408).");
                    break;

                case 500:
                    showToastError("Lỗi server nội bộ (500).");
                    break;

                default:
                    showToastError(err?.message || "Đã có lỗi xảy ra");
            }
        },
        [showToastError],
    );


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
                let apiError: ApiError;

                if ((err as AxiosError)?.response) {
                    const axiosErr = err as AxiosError<{
                        statusCode: number;
                        message: string;
                    }>;
                    apiError = {
                        message:
                            axiosErr.response?.data?.message || axiosErr.message || "Error",
                        statusCode: axiosErr.response?.status || 500,
                    };
                } else {
                    apiError = {
                        message: (err as Error)?.message || "Unknown error",
                        statusCode: 500,
                    };
                }

                setError(apiError);
                handleGeneralError(apiError);
                throw apiError;
            } finally {
                setLoading(false);
            }
        },
        [handleGeneralError]
    );

    return { request, loading, error };
}
