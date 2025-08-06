import React, {useEffect, useState} from "react";
import {RoleContext} from "@/providers/role/RoleContext.tsx";

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