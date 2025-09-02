import {useNavigate} from "react-router-dom";
import {UserContext} from "@/providers/user/UserContext.tsx";
import {useContext} from "react";
import type {User} from "@/types/user.ts";
import {useApi} from "@/hooks/useApi.ts";
import type {LoginParams, LoginResponse} from "@/features/auth/types.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import {tokenStorage} from "@/api/secureTokenStorage.ts";
import {logout} from "@/api/logout.ts";

export default function useAuth() {
    const navigator = useNavigate();
    const userContext = useContext(UserContext);
    const { request, loading, error } = useApi<LoginResponse>();

    const login = async (payload: LoginParams) => {
        const response = await request("post", ENDPOINTS.LOGIN, payload);
        if (!response) throw new Error("Sai số CCCD hoặc mật khẩu");
        await tokenStorage.writeAccessToken(response.token);
        const user: User = {
            id: response.identifier,
            name: response.name,
            telecom: response.telecom,
            email: response.email,
            birthDate: new Date(response.birthDate),
            gender: response.gender,
            photo: response.photo,
            role: response.role,
        };

        userContext?.setUser(user);
        navigator("/");
    };

    const logoutAuth = async () => {
        await logout();
    }

    return {
        login,
        logout: logoutAuth,
        loading,
        error
    }
}