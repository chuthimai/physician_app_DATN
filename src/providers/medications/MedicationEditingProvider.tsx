import React, {useEffect, useState} from "react";
import {MedicationEditingContext} from "./MedicationEditingContext";
import type PresribedMedication from "@/features/diagnosis/type/PresribedMedication.ts";

export const MedicationEditingProvider = ({ children }: { children: React.ReactNode }) => {
    const [medicationEditing, setMedicationEditing] = useState<PresribedMedication | undefined>(() => {
        const stored = localStorage.getItem("medicationEditing");
        try {
            return stored ? JSON.parse(stored) : undefined;
        } catch {
            return undefined;
        }
    });

    useEffect(() => {
        localStorage.setItem("medicationEditing", JSON.stringify(medicationEditing));
    }, [medicationEditing]);

    return (
        <MedicationEditingContext.Provider value={{ medicationEditing, setMedicationEditing }}>
            {children}
        </MedicationEditingContext.Provider>
    );
};