import {createContext} from "react";
import type PrescribedMedication from "@/features/diagnosis/type/PrescribedMedication.ts";

export type MedicationsContextType = {
    medications: PrescribedMedication[];
    setMedications: (r: PrescribedMedication[]) => void;
};

export const MedicationsContext = createContext<MedicationsContextType | undefined>(undefined);