import {createContext} from "react";

export type RoleContextType = {
    role: string;
    setRole: (r: string) => void;
};

export const RoleContext = createContext<RoleContextType | undefined>(undefined);