import React, {useEffect, useState} from "react";
import {MedicationEditingContext} from "./MedicationEditingContext";
import type PrescribedMedication from "@/features/diagnosis/type/PrescribedMedication.ts";

export const MedicationEditingProvider = ({ children }: { children: React.ReactNode }) => {
    const [medicationEditing, setMedicationEditing] = useState<PrescribedMedication | undefined>(() => {
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