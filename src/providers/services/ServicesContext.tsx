import {createContext} from "react";
import type {ServiceSend} from "@/features/add_services/type.ts";

export type ServicesContextType = {
    services: ServiceSend[];
    setServices: (r: ServiceSend[]) => void;
};

export const ServicesContext = createContext<ServicesContextType | undefined>(undefined);