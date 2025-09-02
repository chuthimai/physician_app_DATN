import {
    AxiosError,
    type AxiosInstance,
    type AxiosResponse,
    type InternalAxiosRequestConfig
} from "axios";
import { tokenStorage } from "./secureTokenStorage";
import { TokenManager } from "./tokenManager";
import {logout} from "@/api/logout.ts";

let isRefreshing = false;
// Danh sách các callback, chứa những request bị 401 đang chờ token mới để được gọi lại.
let waitQueue: ((token: string) => void)[] = [];

export function setupAuthInterceptor(api: AxiosInstance, tokenManager: TokenManager) {
    // Gắn accessToken cho mỗi request
    api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
        const token = await tokenStorage.readAccessToken();
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    });

    // Xử lý lỗi 401
    api.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & {
                _retry?: boolean;
            };

            if (error.response?.status === 401 && !originalRequest._retry) {
                // Nếu đang refresh thì chờ
                if (isRefreshing) {
                    return new Promise(resolve => {
                        waitQueue.push((newToken: string) => {
                            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                            resolve(api(originalRequest));
                        });
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const newToken = await tokenManager.tryRefreshToken();
                    if (newToken) {
                        waitQueue.forEach(cb => cb(newToken));
                        waitQueue = [];

                        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                        return api(originalRequest);
                    } else {
                        await logout();
                    }
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );
}
