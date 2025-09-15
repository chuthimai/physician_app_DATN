import React, {useEffect, useState} from "react";
import type Patient from "@/features/specialist_appointment/types/Patient.ts";
import { PatientContext } from "./PatientContext.tsx";


export const PatientProvider = ({children}: { children: React.ReactNode }) => {
    const [patient, setPatient] = useState<Patient | undefined>(() => {
        const stored = localStorage.getItem("patient");
        try {
            return stored ? JSON.parse(stored) : undefined;
        } catch {
            return undefined;
        }
    });

    useEffect(() => {
        localStorage.setItem("patient", JSON.stringify(patient));
    }, [patient]);

    return (
        <PatientContext.Provider value={{patient, setPatient}}>
            {children}
        </PatientContext.Provider>
    );
};