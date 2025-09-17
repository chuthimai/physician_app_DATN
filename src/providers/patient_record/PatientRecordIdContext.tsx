import {createContext} from "react";

export type PatientRecordIdContextType = {
    patientRecordId: number | null;
    setPatientRecordId: (r: number | null) => void;
};

export const PatientRecordIdContext = createContext<PatientRecordIdContextType | null>(null);