import { RoleProvider } from "./RoleProvider";
import React from "react";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <RoleProvider>
            {children}
        </RoleProvider>
    );
};
