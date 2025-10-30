import type {DBSchema} from "idb";

export interface HospitalDb extends DBSchema {
    medications: {
        key: number;
        value: {
            identifier: number;
            name: string;
            code: string;
            doseForm: string;
        };
        indexes: { name: string };
    };
}