import {createContext} from "react";
import type PrescribedMedication from "@/features/diagnosis/type/PrescribedMedication.ts";

export type MedicationEditingContextType = {
    medicationEditing: PrescribedMedication | undefined;
    setMedicationEditing: (r: PrescribedMedication | undefined) => void;
};

export const MedicationEditingContext = createContext<MedicationEditingContextType | undefined>(undefined);