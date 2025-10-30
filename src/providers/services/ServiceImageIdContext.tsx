import {createContext} from "react";

export type ServiceImageIdContext = {
    serviceImageId: number | null | undefined;
    setServiceImageId: (r: number | null | undefined) => void;
};

export const ServiceImageIdContext = createContext<ServiceImageIdContext | undefined | null>(undefined);
