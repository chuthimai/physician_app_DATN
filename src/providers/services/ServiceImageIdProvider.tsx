import React, {useEffect, useState} from "react";
import { ServiceImageIdContext } from "./ServiceImageIdContext.tsx";

export const ServiceImageIdProvider = ({ children }: { children: React.ReactNode }) => {
    const [serviceImageId, setServiceImageId] = useState<number | null | undefined>(() => {
        const stored = localStorage.getItem("serviceImageId");
        if (!stored) return undefined;

        if (!isNaN(Number(stored)) && stored.trim() !== "") {
            return Number(stored);
        }
        return undefined;
    });

    useEffect(() => {
        if (serviceImageId) {
            localStorage.setItem("serviceImageId", serviceImageId.toString());
        } else {
            localStorage.removeItem("serviceImageId");
        }
    }, [serviceImageId]);

    return (
        <ServiceImageIdContext.Provider value={{ serviceImageId, setServiceImageId}}>
            {children}
        </ServiceImageIdContext.Provider>
    );
};