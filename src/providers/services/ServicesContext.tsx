import {createContext} from "react";
import type {Service} from "@/fake_data/services.ts";

export type ServicesContextType = {
    services: Service[];
    setServices: (r: Service[]) => void;
};

export const ServicesContext = createContext<ServicesContextType | undefined>(undefined);