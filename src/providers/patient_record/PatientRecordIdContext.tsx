import {createContext} from "react";

export type PatientRecordIdContextType = {
    patientRecordId: number | null | undefined;
    setPatientRecordId: (r: number | null | undefined) => void;
};

export const PatientRecordIdContext = createContext<PatientRecordIdContextType | null>(null);