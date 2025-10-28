import {createContext} from "react";

export type SpecimenIdContext = {
    specimenId: number | null | undefined | string;
    setSpecimenId: (r: number | null | undefined) => void;
};

export const SpecimenIdContext = createContext<SpecimenIdContext | null>(null);
