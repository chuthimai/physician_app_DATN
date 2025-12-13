import {useApi} from "@/lib/api/useApi.ts";
import {useToast} from "@/lib/utils/useToast.ts";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import {
    isMedicalRecordResponseArray,
    type MedicalRecordResponse
} from "@/features/medical_records/types/MedicalRecordResponse.ts";

export default function useMedicalRecord() {
    const {
        request,
        loading,
        error
    } = useApi<MedicalRecordResponse[]>();
    const {showToastError} = useToast();

    const getAllMedicalRecordFromAllHospital = async (code: string) => {
        try {
            const data = await request("get", `${ENDPOINTS.GET_ALL_RECORDS_FROM_HIE}/${code}`);
            if (isMedicalRecordResponseArray(data)) {
                return data;
            }
            return [];
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`getAllMedicalRecordFromAllHospital ${e.message}`);
            if (e.message) {
                showToastError("Có lỗi xảy ra");
            }
        }
    }

    return {
        getAllMedicalRecordFromAllHospital,
        loading,
        error,
    }
}