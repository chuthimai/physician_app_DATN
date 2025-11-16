import axios from "axios";
import { setupAuthInterceptor } from "./authInterceptor";
import { TokenManager } from "./tokenManager";
import log from "loglevel";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.example.com";

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    timeout: 15000, // connectTimeout
    headers: { Accept: "application/json" },
});

// TokenManager riêng cho refresh token
const tokenManager = new TokenManager(BASE_URL);

// Log request/response khi ở dev
if (import.meta.env.VITE_NODE_ENV === "development") {
    axiosClient.interceptors.request.use(req => {
        log.info("Request:", req);
        return req;
    });

    axiosClient.interceptors.response.use(res => {
        log.info("Response:", res.data);
        return res;
    });
}

// Thêm auth interceptor
setupAuthInterceptor(axiosClient, tokenManager);
