import type {CreatePatientRecordResponse} from "@/features/create_patient_record/types/CreatePatientRecordResponse.ts";
import {useToast} from "@/hooks/useToast.ts";
import {useContext} from "react";
import {PatientRecordIdContext} from "@/providers/patient_record/PatientRecordIdContext.tsx";
import {ENDPOINTS} from "@/constants/endpoints.ts";
import log from "loglevel";
import {useApiLongTime} from "@/hooks/useApiLongTime.ts";

export const useClosePatientRecord = () => {
    const { request, loading, error } = useApiLongTime<CreatePatientRecordResponse>();
    const {showToastSuccess, showToastError} = useToast();
    const patientRecordIdContext = useContext(PatientRecordIdContext);

    const closePatientRecord = async () => {
        if (!patientRecordIdContext?.patientRecordId) {
            showToastError("Chưa xác định bệnh án");
            return
        }
        try {
            await request("post", `${ENDPOINTS.CLOSE_RECORDS}/${patientRecordIdContext?.patientRecordId}`);
            showToastSuccess("Đóng bệnh án thành công")
        } catch (e) {
            if (!(e instanceof Error)) return;
            log.error(`closePatientRecord: ${e.message}`);
            if (e.message) {
                showToastError("Đóng bệnh án thất bại");
            }
        }
    };

    return {
        closePatientRecord,
        loading,
        error,
    }
};