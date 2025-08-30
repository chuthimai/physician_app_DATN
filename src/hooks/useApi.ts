import {useState, useCallback} from "react";
import {axiosClient} from "../api/axiosClient";

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
                const e = err instanceof Error ? err : new Error("Unknown error");
                setError(e);
                throw e;
            } finally {
                setLoading(false);
            }
        }, []);

    return {request, loading, error};
}
