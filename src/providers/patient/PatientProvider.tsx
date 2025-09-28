import React, {useEffect, useState} from "react";
import { PatientContext } from "./PatientContext.tsx";
import type Patient from "@/types/Patient.ts";


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