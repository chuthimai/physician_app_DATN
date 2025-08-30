class TokenStorage {
    async readAccessToken(): Promise<string | null> {
        return sessionStorage.getItem("access_token");
    }

    async readRefreshToken(): Promise<string | null> {
        return sessionStorage.getItem("refresh_token");
    }

    async writeAccessToken(token: string) {
        sessionStorage.setItem("access_token", token);
    }

    async writeRefreshToken(token: string) {
        sessionStorage.setItem("refresh_token", token);
    }

    async deleteTokens() {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
    }
}

export const tokenStorage = new TokenStorage();
