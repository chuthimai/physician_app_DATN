import axios from "axios";
import { setupAuthInterceptor } from "./authInterceptor";
import { TokenManager } from "./tokenManager";
import log from "loglevel";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.example.com";

export const axiosMultipartClient = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // thường upload chậm hơn
    headers: {
        "Accept": "application/json",
    },
});

const tokenManager = new TokenManager(BASE_URL);

// Log request/response trong dev mode
if (import.meta.env.VITE_NODE_ENV === "development") {
    axiosMultipartClient.interceptors.request.use(req => {
        log.info("Multipart Request:", req);
        return req;
    });

    axiosMultipartClient.interceptors.response.use(res => {
        return res;
    });
}

// Thêm auth interceptor như axiosClient
setupAuthInterceptor(axiosMultipartClient, tokenManager);
