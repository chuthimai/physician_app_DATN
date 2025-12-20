import React, {useEffect, useState} from "react";
import { PatientRecordStateContext } from "./PatientRecordStateContext.tsx";

export const PatientRecordStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [patientRecordState, setPatientRecordState] = useState<boolean | undefined>(() => {
        const stored = localStorage.getItem("patientRecordIsClose");
        if (!stored) return undefined;

        if (!isNaN(Number(stored)) && stored.trim() !== "") {
            if (stored === "1") return true;
            if (stored === "0") return false;
        }
        return undefined;
    });

    useEffect(() => {
        if (patientRecordState) {
            localStorage.setItem("patientRecordIsClose", patientRecordState ? "1" : "0");
        } else {
            localStorage.removeItem("patientRecordIsClose");
        }
    }, [patientRecordState]);

    return (
        <PatientRecordStateContext.Provider value={{ isClose: patientRecordState, setPatientRecordState }}>
            {children}
        </PatientRecordStateContext.Provider>
    );
};