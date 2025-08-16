import {createContext} from "react";

export type PatientRecordIdContextType = {
    patientRecordId: string | null;
    setPatientRecordId: (r: string | null) => void;
};

export const PatientRecordIdContext = createContext<PatientRecordIdContextType | null>(null);