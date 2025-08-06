import {createContext} from "react";
import type PresribedMedication from "@/features/diagnosis/type/PresribedMedication.ts";

export type MedicationsContextType = {
    medications: PresribedMedication[];
    setMedications: (r: PresribedMedication[]) => void;
};

export const MedicationsContext = createContext<MedicationsContextType | undefined>(undefined);