import axios, {type AxiosInstance } from "axios";
import { tokenStorage } from "./secureTokenStorage";
import log from "loglevel";

export class TokenManager {
    private api: AxiosInstance;

    constructor(baseURL: string) {
        this.api = axios.create({ baseURL });
    }

    async tryRefreshToken(): Promise<string | null> {
        const refreshToken = await tokenStorage.readRefreshToken();
        if (!refreshToken) return null;

        try {
            const resp = await this.api.post("/auth/refresh", {
                refresh_token: refreshToken,
            });

            const { access_token, refresh_token } = resp.data;
            if (access_token) {
                await tokenStorage.writeAccessToken(access_token);
                if (refresh_token) {
                    await tokenStorage.writeRefreshToken(refresh_token);
                }
                return access_token;
            }
        } catch (e) {
            log.error("Refresh token failed", e);
        }
        return null;
    }
}
