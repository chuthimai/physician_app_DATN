import {createContext} from "react";
import type {Service} from "@/features/add_services/types/Service.ts";

export type ServicesContextType = {
    services: Service[];
    setServices: (r: Service[]) => void;
};

export const ServicesContext = createContext<ServicesContextType | undefined>(undefined);