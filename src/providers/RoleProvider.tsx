import React, {createContext, useEffect, useState} from "react";

type RoleContextType = {
    role: string;
    setRole: (r: string) => void;
};

export const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
    const [role, setRole] = useState(() => localStorage.getItem("role") || "");

    useEffect(() => {
      localStorage.setItem("role", role);
    }, [role]);

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
};