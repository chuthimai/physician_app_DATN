import {createContext} from "react";
import type PresribedMedication from "@/features/diagnosis/type/PresribedMedication.ts";

export type MedicationEditingContextType = {
    medicationEditing: PresribedMedication | undefined;
    setMedicationEditing: (r: PresribedMedication | undefined) => void;
};

export const MedicationEditingContext = createContext<MedicationEditingContextType | undefined>(undefined);