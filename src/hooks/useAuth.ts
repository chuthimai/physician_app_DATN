import {users} from "@/fake_data/user.ts";
import {useNavigate} from "react-router-dom";
import {UserContext} from "@/providers/user/UserContext.tsx";
import {useContext} from "react";
import type {User} from "@/features/auth/types.ts";
import {useResetLocalStorage} from "@/hooks/useResetLocalStorage.ts";

export default function useAuth() {
    const navigator = useNavigate();
    const userContext = useContext(UserContext);
    const { resetLocalStorage } = useResetLocalStorage();

    const checkLogin = (id: number, password: string) => {
        const user = users.find(user => user.id === id && user.password === password);
        if (!user) throw new Error("Invalid username or password");
        const userData: User = {
            ...user,
            birthDate: new Date(user.birthDate) // ép sang Date
        };
        userContext?.setUser(userData);
        navigator("/");
    }

    const logout = () => {
        resetLocalStorage();
        navigator('/login');
    }

    return {
        checkLogin,
        logout,
    }
}