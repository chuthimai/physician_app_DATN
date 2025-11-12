import {createContext} from "react";
import type {AddedService} from "@/features/add_services/types/AddedService.ts";

export type ServicesContextType = {
    services: AddedService[];
    setServices: (r: AddedService[]) => void;
};

export const ServicesContext = createContext<ServicesContextType | undefined>(undefined);