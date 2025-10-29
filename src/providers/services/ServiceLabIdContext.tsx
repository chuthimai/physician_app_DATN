import {createContext} from "react";

export type ServiceLabIdContext = {
    serviceLabId: number | null | undefined;
    setServiceLabId: (r: number | null | undefined) => void;
};

export const ServiceLabIdContext = createContext<ServiceLabIdContext | undefined | null>(undefined);
