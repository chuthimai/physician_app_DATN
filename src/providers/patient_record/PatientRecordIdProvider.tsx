import React, {useEffect, useState} from "react";
import { PatientRecordIdContext } from "./PatientRecordIdContext.tsx";

export const PatientRecordIdProvider = ({ children }: { children: React.ReactNode }) => {
    const [patientRecordId, setPatientRecordId] = useState<string | null>(() => {
        return localStorage.getItem("patientRecordId");
    });

    useEffect(() => {
        if (patientRecordId) {
            localStorage.setItem("patientRecordId", patientRecordId);
        } else {
            localStorage.removeItem("patientInfo");
        }
    }, [patientRecordId]);

    return (
        <PatientRecordIdContext.Provider value={{ patientRecordId, setPatientRecordId }}>
            {children}
        </PatientRecordIdContext.Provider>
    );
};