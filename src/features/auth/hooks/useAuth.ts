import {useNavigate} from "react-router-dom";
import {UserContext} from "@/providers/user/UserContext.tsx";
import {useContext} from "react";
import type {User} from "@/types/user.ts";
import {useApi} from "@/hooks/useApi.ts";
import type {LoginParams, LoginResponse} from "@/features/auth/types.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import {tokenStorage} from "@/api/secureTokenStorage.ts";
import {logout} from "@/api/logout.ts";
import log from "loglevel";
import {useToast} from "@/hooks/useToast.ts";

export default function useAuth() {
    const navigator = useNavigate();
    const userContext = useContext(UserContext);
    const { request, loading, error } = useApi<LoginResponse>();
    const {showToastSuccess, showToastError} = useToast();

    const login = async (payload: LoginParams) => {
        try {
            const response = await request("post", ENDPOINTS.LOGIN, payload);
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
            await navigator("/");
            showToastSuccess("Đăng nhập thành công")
        } catch (e) {
            if (e instanceof Error) {
                log.error(`useAuth: ${e.message}`);
                showToastError("Sai số CCCD hoặc mật khẩu")
            }
        }

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