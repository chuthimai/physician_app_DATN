import {useNavigate} from "react-router-dom";
import {UserContext} from "@/providers/user/UserContext.tsx";
import {useContext} from "react";
import type {User} from "@/types/User.ts";
import {useApi} from "@/hooks/useApi.ts";
import type {LoginResponse} from "@/features/auth/types/LoginResponse.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import {tokenStorage} from "@/api/secureTokenStorage.ts";
import {logout} from "@/api/logout.ts";
import log from "loglevel";
import {useToast} from "@/hooks/useToast.ts";
import type {LoginParams} from "@/features/auth/types/LoginParams.ts";

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
                gender: response.gender === "1",
                photo: response.photo,
                role: response.role,
                address: response.address,
                startDate: new Date(response.startDate),
                specialty: response.specialty,
                qualifications: response.qualifications,
            };
            userContext?.setUser(user);
            navigator("/");
            showToastSuccess("Đăng nhập thành công")
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`useAuth: ${e.message}`);
            if (e.message === "User not found") {
                showToastError("Sai thông tin đăng nhập");
            }
        }

    };

    const logoutAuth = async () => {
        await logout();
        showToastSuccess("Đăng xuất thành công")
    }

    return {
        login,
        logout: logoutAuth,
        loading,
        error
    }
}