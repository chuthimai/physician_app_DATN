import type { Service } from "@/features/add_services/type";
import {createContext} from "react";

export type ServicesContextType = {
    services: Service[];
    setServices: (r: Service[]) => void;
};

export const ServicesContext = createContext<ServicesContextType | undefined>(undefined);