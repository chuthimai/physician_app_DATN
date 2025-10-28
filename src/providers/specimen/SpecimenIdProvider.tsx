import React, {useEffect, useState} from "react";
import { SpecimenIdContext } from "./SpecimenIdContext.tsx";

export const SpecimenIdProvider = ({ children }: { children: React.ReactNode }) => {
    const [specimenId, setSpecimenId] = useState<number | null | undefined | string>(() => {
        const stored = localStorage.getItem("specimenId");
        if (!stored) return undefined;

        if (!isNaN(Number(stored)) && stored.trim() !== "") {
            return Number(stored);
        }
        return stored;
    });

    useEffect(() => {
        if (specimenId) {
            localStorage.setItem("specimenId", specimenId.toString());
        } else {
            localStorage.removeItem("specimenId");
        }
    }, [specimenId]);

    return (
        <SpecimenIdContext.Provider value={{ specimenId, setSpecimenId}}>
            {children}
        </SpecimenIdContext.Provider>
    );
};