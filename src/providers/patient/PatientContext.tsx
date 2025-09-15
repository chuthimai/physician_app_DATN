import {createContext} from "react";
import type Patient from "@/types/patient.ts";

export type PatientContextType = {
    patient: Patient | undefined,
    setPatient: (patientInfo: Patient | undefined) => void,
}

export const PatientContext = createContext<PatientContextType | null>(null)