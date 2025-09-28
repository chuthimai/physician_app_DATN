import {useApi} from "@/hooks/useApi.ts";
import {useToast} from "@/hooks/useToast.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import type MedicalSpecialty from "@/types/MedicalSpecialty.ts";
import log from "loglevel";

export default function useSpecialization() {
    const {request, loading, error} = useApi<MedicalSpecialty[]>();
    const {showToastError} = useToast();

    const getSpecializations = async (): Promise<MedicalSpecialty[] | undefined> => {
        try {
            return await request("get", ENDPOINTS.SPECIALIZATIONS);
        } catch (e) {
            if (!(e instanceof Error)) return [];
            log.error(`get specializations : ${e.message}`);
            if (e.message) {
                showToastError("Có lỗi xảy ra");
            }
        }
    };

    return {
        getSpecializations,
        loading,
        error,
    };
}