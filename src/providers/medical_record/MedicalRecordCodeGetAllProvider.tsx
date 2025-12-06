import React, {useEffect, useState} from "react";
import {MedicalRecordCodeGetAllContext} from "@/providers/medical_record/MedicalRecordCodeGetAllContext.tsx";

export const MedicalRecordCodeGetAllProvider = ({ children }: { children: React.ReactNode }) => {
    const [medicalRecordCodeGetAll, setMedicalRecordCodeGetAll] = useState<null | undefined | string>(() => {
        const stored = localStorage.getItem("medicalRecordCodeGetAll");
        if (!stored) return undefined;

        if (stored.trim() !== "") {
            return stored;
        }
        return stored;
    });

    useEffect(() => {
        if (medicalRecordCodeGetAll) {
            localStorage.setItem("medicalRecordCodeGetAll", medicalRecordCodeGetAll.toString());
        } else {
            localStorage.removeItem("medicalRecordCodeGetAll");
        }
    }, [medicalRecordCodeGetAll]);

    return (
        <MedicalRecordCodeGetAllContext.Provider value={{ medicalRecordCodeGetAll, setMedicalRecordCodeGetAll }}>
            {children}
        </MedicalRecordCodeGetAllContext.Provider>
    );
};