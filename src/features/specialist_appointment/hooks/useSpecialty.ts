import {useApi} from "@/lib/api/useApi.ts";
import {useToast} from "@/lib/utils/useToast.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import type MedicalSpecialty from "@/types/models/MedicalSpecialty.ts";
import log from "loglevel";

export default function useSpecialty() {
    const {request, loading, error} = useApi<MedicalSpecialty[]>();
    const {showToastError} = useToast();

    const getSpecialties = async (): Promise<MedicalSpecialty[]> => {
        try {
            return await request("get", ENDPOINTS.SPECIALIZATIONS);
        } catch (e) {
            if (!(e instanceof Error)) return [];
            log.error(`Get specializations : ${e.message}`);
            if (e.message) {
                showToastError("Có lỗi xảy ra");
            }
            return [];
        }
    };

    return {
        getSpecialties,
        loading,
        error,
    };
}