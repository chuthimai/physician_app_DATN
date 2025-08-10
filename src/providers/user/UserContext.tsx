import {createContext} from "react";
import type {User} from "@/features/auth/types.ts";

export type UserContextType = {
    user: User | undefined;
    setUser: (r: User | undefined) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);