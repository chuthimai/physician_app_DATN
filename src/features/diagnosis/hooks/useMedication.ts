import {openMedicationDB, STORE_NAME} from "@/db/indexDbClient";
import type Medication from "../type/Medication";
import {useApi} from "@/hooks/useApi.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import {CACHE_EXPIRY} from "@/constants/prescription/call_api_constants.ts";

export default function useMedication() {
    const {request, loading, error} = useApi<Medication[]>();

    const saveMedicationsInDb = async (medications: Medication[]) => {
        const db = await openMedicationDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);

        for (const med of medications) {
            store.put(med); // insert/update
        }

        await tx.done;
        db.close();
    }

    const getAllMedicationsFromDb = async (): Promise<Medication[]> => {
        const db = await openMedicationDB();
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const meds = await store.getAll();
        db.close();
        return meds;
    }

    const clearMedicationsInDb = async () => {
        const db = await openMedicationDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        await tx.objectStore(STORE_NAME).clear();
        db.close();
    }

    const fetchMedicationsFromApi = async () => {
        const lastUpdated = localStorage.getItem("medications_last_update");
        const now = Date.now();

        if (lastUpdated && now - Number(lastUpdated) < CACHE_EXPIRY) {
            log.info("Chưa qua 24h để có thể cập nhật ds thuốc");
            return;
        }

        try {
            const response = await request("get", ENDPOINTS.GET_ALL_MEDICINE);
            await saveMedicationsInDb(response);
        } catch (e) {
            log.error(`fetchMedicationsFromApi: ${e}`);
        }
    }

    return {
        getAllMedicationsFromDb,
        clearMedicationsInDb,
        fetchMedicationsFromApi,
        loading,
        error
    }

}