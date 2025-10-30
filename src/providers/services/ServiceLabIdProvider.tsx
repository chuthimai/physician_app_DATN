import React, {useEffect, useState} from "react";
import { ServiceLabIdContext } from "./ServiceLabIdContext.tsx";

export const ServiceLabIdProvider = ({ children }: { children: React.ReactNode }) => {
    const [serviceLabId, setServiceLabId] = useState<number | null | undefined>(() => {
        const stored = localStorage.getItem("serviceLabId");
        if (!stored) return undefined;

        if (!isNaN(Number(stored)) && stored.trim() !== "") {
            return Number(stored);
        }
        return undefined;
    });

    useEffect(() => {
        if (serviceLabId) {
            localStorage.setItem("serviceLabId", serviceLabId.toString());
        } else {
            localStorage.removeItem("serviceLabId");
        }
    }, [serviceLabId]);

    return (
        <ServiceLabIdContext.Provider value={{ serviceLabId, setServiceLabId}}>
            {children}
        </ServiceLabIdContext.Provider>
    );
};