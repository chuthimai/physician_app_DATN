import {openDB} from "idb";
import type {HospitalDb} from "@/db/type/HospitalDb.ts";

export const DB_NAME = import.meta.env.VITE_DB_NAME || "HospitalDb";
export const DB_VERSION = import.meta.env.VITE_DB_VERSION || 1;
export const STORE_NAME = import.meta.env.VITE_STORE_NAME || "medications";

// Mở kết nối IndexedDB
export async function openMedicationDB() {
    return openDB<HospitalDb>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: "identifier",
                });
            }
        },
    });
}