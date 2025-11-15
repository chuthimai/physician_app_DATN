import React, {useEffect, useState} from "react";
import { ServicesContext } from "./ServicesContext";
import type {Service} from "@/types/models/Service.ts";

export const ServicesProvider = ({ children }: { children: React.ReactNode }) => {
    const [services, setServices] = useState<Service[]>(() => {
        const stored = localStorage.getItem("services");
        try {
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
            localStorage.setItem("services", JSON.stringify(services));
        },
        [services]);

    return (
        <ServicesContext.Provider value={{ services, setServices }}>
            {children}
        </ServicesContext.Provider>
    );
};