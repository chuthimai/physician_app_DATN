import {createContext} from "react";

export type PatientRecordIdContextType = {
    medicalRecordCodeGetAll: null | undefined | string;
    setMedicalRecordCodeGetAll: (r: string | null | undefined) => void;
};

export const MedicalRecordCodeGetAllContext = createContext<PatientRecordIdContextType | undefined>(undefined);
