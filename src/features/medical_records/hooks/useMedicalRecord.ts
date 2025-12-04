import {useApi} from "@/lib/api/useApi.ts";
import {useToast} from "@/lib/utils/useToast.ts";
// import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import type {MedicalRecordResponse} from "@/features/medical_records/types/MedicalRecordResponse.ts";
import {medicalRecordHospitalData} from "@/fakedata/medicalRecordHospitalData.ts";

export default function useMedicalRecord() {
    const {
        // request,
        loading,
        error
    } = useApi<MedicalRecordResponse>();
    const {showToastError} = useToast();

    const getAllMedicalRecordFromAllHospital = async (code: string) => {
        try {
            // const data = await request("get", `${ENDPOINTS.GET_DETAIL_RECORD}/${patientRecordIdContext?.patientRecordId}`);
            // if (!data) return;
            // return data;
            console.log(code);
            return medicalRecordHospitalData;
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