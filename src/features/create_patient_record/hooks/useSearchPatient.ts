import {useApi} from "@/hooks/useApi.ts";
import type {PatientResponse} from "@/features/create_patient_record/types/PatientResponse.ts";
import {useState} from "react";
import log from "loglevel";
import {ENDPOINTS} from "@/constants/endpoints.ts";

export default function useSearchPatient() {
    const { request, loading, error } = useApi<PatientResponse[]>();
    const [results, setResults] = useState<PatientResponse[]>([]);

    const searchPatients = async (name: string) => {
        try {
            const data = await request("get", ENDPOINTS.SEARCH_PATIENT, undefined, {
                name: name.trim(),
            });
            setResults(data);
            return data;
        } catch (e) {
           log.error("Search failed", e);
        }
    };

    return { results: results, loading, error, searchPatients };
}