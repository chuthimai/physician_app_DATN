import {useApi} from "@/hooks/useApi.ts";
import {useState} from "react";
import log from "loglevel";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import type Patient from "@/types/models/Patient.ts";

export default function useSearchPatient() {
    const { request, loading, error } = useApi<Patient[]>();
    const [results, setResults] = useState<Patient[]>([]);

    const searchPatientsByName = async (name: string) => {
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

    return { results, loading, error, searchPatientsByName };
}