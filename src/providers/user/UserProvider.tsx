import React, {useEffect, useState} from "react";
import {UserContext} from "@/providers/user/UserContext.tsx";
import type {User} from "@/types/models/User.ts";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | undefined>(() => {
        const stored = localStorage.getItem("user");
        try {
            if (!stored) return undefined;
            const parsed = JSON.parse(stored) as User;
            return {
                ...parsed,
                birthDate: parsed.birthDate ? new Date(parsed.birthDate) : undefined,
                startDate: new Date(parsed.startDate),
            };
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