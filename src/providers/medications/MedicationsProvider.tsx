import React, {useEffect, useState} from "react";
import { MedicationsContext } from "./MedicationsContext";
import type PresribedMedication from "@/features/diagnosis/type/PresribedMedication.ts";

export const MedicationsProvider = ({ children }: { children: React.ReactNode }) => {
    const [medications, setMedications] = useState<PresribedMedication[]>(() => {
        const stored = localStorage.getItem("medications");
        try {
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("medications", JSON.stringify(medications));
    }, [medications]);

    return (
        <MedicationsContext.Provider value={{ medications, setMedications }}>
            {children}
        </MedicationsContext.Provider>
    );
};