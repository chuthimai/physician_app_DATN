import { RoleProvider } from "./role/RoleProvider.tsx";
import React from "react";
import {MedicationsProvider} from "@/providers/medications/MedicationsProvider.tsx";
import {MedicationEditingProvider} from "@/providers/medications/MedicationEditingProvider.tsx";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <RoleProvider>
            <MedicationsProvider>
                <MedicationEditingProvider>
                    {children}
                </MedicationEditingProvider>
            </MedicationsProvider>
        </RoleProvider>
    );
};
