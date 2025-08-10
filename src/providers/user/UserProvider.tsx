import React, {useEffect, useState} from "react";
import {UserContext} from "@/providers/user/UserContext.tsx";
import type {User} from "@/features/auth/types.ts";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | undefined>(() => {
        const stored = localStorage.getItem("user");
        try {
            return stored ? JSON.parse(stored) : undefined;
        } catch {
            return undefined;
        }
    });

    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};