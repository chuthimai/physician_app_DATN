import {createContext} from "react";

export type PatientRecordStateContextType = {
    isClose: boolean | undefined;
    setPatientRecordState: (isClose: boolean | undefined) => void;
};

export const PatientRecordStateContext = createContext<PatientRecordStateContextType | null>(null);
